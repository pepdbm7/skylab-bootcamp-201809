require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./logic')
const package = require('./package.json')
const jwt = require('jsonwebtoken')

const { env: { PORT, JWT_SECRET } } = process

const { argv: [, , port = PORT || 8080] } = process

const app = express()

const jsonBodyParser = bodyParser.json()


        //USER PART:
//Save registered user data:
app.post('/api/user', jsonBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        logic.registerUser(name, surname, username, password)
            .then(() =>
                res.json({
                    status: 'OK',
                    message: `${username} successfully registered`
                })
            )
            .catch(({ message }) =>
                res.json({
                    status: 'KO',
                    message
                })
            )
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
})


//Authenticate (when user tries to login) we push his data to the api and make it search coincidences with the registered users of our database:
app.post('/api/auth', jsonBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    status: 'OK',
                    data: {
                        id,
                        token
                    }
                })
            })
            .catch(({ message }) =>
                res.json({
                    status: 'KO',
                    message
                })
            )
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
})


//Retrieve (get) the homepage of the user's account, when it has coincidate with the database user's data in the authentication:
app.get('/api/user/:id', (req, res) => {
    const { params: { id }, headers: { authorization } } = req

    try {
        const token = authorization.split(' ')[1]
        const { sub } = jwt.verify(token, JWT_SECRET)

        if (id !== sub) throw Error('token sub does not match user id')

        logic.retrieveUser(id)
            .then(user =>
                res.json({
                    status: 'OK',
                    data: user
                })
            )
            .catch(({ message }) =>
                res.json({
                    status: 'KO',
                    message
                })
            )
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
})


//Logout is made by React with a simple flag; we don't need any data from any API for that:
// app.get('/logout', (req, res) => {
//     req.session.userId = null

//     res.redirect('/')
// })




        //POSTIT PART:
//Add postit:   
app.put('/api/users/:id/postits', jsonBodyParser, (req, res) => {
    const { headers: { authorization }, params: { id }, body: { text } } = req

    try {
        const token = authorization.split(' ')[1]

        const { sub } = jwt.verify(token, JWT_SECRET)

        if (id !== sub) throw Error('token sub does not match user id')

            logic.addPostit(sub, text)
                .then(() => res.json({
                        status: 'OK',
                        message: 'postit added'
                    }))
                .catch(({ message }) => res.json({
                        status: 'KO',
                        message
                    }))

    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
})


//To get the list of all the postits:
app.get('/api/users/:id/postits', jsonBodyParser, (req, res) => {
    const { headers: { authorization }, params: { id } } = req

    try {
        const token = authorization.split(' ')[1]

        const { sub } = jwt.verify(token, JWT_SECRET)

        if (id !== sub) throw Error('token sub does not match user id')

        logic.listPostits(id)
            .then(postits => res.json({
                status: 'OK',
                data: postits
            }))
            .catch(({ message }) =>
                res.json({
                    status: 'KO',
                    message
                })
            )
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
})


//Edit postit: (put or patch, both are for update the content with new changes)
app.put('/api/users/:id/postits/:postitId', jsonBodyParser, (req, res) => {
    const { headers: { authorization }, params: { id, postitId }, body: { text } } = req

    try {
        const token = authorization.split(' ')[1]

        const { sub } = jwt.verify(token, JWT_SECRET)

        if (id !== sub) throw Error('token sub does not match user id')

        logic.modifyPostit(id, postitId, text)
            .then(() => res.json({
                status: 'OK',
                message: 'postit modified'
            }))
            .catch(({ message }) =>
                res.json({
                    status: 'KO',
                    message
                })
            )
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
})


//Delete a postit:
app.delete('/api/users/:id/postits/:postitId', jsonBodyParser, (req, res) => {
    const { headers: { authorization }, params: { id, postitId } } = req

    try {
        const token = authorization.split(' ')[1]

        const { sub } = jwt.verify(token, JWT_SECRET)

        if (id !== sub) throw Error('token sub does not match user id')

        logic.removePostit(id, postitId)
            .then(() => res.json({
                status: 'OK',
                message: 'postit removed'
            }))
            .catch(({ message }) =>
                res.json({
                    status: 'KO',
                    message
                })
            )
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
})


app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))