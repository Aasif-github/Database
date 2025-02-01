1.  **Reverse Array of String**
```js
let arr = ['OneCompiler','Javascript']
// [ 'RelipmoCeno', 'Tpircsavaj' ]
```

2. **Find all duplicate numbers in an array**
```js
   let arr = [1,2,4,1,4,6,6,6,3,9] // return all duplicate
```
3. **Bubble Sort**

4. **Binary Search**
```js
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid; // Target found at index mid
        } else if (arr[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }

    return -1; // Target not found
}

// Example usage:
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
const target = 7;
const result = binarySearch(sortedArray, target);

if (result !== -1) {
    console.log(`Element found at index: ${result}`);
} else {
    console.log("Element not found");
}
```
5. **Find Second Most Repeated Element in String**   
```js
let str = "ahksadhkjdhsajhaksd"; 
// [ 'k', 's', 'd' ]
```
[Solution](https://github.com/aasif-iqbal/Javascript-In-Depth/blob/master/Problem-Solving/ProblemQuestions.md)

6. **Sort each fruit by length**
```js
Const str = ['apple', 'banana', 'kiwi', 'jackfruit', 'mango'];

// output: [ 'kiwi', 'apple', 'mango', 'banana', 'jackfruit' ]
// {
//   kiwi: 4,
//   apple: 5,
//   mango: 5,
//   banana: 6,
//   jackfruit: 9
// }
```

7. **Make the array empty**
```js
let arr = [4, 3, 2, 7, 8, 2, 3, 1];
arr.length = 0;
console.log(arr); // Output: []
```

8. Merge two arrays on base of id
```js    
let arr1 = [{ id:1, name:'a' }, { id:2, name:'b' }, { id:3, name:'c' }];
let arr2 = [{ id:1, name:'d' }, { id:5, name:'e' }];

// output = [{ id:1, name:'a' }, { id:2, name:'b' }, { id:3, name:'c' }, { id:5, name:'e' }]
```

9. Filter User based on their age(age > 40)
```js
const User = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 35 },
    { name: 'Alice', age: 40 },
    { name: 'Charlie', age: 45 },
    { name: 'David', age: 50 },]
```

10. **Find the second largest number in an array**
```js
let arr = [1,2,4,1,4,6,6,6,3,9] // return 6
```

11. **Move zeros to the end of an array**
```js   
let arr = [1,0,3,0, 4,0,4,6,1,4,0] 
// [1,3,4,4,6,1,4,0,0,0,0];
```   
  
12. Generate index of an Object
```js
let arr = [2,3,2,1,2,4,5,6,7];

let obj = {}

arr.forEach((elem,index, arr)=>{
  obj[`item_`+index] = elem;
})
console.log(obj)
```
Output:
```js
{
  item_0: 2,
  item_1: 3,
  item_2: 2,
  item_3: 1,
  item_4: 2,
  item_5: 4,
  item_6: 5,
  item_7: 6,
  item_8: 7
}
```

