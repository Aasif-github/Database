The Dutch National Flag problem, also known as the three-way partitioning problem, involves sorting an array of elements consisting of three distinct values (e.g., `0`, `1`, and `2`) in such a way that elements of the same value are grouped together. Here's an easy and efficient way to solve it in JavaScript:

### Code Example (Three Pointers Approach)
```javascript
function dutchFlagSort(arr) {
  let low = 0;         // Pointer for 0
  let mid = 0;         // Pointer for 1
  let high = arr.length - 1; // Pointer for 2

  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else if (arr[mid] === 2) {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}

// Example usage
const input = [2, 0, 2, 1, 1, 0];
console.log(dutchFlagSort(input)); // Output: [0, 0, 1, 1, 2, 2]
```

### Explanation
1. **Pointers**:
   - `low`: Keeps track of the boundary for `0`s.
   - `mid`: Scans through the array.
   - `high`: Keeps track of the boundary for `2`s.

2. **Logic**:
   - If the current element is `0`, swap it with the element at `low` and move both `low` and `mid` pointers forward.
   - If the current element is `1`, just move the `mid` pointer forward.
   - If the current element is `2`, swap it with the element at `high` and move the `high` pointer backward.

3. **Efficiency**:
   - Time Complexity: **O(n)** (single pass through the array).
   - Space Complexity: **O(1)** (in-place sorting).
  


## Simple approach
```js
// JavaScript Program to sort an array of 0s, 1s and 2s
// by counting the occurrence of 0s, 1s and 2s

// Function to sort an array of 0s, 1s and 2s
function sort012(arr) {
    let c0 = 0, c1 = 0, c2 = 0;

    // Count 0s, 1s, and 2s
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) 
            c0 += 1;
        else if (arr[i] === 1) 
            c1 += 1;
        else
            c2 += 1;
    }

    let idx = 0;
    // Place all the 0s
    for (let i = 0; i < c0; i++) 
        arr[idx++] = 0;

    // Place all the 1s
    for (let i = 0; i < c1; i++) 
        arr[idx++] = 1;

    // Place all the 2s
    for (let i = 0; i < c2; i++) 
        arr[idx++] = 2;
}

let arr = [0, 1, 2, 0, 1, 2];
sort012(arr);

console.log(arr.join(' '));
// Output: 0 0 1 1 2 2
```