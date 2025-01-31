## **What is Prefix Sum?**

The **prefix sum** is a technique used in computing cumulative sums of an array efficiently. It is widely used in problems involving **range sum queries**, **subarray sums**, and **optimizing computations** that involve repeated summations.

---

### **Definition**
For an array `nums` of size `n`, the **prefix sum array** `prefix[i]` represents the sum of all elements from index `0` to `i`:

\[
\text{prefix}[i] = \sum_{j=0}^{i} \text{nums}[j]
\]

In other words:

\[
\text{prefix}[i] = \text{prefix}[i - 1] + \text{nums}[i]
\]

where:
- `prefix[0] = nums[0]`
- `prefix[i] = prefix[i - 1] + nums[i]` for `i > 0`

---

### **Example**
#### **Given an array:**
```plaintext
nums = [3, 1, 4, 1, 5, 9, 2]
```
#### **Calculate the prefix sum:**
| Index (`i`) | `nums[i]` | `prefix[i]` (Cumulative Sum) |
|------------|----------|---------------------------|
| 0          | 3        | 3                         |
| 1          | 1        | 3 + 1 = 4                 |
| 2          | 4        | 4 + 4 = 8                 |
| 3          | 1        | 8 + 1 = 9                 |
| 4          | 5        | 9 + 5 = 14                |
| 5          | 9        | 14 + 9 = 23               |
| 6          | 2        | 23 + 2 = 25               |

So, the **prefix sum array** is:
```plaintext
prefix = [3, 4, 8, 9, 14, 23, 25]
```

---

### **Applications of Prefix Sum**
#### **1. Efficient Range Sum Queries**
Instead of recalculating the sum of a subarray from scratch every time, we can precompute the prefix sum and use it to get the sum in **O(1) time**.

For a range `[L, R]`, the sum of elements from index `L` to `R` is:
\[
\text{Sum}(L, R) = \text{prefix}[R] - \text{prefix}[L - 1]
\]
(if `L = 0`, then `prefix[L - 1]` is treated as `0`)

**Example:**
For `nums = [3, 1, 4, 1, 5, 9, 2]`, suppose we want the sum of elements from index `2` to `5`:
- Using prefix sum:
  ```plaintext
  Sum(2, 5) = prefix[5] - prefix[1] = 23 - 4 = 19
  ```
- Instead of summing `[4, 1, 5, 9]` manually, we use the **prefix sum array** to get the result instantly.

#### **2. Checking Balanced Index (Pivot Index)**
In the **pivot index** problem, we use **prefix sums** to efficiently calculate left and right sums.

#### **3. Solving Subarray Problems**
Prefix sums help in **subarray sum constraints**, **finding subarrays with a given sum**, and **Kadane’s Algorithm**.

#### **4. Difference Arrays (For Efficient Range Updates)**
Prefix sums are used to optimize **incrementing elements in a range** efficiently.

---

### **Implementation in JavaScript**
#### **1. Constructing Prefix Sum Array**
```js
function prefixSum(nums) {
    let prefix = new Array(nums.length).fill(0);
    prefix[0] = nums[0];

    for (let i = 1; i < nums.length; i++) {
        prefix[i] = prefix[i - 1] + nums[i];
    }

    return prefix;
}

// Example usage
let nums = [3, 1, 4, 1, 5, 9, 2];
console.log(prefixSum(nums)); 
// Output: [3, 4, 8, 9, 14, 23, 25]
```

#### **2. Efficient Range Sum Query Using Prefix Sum**
```js
function rangeSum(nums, L, R) {
    let prefix = prefixSum(nums);
    return L === 0 ? prefix[R] : prefix[R] - prefix[L - 1];
}

// Example usage
console.log(rangeSum([3, 1, 4, 1, 5, 9, 2], 2, 5)); // Output: 19
```

---

### **Time Complexity Analysis**
- **Constructing the prefix sum array:** **O(N)**
- **Querying the sum of any subarray:** **O(1)** (instead of O(N) for naive summation)

This makes prefix sums a powerful technique for optimizing array sum operations. 🚀