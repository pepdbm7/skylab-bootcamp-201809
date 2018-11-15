const { User, Postit } = require('../data')
const { AlreadyExistsError, AuthError, NotFoundError, ValueError } = require('../errors')

const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw new ValueError('name is empty or blank')
        if (!surname.trim()) throw new ValueError('surname is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {
            let user = await User.findOne({ username })  //search in our db if this user exists

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({ name, surname, username, password })

            await user.save()
        })()
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return (async () => {
            let user = await User.findOne({ username })
            
            if (!user || user.password !== password) throw new AuthError('invalid username or password')
    
            return user.id
        })()
    },

    retrieveUser(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')
           
        return (async () => {
            let user = await User.findById(id, { '_id': 0, password: 0, postits: 0, __v: 0 }).lean()
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.id = id

            return user
    })()
    },

    retrieveUsers() {

        return (async () => {
            const users = await User.find().lean()

            if (!users) throw new NotFoundError(`users not found`)

            users.forEach(user => {

                delete user._id
                delete user.__v
                delete user.password

            })

            return users

        })()
    },

    updateUser(id, name, surname, username, newPassword, password) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (name != null && typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (surname != null && typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (name != null && !name.trim().length) throw new ValueError('name is empty or blank')
        if (surname != null && !surname.trim().length) throw new ValueError('surname is empty or blank')
        if (username != null && !username.trim().length) throw new ValueError('username is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')
        if (!password.trim().length) throw new ValueError('password is empty or blank')

        return (async () => {
            let user = await User.findById(id)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                let _user = await User.findOne({ username })
                if (_user) throw new AlreadyExistsError(`username ${username} already exists`)
                
                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                user.username = username
                newPassword != null && (user.password = newPassword)
                
                await user.save()
            } else {
                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                newPassword != null && (user.password = newPassword)
                
                await user.save()
            }
            debugger
        })()
    },

    addBuddy(id, username) {  //id dl user, y el username dl buddy q añadimos
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw new ValueError('username is empty or blank')

        return (async () => {  
            let user = await User.findById( id ) //user será el user al q le pasaremos el buddy
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                let _user = await User.findOne({username}) //_user será el buddy q pasamos al user
                    if (!_user) throw new NotFoundError(`user with username ${username} not found`)
                    user.buddies.push(_user.id)  //añadimos buddy a la lista de buddies dl user (ver schema)

                    await user.save()
        })()
    },


    assignToUser(idUser, id, username) { //'id' es dl postit, 
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw new ValueError('username is empty or blank')

        return (async () => {
            let postit = await Postit.findById( id )
                if (!postit) throw new NotFoundError(`postit with id ${id} not found`)
                if(postit.user.toString() !== idUser.toString()) throw new NotFoundError(`postit with id ${id} does not match the user `)
                
            let _user = await User.findOne({username}) //_user será el user colaborador dl postit
                if (!_user) throw new NotFoundError(`user with username ${username} not found`)
                
                postit.assignTo = _user.id //añadimos el id dl colaborador a la propiedad assignTo dl postit

                await postit.save()
        })()
    },
    




    /**
     * Adds a postit
     * 
     * @param {string} id The user id
     * @param {string} text The postit text
     * 
     * @throws {TypeError} On non-string user id, or non-string postit text
     * @throws {Error} On empty or blank user id or postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */
    addPostit(id, text, status) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        if (typeof status !== 'string') throw TypeError(`${status} is not a string`)

        if (!status.trim().length) throw new ValueError('status is empty or blank')

        return (async () => {
            let user = await User.findById(id)
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const postit = new Postit({ text, user: user.id, status})

                await postit.save()
        })()
    },

    listPostits(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return (async () => {
            let user = await User.findById(id).lean()
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            let postits = await Postit.find({ user: user._id }).lean()
                    const _postits = postits.map(postit => {
                        postit.id = postit._id.toString()
                        
                        delete postit._id

                        postit.user = postit.user.toString()

                        return postit
                    })
                return _postits
        })()
    },

    /**
     * Removes a postit
     * 
     * @param {string} id The user id
     * @param {string} postitId The postit id
     * 
     * @throws {TypeError} On non-string user id, or non-string postit id
     * @throws {Error} On empty or blank user id or postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id, or postit id
     */
    removePostit(id, postitId) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        return (async () => {
            let postit = await Postit.findById(postitId)
            if (!postit) throw new NotFoundError(`postit with id ${id} not found`)
            await postit.remove()
        })()
    },

    modifyPostit(id, postitId, text, status) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        if (typeof status !== 'string') throw TypeError(`${status} is not a string`)

        if (!status.trim().length) throw new ValueError('text is empty or blank')

        return (async() => {
            let postit = await Postit.findById(postitId)
            if (!postit) throw new NotFoundError(`postit with id ${id} not found`)

            postit.text = text
            postit.status = status
    
            await postit.save()
        })()
    }
}

module.exports = logic