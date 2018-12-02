const { models: { Product, Order, User, ContactForm } } = require('planbe-data')

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))


const { AlreadyExistsError, AuthError, NotAllowedError, NotFoundError } = require('../errors')
const validate = require('../utils/validate')
// const fs = require('fs')
// const path = require('path')

const logic = {
    registerUser(type, name, surname, email, username, password) {
        validate([
            { key: 'type', value: type, type: String },
            { key: 'name', value: name, type: String },
            { key: 'surname', value: surname, type: String },
            { key: 'email', value: email, type: String },
            { key: 'username', value: username, type: String },
            { key: 'password', value: password, type: String }
        ])
        
        return (async () => {
            let user = await User.findOne({ username })
            let _email = await User.findOne({ email })

            if (user) throw new AlreadyExistsError(`Username ${username} already registered`)
            if (_email) throw new AlreadyExistsError(`Email ${email} already registered`)

            user = new User({ type, name, surname, email, username, password })
            await user.save()

        })()
    },

    sendConfirmationRegistration(name, email) {
        validate([
            { key: 'name', value: name, type: String },
            { key: 'email', value: email, type: String }
        ])

        return transporter.sendMail({
            to: email,
            from: 'planbe@gmail.com',
            subject: 'Sign in completed',
            html: `<h1>Hey ${name}!!</h1>
            <h2>you have succesfully registered!</h2>`
        })
    },

    authenticateUser(username, password) {
        validate([
            { key: 'username', value: username, type: String },
            { key: 'password', value: password, type: String }
        ])

        return (async () => {
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate([{ key: 'id', value: id, type: String }])

        return (async () => {
            const user = await User.findById(id, { '_id': 0, password: 0, orders: 0, __v: 0 }).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.id = id

            return user
        })()
    },

    updateUser(id, type, name, surname, email, username, newPassword, password) {            //TODO: NO SÉ PORQUÉ NO LANZA LOS ERRORES A REACT!!!!!!!!!!!!!
        validate([
            { key: 'id', value: id, type: String },
            { key: 'type', value: type, type: String },
            { key: 'name', value: name, type: String },
            { key: 'surname', value: surname, type: String },
            { key: 'email', value: email, type: String },
            { key: 'username', value: username, type: String },
            { key: 'newPassword', value: newPassword, type: String },
            { key: 'password', value: password, type: String }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            debugger
            if (user.password !== password) throw new AuthError('invalid password')     

            const _user = await User.findOne({ username })
            const _email = await User.findOne({ email })

            //avisamos q ese ya está cogido:
            if (_user) throw new AlreadyExistsError(`username ${username} already exists`)
            if (_email) throw new AlreadyExistsError(`email ${email} already used`)
            
            debugger
            //cambiamos campos del usario, y salvamos:
            user.type = type
            user.name = name
            user.surname = surname
            user.email = email
            user.username = username
            user.password = newPassword
            
            await user.save()

        })()
    },

    //send email confirmation Profile Updated!:
    sendAccountUpdated(name, email, username, newPassword) {
        validate([
            { key: 'name', value: name, type: String },
            { key: 'email', value: email, type: String },
            { key: 'username', value: username, type: String },
            { key: 'newPassword', value: newPassword, type: String }
        ])
        return transporter.sendMail({
            to: email,
            from: 'planbe@gmail.com',
            subject: 'Account updated',
            html: `<h1>Hey ${name}!!</h1>
            <h2>you have succesfully updated your account!</h2>
            <p><strong>Your new username is:</strong> ${username}</p><br/>
            <p><strong>Your new password is:</strong> ${newPassword}</p>`
        })
    },



    //save CONTACT FORM into User:
    saveContactForm(id, subject, textarea) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'subject', value: subject, type: String },
            { key: 'textarea', value: textarea, type: String }
        ])

        return (async () => {
            const user = await User.findById(userId)
            
            if (!user) throw new NotFoundError(`User with id ${userId} not found`)

            const contactform = new ContactForm({ subject: subject,  message: textarea })
            user.contactForms.forEach(_contactform => {
                if (_contactform._id === order._id) throw new AlreadyExistsError(`Contact Form with id ${contactform._id} already exists in user!`)
                
                //creamos 'id', y borramos el '_id':
                _contactform.id = contactform._id  
                delete contactform._id
            })
            debugger
            await user.contactForms.push(contactform)
            
            await user.save()
            
        })()
    },

    sendContactForm(id, subject, textarea) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'subject', value: subject, type: String },
            { key: 'textarea', value: textarea, type: String }
        ])
        return (async () => {
            const user = await User.findById(userId)
            
            if (!user) throw new NotFoundError(`User with id ${userId} not found`)

            const name = user.name
            const username = user.username
            const email = user.email 

            await transporter.sendMail({
                to: 'pepdbm7@gmail.com',  //será el email d la empresa (hola@eatplanbe.com)
                from: 'planbeapp@gmail.com',  //inventado, sería el email de la app
                subject: subject,
                html: `<h1>Message from your client ${name}!!</h1>
                <h2>you have succesfully updated your account!</h2>
                <p><strong>Client's username:</strong> ${username}<br/><br/>
                <strong>Client's email address:</strong> ${email}</p><br/><br/>
                <i>${textarea}/i>`
            })

        }) 
    },




    /**
     * Adds a product
     * 
     * @param {string} id The user id
     * @param {string} productId The product productId
     * 
     * @throws {TypeError} On non-string user id, or non-string product productId
     * @throws {Error} On empty or blank user id or product productId
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */




    //HOME:
    retrieveAllProducts() {
        return (async () => {
            const projection = { _id: true, type: true, name: true, price: true, image: true, description: true}
            const products = await Product.find( {}, projection ).lean() // (lean para devolverlo como objeto plano)
            products.forEach(product => { 
                product.id = product._id   //pasamos el _id de mongo a id
                delete product._id  //borramos el _id
            })
            if (!products) throw new NotFoundError('products not found')
            
            return products
        })()
    },



    //add product to Cart:
    addProductToUserCart(id, productId) {  //al clicar el botón 'añadir a carrito'
        validate([
            { key: 'id', value: id, type: String },
            { key: 'productId', value: productId, type: String }
        ])

        return (async () => {
            const user = await User.findById(id)
            
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const product = await Product.findOne({ _id: productId })
            
            if (!product) throw new NotFoundError(`product with id ${productId} not found`)

            user.basket.push(product._id)

            await user.save()

        })()
    },

    listCartProducts(id) {
        validate([
            { key: 'id', value: id, type: String }, 
        ])

        return (async () => {
            const user = await User.findById(id).lean()
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            
            const productsArray = user.basket

            if (productsArray.length) {
                const projection = { _id: true, type: true, name: true, price: true, image: true, quantity: true, description: true }  //ponemos true a los campos q queremos q nos devuelva
                // const products = await Product.find( {}, projection )
                let products = await Promise.all(productsArray.map(async productId => await Product.findById(productId, projection).lean()))

                    products.forEach(product => {
                                product.id = product._id.toString()   //pasamos el _id de mongo a id
                                delete product._id  //borramos el _id
                    })
                    
                    //la cantidad de cada producto será el núm d veces q se repita:
                    products.forEach(_product => {
                        let repeatedTimes = products.filter(__product => __product.id === _product.id)
                        _product.quantity = repeatedTimes.length
                    })
                    
                    //eliminamos las repeticiones d cada producto:
                    products.forEach(_product => products.filter(__product =>  __product.id !== _product.id))

                    const flags = new Set();
                    const productsToList = products.filter(product => {
                        if (flags.has(product.id)) {
                            return false
                        }
                        flags.add(product.id);
                        return product;
                    });
                        return productsToList

            } else {  //si basket.length = 0:
                return []
            }
        })()
    },

    /**
     * Removes a product
     * 
     * @param {string} id The user id
     * @param {string} productId The product id
     * 
     * @throws {TypeError} On non-string user id, or non-string product id
     * @throws {Error} On empty or blank user id or product text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id, or product id
     */

    removeProduct(id, productId) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'productId', value: productId, type: String }
        ])
        return (async () => {
            
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.basket.length) {
                const duplicated = user.basket.filter(_productId => _productId == productId)
                const different =  user.basket.filter(_productId => _productId != productId)

                if (!user.basket) throw new NotFoundError(`user 's basket not found`)

                if(duplicated.length) {
                    duplicated.pop()
                    user.basket = (duplicated).concat(different)
                }
                await user.save()
                
            }
        })()
    },

    addMore(id, productId) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'productId', value: productId, type: String }
        ])

        return (async () => {
            const user = await User.findById(id)
            
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const product = await Product.findOne({ _id: productId })
            
            if (!product) throw new NotFoundError(`product with id ${productId} not found`)

            user.basket.push(product._id)

            await user.save()

        })()
    },


    
    //creamos orden con submit del Cart: (si no se rellenan luego todos los fields, pq cancela, la borraremos)
    createNewOrder (userId, products, total) { 
        debugger
        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'products', value: products, type: Array },
            { key: 'total', value: total, type: String }
        ])

        return (async () => {
            const user = await User.findById(userId)
            
            if (!user) throw new NotFoundError(`User with id ${userId} not found`)

            const order = new Order({ products: products, total: total })
            user.orders.forEach(_order => {
                if (_order._id === order._id) throw new AlreadyExistsError(`Order with id ${order._id} already exists in user!`)
                _order.id = order._id  //creamos id
                delete order._id //borramos el _id
            })
            debugger
            await user.orders.push(order)
            
            await user.save()
            
        })()
    },

    //to add date and place to order (PATCH):
    addDroppingDetails(id, place, day, month, year, time, comments, paid) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'place', value: place, type: String },
            { key: 'day', value: day, type: String },
            { key: 'month', value: month, type: String },
            { key: 'year', value: year, type: String },
            { key: 'time', value: time, type: String },
            { key: 'comments', value: comments, type: String },
            { key: 'paid', value: paid, type: Boolean }
        ])
        
        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const userOrders = user.orders
            if (userOrders.length) {
                //encontramos la order inacabada
                const pendingOrder = userOrders.find(order => !(order.place && order.time && order.paid))
     
                if (pendingOrder.length > 1) throw new AlreadyExistsError(`There are more than one pending order!!!`)

                //reemplazamos el _id por un id:
                pendingOrder.id = pendingOrder._id
                delete pendingOrder._id


                //creamos y llenamos los nuevos fields d la orden inacabada:
                pendingOrder.place = place
                pendingOrder.day = day
                pendingOrder.month = month
                pendingOrder.year = year
                pendingOrder.time = time
                pendingOrder.comments = comments
                pendingOrder.paid = paid

                //enviamos datos de la orden a su email:
                const _name = user.name
                const _email = user.email
                const _total = pendingOrder.total
                const _products = pendingOrder.products.forEach(product => product.name)


                 this.sendConfirmationOrder(_name, _email, place, day, month, year, time, comments, _products, _total)
     
                //vaciamos su carrito:
                user.basket = []

             
                await user.save()
                
            }
        })()
    },

    sendConfirmationOrder(name, email, place, day, month, year, time, comments, products, total) {
 
        return transporter.sendMail({
            to: email,
            from: 'planbe@gmail.com',
            subject: 'Order completed',
            html: `<h1>Hey ${name}!</h1>
                <h2 style="color: blue;>Your order has been successfully done!</h2>
                <p style="color: blue>Your breakfast will be sent to <b>${place}</b> on the <b>${day}</b>, <b>${month}</b> of <b>${year}</b>, in the time frame of <b>${time}</b>.</p>
                <p style="color: blue>The <b>products</b> bought were: ${products}</p>
                <p style="color: blue>The total paid was <b>${total} €</b></p>
                <p style="color: blue>Comments: ${comments}</p>
                <h1 style="color: red; text-align: center; text-decoration: underline overline"><b>Enjoy your meal!!</b></h1>`
        })
    },


    deleteUnfinishedOrders(id) {
        validate([
            { key: 'id', value: id, type: String }
        ])
        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)


            let ordersArray = user.orders

            if (ordersArray.length) {
                //buscamos ordenes inacabadas:
                const pendingOrders = await ordersArray.filter(order => !(order.place && order.time && order.paid)) //encontramos order(s) incompleta(s) y la(s) ELIMINAMOS

                //recorremos y eliminamos (con un splice) las ordenes pendientes (las q no tienen ciertos campos):
                await pendingOrders.forEach(x => ordersArray.splice(ordersArray.findIndex(order => !(order.place ||order.day ||order.month ||order.year ||order.comments || order.paid), 1)) )
                debugger

                await user.save()
            }
        })()
    },

    retrieveOrders(id) {
        validate([
            { key: 'id', value: id, type: String }
        ])

        return (async () => {
            const user = await User.findById(id).populate({ path: 'orders.products' }).lean()   //populate de nivel 2!!

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const orders = user.orders
            return orders

        })()
    }
}
  

    module.exports = logic