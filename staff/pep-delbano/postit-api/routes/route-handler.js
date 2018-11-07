const { AlreadyExistsError, NotFoundError, ValueError } = require('../errors')

//we take the ERRORS of the catch of all promises of the routes/index.js, to save some code lines, and put the status code of the response depending of which of the 3 kind of errors it is:

function routeHandler(callback, res) {
    try {
        callback()
            .catch(err => {
                const { message } = err

                if (err instanceof AlreadyExistsError) {
                    res.status(409)
                } else if (err instanceof NotFoundError) {
                    res.status(404)
                } else {
                    res.status(500)
                }

                res.json({
                    message
                })
            })
    } catch (err) {
        const { message } = err

        if (err instanceof TypeError || err instanceof ValueError) {
            res.status(400)
        } else {
            res.status(500)
        }

        res.json({
            message
        })
    }
}

module.exports = routeHandler