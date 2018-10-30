/*Este ejercicio es similar al anterior puesto que debes usar http.get(). Sin embargo, esta vez tu programa recibirá tres URLs como argumentos.

Tu programa deberá imprimir el contenido de cada una de las URLs en consola en el mismo orden que fueron recibidos los argumentos. No deberás imprimir el largo, solo el contenido como String, pero debes respetar el orden de llegada de los argumentos.

PISTAS
Como las llamadas a las URLs son asíncronas, es probable que no recibas las respuestas en orden por lo que no puedes imprimir las respuestas a medida que llegan.

Tendrás que encolar los resultados y mantener un contador de cuántas peticiones han sido recibidas de modo que al llegar al final puedas imprimir los resultados.

En la vida real, hay varias librerías como 'async' y 'after' que facilitan la continuación de los callbacks. Para el alcance de este ejercicio no es necesario usar librerías externas. */


const http = require('http')
const bl = require('bl')
const results = []
let count = 0  //contamos las peticiones recibidas, q imprimiremos al final

function printResults () {
  for (let i = 0; i < 3; i++) {  //iteramos los resultados (q son las 3 URLs recibidas)
    console.log(results[i])
  }
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) { //la 1ª URL es el process.argv[2], así q más i=0, es la misma posición, más i=1 es la pos siguiente (process.argv[3]), y +2
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err)
      }

      results[index] = data.toString()  //pasamos el data a la var global results, en orden
      count++

      if (count === 3) { //cuando hayamos recibido 3, y la cuenta llegue a 3, imprimir el data recibido, en el mismo orden en q han sido recibidos
        printResults()
      }
    }))
  })  //fin callback (2º param del http.get())
}

for (let i = 0; i < 3; i++) {  
  httpGet(i)  //le pasamos con este for, el parámetro 0, 1 y 2 a la función
}