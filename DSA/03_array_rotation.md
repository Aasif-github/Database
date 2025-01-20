### **Array Rotation**

Array rotation involves shifting the elements of an array to the left or right by a specified number of positions. The shifted elements wrap around to the beginning or end of the array.

---

### Types of Rotation:

1. **Left Rotation**: Elements are shifted to the left, and the first element moves to the end.
   - Example: Rotate `[1, 2, 3, 4, 5]` left by 2 positions → `[3, 4, 5, 1, 2]`

2. **Right Rotation**: Elements are shifted to the right, and the last element moves to the beginning.
   - Example: Rotate `[1, 2, 3, 4, 5]` right by 2 positions → `[4, 5, 1, 2, 3]`

---

# **Approaches to Solve Array Rotation** (Use 3rd Approach - Best):

#### **1. Brute Force**
Manually shift elements one by one.

##### Left Rotation (JavaScript):
```javascript
function leftRotate(arr, d) {
  for (let i = 0; i < d; i++) {
    let temp = arr.shift(); // Remove the first element
    arr.push(temp);         // Append it to the end
  }
  return arr;
}

console.log(leftRotate([1, 2, 3, 4, 5], 2)); // Output: [3, 4, 5, 1, 2]
```

##### Right Rotation (JavaScript):
```javascript
function rightRotate(arr, d) {
  for (let i = 0; i < d; i++) {
    let temp = arr.pop();  // Remove the last element
    arr.unshift(temp);     // Add it to the beginning
  }
  return arr;
}

console.log(rightRotate([1, 2, 3, 4, 5], 2)); // Output: [4, 5, 1, 2, 3]
```

---

#### **2. Using Slicing (Optimized for Readability)**
Avoid manually shifting elements by using slicing.

##### Left Rotation:
```javascript
function leftRotate(arr, d) {
  d = d % arr.length; // Handle cases where d > arr.length
  return arr.slice(d).concat(arr.slice(0, d));
}

console.log(leftRotate([1, 2, 3, 4, 5], 2)); // Output: [3, 4, 5, 1, 2]
```

##### Right Rotation:
```javascript
function rightRotate(arr, d) {
  d = d % arr.length; // Handle cases where d > arr.length
  return arr.slice(-d).concat(arr.slice(0, -d));
}

console.log(rightRotate([1, 2, 3, 4, 5], 2)); // Output: [4, 5, 1, 2, 3]
```

---

#### **3. In-Place Rotation (Optimized for Space)**

Rotate the array without using additional space (in-place operations).

##### Algorithm:
1. Reverse the entire array.
2. Reverse the first `d` elements.
3. Reverse the remaining elements.

##### Left Rotation (In-Place):
```javascript
function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]]; // Swap elements
    start++;
    end--;
  }
}

function leftRotate(arr, d) {
  d = d % arr.length; // Handle cases where d > arr.length
  reverse(arr, 0, arr.length - 1); // Step 1: Reverse entire array
  reverse(arr, 0, arr.length - d - 1); // Step 2: Reverse first part
  reverse(arr, arr.length - d, arr.length - 1); // Step 3: Reverse second part
  return arr;
}

console.log(leftRotate([1, 2, 3, 4, 5], 2)); // Output: [3, 4, 5, 1, 2]
```

##### Right Rotation (In-Place):
```javascript
function rightRotate(arr, d) {
  d = d % arr.length; // Handle cases where d > arr.length
  reverse(arr, 0, arr.length - 1); // Step 1: Reverse entire array
  reverse(arr, 0, d - 1); // Step 2: Reverse first part
  reverse(arr, d, arr.length - 1); // Step 3: Reverse second part
  return arr;
}

console.log(rightRotate([1, 2, 3, 4, 5], 2)); // Output: [4, 5, 1, 2, 3]
```

---

### Time and Space Complexity:

| Approach         | Time Complexity | Space Complexity |
|------------------|-----------------|------------------|
| Brute Force      | \(O(n \cdot d)\) | \(O(1)\)         |
| Using Slicing    | \(O(n)\)         | \(O(d)\)         |
| In-Place Rotation| \(O(n)\)         | \(O(1)\)         |

---

Let me know if you'd like examples in another programming language!