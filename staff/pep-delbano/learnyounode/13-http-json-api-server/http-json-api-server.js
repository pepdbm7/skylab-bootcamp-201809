/*Escribe un servidor de HTTP que sirva datos en formato JSON cuando reciba una petición GET con la ruta (endpoint) '/api/parsetime'. Asume que la petición tiene un parámetro 'iso' cuyo valor es un fecha hora en formato ISO.

Por ejemplo:

/api/parsetime?iso=2013-08-10T12:10:15.474Z

La respuesta JSON debe contener únicamente los propiedades 'hour', 'minute' y 'second' correspondientes a la fecha recibida. Ejemplo:

{
  "hour": 14,
  "minute": 23,
  "second": 15
}
Luego, agrega un segundo endpoint con ruta '/api/unixtime' que reciba los mismos parámetros que la anterior pero que devuelva la fecha en formato UNIX, por ejemplo:

{
	"unixtime": 1376136615474
}
El servidor deberá escuchar en un puerto cuyo número será el primer argumento del programa.

PISTAS
El objeto request de HTTP tiene un atributo url que deberás usar para distinguir las "routes" de cada endpoint.

Puedes parsear la URL y los parámetros usando el módulo url de Node, url.parse(request.url, true) parsea y devuelve un objeto con atributos pertinentes.

Puedes probarlo en la línea de comandos escribiendo:

$ node -pe "require('url').parse('/test?q=1', true)"
La documentación del módulo url puede verse en: {rootdir:/node_apidoc/url.html}

Para enviar la respuesta del servidor en formato JSON puedes usar el método JSON.stringify(). Asimismo convendría que en la misma le agregaras un encabezado 'Content-Type' adecuado, por ejemplo:

res.writeHead(200, { 'Content-Type': 'application/json' })
Por último ten en cuenta el objeto JavaScript Date que permite imprimir fechas en formato ISO format, por ejemplo: new Date().toISOString(). También parsea dicho formato cuando se lo pasa por parámetro al constructor Date. Revisa también el uso de Date#getTime(). */


const http = require('http')
const url = require('url')

function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime: time.getTime() }
}

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true) //
  const time = new Date(parsedUrl.query.iso)  //
  let result

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })  //
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))