## Reverse Array of String 
```js
let arr = ['OneCompiler','Javascript']
// [ 'RelipmoCeno', 'Tpircsavaj' ]
function reverse(arr){
  let result = [];
  
  
  for(let i=0; i<arr.length; i++){
    
    let len = arr[i].split('').length;
     
    let rev='';  
    let temp = arr[i]
     
    for(let j=len-1; j >= 0; j--){
        
      rev += temp[j];
    }
    // capitalize first char & Make rest in lowercase
    rev = rev.charAt(0).toUpperCase() + rev.slice(1).toLowerCase();   
    result.push(rev);
  }
  
  return result;
}

const result = reverse(arr)
console.log(result)
```
