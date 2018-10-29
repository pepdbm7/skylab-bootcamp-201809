/*Escribe un programa que reciba uno o más números como argumentos de la consola e imprima la suma de dichos números a consola(stdout).

PISTAS
Puedes acceder a los argumentos de la línea de comandos usando el objeto global process, el cual tiene una propiedad argv que es un array con toda la información del comando. Ej: process.argv.

Para comenzar puedes escribir un programa que contenga:

console.log(process.argv)
Luego, para ejecutarlo desde la consola usa node program.js y algunos números como arguments. Ej.:

$ node program.js 1 2 3
La salida estándar a consola será algo parecido a:

[ 'node', '/path/to/your/program.js', '1', '2', '3' ]
Para resolver este ejercicio debes iterar en la lista de argumentos de modo que sólo escribas la suma. El primer elemento de la lista siempre es 'node', el segundo es la ruta al program.js; por ende, debes comenzar a iterar en el tercer elemento (índice 2 de la lista) sumando cada elemento sucesivo hasta el final.

Ten en cuenta que todos los elementos de process.argv son cadenas de caracteres ('strings') por lo que debes convertirlas a números, por ejemplo: agregando el prefijo + o llamando a Number(). Ej: +process.argv[2] ó Number(process.argv[2]).

Cuando ejecutes {appname} verify program.js no tienes que pasarle argumentos pues {appname} se encarga de hacerlo. Para probar tu programa sin verificarlo puedes ejecutar {appname} run program.js, éste ejecutará en el mismo ambiente de prueba que {appname} crea para cada ejercicio. */



// write on console: 'node baby-steps.js 1 2 3'  to use the next function with these numbers as arguments


const arg = process.argv.slice(2) //nos quedamos solo del 2 arg en adelante (q son los valores q hemos añadido)

const res = arg.reduce((accum, val) => accum + Number(val), 0); 

console.log(res)


//otra forma:
// let sum = 0;

// for(var i=2; i<process.argv.length; i++) {
//     sum += Number(process.argv[i]);
// }
// console.log(sum);