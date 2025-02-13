# TWO SUM

```js
// two sum

// arry = [2,4,5,6,7,8,1,3] target = 9 , return index

arry = [2,4,5,6,0,8,1,3];
target = 9

function twoSum(arry, target){
  
  let result = [];
  
  for (let i = 0; i < arry.length; i++) {
    
    for(let j=0; j < arry.length; j++){
      
      if(arry[i] + arry[j] == target){
        console.log(arry[i])
        console.log(arry[j])
        
        result.push(i)
        result.push(j)
        return result;  
      }
    }
  }
  return null;
}

# Using Map
// let value = twoSum(arry, target);
// console.log(value);
// arry = [2,4,5,6,0,8,1,3];
// target = 9

function twoSumHash(arr, target) {
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    let compliment = target - arr[i];
    
    if (map.has(compliment)) {
      return [map.get(compliment), i]; // Return indices of the two numbers
    }
    
    map.set(arr[i], i); // Store the current number and its index in the map
  }

  return null; // Return null if no such pair is found
}

let hash = twoSumHash(arry, target);
console.log(hash);

```

# Fibonacci series
Here’s a simple implementation of generating a Fibonacci series in JavaScript:

### Iterative Approach
```javascript
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const fibSeries = [0, 1];
  
  for (let i = 2; i < n; i++) {
    fibSeries.push(fibSeries[i - 1] + fibSeries[i - 2]);
  }
  
  return fibSeries;
}

// Example usage:
const n = 10; // Number of terms
console.log(generateFibonacci(n));
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

### Recursive Approach
```javascript
function generateFibonacciRecursive(n, series = [0, 1]) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (series.length >= n) return series.slice(0, n);

  series.push(series[series.length - 1] + series[series.length - 2]);
  return generateFibonacciRecursive(n, series);
}

// Example usage:
const n = 10; // Number of terms
console.log(generateFibonacciRecursive(n));
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

### Explanation
1. **Iterative Approach**:
   - Start with the base cases `[0, 1]` in the series.
   - Iteratively calculate each term by summing up the last two terms.

2. **Recursive Approach**:
   - Use recursion to append the sum of the last two terms until the desired number of terms is reached.

Both approaches handle edge cases (e.g., `n <= 0`) gracefully and generate the correct Fibonacci series. Let me know if you'd like additional variations or optimizations!

# Find All Duplicates in an Array
```js
function findDuplicates(nums) {
    const count = {};
    const result = [];

    for (const num of nums) {
        count[num] = (count[num] || 0) + 1;
    }

    for (const [num, freq] of Object.entries(count)) {
        if (freq > 1) {
            result.push(Number(num));
        }
    }

    return result;
}

const nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDuplicates(nums)); 
// Output: [2, 3]
```


# Sorting

```js
function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap the elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no swaps were made, the array is already sorted
        if (!swapped) break;
    }
    
    return arr;
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 0, 0];
console.log("Sorted Array:", bubbleSort(numbers));
```
# Make the array empty

```js
let arr = [4, 3, 2, 7, 8, 2, 3, 1];
arr.length = 0;
console.log(arr); // Output: []
```

# Reverse the array of strings 
- 1. Reverse each word 
- 2. UperCase the first letter of each word
- 3. UpperCase the last letter of each word

```js 
function reverseAndCapitalize(arr) {
    return arr.map(str => {
        let reversed = "";
        for (let i = str.length - 1; i >= 0; i--) {
            reversed += str[i];
        }
        return reversed.charAt(0).toUpperCase() + reversed.slice(1);
    });
}

let arr = ["aasif", "iqbal"];
let result = reverseAndCapitalize(arr);

console.log(result);
```
output

```js   
['Fisaa', 'Labqi']
```
```js
function reverseAndCapitalize(arr) {
    return arr.map(str => {
        let updatedStr="";
        let reversed = "";
         
        updatedStr = str.charAt(0).toUpperCase() + str.slice(1);
        
        for (let i = str.length - 1; i >= 0; i--) {
            reversed += i == 0 ? str[i].toUpperCase() : str[i];
        }
        return reversed;
    });
    
}

let arr = ["aasif", "iqbal"];
let result = reverseAndCapitalize(arr);

console.log(result);

// [ 'fisaA', 'labqI' ]
```

# Swapping
```js
let arr = [1, 2];

// Swapping using a for loop and a temporary variable
for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
}

console.log(arr);
// Output: [2, 1]
```

# Bubble Sort
```javascript
function bubbleSort(arr) {
  let n = arr.length;

  // Outer loop for passes
  for (let i = 0; i < n - 1; i++) {
    // Inner loop for comparisons
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements using a temporary variable
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

// Example usage:
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // Output: [11, 12, 22, 25, 34, 64, 90]
```

### Explanation:
1. **Outer Loop:** Runs for `n - 1` iterations (where `n` is the length of the array).
2. **Inner Loop:** Compares each element with the next up to the unsorted portion (`n - i - 1`).
3. **Swapping:** Uses a temporary variable (`temp`) to swap elements.

This method is slightly more traditional and avoids modern syntax like destructuring, making it easier to understand for beginners.

# Binary Search
```js
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search the right half
        } else {
            right = mid - 1; // Search the left half
        }
    }
    return -1; // Target not found
}

// Example usage
let sortedArray = [2, 3, 4, 10, 40];
let target = 10;

let result = binarySearch(sortedArray, target);
if (result !== -1) {
    console.log(`Element found at index: ${result}`);
} else {
    console.log("Element not found");
}
// Output: Element found at index: 3
```
# Sort each fruit by length

```js
const str = ['apple', 'banana', 'kiwi', 'jackfruit', 'mango'];

function countWord(str){
  
  let imap = new Map();
  
  str.map((value)=>{
    imap.set(value, value.split('').length)  
  })
  
  let sortArr = [...imap];
  return sortArr.sort((a,b)=> a[0].length - b[0].length );
}

let output = (countWord(str))
console.log(output)
```
```js
[
  [ 'kiwi', 4 ],
  [ 'apple', 5 ],
  [ 'mango', 5 ],
  [ 'banana', 6 ],
  [ 'jackfruit', 9 ]
]

//convert array to object

Object.fromEntries(output)
{
  kiwi: 4,
  apple: 5,
  mango: 5,
  banana: 6,
  jackfruit: 9
}
```

# Only duplicates element
```lua
let arr = [22, 33, 33, 22, 2, 8]; should be output = [ 22, 22, 33, 33 ]
```
```js
let arr = [22, 33, 33, 22, 2, 8]; should be output = [ 22, 22, 33, 33 ]
let countMap = new Map();
let result = [];
let seen = new Set();

// Count occurrences using Map
for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    countMap.set(num, (countMap.get(num) || 0) + 1);
}

// Populate the result array with numbers that appear more than once
for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    
    // Only add the number to the result if it appears more than once
    // and if it hasn't been added to the result yet (to maintain first occurrence order)
    //console.log(countMap.get(22))
    // let arr = [22, 33, 33, 22, 2, 8];
    console.log('seen',!seen.has(num))
    if (countMap.get(num) > 1 && !seen.has(num)) {
        console.log('IN',!seen.has(num))
        for (let j = 0; j < countMap.get(num); j++) {
            result.push(num);
        }
        // console.log(seen)
        seen.add(num); // Mark the number as seen
    }
}

console.log(result); // Output: [22, 22, 2, 2, 11, 11, 11]
```


# Create custom map function (high order function)

To create a custom implementation of the `map()` function in JavaScript, you can define a function that takes an array and a callback as arguments. It should apply the callback to each element of the array and return a new array with the transformed values.

Here’s how you can implement it:

```javascript
// Custom map function
function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array)); // Pass element, index, and array
  }
  return result;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = customMap(numbers, (num) => num * num);

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```

### **Explanation**
1. **Parameters**:
   - `array`: The input array.
   - `callback`: A function that will be executed for each element in the array. It receives three arguments:
     - The current element (`array[i]`).
     - The current index (`i`).
     - The original array (`array`).

2. **Process**:
   - Create an empty array `result` to store the transformed elements.
   - Loop through each element of the input array.
   - Call the `callback` function with the element, index, and original array as arguments.
   - Push the result of the callback into the `result` array.

3. **Return**:
   - Return the new array (`result`) after all elements are processed.

### **Benefits of Custom Map**
- Mimics the behavior of the native `Array.prototype.map` method.
- Provides insight into how higher-order functions work internally.

### Mimics the behavior of the native Array.prototype.map

To mimic the behavior of the native `Array.prototype.map()` more accurately, we need to ensure our custom implementation:

1. Supports **array-like objects**.
2. Validates inputs (throws an error if the callback is not a function).
3. Uses the same `this` context as the native `map()` when applicable.

Here’s an improved version:

### **Custom `map` Implementation**
```javascript
// Custom implementation of Array.prototype.map
function customMap(callback, thisArg) {
  // Ensure 'this' is an array-like object
  if (this == null) {
    throw new TypeError("Cannot read properties of null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // Convert 'this' to an object (for array-like objects)
  const array = Object(this);
  const length = array.length >>> 0; // Ensure length is a non-negative integer
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    if (i in array) {
      // Call the callback with the provided thisArg and appropriate arguments
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }

  return result;
}

// Attach to Array.prototype (optional)
Array.prototype.customMap = customMap;

// Example Usage
const numbers = [1, 2, 3, 4];
const squares = numbers.customMap(function (num) {
  return num * num;
});

console.log(squares); // Output: [1, 4, 9, 16]

// With `thisArg`
const multiplier = { factor: 2 };
const doubled = numbers.customMap(function (num) {
  return num * this.factor;
}, multiplier);

console.log(doubled); // Output: [2, 4, 6, 8]
```

---

### **Explanation**
1. **Input Validation**:
   - Throws an error if `callback` is not a function.
   - Throws an error if `this` is `null` or `undefined` (to mimic `map`'s behavior).

2. **Handling `thisArg`**:
   - The `callback.call(thisArg, ...)` ensures the `callback` is executed with the specified `this` context.

3. **Support for Sparse Arrays**:
   - The `if (i in array)` check ensures that only elements with defined indices in sparse arrays are processed.

4. **Array-Like Objects**:
   - By using `Object(this)` and `length >>> 0`, the function supports objects with a `length` property.

5. **Result Initialization**:
   - `new Array(length)` pre-allocates the result array to the same length as the input.

---

### **Comparison with Native `map()`**
The custom implementation works almost identically to the native `Array.prototype.map()`. It handles:
- Sparse arrays.
- `thisArg` for context binding.
- Array-like objects, e.g., `{ 0: 'a', 1: 'b', length: 2 }`.

This makes it a robust replacement for the native `map()` function.

Let me know if you'd like further details!

# Find Common Items in Two Arrays
```js
let ar1 = ['a','b','c','x'];
let ar2 = ['z','x','y'];

function containsCommenItem(ar1, ar2){

    for(let i=0; i<ar1.length; i++){
        for(let j=0; j<ar2.length; j++){
            if(ar1[i] === ar2[j]){
                console.log("Found at:"+ j +"pos");
                return true;
            }
        }
    }
    return false;
}
//containsCommenItem(ar1, ar2); //time complexity-O(n^2)[bad], space compx-O(1)[good]

function containsCommenItem2(ar1, ar2){
    //step1:loop through first array and create object where properties === items in an array.

    let map = {}  //create obj
    for(let i=0; i<ar1.length; i++){
        if(!map[ar1[i]]){
            const item = ar1[i];
            map[item] = true;
        }
    }
    //console.log(map);
    //step2:loop through second array and check if item in second array exists on created object.
    for(let j=0; j<ar2.length; j++){
        if(map[ar2[j]]){
            return true;
        }
    }
    return false;
}

let checkStatus = containsCommenItem2(ar1, ar2);  //time complexity-O(a+b)[good], space compx-O(a)[bad]
//console.log(checkStatus);
//containsCommenItem2(ar1, ar2);

//using javascript built-in methods

function containsCommenItem3(ar1,ar2){
    return ar1.some(item => ar2.includes(item))
}
let checkStatus1 = containsCommenItem3(ar1,ar2);
console.log(checkStatus1);
containsCommenItem3(ar1, ar2);
```

# Count Each Element
```js

let str='aaaabbbccccc'

function countEachElm(str){
  
  let imap = new Map();
  
  let arrOfStr = str.split('');
  
  for(let i=0; i<arrOfStr.length; i++){
    
    if(!imap.has(arrOfStr[i])){
      //set elem to imap
      imap.set(arrOfStr[i], (imap.get(arrOfStr[i]) || 0) + 1);
    } else {
      imap.set(arrOfStr[i], imap.get(arrOfStr[i]) + 1);
    } 
    
  }
  return imap;
}

console.log(countEachElm(str)); // Map(3) { 'a' => 4, 'b' => 3, 'c' => 5 }

```
# 8.Merge two arrays on base of id
```js
let arr1 = [{ id:1, name:'a' }, { id:2, name:'b' }, { id:3, name:'c' }];
let arr2 = [{ id:1, name:'d' }, { id:5, name:'e'}];
```
Solution:
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
Output:
```js
[
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 5, name: 'e' }
]
```

## 10. Find the second largest number in an array.

```js
let arr = [1,2,4,1,4,6,6,6,3,9,9] // return 6
```
Output: 6
```js
let arr = [1,2,4,1,4,6,6,6,3,9, 9] // return 6

function getSecondHighestNumber(arr){
  
  let iset = new Set();
  
  for(let i=0; i<arr.length; i++){
    iset.add(arr[i])
  }
  
  let sortedArr = Array.from(iset);
  sortedArr.sort((a,b)=> a - b);
  
  return sortedArr[sortedArr.length-2]  
}

let value = getSecondHighestNumber(arr);
console.log(value)
```

# 11. Move Zero At Last
```js
let arr = [1,0,3,0,4,0,4,6,1,4,0] 
// [1,3,4,4,6,1,4,0,0,0,0];

function moveZeroAtLast(arr){
  
  let index = 0;
  let result = [];
  
  for(let i=0; i<arr.length; i++){
    if(arr[i] == 0) index++;  
  }
  
  for(let i=0; i < arr.length; i++){
    if(arr[i] !== 0){
      result.push(arr[i])
    }
  }
  
  for(let i=result.length; i >= index; i--){
      
      arr[i] = 0
      result.push(arr[i]);
  }
  return result;
}

let result = moveZeroAtLast(arr);
console.log(result)//O(n)

```
More Efficient Solution:
```js
const input = [0, 1, 2, 0, 3, 4, 0];
const output = moveZeroes(input);
console.log(output); // Output: [1, 2, 3, 4, 0, 0, 0]

function moveZeroes(arr){
  
  let indexZero = 0;
  let sortedArr =[]
  
  for(let i=0; i<arr.length; i++){
    
    if(arr[i] == 0) indexZero++;
    
    if(arr[i] != 0){
      sortedArr.push(arr[i]);
    }
  }
  
  sortedArr = sortedArr.sort((a,b)=>a-b);
  
  for(let i = 0; i < indexZero; i++){
    sortedArr.push(0)
  }
  return sortedArr;
}
 ```

# Find the Majority Element
```lua
Problem Statement: Given an array, find the element that appears more than n/2 times in the array (if it exists).

Example:

Input: [3, 3, 4, 2, 4, 4, 2, 4, 4]
Output: 4
```
Solution:

```js
let arr = [3, 3, 4, 2, 4, 4, 2, 4, 4];

function findFq(arr){
let imap = new Map();

for(let i=0; i< arr.length; i++){
    if(!imap.has(arr[i])){
        imap.set(arr[i], (imap.get(arr[i])||0) + 1)
    }else{
        imap.set(arr[i], (imap.get(arr[i])) + 1)
        // imap.set(arr[i], (imap.get(i)) +1)
    }    
}
console.log(imap)

candidate = arr.length/2

for(let [key,value] of imap){
    if(candidate <= value) return key;
}

return -1;
}

console.log(findFq(arr))
```

# Show all Prime Numbers upto N

I think you meant the **Sieve of Eratosthenes**, which is an efficient algorithm to find all prime numbers up to a given limit **N**. Here’s how it works:

### **🔹 Algorithm:**
1. Create a **boolean array `isPrime[]`** of size **N+1**, initialized to **true** (assuming all numbers are prime).
2. Start from **2 (first prime number)**, mark all its multiples as **false**.
3. Move to the next number that is still **true** and repeat until `√N`.
4. All numbers still marked **true** in the array are prime.

---

### **🔹 JavaScript Implementation**
```js
function sieveOfEratosthenes(n) {
    let isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime

    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    let primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push(i);
    }
    return primes;
}

console.log(sieveOfEratosthenes(50));
```
### **🔹 Output**
```
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

### **🔹 Time Complexity**
✅ `O(N log log N)` — **Much faster than checking each number individually.**

Would you like an optimized **segmented sieve** for larger numbers (e.g., `10^9` range)? 🚀

# Problem: Find the Most Frequent Element in an Object Array
```lua
Problem Statement:
You are given an array of objects where each object represents a product with a name and a category. Your task is to find the most frequently occurring category.
```

```js
const products = [
  { name: "Laptop", category: "Electronics" },
  { name: "Shirt", category: "Clothing" },
  { name: "Mobile", category: "Electronics" },
  { name: "Jeans", category: "Clothing" },
  { name: "Tablet", category: "Electronics" },
  { name: "Sofa", category: "Furniture" }
];

Output: Electronics
```
Solution Approach:
1. Use an object (hashmap) to store the frequency of each category.
2. Iterate through the array and update counts.
3. Find the category with the highest count

Solution:
```js
function mostFrequentCategory(products) {
    let categoryCount = {};

    // Count the frequency of each category
    for (let product of products) {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    }

    // Find the category with the maximum count
    let maxCategory = null;
    let maxCount = 0;

    for (let category in categoryCount) {
        if (categoryCount[category] > maxCount) {
            maxCategory = category;
            maxCount = categoryCount[category];
        }
    }

    return maxCategory;
}

// Example usage
const products = [
    { name: "Laptop", category: "Electronics" },
    { name: "Shirt", category: "Clothing" },
    { name: "Mobile", category: "Electronics" },
    { name: "Jeans", category: "Clothing" },
    { name: "Tablet", category: "Electronics" },
    { name: "Sofa", category: "Furniture" }
];

console.log("Most frequent category:", mostFrequentCategory(products));
```
## Merge two sorted arrays
```lua
let a = [2, 4, 7, 10], b = [2, 3];
Output: [ 2, 2, 3, 4, 7, 10 ]
```

Solution:

***Brute force***

```js
function merge(ar1,ar2){

  let combined = [...ar1, ...ar2];
  return combined.sort((a,b)=>a-b);
}
```

```js
let a = [2, 4, 7, 10], b = [2, 3];

function mergeArray(a, b){
  let newArr = [...a, ...b];   //or let newArr = a.concat(b);

  for(let i=0; i<newArr.length; i++){
    for(let j=0; j<newArr.length; j++){
      
      if(newArr[i] <= newArr[j]){
        //do swap 
        [newArr[i],newArr[j]] = [newArr[j],newArr[i]]
      }
    }  
  }
  
  return newArr;  
}

console.log(mergeArray(a,b))

Output: [ 2, 2, 3, 4, 7, 10 ]
```

optimizations:
```js
let a = [2, 4, 7, 10], b = [2, 3];

function mergeArray(a, b){
  let i=0;
  let j=0;
  let result = [];
  
  // merge Array in sorted Array
  while(i < a.length && j < b.length){
    
    if(a[i] < b[j]){
      result.push(a[i]);
      i++;
    }else{
      result.push(b[j]);
      j++;
    }
  }
  
  //push remaining elem
  while(i<a.length){
    result.push(a[i]);
    i++;
  }
  
  while(j < b.length){
    result.push(b[j])
    j++
  }
  
  return result;
}

console.log(mergeArray(a,b))

Output: [ 2, 2, 3, 4, 7, 10 ] 
```
```
Time Complexity Analysis:
O(n + m) → Where n and m are the sizes of arrays a and b, respectively.
This is efficient because we traverse both arrays only once.
```

# Find Leader in an array

To **find all leaders in the array**, we can iterate from **right to left** while keeping track of the **maximum element encountered so far**.  

---

### **Optimized Approach (Right-to-Left Traversal)**
1. Start from the **last element** (which is always a leader).
2. Keep track of the **maximum element found so far**.
3. Traverse the array in **reverse order**, adding elements that are greater than or equal to this maximum.
4. **Time Complexity:** **O(n)** → Since we traverse the array only once.

---

### **JavaScript Solution**
```javascript
function findLeaders(arr) {
    let n = arr.length;
    let leaders = [];
    let maxSoFar = arr[n - 1]; // Rightmost element is always a leader
    leaders.push(maxSoFar);

    // Traverse from second last element to the first
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] >= maxSoFar) {
            maxSoFar = arr[i];
            leaders.push(maxSoFar);
        }
    }

    return leaders.reverse(); // Reverse to maintain the original order
}

// Example usage
let arr = [16, 17, 4, 3, 5, 2];
console.log(findLeaders(arr));  // Output: [17, 5, 2]
```

---

### **Explanation**
1. Start from **2** (last element, always a leader).
2. Move left:
   - **5** > 2 → Add **5**.
   - **3** < 5 → Ignore.
   - **4** < 5 → Ignore.
   - **17** > 5 → Add **17**.
3. **16** < 17 → Ignore.

Final **leaders array**: `[17, 5, 2]`

---

# Permutations of a String
```lua
Given a string s, which may contain duplicate characters, your task is to generate and return an array of all unique permutations of the string. You can return your answer in any order.

Examples:

Input: s = "ABC"
Output: ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
Explanation: Given string ABC has 6 unique permutations.
```
### **Generating Unique Permutations of a String**  

We can solve this problem using **Backtracking + Set** to avoid duplicate permutations efficiently.  

---

### **Optimized Approach (Backtracking + Set)**
1. Convert the string into an **array of characters**.
2. Use **backtracking** to recursively swap characters and generate permutations.
3. Use a **set** to store unique permutations and avoid duplicates.
4. Convert the set into an array and return the result.

---

### **Efficient JavaScript Solution**
```javascript
function uniquePermutations(s) {
    let result = new Set();
    let arr = s.split(""); // Convert string to an array

    function backtrack(start) {
        if (start === arr.length) {
            result.add(arr.join("")); // Store unique permutation
            return;
        }

        for (let i = start; i < arr.length; i++) {
            [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap
            backtrack(start + 1);
            [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap back (Backtrack)
        }
    }

    backtrack(0);
    return [...result]; // Convert Set to Array
}

// Example usage
console.log(uniquePermutations("ABC")); 
// Output: ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
```

---

### **Time & Space Complexity**
- **Time Complexity:** **O(n!)** (Factorial growth due to permutations)
- **Space Complexity:** **O(n!)** (Storing all permutations)

---

# Remove given Key from Object
```js
function removeKeys(input, keysToRemove) {
  keysToRemove.forEach(key => {
    delete input[key];
  });
  return input;
}

const input = { a: 1, b: 2, c: 3 };
const keysToRemove = ['b', 'c'];

const result = removeKeys(input, keysToRemove);
console.log(result); 
```
Output: 
```js
{ a: 1 }
```
***Using Reduce method***
```js
const input = { a: 1, b: 2, c: 3 };
const keysToRemove = ['b', 'c'];

const removeKeys = (obj, keys) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = obj[key]; // Add the key-value pair if the key is not in keysToRemove
    }
    return acc;
  }, {}); // Start with an empty object as the accumulator
};

const result = removeKeys(input, keysToRemove);
console.log(result); // { a: 1 }
```

# Remove duplicate from Object of array.
```js
let obj = [
    { name: 'Sid' },
    { name: 'Mark' },
    { name: 'Sid' },
    { name: 'Jane' },
    { name: 'Sid' }
];
```
You can remove duplicates **without using `filter` or `Set`** by using an **object (hashmap)** to track seen values and then constructing a new array. Here's how:

### **Solution using an Object (`Map` alternative)**
```javascript
let obj = [
    { name: 'Sid' },
    { name: 'Mark' },
    { name: 'Sid' },
    { name: 'Jane' },
    { name: 'Sid' }
];

let seen = {}; // Hashmap to track seen names
let uniqueArray = [];

for (let i = 0; i < obj.length; i++) {
    if (!seen[obj[i].name]) {
        seen[obj[i].name] = true; // Mark name as seen
        uniqueArray.push(obj[i]); // Add to result array
    }
}

console.log(uniqueArray);
```

### **Output:**
```javascript
[
  { name: 'Sid' },
  { name: 'Mark' },
  { name: 'Jane' }
]
```

---

### **💡 Explanation:**
1. We create an **empty object (`seen`)** to track encountered names.
2. Loop through the `obj` array:
   - If `name` is **not in `seen`**, add it to `uniqueArray` and mark it as seen.
   - If `name` is already in `seen`, **skip it**.
3. This ensures that only the **first occurrence** of each name is kept.

---

### **🔹 Time Complexity:**
- **O(N)** → Since we loop through the array once and lookup operations in objects are **O(1)**.

# Longest Consecutive Sequence
### **Optimized Approach (Using a Hash Set)**
To efficiently find the **longest consecutive sequence**, we can use a **HashSet (Set in JavaScript)** to store all numbers and check for sequences in **O(n) time complexity**.

---

### **JavaScript Solution**
```js
function longestConsecutive(nums) {
    if (nums.length === 0) return 0;

    let numSet = new Set(nums); // Store all numbers in a Set for O(1) lookups
    let maxLength = 0;

    for (let num of numSet) {
        // Check if it's the start of a sequence (num - 1 should not exist)
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // Expand the sequence
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            // Update maxLength if a longer sequence is found
            maxLength = Math.max(maxLength, currentStreak);
        }
    }

    return maxLength;
}

// Test Cases
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // Output: 4 (Sequence: [1, 2, 3, 4])
console.log(longestConsecutive([9, 1, 4, 7, 3, 2, 6, 5, 8, 10])); // Output: 10 (Sequence: [1,2,3,4,5,6,7,8,9,10])
console.log(longestConsecutive([0, -1])); // Output: 2 (Sequence: [-1, 0])
console.log(longestConsecutive([10, 20, 30, 40])); // Output: 1 (No consecutive sequence)
console.log(longestConsecutive([])); // Output: 0 (Empty input)
```

---

### **Explanation**
1. **Store elements in a Set** → Quick lookup in **O(1)** time.
2. **Find sequence starts** → A number is a **sequence start** if `num - 1` is not in the set.
3. **Expand the sequence** → Keep checking for `num + 1` and count the streak.
4. **Update maxLength** → Track the longest sequence found.

---

### **Time & Space Complexity**
- **Time Complexity:** \(O(n)\) (Each element is checked at most twice)
- **Space Complexity:** \(O(n)\) (Set stores all elements)

This approach ensures an **efficient** solution compared to sorting-based methods (**O(n log n)**). 🚀

Would you like a **brute force approach** as well? 🔥
### **Brute Force Approach (O(n²) Time Complexity)**  
In a brute force solution, we check each number to see how long a consecutive sequence it can form. This results in an **O(n²) time complexity**, which is inefficient for large inputs.

---

### **JavaScript Brute Force Solution**
```js
function longestConsecutiveBruteForce(nums) {
    if (nums.length === 0) return 0;

    let maxLength = 0;

    for (let i = 0; i < nums.length; i++) {
        let currentNum = nums[i];
        let currentStreak = 1;

        // Check if next consecutive numbers exist in the array
        while (nums.includes(currentNum + 1)) {
            currentNum++;
            currentStreak++;
        }

        maxLength = Math.max(maxLength, currentStreak);
    }

    return maxLength;
}

// Test Cases
console.log(longestConsecutiveBruteForce([100, 4, 200, 1, 3, 2])); // Output: 4 (Sequence: [1, 2, 3, 4])
console.log(longestConsecutiveBruteForce([9, 1, 4, 7, 3, 2, 6, 5, 8, 10])); // Output: 10 (Sequence: [1,2,3,4,5,6,7,8,9,10])
console.log(longestConsecutiveBruteForce([0, -1])); // Output: 2 (Sequence: [-1, 0])
console.log(longestConsecutiveBruteForce([10, 20, 30, 40])); // Output: 1 (No consecutive sequence)
console.log(longestConsecutiveBruteForce([])); // Output: 0 (Empty input)
```

---

### **Explanation**
1. Loop through each number in the array.
2. Try to build a consecutive sequence starting from that number.
3. Use `nums.includes()` to check for the next consecutive number.
4. Keep track of the maximum sequence length found.

---

### **Time & Space Complexity**
- **Time Complexity:** \(O(n^2)\)  
  - Each element is checked against `nums.includes()`, which is \(O(n)\) in the worst case.
  - For every number, we scan the array to find the next number, leading to **nested loops**.
- **Space Complexity:** \(O(1)\)  
  - We only use a few integer variables for tracking lengths.

🔴 **Why is this inefficient?**  
- **`nums.includes()`** is called repeatedly, making the solution slow for large inputs.

Would you like an even **more optimized** approach using sorting? 🚀


### **Problem Statement:**  
Given two arrays, check if they are **permutations** of each other.  
Two arrays are permutations if they contain the **same elements with the same frequency**, but possibly in a different order.

---

## Check if two arrays are permutations of each other.  - [Frequency Counting]


### **Example 1:**  
#### **Input:**  
```js
checkPermutation([1, 2, 3, 4], [4, 3, 2, 1])
```
#### **Output:**  
```js
true
```
(Both arrays contain the same numbers, just in different orders.)

---

### **Example 2:**  
#### **Input:**  
```js
checkPermutation([1, 2, 3], [1, 2, 2])
```
#### **Output:**  
```js
false
```
(Second array contains an extra **2** instead of **3**.)

---

### **Optimized Approach (Using Hash Map / Object)**
Instead of sorting, we use a **hash map (object) to count frequencies** in **O(n) time**.

```js
function checkPermutation(arr1, arr2) {
    if (arr1.length !== arr2.length) return false; // Different lengths → Not permutations

    let frequencyMap = {};

    // Count occurrences in arr1
    for (let num of arr1) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }

    // Decrease occurrences using arr2
    for (let num of arr2) {
        if (!frequencyMap[num]) return false; // Element missing or extra
        frequencyMap[num]--;
    }

    return true;
}

// Test Cases
console.log(checkPermutation([1, 2, 3, 4], [4, 3, 2, 1])); // true
console.log(checkPermutation([1, 2, 3], [1, 2, 2])); // false
console.log(checkPermutation([5, 6, 7, 8], [8, 7, 6, 5])); // true
console.log(checkPermutation([1, 2, 3], [1, 2, 3, 4])); // false
console.log(checkPermutation([], [])); // true (Empty arrays are permutations)
```

---

### **Time & Space Complexity**
- **Time Complexity:** \(O(n)\)  
  - Two passes over the array: One for counting, one for checking.
- **Space Complexity:** \(O(n)\)  
  - The **hash map** stores frequencies.

---

### **Alternative Approach (Sorting)**
A simpler (but slightly slower) approach is to **sort both arrays and compare**.

```js
function checkPermutationSort(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Test Cases
console.log(checkPermutationSort([1, 2, 3, 4], [4, 3, 2, 1])); // true
console.log(checkPermutationSort([1, 2, 3], [1, 2, 2])); // false
console.log(checkPermutationSort([5, 6, 7, 8], [8, 7, 6, 5])); // true
console.log(checkPermutationSort([1, 2, 3], [1, 2, 3, 4])); // false
console.log(checkPermutationSort([], [])); // true
```

---
### **Sorting vs Hash Map Approach**
| Approach | Time Complexity | Space Complexity | Best Use Case |
|----------|---------------|----------------|--------------|
| **Hash Map (Frequency Count)** | **O(n)** | **O(n)** | Best for large arrays with unique values |
| **Sorting & Comparing** | **O(n log n)** | **O(1) or O(n)** | Simple but slower for large inputs |

Would you like a **brute-force approach** (O(n²)) as well? 🚀

# Count Uppercase, Lowercase, and Digits in a String
Problem:
Write a function that takes a string and counts the number of uppercase letters, lowercase letters, and digits using ASCII values.

Example Input:
```js
countCharacters("Hello123");
```
```js
{ uppercase: 1, lowercase: 4, digits: 3 }
```
Here’s the solution for **Problem 4: Count Uppercase, Lowercase, and Digits in a String** using ASCII values in JavaScript (ES6):

---

### **Solution:**
```javascript
function countCharacters(str) {
    let counts = { uppercase: 0, lowercase: 0, digits: 0 };

    for (let char of str) {
        let ascii = char.charCodeAt(0);

        if (ascii >= 65 && ascii <= 90) {
            counts.uppercase++;  // A-Z
        } else if (ascii >= 97 && ascii <= 122) {
            counts.lowercase++;  // a-z
        } else if (ascii >= 48 && ascii <= 57) {
            counts.digits++;     // 0-9
        }
    }

    return counts;
}

// Example usage
console.log(countCharacters("Hello123")); 
// Output: { uppercase: 1, lowercase: 4, digits: 3 }

console.log(countCharacters("A1b2C3d4E5"));
// Output: { uppercase: 3, lowercase: 2, digits: 5 }
```

### **Explanation:**
1. Initialize an object `counts` to track uppercase, lowercase, and digits.
2. Iterate through each character of the string.
3. Use `char.charCodeAt(0)` to get the ASCII value.
4. Check if the ASCII value falls within:
   - **65-90** → Uppercase letters (`A-Z`)
   - **97-122** → Lowercase letters (`a-z`)
   - **48-57** → Digits (`0-9`)
5. Increment the corresponding counter in the `counts` object.
6. Return the final counts.

---

# Remove Kyes from an array of objects
Problem:
```js
const data = [{
    id: 1,
    name: 'John',
    age: 30
}, {
    id: 2,
    name: 'Jane',
    age: 25
}, {
    id: 3,
    name: 'Bob',
    age: 25
}] ;
```
solution:

```js
function removeKeys(arr, keys) {
 
 return arr.map(({keys, ...rest}) => rest);
}

let result = removeKeys(data, age);
```
output:

```js
[
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
]
```

# Find Minimum Window Substring Problem [Hard]

💡 Problem Statement:
Given two strings s and t, find the smallest substring in s that contains all the characters of t (including duplicates).

📌 Example:
```lua
s = "ddaaabbca"  
t = "abc"
```
Output:
```lua
"bca"
```
Here’s another simple approach using the **Brute Force Method** for better understanding. This method checks all substrings and finds the smallest valid one.

### **Approach:**
1. Generate all substrings of `s`.
2. Check if a substring contains all characters of `t` (including duplicates).
3. Keep track of the smallest valid substring.

### **Code (JavaScript, ES6)**
```javascript
function containsAllChars(sub, t) {
    let subCount = {};
    let tCount = {};

    for (let char of t) {
        tCount[char] = (tCount[char] || 0) + 1;
    }

    for (let char of sub) {
        subCount[char] = (subCount[char] || 0) + 1;
    }

    for (let char in tCount) {
        if (!subCount[char] || subCount[char] < tCount[char]) {
            return false;
        }
    }
    return true;
}

function minWindow(s, t) {
    let minLen = Infinity;
    let minSub = "";

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            let sub = s.substring(i, j + 1);
            if (containsAllChars(sub, t) && sub.length < minLen) {
                minLen = sub.length;
                minSub = sub;
            }
        }
    }

    return minSub;
}

// Example usage:
console.log(minWindow("ddaaabbca", "abc"));  // Output: "bca"
```

### **Explanation:**
1. **Nested Loop**: Generate all possible substrings.
2. **Check Validity**: The function `containsAllChars()` verifies if a substring has all characters from `t`.
3. **Track the Smallest**: If a valid substring is found, update the minimum.

🔹 **Time Complexity:** O(N²) (since we check all substrings)  
🔹 **Space Complexity:** O(1) (only character frequency counts are stored)  

This method is slower than the sliding window approach but is useful for understanding the problem conceptually. 🚀 Let me know if you need more variations!

# 125. Valid Palendrome
```lua
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

 

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```
Solution:
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let str = s.replace(/[^a-zA-Z0-9]/g,'');   // Removes all special characters
  str = str.toLowerCase();

  let str2 = '';
  
  for(let i=str.length-1; i >= 0; i--){
    str2 += str[i];  
  }
  
  if(str === str2){
    return true;
  }else{
    return false;
  }
};
```