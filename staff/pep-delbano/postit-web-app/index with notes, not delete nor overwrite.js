//VERSION before making it Async and before using Pug (HTML templater)

require('dotenv').config()
const express = require('express')
const session = require('express-session')   //to define session settings for our Express server
// const FileStore = require('session-file-store')(session)
const sessionFileStore = require('session-file-store')
const FileStore = sessionFileStore(session)
const bodyParser = require('body-parser') //an Express middleware to handle HTTP POST request to get and use data through a callback, to make promises i.e.
const buildView = require('./helpers/build-view')
const logic = require('./logic')

const { argv: [, , port = process.env.PORT || 8080] } = process  //to set up the port where we'll run the website (runing PORT=4444 node index.js, i.e.) and by default 8080

const app = express() //the express() fn is a top-level function exported by the express module

app.use(express.static('./public'))  //middleware express function to use CSS, JS, img, etc from /public folder

let error = null

const formBodyParser = bodyParser.urlencoded({ extended: false })

const mySession = session({  //fn to configurate our Express server and make that it accepts sessions
    secret: 'my super secret',
    cookie: { maxAge: 60 * 60 * 24 }, //session expires in 1 day
    resave: true,  //it makes that for every request to the server, the data of the session will be stored in the database, having new changes or not..
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    }) //now we'll have available the variable req.session, and also a unique id for the session of a user that we can access through the variable req.sessionID.
})

app.get('/', (req, res) => {
    error = null
    //we render the html of the page from the server-side, using the method buildView (we created it as a helper):
    res.send(buildView(`<a href="/login">Login</a> or <a href="/register">Register</a>`))
})

app.get('/register', (req, res) => {
    res.send(buildView(`<form action="/register" method="POST">
            <input type="text" name="name" placeholder="Name">
            <input type="text" name="surname" placeholder="Surname">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Register</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <a href="/">go back</a>`))
})

app.post('/register', formBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        logic.registerUser(name, surname, username, password)

        error = null

        res.send(buildView(`<p>Ok! user ${name} registered.</p>
                <a href="/">go back</a>`))
    } catch ({ message }) {
        error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.send(buildView(`<form action="/login" method="POST">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Login</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <a href="/">go back</a>`))
})

app.post('/login', [formBodyParser, mySession], (req, res) => {
    const { username, password } = req.body

    try {
        const id = logic.authenticateUser(username, password)

        req.session.userId = id

        error = null

        res.redirect('/home')
    } catch ({ message }) {
        error = message

        res.redirect('/login')
    }
})

app.get('/home', mySession, (req, res) => {
    const id = req.session.userId

    if (id) {
        const user = logic.retrieveUser(id)

        res.send(buildView(`<p>Welcome ${user.name}!</p>
                        <a href="/logout">logout</a>`))
    } else res.redirect('/')
})

app.get('/logout', mySession, (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.get('/users', (req, res) => {
    res.send(buildView(`<ul>
            ${logic._users.map(user => `<li>${user.id} ${user.name} ${user.surname}</li>`).join('')}
        </ul>
        <a href="/">go back</a>`))
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))