In **Kadane’s Algorithm**, we calculate the **maximum sum subarray** by iterating through the array and **deciding at each step** whether to:  

1. **Extend the previous subarray** (by adding the current element).  
2. **Start a new subarray** (if the current element is greater than the previous sum).  

We do this using the formula:  
\[
\text{currentSum} = \max(\text{arr[i]}, \text{currentSum} + \text{arr[i]})
\]
- If adding `arr[i]` to `currentSum` increases the sum, we **extend the subarray**.  
- If `arr[i]` is greater than `currentSum + arr[i]`, we **start a new subarray** from `arr[i]`.  

---

### **Tracking the Subarray Elements**
To **track the actual subarray**, we maintain the start and end indices:

1. **Start tracking when we start a new subarray.**
2. **Update the end index when we find a new maximum sum.**

### **Modified Kadane’s Algorithm to Track the Subarray**
```javascript
function maxSubarraySum(arr) {
    let currentSum = arr[0], maxSum = arr[0];
    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > currentSum + arr[i]) {
            currentSum = arr[i];
            tempStart = i; // Start a new subarray
        } else {
            currentSum += arr[i]; // Extend the subarray
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart; // Update start index
            end = i; // Update end index
        }
    }

    return {
        maxSum,
        subarray: arr.slice(start, end + 1) // Extract the subarray
    };
}

// Example Usage
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarraySum(arr));
// Output: { maxSum: 6, subarray: [4, -1, 2, 1] }
```

---

### **Dry Run**
#### **Given array:** `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`

| Index | Element | Current Sum | Max Sum | Start | End |
|--------|---------|--------------|------------|--------|------|
| 0      | -2      | -2           | -2         | 0      | 0    |
| 1      | 1       | 1            | 1          | 1      | 1    |
| 2      | -3      | -2           | 1          | 1      | 1    |
| 3      | 4       | 4            | 4          | 3      | 3    |
| 4      | -1      | 3            | 4          | 3      | 3    |
| 5      | 2       | 5            | 5          | 3      | 5    |
| 6      | 1       | 6            | 6          | 3      | 6    |
| 7      | -5      | 1            | 6          | 3      | 6    |
| 8      | 4       | 5            | 6          | 3      | 6    |

📌 **Final result:** `maxSum = 6`, **subarray = `[4, -1, 2, 1]`**

---

### **Time & Space Complexity**
- **Time Complexity:** **O(n)** (Single loop)
- **Space Complexity:** **O(1)** (Only variables used)

Now, **Kadane’s Algorithm not only finds the maximum sum but also extracts the actual subarray**! 🚀  

## Question based on kadane's algorithm

```js
function maxSubarraySum(arr) {
    let currentSum = arr[0];
    let maxSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// Example Usage
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubarraySum(arr)); // Output: 6 (Subarray: [4, -1, 2, 1])
```