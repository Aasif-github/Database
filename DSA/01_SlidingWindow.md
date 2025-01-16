### **Sliding Window Technique**

The **sliding window technique** is an efficient approach used to solve problems that involve finding a subarray or substring within an array or string. It reduces the need for nested loops, making the solution faster and more optimal.

---

### **Concept**
The sliding window technique uses a "window" that represents a subset of elements in the array or string. This window "slides" through the input to examine different subsets without re-evaluating the entire window from scratch.

---

### **When to Use Sliding Window**
- Problems involving **contiguous** subarrays or substrings.
- Examples:
  - Finding the maximum or minimum sum of a subarray of a fixed size.
  - Counting the longest substring without repeating characters.
  - Detecting anagrams or patterns in a string.

---

### **Types of Sliding Window**
1. **Fixed-size Window**
   - When the size of the window is constant.
   - Example: Find the maximum sum of a subarray of size `k`.

2. **Variable-size Window**
   - When the size of the window depends on a condition.
   - Example: Find the smallest subarray with a sum greater than or equal to `k`.

---

### **How Sliding Window Works**
1. **Initialize the Window:**
   - Start with the smallest possible window (e.g., an empty window or a single element).
2. **Expand the Window:**
   - Add elements to the window until the condition is satisfied.
3. **Shrink the Window:**
   - Remove elements from the start of the window if the condition is violated or further optimization is required.
4. **Move the Window:**
   - Slide the window forward by adjusting the start and/or end indices.

---

### **Example Problems**

#### 1. **Fixed-size Sliding Window**
**Problem:** Find the maximum sum of a subarray of size `k`.

```javascript
function maxSubarraySum(arr, k) {
    let maxSum = 0;
    let currentSum = 0;

    // Calculate the sum of the first window
    for (let i = 0; i < k; i++) {
        currentSum += arr[i];
    }
    maxSum = currentSum;

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        currentSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3)); // Output: 9
```

---

#### 2. **Variable-size Sliding Window**
**Problem:** Find the length of the smallest subarray with a sum ≥ `s`.

```javascript
function minSubarrayLen(s, arr) {
    let minLength = Infinity;
    let start = 0;
    let currentSum = 0;

    for (let end = 0; end < arr.length; end++) {
        currentSum += arr[end];

        // Shrink the window as much as possible while the condition is satisfied
        while (currentSum >= s) {
            minLength = Math.min(minLength, end - start + 1);
            currentSum -= arr[start];
            start++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

console.log(minSubarrayLen(7, [2, 3, 1, 2, 4, 3])); // Output: 2
```

---

#### 3. **Longest Substring Without Repeating Characters**
**Problem:** Find the length of the longest substring without repeating characters.

```javascript
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let start = 0;
    let maxLength = 0;

    for (let end = 0; end < s.length; end++) {
        while (charSet.has(s[end])) {
            charSet.delete(s[start]);
            start++;
        }
        charSet.add(s[end]);
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
```

---

### **Advantages**
1. Reduces time complexity from \(O(n^2)\) to \(O(n)\) in many cases.
2. Saves memory by avoiding the need to store all possible subsets.

---

### **Tips for Sliding Window**
1. **Visualize the Window:** Think of the window as a segment of the input that grows and shrinks as needed.
2. **Start Small:** Begin with a basic example, then adjust the window logic based on the problem.
3. **Think Dynamically:** Adjust window size dynamically for variable-sized problems.

---

The sliding window technique is versatile and forms the foundation for solving many DSA problems efficiently.## Find maximum sum of subarray of size k
```js
let arr = [2, 1, 5, 1, 3, 2];
let k = 3;

// find max subarray in given arr ,sub-array size = 3 ie [2,1,5]

function maxSumOfSubArr(arr, k){
  
  let currentSum = 0;
  let maxSum = 0;
  
  // calculate sum of First window
  for(let i=0; i<k; i++){
    currentSum += arr[i];
  }
   
  maxSum = currentSum;
  
  // slide the window
  for(let i=k; i < arr.length; i++){
    currentSum += arr[i] - arr[i-k];
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
  
}
console.log(maxSumOfSubArr(arr,k))
```
## Longest Substring with K Distinct Characters (medium)
Problem: Find the length of the longest substring without repeating characters.

[Sliding Window - Problems - github](https://github.com/Aasif-github/Several-Coding-Patterns-for-Solving-Data-Structures-and-Algorithms-Problems-during-Interviews/blob/main/%E2%9C%85%20%20Pattern%2001%20%3A%20Sliding%20Window.md)