/**
 * ?
 * 
 */
Ayay = () => this.length = 0;


// TODO

Ayay.prototype.push = element => {

    if (element == undefined) throw Error('undefined is not a valid element');
    this[this.length] = element;

    this.length++;
};

Ayay.prototype.pop = () => {
    var lastItem = this[this.length-1];
    delete this[this.length-1];
    this.length--

    return lastItem;
};

Ayay.prototype.forEach = callback => {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) callback(this[i], i, this);
};

Ayay.prototype.map = callback => {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var arr = [];
    for (var i = 0; i < this.length; i++) {
         arr[i] = callback(this[i],i,this);
    }
    return arr;  
}; 

Ayay.prototype.sort = () => {
    var temp;
  
    for(var i = 0; i < this.length; i++) {
      for(var j = i + 1; j < this.length; j++) {
        if(this[i].toString() > this[j].toString()) {
          temp = this[i];
          this[i] = this[j];
          this[j] = temp;
        }
      }
    }
  
    return this;
};

Ayay.prototype.filter = callback => {

    if (typeof callback !== 'function') throw Error(callback + ' is not a function');

    var result = [];

    for(var i = 0; i < this.length; i++) {

        if(callback(this[i]) === true) {
            result.push(this[i]);
        }
    }
    return result; 

};


Ayay.prototype.find = callback => {

    if (typeof callback !== 'function') throw Error(callback + ' is not a function');
    
    for(var i=0; i < this.length; i++) {
        
        if (callback(this[i]) == true) {
            return this[i];
        }   
    }
};


Ayay.prototype.includes = elem => {

    if ( typeof elem === 'undefined') throw Error('element is not defined');

    for(var i=0; i<this.length; i++) {
        if(elem === this[i]) {
            return true
        }
    }
}