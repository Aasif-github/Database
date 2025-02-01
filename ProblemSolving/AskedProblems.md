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
## Find all duplicate numbers in an array

```js 
let arr = [1,2,4,1,4,6,6,6,3,9] // return all duplicate

function getDuplicateElem(arr){
    let result = []
    let imap = new Map();
    
    //mark repeat elem by 1
    for(let i=0; i < arr.length; i++){
        
        if(imap.has(arr[i])){
          imap.set(arr[i], imap.get(arr[i]) || 1)
        }else{
          imap.set(arr[i], 0)
        }
    }
    
    //Map(6) { 1 => 1, 2 => 0, 4 => 1, 6 => 1, 3 => 0, 9 => 0 }
    for(let [key, value] of imap){
      if(value > 0){
        result.push(key);
      }
    }
    
    return result;
}

let result = getDuplicateElem(arr)
console.log(result) // [ 1, 4, 6 ]
```


## Sort Elements of an Array By Length

```js
let home = ['table', 'chair', 'bed', 'fridge', 'ac'];

function sortByLength(home){
  
  let storeroomMap = new Map();
  
  for(let household of home){
    
    if(!storeroomMap.has(household)){
      
      storeroomMap.set(household, household.length);
    }    
  }

  // Convert Map to Array
  let arr = Array.from(storeroomMap);
  
  //bubble sort
  for(let i=0; i<arr.length; i++){
    
    for(let j=0; j<arr.length-1-i; j++){
      
      
      if(arr[j][1] > arr[j+1][1]){
        //swap
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }      
    }    
  }
    
  //convert it to into array
  let newArr = arr.map((keys)=> keys[0])
  
  return newArr;
  
  // return home.sort((a,b)=> return a.length - b.length) // with sort() method  
}

let result = sortByLength(home);
console.log(result); 
```
output: 

```lua
[ 'ac', 'bed', 'table', 'chair', 'fridge' ]
```