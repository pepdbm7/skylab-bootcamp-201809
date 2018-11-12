console.log('TEST includes');

var tests = [];

// 1

tests.push(function () {
    console.log('should succeed on determines if the array includes a certain element, returning true or false as appropriate');

    var arr = ['ant', 'bison', 'camel', 'duck', 'bison', 'cat', 'dog', 'bat'];

    var res = Boolean, 
        res2 = Boolean;

    var elem = 'bat';

    function includes(arr, elem) {
        arr.forEach(function(item){
            if(elem === item){
                res = true;
            }
        })
    }

    res2 = arr.includes(elem);

    //console.log(res2);
    

    if(!res2 && !res) throw Error('results are not equals');

});


// 2

tests.push(function () {
    console.log('should fail on non-item');

    var arr = ['ant', 'bison', 'camel', 'duck', 'bison', 'cat', 'dog', 'bat'];

    elem = undefined;

    var error;

    try {
        includes(arr,elem);
    } catch (err) {
        error = err;
    } 
    

    if (!error) throw Error('should have thrown error on elem is not defined');

    if (error.message !== 'element is not defined') throw Error ('error message is not correct');
});

// 3

tests.push(function () {
    console.log('should fail element is a function');

    var arr = ['ant', 'bison', 'camel', 'duck', 'bison', 'cat', 'dog', 'bat'];

    var elem = function (a,b) {
        return a+b;
    }

    var error;

    try {
        includes(arr, elem);
    } catch (err) {
        error = err;     
    } 
    

    if (!error) throw Error('should have thrown error on element is a function, must be a string or number or object or boolean');

    if (error.message !== 'element is a function, must be a string or number or object or boolean') throw Error ('error message is not correct');
});

// 4

tests.push(function () {
    console.log('should fail on element is empty');

    var arr = ['ant', 'bison', 'camel', 'duck', 'bison', 'cat', 'dog', 'bat'];

    var elem = '  ';

    var error;

    try {
        includes(arr, elem);
    } catch (err) {
        error = err;     
    } 
    

    if (!error) throw Error('should have thrown error on element is blank');

    if (error.message !== 'element is blank') throw Error ('error message is not correct');
});

// 5

tests.push(function () {
    console.log('should fail on array is empty');

    var arr = [];

    var elem = 'bat';

    var error;

    try {
        includes(arr, elem);
    } catch (err) {
        error = err;     
    } 
    

    if (!error) throw Error('has not failed');

    if (error.message !== 'array is empty') throw Error ('error message is not correct');
});
 
testSuite(tests);