# Problem Solving
## Array.

### 1. Find all duplicate numbers in an 
```js 
let arr = [1,2,4,1,4,6,6,6,3,9] // return all duplicate
output: [ 1, 4, 6 ]
```
<details>
  <summary>Solution</summary>

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
</details>

### 2. Reverse Array of String 
```js
let arr = ['OneCompiler','Javascript']
// [ 'RelipmoCeno', 'Tpircsavaj' ]
```
<details>
  <summary>Solution</summary>

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
<details>


### Array of Objects
8. Merge two arrays on base of id
```js    
let arr1 = [{ id:1, name:'a' }, { id:2, name:'b' }, { id:3, name:'c' }];
let arr2 = [{ id:1, name:'d' }, { id:5, name:'e' }];

Output:
[
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 5, name: 'e' }
]
```

<details>
  <summary>Solution</summary>

```js
let arr1 = [{ id:1, name:'a' }, { id:2, name:'b' }, { id:3, name:'c' }];
let arr2 = [{ id:1, name:'d' }, { id:5, name:'e' }];
```

```js
function getUniqueId(arr1, arr2){
  
  let combinedArr = [...arr1, ...arr2];
  
  let imap = new Map();
  
  combinedArr.map((elem) => {
    
    if(!imap.has(elem.id)){
      imap.set(elem.id, elem);
    }
  })
  
  let arr = Array.from(imap.values());
  return arr;
}

let result = getUniqueId(arr1, arr2)

console.log(result);
```

<details>