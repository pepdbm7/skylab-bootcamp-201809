const fs = require('fs')

class User {
    constructor(user) {
        const { id, name, surname, username, password } = user

        this.id = id || Date.now()

        this.name = name
        this.surname = surname
        this.username = username
        this.password = password

        this.postits = []
    }

    save() {
        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {  //read data from stream, throw error if there is, and return the content of the json
                if (err) return reject(err)

                const users = JSON.parse(json)  //users is the data, in object format

                const index = users.findIndex(user => user.id === this.id)  //search if it already exists

                if (index < 0) users.push(this)  //if not found, is new user so we save it to the data object (users) 
                else users[index] = this

                json = JSON.stringify(users)  //parse it to string to save data to users.json file

                fs.writeFile(User._file, json, (err) => {  //WRITE ??
                    if (err) return reject(err)

                    resolve()
                })
            })
        })
    }

    toObject() {
        const { name, surname, username, password, postit } = this

        return { name, surname, username, password }
    }

    
 //static: we can access to the methods without calling the class 'User'

    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)

                const user = users.find(user => user.username === username)

                resolve(user ? new User(user) : undefined)
            })
        })
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)

                const user = users.find(user => user.id === id)

                resolve(user ? new User(user) : undefined)
            })
        })
    }
}

User._file = './data/users.json'  //el file será lo q contenga el obj del json, con data de cada user registrado 

module.exports = User