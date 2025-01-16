### **Two Pointers Technique**

The **two pointers technique** is a common algorithmic strategy that uses two indices (or pointers) to traverse an array or string in order to solve problems efficiently. It reduces the need for nested loops, often bringing the time complexity down from \(O(n^2)\) to \(O(n)\).

---

### **When to Use Two Pointers**
Two pointers are especially useful in problems involving:
1. **Searching**: For a pair of elements or subarrays that satisfy a condition.
2. **Sorting**: Problems where the input is sorted or needs to be traversed in order.
3. **Partitioning**: Dividing data into sections based on some criteria.

---

### **Types of Two Pointers**

1. **Opposite Direction (Start and End Pointers)**  
   - Use when traversing a sorted array or string from both ends.
   - Example: Finding two numbers in a sorted array that add up to a target.

2. **Same Direction (Sliding Pointers)**  
   - Use when pointers traverse from the same starting point.
   - Example: Finding the longest substring without repeating characters.

---

### **How It Works**
1. **Initialize Two Pointers**: Start both pointers at appropriate positions (e.g., beginning and end of the array, or both at the start).
2. **Conditionally Move Pointers**:
   - Adjust one or both pointers based on the problem's constraints.
3. **Stop When the Condition Is Met**: Usually, the pointers stop when they cross each other or satisfy a condition.

---

### **Example Problems**

#### **1. Pair Sum in a Sorted Array**
**Problem**: Find if there exist two numbers in a sorted array that add up to a target.

**Example**:
```javascript
function pairSum(arr, target) {
    let left = 0; // Start pointer
    let right = arr.length - 1; // End pointer

    while (left < right) {
        const sum = arr[left] + arr[right];

        if (sum === target) return [arr[left], arr[right]]; // Pair found
        else if (sum < target) left++; // Move left pointer to increase sum
        else right--; // Move right pointer to decrease sum
    }

    return null; // No pair found
}

console.log(pairSum([1, 2, 3, 4, 6], 9)); // Output: [3, 6]
```

---
#### With Brute Force Method

```javascript
let arr = [1,2,3,4,6]; let target=9;

function pairSum(arr, target){
  let output = [];
  
  if(arr.length == 0) return null;
  
  for(let i=0; i < arr.length; i++){
    
    for(let j=i; j < arr.length; j++){
      if(arr[i]+arr[j] === target){
        output.push(arr[i])
        output.push(arr[j])
      }
    }
  }
  return output;
}

console.log(pairSum(arr,target)) // O(n^2) time complexity
[3, 6]
```
---

#### **2. Removing Duplicates in a Sorted Array**
**Problem**: Remove duplicates in-place from a sorted array.

**Example**:
```javascript
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;

    let slow = 0; // Slow pointer

    for (let fast = 1; fast < arr.length; fast++) {
        if (arr[slow] !== arr[fast]) {
            slow++;
            arr[slow] = arr[fast]; // Update array in-place
        }
    }

    return slow + 1; // Length of the modified array
}

let arr = [1, 1, 2, 2, 3, 4, 4];
console.log(removeDuplicates(arr)); // Output: 4
```

---

#### **3. Longest Substring Without Repeating Characters**
**Problem**: Find the length of the longest substring without repeating characters.

**Example**:
```javascript
function lengthOfLongestSubstring(s) {
    let start = 0;
    let charSet = new Set();
    let maxLength = 0;

    for (let end = 0; end < s.length; end++) {
        while (charSet.has(s[end])) {
            charSet.delete(s[start]); // Shrink the window
            start++;
        }
        charSet.add(s[end]); // Expand the window
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
```

---

### **Advantages of Two Pointers**
1. **Efficiency**: Avoids nested loops, reducing time complexity to \(O(n)\) in many cases.
2. **Simplicity**: Intuitive for problems involving pairs or subarray sums.

---

### **Common Problems Using Two Pointers**
1. **Sorted Array Problems**:
   - Two-sum in sorted arrays.
   - Removing duplicates in sorted arrays.
2. **String Problems**:
   - Longest substring without repeating characters.
   - Valid palindrome (ignoring non-alphanumeric characters).
3. **Partitioning Problems**:
   - Move zeros to the end of an array.
   - Dutch national flag problem (sorting 0s, 1s, and 2s).

The two pointers technique is versatile and serves as a foundation for solving many problems efficiently.