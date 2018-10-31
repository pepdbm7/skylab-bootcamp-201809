//in this exercise we have to make a program that as the console command line 'cp' copies from inside a file and paste it into another file:


const fs = require('fs')

const [, , orig, dest] = process.argv  //destructuring para coger argumentos 3 y 4, q serán origen dl file a copiar y destino dl file al q pegarle lo copiado del otro archivo

printMem()  //this is just to check the memory used before the process of copying, and after (see below)

const rs = fs.createReadStream(orig)   //we use method to read from the origin file we defined as the 3rd parameter

const ws = fs.createWriteStream(dest)  //we use method to write into the file we defined as the 4th parameter

rs.pipe(ws)  //by just pipeing both sides of the connection, we don't need to use memory for the process, which makes this a very efficient way

rs.on('end', () => printMem())

function printMem() {
    console.log(process.memoryUsage().rss / 1024 / 1024)  
}



//Another version, not so efficient bc it uses more Memory:

const fs = require('fs')

const [, , orig, dest] = process.argv

printMem()

fs.readFile(orig, (err, content) => {
    if (err) throw err

    printMem()

    fs.writeFile(dest, content, err => {
        if (err) throw err
    })
})

function printMem() {
    console.log(process.memoryUsage().rss / 1024 / 1024)
}