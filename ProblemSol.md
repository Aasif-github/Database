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