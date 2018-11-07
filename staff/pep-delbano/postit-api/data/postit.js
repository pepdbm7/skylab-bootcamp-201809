const uid = require('uuid/v4')  //package para crear un id único

class Postit {
    constructor({ id, text }) {
        this.id = id || uid()
        this.text = text
    }
}

module.exports = Postit