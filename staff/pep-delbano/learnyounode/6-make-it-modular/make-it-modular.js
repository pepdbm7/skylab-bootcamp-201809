const filterFn = require('./filter-files-by-extension.js')
const dir = process.argv[2]  //le pasamos como primer parametro (en realidad 3º) el path a la carpeta contenedora de los files q queremos filtrar
const filterStr = process.argv[3] //le pasamos la extensión para filtrar los q la tengan

filterFn(dir, filterStr, function (err, list) {  //como 3º parámetro pasamos la callback, q está definida en el otro archivo, q sería la lógica
  if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach(function (file) {
    console.log(file)
  })
})