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
  
}
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

## Only duplicates element

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