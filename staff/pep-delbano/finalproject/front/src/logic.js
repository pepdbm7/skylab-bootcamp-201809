const logic = {
    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,

    url: 'NO-URL',

    registerUser(type, name, surname, username, password) {
        if (typeof type !== 'string') throw TypeError(`${type} is not a string`)
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!type.trim()) throw Error('type is empty or blank')
        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch(`${this.url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ type, name, surname, username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    login(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch(`${this.url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                const { id, token } = res.data

                this._userId = id
                this._token = token

                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('token', token)
            })
    },

    retrieveUser() { 
        let id = this._userId

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/users/${this._userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                return res.data
            })
    },



    get loggedIn() {
        return !!this._userId
    },

    logout() {
        this._postits = []
        this._userId = null
        this._token = null

        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
    },

    // addCollaborator(collaboratorUsername) {
    //     if (typeof collaboratorUsername !== 'string') throw TypeError(`${collaboratorUsername} is not a string`)

    //     if (!collaboratorUsername.trim()) throw Error('collaboratorUsername is empty or blank')

    //     return fetch(`${this.url}/users/${this._userId}/collaborators`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8',
    //             'Authorization': `Bearer ${this._token}`
    //         },
    //         body: JSON.stringify({ collaboratorUsername })
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.error) throw Error(res.error)
    //         })
    // },

    // listCollaborators() {
    //     return fetch(`${this.url}/users/${this._userId}/collaborators`, {
    //         headers: {
    //             'Authorization': `Bearer ${this._token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.error) throw Error(res.error)

    //             return res.data
    //         })
    // },



    //HOME: 

    listAllProducts() {
        return fetch(`${this.url}/home`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                return res.data
            })
    },
    
    addProductToCart(id) {  //product id
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim()) throw Error('id is empty or blank')

        return fetch(`${this.url}/cart/${this._userId}/product/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },




    //CART:

    listCartProducts() {
        let id = this._userId

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/cart/${this._userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    removeProductFromCart(id) {  //product id
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/cart/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },



    //ORDER

    createNewOrder(products, total) {
        if (typeof products !== 'object') throw TypeError(`${products} is not an array`)
        if (typeof total !== 'string') throw TypeError(`${total} is not a string`)
        // if (typeof place !== 'string') throw TypeError(`${place} is not a string`)
        // if (typeof day !== 'string') throw TypeError(`${day} is not a string`)
        // if (typeof month !== 'string') throw TypeError(`${month} is not a string`)
        // if (typeof year !== 'string') throw TypeError(`${year} is not a string`)

        if (!products) throw Error('products is an empty array')
        if (!total.trim()) throw Error('total is empty or blank')
        // if (!place.trim()) throw Error('place is empty or blank')
        // if (!day.trim()) throw Error('day is empty or blank')
        // if (!month.trim()) throw Error('month is empty or blank')
        // if (!year.trim()) throw Error('year is empty or blank')

        return fetch(`${this.url}/cart/${this._userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ products, total })
        })
        .then(res => res.json())
        .then(res => {
            debugger
                if (res.error) throw Error(res.error)
            })
    },

    deleteUnfinishedOrders() {

        return fetch(`${this.url}/setorder/${this._userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },


    addDroppingDetails(place, day, month, year, time, comments) {
        if (typeof place !== 'string') throw TypeError(`${place} is not a string`)
        if (typeof day !== 'string') throw TypeError(`${day} is not a string`)
        if (typeof month !== 'string') throw TypeError(`${month} is not a string`)
        if (typeof year !== 'string') throw TypeError(`${year} is not a string`)
        if (typeof time !== 'string') throw TypeError(`${time} is not a string`)
        if (comments && typeof comments !== 'string') throw TypeError(`${comments} is not a string`)


        if (!place.trim()) throw Error('place is empty or blank')
        if (!day.trim()) throw Error('day is empty or blank')
        if (!month.trim()) throw Error('month is empty or blank')
        if (!year.trim()) throw Error('year is empty or blank')
        if (!time.trim()) throw Error('time is empty or blank')

        
        return fetch(`${this.url}/setorder/${this._userId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    retrieveOrders() {
        let id = this._userId
        debugger
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/vieworders/${this._userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
                
                return res.data
            })
    }








    // modifyPostit(id, text) {
    //     if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw Error('id is empty or blank')

    //     if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

    //     if (!text.trim()) throw Error('text is empty or blank')

    //     return fetch(`${this.url}/users/${this._userId}/postits/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8',
    //             'Authorization': `Bearer ${this._token}`
    //         },
    //         body: JSON.stringify({ text })
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.error) throw Error(res.error)
    //         })
    // },

    // movePostit(id, status) {
    //     if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw Error('id is empty or blank')

    //     if (typeof status !== 'string') throw TypeError(`${status} is not a string`)

    //     if (!status.trim()) throw Error('status is empty or blank')

    //     return fetch(`${this.url}/users/${this._userId}/postits/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8',
    //             'Authorization': `Bearer ${this._token}`
    //         },
    //         body: JSON.stringify({ status })
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.error) throw Error(res.error)
    //         })
    // },

    // assignPostit(id, collaboratorId) {
    //     if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

    //     if (!id.trim().length) throw Error('id is empty or blank')

    //     if (typeof collaboratorId !== 'string') throw TypeError(`${collaboratorId} is not a string`)

    //     if (!collaboratorId.trim()) throw Error('collaboratorId is empty or blank')

    //     return fetch(`${this.url}/users/${this._userId}/postits/${id}/collaborator`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8',
    //             'Authorization': `Bearer ${this._token}`
    //         },
    //         body: JSON.stringify({ collaboratorId })
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.error) throw Error(res.error)
    //         })
    // }
}

// export default logic
module.exports = logic