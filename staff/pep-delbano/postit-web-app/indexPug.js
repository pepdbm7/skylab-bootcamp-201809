//VERSION WITH PUG AND ASYNC (PROMISES)
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')
const package = require('./package.json')


const { argv: [, , port = process.env.PORT || 8080] } = process

const app = express()

app.use(express.static('./public')) 
app.set('view engine', 'pug') // to render pages server-side with express and the HTML templater 'pug'

const formBodyParser = bodyParser.urlencoded({ extended: false })  //we use it in the post methods

const mySession = session({  //we set up the server and make that it accepts sessions
    secret: 'my super secret', 
    cookie: { maxAge: 60 * 60 * 24 }, 
    resave: true, 
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    }) 
})

app.use(mySession)

app.get('/', (req, res) => {
    req.session.error = null

    res.render('landing.pug')
})

app.get('/register', (req, res) => {
    res.render('register.pug', { error: req.session.error }) //render the views/register.pug file ..(if there is an error, will be shown in the HTML aswell)
})

app.post('/register', formBodyParser, (req, res) => {  //normalmente los metodos post son los q redirigen a cierta ruta
    const { name, surname, username, password } = req.body //cogemos esos campos del req.body

    try {
        logic.registerUser(name, surname, username, password)
            .then(() => {
                req.session.error = null //clean error if there was one of previous sessions

                res.render('register-confirm', { name })  //render the views/register-confirm.pug file
            })
            .catch(({ message }) => {
                req.session.error = message //if the promise is rejected, take (from the req.body, as the middleware puts the income data there) and show message of the controlled error in html

                res.redirect('/register')
            })
    } catch ({ message }) {  //if there was an error that doesn't let try the promise, we show that error
        error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.render('login', { error: req.session.error })
})

app.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(id => {
                req.session.userId = id

                req.session.error = null

                res.redirect('/home')
            })
            .catch(({ message }) => {
                req.session.error = message

                res.redirect('/login')
            })
    } catch ({ message }) {
        error = message

        res.redirect('/login')
    }
})

app.get('/home', (req, res) => {
    const { userId, postitId, error } = req.session

    if (userId) {
        try {
            logic.retrieveUser(userId)
                .then(({ name, postits }) => res.render('home', { name, postits, postitId, error }))
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/')
        }
    } else res.redirect('/')
})

app.get('/logout', (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.post('/postits', formBodyParser, (req, res) => {
    const { operation } = req.body

    try {
        switch (operation) {
            case 'add':
                const { text } = req.body

                logic.addPostit(req.session.userId, text)
                    .then(() => res.redirect('/home'))
                    .catch(({ message }) => {
                        req.session.error = message

                        res.redirect('/home')
                    })

                break
            case 'remove':
                const { postitId } = req.body

                logic.removePostit(req.session.userId, Number(postitId))
                    .then(() => res.redirect('/home'))
                    .catch(({ message }) => {
                        req.session.error = message

                        res.redirect('/home')
                    })
                break
            case 'edit':
                {
                    const { postitId } = req.body

                    req.session.postitId = postitId
                }
                
                res.redirect('/home')
                break
            default:
                res.redirect('/home')
        }
    } catch ({ message }) {
        req.session.error = message

        res.redirect('/home')
    }
})

app.listen(port, () => console.log(`Server ${package.version} up and running on port ${port}`))