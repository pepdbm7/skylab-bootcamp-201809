const { User } = require('./data')

const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (user) throw Error(`username ${username} already registered`)

                user = new User({ name, surname, username, password })

                return user.save()
            })
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (!user || user.password !== password) throw Error('invalid username or password')

                return user.id
            })
    },

    retrieveUser(id, postits) {
        
        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        return User.findById(id)
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)

                const _user = new User(
                    user.name,
                    user.surname,
                    user.username,
                    user.password
                )
        
                _user.id = id

                _user.postits = postits
                // delete _user.password

                return _user
            })
    },

    createPostit(id, postit) {

        // const user = this.retrieveUser(id)

        // user.postits.push({
        //     postit: postit,
        //     id: Date.now()
        // })

        // user.save()

        return this.retrieveUser(id)
            .then(user => {
                user.postits.push({
                    postit: postit,
                    id: Date.now()
            })
            user.save()

        })

    },

    deletePostit(userId,postitId) {

        let user = this.retrieveUser(userId)

        user.postits = user.postits.filter(item => item.id !== Number(postitId))

        user.save()
    }
}

module.exports = logic