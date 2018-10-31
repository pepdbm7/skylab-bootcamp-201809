module.exports = function forEach(nums, callback){

    let cp = Array.from(nums)
 
    if (cp.length === 0) return
    const n = cp.shift()
    if(callback){
        callback(n)
        forEach(cp, callback)
    }
    else{
        console.log(n)
        forEach(cp)
    }
 }
