// ayay.test.js

(function() {
    console.log('TEST Ayay.prototype.push');
    
    var tests = [];
    
    tests.push(function() {
        console.log('should push values in ayay');

        var ayay = new Ayay();

        ayay.push(1);
        ayay.push(2);
        ayay.push(3);

        if (ayay.length !== 3) throw Error('ayay length does not match expected one: ' + ayay.length);

        for (var i = 0; i < ayay.length; i++) 
            if (ayay[i] !== i + 1) throw Error('item does not match expected at position: ' + i);
    });

    // TODO add more test cases
    
    testSuite(tests);
})();

(function() {
    console.log('TEST Ayay.prototype.forEach');
    
    var tests = [];
    
    tests.push(function() {
        console.log('should iterate on valid ayay');

        var ayay = new Ayay();

        ayay.push(1);
        ayay.push(2);
        ayay.push(3);

        var result = [];

        ayay.forEach(function(elem, index) { result[index] = elem * 2; });

        if (result.length !== ayay.length) throw Error('result length does not match expected one: ' + result.length);

        result.forEach(function(elem, index) {
            if (elem !== ayay[index] * 2) throw Error('item does not match expected one, at position: ' + index);
        });
    });
    
    testSuite(tests);
})();

(function() {
    console.log('TEST Ayay.prototype.map');
    
    var tests = [];
    
    tests.push(function() {
        // TODO
    });
    
    testSuite(tests);
})();



(function() {
    console.log('TEST Ayay.prototype.pop');
    
    var tests = [];
    
    tests.push(function() {
       console.log("Should return as a result last item");

        var ayay = new Ayay();
        var res;

        ayay.push(1);
        ayay.push(2);
        ayay.push(3);

        res=ayay.pop();

        if(res !== 3) throw Error("Item popped does not match expected result");


    });


    tests.push(function() {
        console.log("Should sucessfully permanently remove last item from ayay");
 
         var ayay = new Ayay();
         var res = [1,2];
 
         ayay.push(1);
         ayay.push(2);
         ayay.push(3);


 
         ayay.pop();
 
         if(ayay.length !== 2) throw Error("ayay length not as expected");

         for (var i = 0; i < ayay.length; i++) 
            if (ayay[i] !== res[i] ) throw Error('item does not match expected at position: ' + i);


 
 
     });




    
    
    testSuite(tests);
})();

