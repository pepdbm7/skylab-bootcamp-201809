const { User } = require('../data/user')
const { Product } = require('../data/product')
const { Order } = require('../data/order')
const { AlreadyExistsError, AuthError, NotAllowedError, NotFoundError } = require('../errors')
const validate = require('../utils/validate')
const mongoose = require('mongoose')
// const fs = require('fs')
// const path = require('path')

const logic = {
    registerUser(type, name, surname, username, password) {
        validate([{ key: 'type', value: type, type: String }, { key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            let user = await User.findOne({ username })

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({ type, name, surname, username, password })

            await user.save()
        })()
    },

    authenticateUser(username, password) {
        validate([{ key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

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

    updateUser(id, type, name, surname, username, newPassword, password) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'type', value: type, type: String },
            { key: 'name', value: name, type: String, optional: true },
            { key: 'surname', value: surname, type: String, optional: true },
            { key: 'username', value: username, type: String, optional: true },
            { key: 'password', value: password, type: String }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                const _user = await User.findOne({ username })  //buscamos si hay algun user q use el username nuevo introducido

                //avisamos q ese ya está cogido:
                if (_user) throw new AlreadyExistsError(`username ${username} already exists`)
                
                //actualizamos los nuevos inputs introducidos, y salvamos:
                user.type = type
                name != null && (user.name = name) //(condición): si name no es null, entonces igualar el antiguo name al nuevo
                surname != null && (user.surname = surname)
                user.username = username
                newPassword != null && (user.password = newPassword)

                await user.save()

            } else { //si no hay nuevo username introducido, 
                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                newPassword != null && (user.password = newPassword)

                await user.save()
            }
        })()
    },

    // addCollaborator(id, collaboratorUsername) {
    //     validate([
    //         { key: 'id', value: id, type: String },
    //         { key: 'collaboratorUsername', value: collaboratorUsername, type: String }
    //     ])

    //     return (async () => {
    //         const user = await User.findById(id)

    //         if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //         const collaborator = await User.findOne({ username: collaboratorUsername })

    //         if (!collaborator) throw new NotFoundError(`user with username ${collaboratorUsername} not found`)

    //         if (user.id === collaborator.id) throw new NotAllowedError('user cannot add himself as a collaborator')

    //         user.collaborators.forEach(_collaboratorId => {
    //             if (_collaboratorId === collaborator.id) throw new AlreadyExistsError(`user with id ${id} arleady has collaborator with id ${_collaboratorId}`)
    //         })

    //         user.collaborators.push(collaborator._id)

    //         await user.save()
    //     })()
    // },

    // listCollaborators(id) {
    //     validate([
    //         { key: 'id', value: id, type: String }
    //     ])

    //     return (async () => {
    //         const user = await User.findById(id)

    //         if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //         const collaborators = await Promise.all(user.collaborators.map(async collaboratorId => await User.findById(collaboratorId)))

    //         return collaborators.map(({ id, username }) => ({ id, username }))
    //     })()
    // },

    // // TODO review! fails because of "Uncaught Error [ERR_STREAM_DESTROYED]: Cannot call write after a stream was destroyed"
    // _saveUserPhoto(id, file, filename) {
    //     const folder = `data/users/${id}`

    //     return new Promise((resolve, reject) => {
    //         const pathToFile = path.join(folder, filename)

    //         debugger

    //         const ws = fs.createWriteStream(pathToFile)

    //         fs.access(folder, fs.constants.F_OK, err => {
    //             if (err)
    //                 fs.mkdir(folder, err => {
    //                     if (err) return reject(err)

    //                     file.pipe(ws)

    //                     file.on('end', () => {
    //                         debugger

    //                         ws.close()

    //                         resolve()
    //                     })

    //                     file.on('error', err => {
    //                         debugger
    //                     })
    //                 })
    //             else
    //                 fs.readdir(folder, (err, files) => {
    //                     debugger
    //                     if (err) return reject(err)

    //                     const deletes = files.map(file => new Promise((resolve, reject) => {
    //                         debugger
    //                         fs.unlink(path.join(folder, file), err => {
    //                             if (err) return reject(err)

    //                             resolve()
    //                         })
    //                     }))

    //                     Promise.all(deletes)
    //                         .then(() => {
    //                             file.pipe(ws)

    //                             file.on('end', () => resolve())
    //                         })
    //                 })
    //         })
    //     })
    // },

    // saveUserPhoto(id, file, filename) {
    //     const folder = `data/users/${id}`

    //     return new Promise((resolve, reject) => {
    //         try {
    //             if (!fs.existsSync(folder)) {
    //                 fs.mkdirSync(folder)
    //             } else {
    //                 const files = fs.readdirSync(folder)

    //                 files.forEach(file => fs.unlinkSync(path.join(folder, file)))
    //             }

    //             const pathToFile = path.join(folder, filename)

    //             const ws = fs.createWriteStream(pathToFile)

    //             file.pipe(ws)

    //             resolve()
    //         } catch (err) {
    //             reject(err)
    //         }
    //     })
    // },

    // retrieveUserPhoto(id) {
    //     const folder = `data/users/${id}`

    //     return new Promise((resolve, reject) => {
    //         try {
    //             let file

    //             if (!fs.existsSync(folder)) {
    //                 file = 'data/users/default/profile.png'
    //             } else {
    //                 const files = fs.readdirSync(folder)

    //                 file = `data/users/${id}/${files[0]}`
    //             }

    //             const rs = fs.createReadStream(file)

    //             resolve(rs)
    //         } catch (err) {
    //             reject(err)
    //         }
    //     })
    // },




    /**
     * Adds a product
     * 
     * @param {string} id The user id
     * @param {string} text The product text
     * 
     * @throws {TypeError} On non-string user id, or non-string product text
     * @throws {Error} On empty or blank user id or product text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */

    
    retrieveAllProducts() {
        return (async () => {
            const projection = { name: true, price: true, image: true, description: true}
            const products = await Product.find( {}, projection ).lean() // (lean para devolverlo como objeto plano)

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

            const product = await Product.findOne({ _id: productId })  // (Mongo method), to find smt into the Product collection of our DB
            
            if (!product) throw new NotFoundError(`product with id ${productId} not found`)

            if (user.basket.length) {
                user.basket.forEach(_productId => {
                if (_productId === product.productId) throw new AlreadyExistsError(`product with id ${id} was already in the Cart!`)
            })
        }
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
                const projection = { name: true, price: true, image: true, description: true }
                // const products = await Product.find( {}, projection )
                const productsToList = Promise.all(productsArray.map(async (productId) => await Product.findById(productId, projection).lean()))
                return productsToList
            } else {
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

    // for 2nd SPRINT!:
    // editQuantity(id, productId, quantity) {
    //     validate([
    //         { key: 'id', value: id, type: String },
    //         { key: 'productId', value: productId, type: String },
    //         { key: 'text', value: text, type: String }
    //     ])

    //     return (async () => {
    //         const user = await User.findById(id)

    //         if (!user) throw new NotFoundError(`user with id ${id} not found`)

    //         const product = await product.findOne({ user: user._id, _id: productId })

    //         if (!product) throw new NotFoundError(`product with id ${productId} not found`)

    //         product.text = text

    //         await product.save()
    //     })()
    // },

    
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
            debugger
            user.orders.forEach(_order => {
                if (_order._id === order._id) throw new AlreadyExistsError(`Order with id ${userId} already exists in user!`)
            })
            debugger
            user.orders.push(order)
            
            await user.save()
            
        })()
    },

    //to add date and place to order (PATCH):
    addDroppingDetails(id, place, day, month, year, time, comments) {
        debugger
        validate([
            { key: 'id', value: id, type: String },
            { key: 'place', value: place, type: String },
            { key: 'day', value: day, type: String },
            { key: 'month', value: month, type: String },
            { key: 'year', value: year, type: String },
            { key: 'time', value: time, type: String },
            { key: 'comments', value: comments, type: String }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const userOrders = user.orders

            if (userOrders.length) {
                const pendingOrder = user.orders.find(order => !(order.place.length, order.day.length, order.month.length, order.year.length, order.time.length, order.paid)) //encontramos la order inacabada
                debugger

                if (pendingOrder.length > 1) throw new AlreadyExistsError(`There are more than one pending order!!`)

                pendingOrder.place = place
                pendingOrder.day = day
                pendingOrder.month = month
                pendingOrder.year = year
                pendingOrder.time = time
                pendingOrder.comments = comments
                debugger

                await user.save()
            }
        })()
    },

    deleteUnfinishedOrders(id) {

        validate([
            { key: 'id', value: id, type: String }
        ])
        return (async () => {
            const user = await User.findById(id)


            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const userOrders = user.orders

            debugger

            if (userOrders.length) {
                const pendingOrder = userOrders.filter(order => (!order.place || !order.day || !order.month || order.year || order.time && order.paid)) //encontramos la order incompleta y la ELIMINAMOS
                debugger

                // if (pendingOrder.length > 1) throw new AlreadyExistsError(`There are more than a pending order!!`)
                

                //TODO TODO TODO !!
                //una manera:
                // user.update( { orders: [] }, { $pullAll: { paid: false } } )
                
                //otra:
                // user.update(
                //     { orders = pendingOrder },
                //     { "$set": { "orders": [] } }
                //  )


                // pendingOrder.remove()

                debugger

                await user.save()
            }
        })()
    },

    //to add date and place to order (PATCH):
    addStatusPaid(id, orderId, paid) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'place', value: place, type: String },
            { key: 'day', value: day, type: String },
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const order = await Postit.findOne({ user: user._id, _id: postitId })

            if (!postit) throw new NotFoundError(`postit with id ${postitId} not found`)

            postit.text = text

            await postit.save()
        })()
    },

    listOrders(id) {
        validate([
            { key: 'id', value: id, type: String }, 
        ])

        return (async () => {
            const user = await User.findById(id).lean()
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            
            const userOrders = user.orders

            
            if (userOrders.length) {
                user.orders.find(order => order.paid = false).remove()  //eliminamos las ordenes inacabadas q pueda haber

                const OrderssToList = Promise.all(user.map(async (_user) => await _user.orders.lean()))
                return OrderssToList  //solo devolvemos el array con ordenes pagadas
            } else {
                return []
            }
        })()
    }
}
  

    module.exports = logic