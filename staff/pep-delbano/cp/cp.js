//this exercise is to make a program that copies recursively a folder and paste it to another destination, as the command 'cp -R origin destination' does:


var path = require('path')
var fs = require('fs')

const {argv: [ , ,recu, from, to]} = process

if (recu === '-R') {
    function(from, to) {
        
        if(fs.lstatSync(from).isDirectory()){ //si from es un folder, creamos otro en el destino, e iteramos todo lo q haya dentro (file) con el forEach, aplicando la función por cada file, con el path de origin y el path de destino de cada file como argumentos de la funcion!

            fs.mkdirSync(to)

            fs.readdirSync(from).forEach((file) => {
            recursive(path.join(from, file), path.join(to, file))//path.join(‘/foo’,‘bar’,‘baz/asdf’); Output: ‘/foo/bar/baz/asdf’
            })
        } else fs.createReadStream(from).pipe(fs.createWriteStream(to)) //si no es '-R', solo creamos un chorro de datos desde el origen y pipeamos hasta el destino (creando el archivo de destino, sobreescribiéndolo , con el mismo contenido del de origen si hubiera uno ya con ese nombre)
    }

    recursive(from, to) //se autollama (es una funcion recursiva)

}else fs.createReadStream(recu).pipe(fs.createWriteStream(from)) //si no es -R, sinó 'cp' solo, entonces solo copiamos (readstream) el file q indiquemos con su path como arg en 3ª posicion