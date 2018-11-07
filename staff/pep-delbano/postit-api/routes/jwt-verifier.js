const { env: { JWT_SECRET } } = process

const jwt = require('jsonwebtoken')

function jwtVerifier(req, res, next) { //to verify it the token is correct, we need the token itself, and the secret to decode it
    try {
        const { token } = req

        const { sub } = jwt.verify(token, JWT_SECRET)  //we extract the subject part of the token, which is, in this case, the userId we created in the registration

        req.sub = sub

        next()
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
}

module.exports = jwtVerifier