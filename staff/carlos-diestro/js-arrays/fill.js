function fill(array, substitute, start, end) {
  if(!(array instanceof Array)) throw Error(array + ' is not valid');

  var newArray = [],
  start = start || 0,
  end = end || array.length;

  duplicate();

  for(var i = start; i < end; i++) {
    newArray[i] = substitute;
  }

  function duplicate() {
    for(var i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
  }

  return newArray;
}