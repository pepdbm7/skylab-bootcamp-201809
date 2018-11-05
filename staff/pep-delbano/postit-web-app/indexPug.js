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

const formBodyParser = bodyParser.urlencoded({ extended: false })

const mySession = session({  //we set up the server and make that it accepts sessions
    secret: 'my super secret', 
    cookie: { maxAge: 60 * 60 * 24 }, 
    resave: true, 
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    }) 
})

app.use(mySession)   //SE NECESITA?? EN VERSIONES ANTERIORES SE USABA COMO PARÁMETRO EN app.get, pero AQUÍ NO! ¿?

app.get('/', (req, res) => {
    req.session.error = null

    res.render('landing.pug')
})

app.get('/register', (req, res) => {
    res.render('register.pug', { error: req.session.error }) //render the views/register.pug file ..(if there is an error, will be shown in the HTML aswell)
})

app.post('/register', formBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

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

app.get('/login', (req, res) => { //get the page of the route /login, and render the login form, with errors if there are
    res.render('login.pug', {error: req.session.error}) 
})

app.post('/login', [formBodyParser, mySession], (req, res) => {
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

app.get('/home', mySession, (req, res) => {
    const id = req.session.userId

    if (id) {
        try {
            logic.retrieveUser(id)
                .then(({ name }) => res.render('home.pug', { name }))
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/postits')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/home')
        }
    } else res.redirect('/home')
})

app.get('/logout', (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

// app.get('/users', (req, res) => {
//     res.send(buildView(`<ul>
//             ${logic._users.map(user => `<li>${user.id} ${user.name} ${user.surname}</li>`).join('')}
//         </ul>
//         <a href="/">go back</a>`))
// })

app.get('/postits', mySession, (req, res) => {   //CÓMO PASAR el MAP al PUG??
    const id = req.session.userId
    if (id) {
        const user = logic.retrieveUser(id)

        const listPostits = user.postits.map((item) => {
            return `<li>
           ${item.postit}
           <form action="/postits/${item.id}" method="POST">
            <button type="submit">x</button>
            </form>
            </li>`
        }).join('')

        res.render('postits.pug')
        res.send(buildView(`
        <p>Welcome ${user.name}!</p>
        <form action="/postits" method="POST">
        <input type="text" name="postit"></input>
        <button type="submit">Create</button>
        <a href="/logout">logout</a>
        </form>
        <ul>
            ${listPostits}
        </ul>`))
    } else res.redirect('/home')
})

app.post('/postits/:id', mySession, (req, res) => {

    const id = req.session.userId

    if(id) {
        try {
            logic.retrieveUser(id)
            .then(/*rellenar*/)
            .catch(({ message }) => {
                req.session.error = message
                res.redirect('/')
            })
        } catch ({ message }) {
            req.session.error = message
            res.redirect('/')
        }
    }


    user.postits = user.postits.filter(item => item.id !== Number(req.params.id))

    user.save()

    res.redirect('/postits')
})

app.post('/postits', [formBodyParser, mySession], (req, res) => {

    const id = req.session.userId

    const { postit } = req.body

    const user = logic.retrieveUser(id)

    user.postits.push({
        postit: postit,
        id: Date.now()
    })

    user.save()

    res.redirect('/postits')
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))