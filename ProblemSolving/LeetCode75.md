## Problem 1768. Merge Strings Alternately
You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.

 

Example 1:

Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r
Example 2:

Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.
word1:  a   b 
word2:    p   q   r   s
merged: a p b q   r   s
Example 3:

Input: word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: Notice that as word1 is longer, "cd" is appended to the end.
word1:  a   b   c   d
word2:    p   q 
merged: a p b q c   d
 

Constraints:

1 <= word1.length, word2.length <= 100
word1 and word2 consist of lowercase English letters.

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    
};

```

## Prefix Sum
```js
// Input: nums = [1,7,3,6,5,6]
// Output: 3
// Explanation:
// The pivot index is 3.
// Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
// Right sum = nums[4] + nums[5] = 5 + 6 = 11

function findPivotIndex(arr){
  let totalSum = 0;
  let leftSum = 0;
  
  //cal total sum
  for(let elem of arr){
    totalSum += elem;
  }

  for(let i=0; i < arr.length-1; i++){
    
    let rigthSum = totalSum - leftSum - arr[i];
       
    
    if(rigthSum == leftSum){
      return i;
    } 
    leftSum += arr[i]; 
  }
  return -1
}

let nums = [2,1,-1];
let result = findPivotIndex(nums)
console.log(result);
```

## 1071. Greatest Common Divisor of Strings
```lua
For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

Example 1:

Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Example 3:

Input: str1 = "LEET", str2 = "CODE"
Output: ""
 

Constraints:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of English uppercase letters.
```
Solution
```js
function gcdOfStrings(str1, str2) {
    // Start with the shorter string
    let candidate = str1.length < str2.length ? str1 : str2;
 
    while (candidate.length > 0) {
        if (str1.split(candidate).join('') === ""
        && str2.split(candidate).join('') === "") {
            return candidate; // Valid common divisor
        }
        candidate = candidate.slice(0, -1); // Remove the last character
  
    }

    return ""; // No common divisor
}

// Example cases
// console.log(gcdOfStrings("ABCABC", "ABC")); // Output: "ABC"
// console.log(gcdOfStrings("ABABAB", "ABAB")); // Output: "AB"
console.log(gcdOfStrings("LEET", "LEET")); // Output: ""
```

## Product of Array Except Self
```lua
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.
 

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
```
Solution
## **Approach: Prefix and Suffix Products (O(n) Time, O(1) Space)**
Since we **cannot use division**, we solve this problem using **prefix and suffix products** in two passes.

---

### **Steps**
1. **Initialize an output array** `answer` where `answer[i]` stores the product of all elements except `nums[i]`.
2. **Compute prefix products**:
   - Iterate from **left to right**, storing the cumulative product of elements before index `i`.
3. **Compute suffix products**:
   - Iterate from **right to left**, multiplying each index by the cumulative product of elements after index `i`.

---

## **Optimized Approach (O(n) Time, O(1) Extra Space)**
We compute the **prefix and suffix product in-place** in two passes.

```js
function productExceptSelf(nums) {
    let n = nums.length;
    let answer = Array(n).fill(1);

    // Compute prefix products
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = prefix;  // Store prefix product
        prefix *= nums[i];    // Update prefix
    }

    // Compute suffix products and update answer array
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;  // Multiply with suffix product
        suffix *= nums[i];    // Update suffix
    }

    return answer;
}

// Example cases
console.log(productExceptSelf([1,2,3,4])); // Output: [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // Output: [0,0,9,0,0]
```

---

## **Explanation**
### **Example 1: `[1, 2, 3, 4]`**
#### **Step 1: Compute Prefix Products**
| Index | nums[i] | Prefix | `answer[i]` |
|--------|--------|--------|------------|
| 0      | 1      | 1      | 1          |
| 1      | 2      | 1×1    | 1          |
| 2      | 3      | 1×2    | 2          |
| 3      | 4      | 1×2×3  | 6          |

Intermediate `answer`: **[1, 1, 2, 6]**

#### **Step 2: Compute Suffix Products**
| Index | nums[i] | Suffix | `answer[i]` (after suffix) |
|--------|--------|--------|---------------------------|
| 3      | 4      | 1      | 6×1 = 6                   |
| 2      | 3      | 1×4    | 2×4 = 8                   |
| 1      | 2      | 1×4×3  | 1×12 = 12                 |
| 0      | 1      | 1×4×3×2| 1×24 = 24                 |

Final `answer`: **[24, 12, 8, 6]**

---

## **Complexity Analysis**
- **Time Complexity:** `O(n)`, as we traverse the array twice.
- **Space Complexity:** `O(1)`, since we use only a few extra variables (excluding output array).

🚀 **Efficient and optimal solution!**

## Brute Force Approach (O(n^2) Time, O(1) Space)
### **Simple Approach: Brute Force (O(n²) Time)**
A straightforward way to solve this problem is to iterate through the array, and for each element, compute the product of all other elements.

---

## **Implementation**
```js
function productExceptSelf(nums) {
    let n = nums.length;
    let answer = Array(n).fill(1);

    for (let i = 0; i < n; i++) {
        let product = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                product *= nums[j];
            }
        }
        answer[i] = product;
    }

    return answer;
}

// Example cases
console.log(productExceptSelf([1,2,3,4])); // Output: [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // Output: [0,0,9,0,0]
```

---

## **Explanation**
For each index `i`, we compute the product of all elements except `nums[i]` by iterating over the entire array.

### **Example 1: `[1,2,3,4]`**
- `answer[0] = 2 * 3 * 4 = 24`
- `answer[1] = 1 * 3 * 4 = 12`
- `answer[2] = 1 * 2 * 4 = 8`
- `answer[3] = 1 * 2 * 3 = 6`

Final output: **[24, 12, 8, 6]**

---

## **Complexity Analysis**
- **Time Complexity:** `O(n²)` (nested loop).
- **Space Complexity:** `O(n)`, storing output.

⚠ **Drawback:** This approach is inefficient for large inputs (`n` can be up to `10⁵`), making it impractical. Use prefix-suffix products for `O(n)`. 🚀


## Problem 392. Is Subsequence
Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.  

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements. 

**Example 1:**
Input: s = "abc", t = "ahbgdc"
Output: true

**Example 2:**      
Input: s = "axc", t = "ahbgdc"  
Output: false   

---        
## **Complexity Analysis**  
- **Time Complexity:** `O(n)`, where `n` is the length of `s`.
- **Space Complexity:** `O(1)`, constant space. 

## **Optimized Approach (O(n) Time, O(1) Space)**
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let i = 0, j = 0; // Pointers for s and t

    while (j < t.length) {
        if (s[i] === t[j]) {
            i++; // Move s pointer if there's a match
        }
        j++; // Always move t pointer
        if (i === s.length) return true; // If all chars of s are found in t
    }

    return i === s.length;
};

// Example cases
console.log(isSubsequence("abc", "ahbgdc")); // Output: true
console.log(isSubsequence("axc", "ahbgdc")); // Output: false
``` 

## **Explanation**

- Two pointers: `i` for s and `j` for t.
- Iterate through t and check if the current character of s matches the current character of t.
- If a match is found, move the s pointer forward.  
- If all chars of s are found in t, return true. Otherwise, return false.   

# Find difference of two arrays
```lua
Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
Note that the integers in the lists may be returned in any order.

Example 1:

Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation:
For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3].
For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums2. Therefore, answer[1] = [4,6].
Example 2:

Input: nums1 = [1,2,3,3], nums2 = [1,1,2,2]
Output: [[3],[]]
Explanation:
For nums1, nums1[2] and nums1[3] are not present in nums2. Since nums1[2] == nums1[3], their value is only included once and answer[0] = [3].
Every integer in nums2 is present in nums1. Therefore, answer[1] = [].
 

Constraints:

1 <= nums1.length, nums2.length <= 1000
-1000 <= nums1[i], nums2[i] <= 1000
```

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
  let set1 = new Set(nums1);
  let set2 = new Set(nums2);
  
  let diff1 = [...set1].filter((num)=> !set2.has(num));
  let diff2 = [...set2].filter((num)=> !set1.has(num));
  
  return [diff1, diff2];
};
```