/*Crea un programa que dado un directorio imprima una lista de archivos filtrados por la extensión. El primer argumento será la ruta al directorio (ej: '/path/dir/') y el segundo la extensión a filtrar, por ejemplo si recibes 'txt' deberás filtrar todos los archivos que terminen en .txt.

Nota: el segundo argumento no incluye el punto '.'.

La lista de archivos a imprimir en consola debe hacerse un archivo por línea y debes utilizar Async I/O.

PISTAS
La función fs.readdir() recibe como parámetros: una ruta(path) y un callback. La firma del callback es:

function callback (error, lista) { ... }
La lista es un arreglo de nombres de archivos de tipo String.

La documentación del módulo fs puede verse en: {rootdir:/node_apidoc/fs.html}

Además, el módulo path puede resultar útil, especialmente la función extname.

La documentación del módulo path puede verse en: {rootdir:/node_apidoc/path.html} */



const fs = require('fs')
const path = require('path')

const [, , dir, ext] = process.argv  //le pasamos como argumento path donde están los archivos, y la extensión q queremos filtrar

fs.readdir(dir, (err, files) => { //pasamos el path, y una callback con error (para lanzarlo si lo hay), y con los archivos a los q aplicaremos el filtro (el foreach de abajo)
if (err) throw err
files.forEach(file => {
    if (path.extname(file) === `.${ext}`) console.log(file)  //solo imprimir los files con la extensión q le pasemos
})

})