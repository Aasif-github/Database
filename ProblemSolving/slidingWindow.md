# Sliding Window 
### **What is the Sliding Window Algorithm?**

The **Sliding Window Algorithm** is a technique used to solve problems that involve finding a subarray, substring, or subset of elements within a larger set, often to optimize space and time complexity. It’s particularly effective when the problem involves a contiguous sequence of elements.

---

### **Key Idea**

Instead of recalculating properties for each new subset or subarray, the sliding window technique reuses calculations by maintaining a "window" that slides across the data. This window is represented by two pointers (`left` and `right`) that define the bounds of the current subset.

---

### **When to Use It?**

- When the problem involves **contiguous data** (subarrays or substrings).
- When you need to **maximize** or **minimize** a property of a subset.
- Common problems include:
  - Longest substring with unique characters.
  - Maximum sum of a subarray of a fixed size.
  - Smallest subarray with a sum greater than or equal to a target.

---

### **Steps in Sliding Window Algorithm**

1. **Initialize Two Pointers**:
   - Start with both `left` and `right` pointers at the beginning of the array or string.

2. **Expand the Window**:
   - Move the `right` pointer to expand the window and include more elements.

3. **Shrink the Window** (if necessary):
   - Adjust the `left` pointer to shrink the window when certain conditions are no longer met (e.g., removing duplicate characters).

4. **Update Result**:
   - At each step, compute or update the desired property (e.g., length, sum) of the current window.

5. **Repeat**:
   - Continue until the `right` pointer traverses the entire array or string.

---

### **Example: Longest Substring Without Repeating Characters**

#### Problem:
Find the length of the longest substring without repeating characters.

#### Sliding Window Implementation:
```javascript
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        // If the current character is a duplicate, shrink the window
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++; // Move left pointer
        }
        // Add the current character to the set
        charSet.add(s[right]);
        // Update the maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

#### Visualization:

For `s = "abcabcbb"`:

1. **Step 1**:
   - `right = 0`, `s[right] = 'a'`, add `'a'` to `Set`.
   - `maxLength = 1`, window: `"a"`.

2. **Step 2**:
   - `right = 1`, `s[right] = 'b'`, add `'b'` to `Set`.
   - `maxLength = 2`, window: `"ab"`.

3. **Step 3**:
   - `right = 2`, `s[right] = 'c'`, add `'c'` to `Set`.
   - `maxLength = 3`, window: `"abc"`.

4. **Step 4**:
   - `right = 3`, `s[right] = 'a'`, duplicate detected.
   - Shrink window by moving `left` and removing characters until `'a'` is removed.
   - `maxLength = 3`, window: `"bca"`.

5. Continue until the end.

---

### **Advantages of Sliding Window**

1. **Optimized Time Complexity**:
   - Avoids recalculations for overlapping parts of the window.
   - For many problems, the time complexity is reduced to **O(n)**.

2. **Space Efficiency**:
   - Often uses a constant or small amount of extra space (e.g., hash set, hash map).

---

### **Common Problems Using Sliding Window**

1. **Maximum Sum Subarray of Size K**:
   - Find the maximum sum of any subarray of size `k`.

2. **Longest Substring with At Most K Distinct Characters**:
   - Find the longest substring that contains at most `k` distinct characters.

3. **Smallest Subarray with a Given Sum**:
   - Find the smallest subarray with a sum >= target.

---

Sliding window is a powerful technique for problems involving contiguous elements, and mastering it can help solve many real-world and competitive programming challenges efficiently.


## Permutations of a String
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