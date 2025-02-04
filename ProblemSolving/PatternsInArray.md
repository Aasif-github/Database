### **🔹 Patterns to Solve Array-Based Problems**
Array problems are one of the most common **Data Structures and Algorithms (DSA)** topics in **coding interviews**. Recognizing **patterns** can help solve them efficiently. Below are the **most important array problem-solving patterns**, along with examples and explanations.

---

## **1️⃣ Two Pointers**
📌 **Use case:** Searching, removing elements, merging sorted arrays.  
✅ Reduces `O(N²)` solutions to **O(N)**.

### **🔹 Example: Find if Array Has a Pair Sum**
```js
function hasPairWithSum(arr, target) {
    let left = 0, right = arr.length - 1;
    arr.sort((a, b) => a - b); // Sort the array first

    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}
console.log(hasPairWithSum([1, 4, 7, 2], 9)); // true
```
⏳ **Time Complexity:** `O(N log N)` (sorting) + `O(N)`

---

## **2️⃣ Sliding Window**
📌 **Use case:** Finding **subarrays** (max sum, longest substring, etc.)  
✅ Converts `O(N²)` to **O(N)**.

### **🔹 Example: Maximum Sum Subarray of Size K**
```js
function maxSumSubarray(arr, k) {
    let maxSum = 0, windowSum = 0;

    for (let i = 0; i < k; i++) windowSum += arr[i]; // Initial window sum
    
    maxSum = windowSum;

    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k]; // Slide window
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // Output: 9
```
⏳ **Time Complexity:** `O(N)`

---

## **3️⃣ Kadane’s Algorithm (Maximum Subarray Sum)**
📌 **Use case:** Find the largest sum **contiguous** subarray.  
✅ **O(N) optimal solution**.

### **🔹 Example: Maximum Sum of Subarray**
```js
function maxSubarraySum(arr) {
    let maxSum = arr[0], currentSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}
console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6
```
⏳ **Time Complexity:** `O(N)`

---

## **4️⃣ Prefix Sum & Difference Array**
📌 **Use case:** Solve **range sum** problems efficiently.  
✅ Converts **O(N²) queries** to **O(N) preprocessing + O(1) query**.

### **🔹 Example: Range Sum Query**
```js
function rangeSumQuery(arr, queries) {
    let prefixSum = [0];

    for (let i = 0; i < arr.length; i++) {
        prefixSum[i + 1] = prefixSum[i] + arr[i];
    }

    return queries.map(([l, r]) => prefixSum[r + 1] - prefixSum[l]);
}
console.log(rangeSumQuery([1, 2, 3, 4, 5], [[1, 3], [2, 4]])); // Output: [9, 12]
```
⏳ **Time Complexity:** `O(N)` preprocessing, `O(1)` query.

---

## **5️⃣ Hashing (Using Map or Set)**
📌 **Use case:** **Finding duplicates, frequency counts, Two-Sum problems.**  
✅ **Optimized for O(1) average case lookups.**

### **🔹 Example: Two Sum (Using HashMap)**
```js
function twoSum(nums, target) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];

        if (map.has(complement)) return [map.get(complement), i];

        map.set(nums[i], i);
    }
    return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
```
⏳ **Time Complexity:** `O(N)`

---

## **6️⃣ Sorting & Binary Search**
📌 **Use case:** Find **missing elements, closest pairs, searching in sorted arrays.**  
✅ **Binary search reduces O(N) to O(log N).**

### **🔹 Example: Find First and Last Position of an Element**
```js
function binarySearchRange(arr, target) {
    function binarySearch(isFirst) {
        let left = 0, right = arr.length - 1, pos = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                pos = mid;
                if (isFirst) right = mid - 1;
                else left = mid + 1;
            } else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return pos;
    }
    return [binarySearch(true), binarySearch(false)];
}
console.log(binarySearchRange([5, 7, 7, 8, 8, 10], 8)); // Output: [3, 4]
```
⏳ **Time Complexity:** `O(log N)`

---

## **7️⃣ Backtracking (Recursion + Brute Force)**
📌 **Use case:** Generate **all possible combinations**, subsets, permutations.  
✅ **Used when trying every possibility is necessary**.

### **🔹 Example: Generate All Subsets (Power Set)**
```js
function generateSubsets(nums) {
    let result = [];
    
    function backtrack(index, subset) {
        if (index === nums.length) {
            result.push([...subset]);
            return;
        }
        
        // Exclude the current element
        backtrack(index + 1, subset);
        
        // Include the current element
        subset.push(nums[index]);
        backtrack(index + 1, subset);
        subset.pop();
    }
    
    backtrack(0, []);
    return result;
}
console.log(generateSubsets([1, 2, 3]));
```
⏳ **Time Complexity:** `O(2^N)`

---

## **🔥 Summary: Which Pattern to Use?**
| **Pattern** | **Use Case** | **Time Complexity** |
|------------|------------|----------------|
| **Two Pointers** | Find pairs, remove elements | `O(N)` |
| **Sliding Window** | Subarrays, longest substring | `O(N)` |
| **Kadane’s Algorithm** | Maximum sum subarray | `O(N)` |
| **Prefix Sum** | Range sum queries | `O(N) preprocessing, O(1) query` |
| **Hashing (Map/Set)** | Find duplicates, Two-Sum | `O(N)` |
| **Sorting + Binary Search** | Search problems | `O(N log N)` |
| **Backtracking** | Subsets, permutations | `O(2^N)` |

Would you like **more problems** to practice with these patterns? 🚀