console.log('13) Executing filter demo');

var words = ['spray', 'limit', 'elite', 'exuberant', 'construction', 'present'];


var res = filter(words, function(word) { return word.length > 6; });

console.log(res);
// ["exuberant", "destruction", "present"]