/*Escribe un programa que realice una petición HTTP GET a una URL provista como primer argumento del programa. Almacena todos los datos recibidos del servidor, es decir no sólo el primer evento "data", y luego escribe a consola dos líneas:

En la primera escribe la cantidad de caracteres recibidos.
En la segunda escribe la totalidad de caracteres recibidos (todo el string).
PISTAS
Hay por lo menos dos formas de resolver este problema:

1) Almacenar los datos de todos los eventos "data" para luego agregarlos los resultados antes de imprimirlos por consola. Puedes usar el evento "end" para saber cuando terminas de recibir datos.

2) Usa un paquete de terceros para evitar los problemas de almacenar el stream completo de datos. Por ejemplo, tienes a disposición: bl (Buffer List) o concat-stream.

https://npmjs.com/bl https://npmjs.com/concat-stream

Para instalar alguno de estos paquetes usa Node Package Manager npm de la siguiente forma:

$ npm install bl
Npm descargará el paquete e instalará la última versión disponible en la carpeta node_modules. Todos los paquetes instalados ahí pueden cargarse desde tu programa usando require sin prefijo. Ejemplo:

var bl = require('bl')
Node busca primero en su núcleo de módulos y si no lo encuentra busca en node_modules.

En caso de no tener conexión a Internet, simplemente crea una carpeta node_modules y copia el paquete desde el directorio de instalación de {appname}, es decir:

{rootdir:/node_modules/bl} {rootdir:/node_modules/concat-stream}

Ambos paquetes pueden usar un stream piped para capturar los datos. Una vez que se acaba el stream se dispara un callback con todos los datos:

response.pipe(bl(function (err, data) { .... }))
// or
response.pipe(concatStream(function (data) { .... }))
Recuerda hacer data.toString() para convertir al Buffer de Node a String.

Puedes leer la documentación de ambos módulos en la carpeta de instalación de {appname} en:

{rootdir:/docs/bl.html} {rootdir:/docs/concat-stream.html} */

const http = require('http') //importar el modulo http (q sería un cliente, q hará una petición al servidor)
const bl = require('bl')  //Buffer List, un paquete q evita los problemas de almacenar el stream completo de datos

http.get(process.argv[2], function (response) {   //1º param: URL, y 2º: resupesta del server
  response.pipe(bl(function (err, data) {  //la callback tiene el arg response (la respuesta del server), y aplicamos el método pipe, q lo canaliza donde digamos // (este data es un Buffer, q va codificado en bytes, y lo tendremos q pasar a string luego)
    if (err) {
      return console.error(err)  //si hubiera error, lo controlamos y lo lanzamos
    }
    data = data.toString() /*lo pasamos a string para imprimirlo, pero hay otra forma: pasandolo como template string, q lleva un toString implícito: 
    console.log(`${data.length}\n${data}`) 
    
    aquí, con el bl no se puede usar el setEncoding*/

    console.log(data.length) //cantidad de caracteres recibidos del server
    console.log(data) //el string en sí recibido del server
  }))
})

//todo lo q está dentro de un http.get() se queda encolado (non-blocking), pq es asíncrono!
//este método tiene otros métodos como 'data' q coge todos los datos q nos devuelve el server, y 'end' para hacer algo cuando hayamos acabado de recibir datos del server

//los Stream son los chunks (un torrente de datos, un cacho)

//el buffer list obtiene todos los datos del server a través del pipe, y los guarda en forma de objeto