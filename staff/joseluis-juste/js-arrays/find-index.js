function findIndex(arr, callback){

    if (!(arr instanceof Array)) throw Error("entered invalid array");

    if ((arr.length == 0)) throw Error("entered empty array");

    for(var i = 0; i < arr.length;i++){

        if (callback(arr[i],i,arr)) return i;
    }
    return -1;
}