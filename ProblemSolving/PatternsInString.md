### **🔹 Patterns to Solve String-Based Problems**
String problems are common in **coding interviews**, especially for **pattern matching, searching, and transformation**. Below are the most important **string problem-solving patterns**, with **examples and explanations**.

---

## **1️⃣ Two Pointers**
📌 **Use case:** Finding palindromes, reversing words, removing characters.  
✅ **Efficient alternative to O(N²) brute force.**

### **🔹 Example: Check if a String is a Palindrome**
```js
function isPalindrome(s) {
    let left = 0, right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}
console.log(isPalindrome("racecar")); // Output: true
```
⏳ **Time Complexity:** `O(N)`

---

## **2️⃣ Sliding Window**
📌 **Use case:** Finding longest substrings, counting unique characters.  
✅ **Optimizes problems involving substrings.**

### **🔹 Example: Longest Substring Without Repeating Characters**
```js
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0, maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
```
⏳ **Time Complexity:** `O(N)`

---

## **3️⃣ Hashing (Using Map or Set)**
📌 **Use case:** Counting character frequency, anagram checks.  
✅ **Provides O(1) lookups.**

### **🔹 Example: Check if Two Strings are Anagrams**
```js
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    let count = new Map();
    
    for (let char of s) count.set(char, (count.get(char) || 0) + 1);
    for (let char of t) {
        if (!count.has(char) || count.get(char) === 0) return false;
        count.set(char, count.get(char) - 1);
    }
    return true;
}
console.log(isAnagram("listen", "silent")); // Output: true
```
⏳ **Time Complexity:** `O(N)`

---

## **4️⃣ Prefix Sum (Cumulative Frequency)**
📌 **Use case:** Finding longest balanced substrings (like equal 0s and 1s).  
✅ **Optimizes range queries.**

### **🔹 Example: Find the Longest Subarray with Equal 0s and 1s**
```js
function findMaxLength(nums) {
    let map = new Map();
    map.set(0, -1);
    
    let maxLen = 0, count = 0;

    for (let i = 0; i < nums.length; i++) {
        count += nums[i] === 1 ? 1 : -1;
        if (map.has(count)) maxLen = Math.max(maxLen, i - map.get(count));
        else map.set(count, i);
    }
    return maxLen;
}
console.log(findMaxLength([0, 1, 0])); // Output: 2
```
⏳ **Time Complexity:** `O(N)`

---

## **5️⃣ Sorting & Custom Comparator**
📌 **Use case:** Finding largest/smallest lexicographical order, custom sorting.  
✅ **Sorting helps in grouping and organizing strings.**

### **🔹 Example: Group Anagrams**
```js
function groupAnagrams(words) {
    let map = new Map();

    for (let word of words) {
        let sortedWord = word.split("").sort().join("");
        if (!map.has(sortedWord)) map.set(sortedWord, []);
        map.get(sortedWord).push(word);
    }
    return [...map.values()];
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
```
⏳ **Time Complexity:** `O(N log K)`, where `K` is the max length of a word.

---

## **6️⃣ KMP Algorithm (Substring Search)**
📌 **Use case:** Pattern matching, finding substrings efficiently.  
✅ **Optimized for string searching problems.**

### **🔹 Example: Find Index of First Occurrence of a Substring**
```js
function strStr(haystack, needle) {
    return haystack.indexOf(needle);
}
console.log(strStr("hello", "ll")); // Output: 2
```
⏳ **Time Complexity:** `O(N)`

---

## **7️⃣ Backtracking (Recursion for String Generation)**
📌 **Use case:** Generate permutations, subsets, valid parentheses.  
✅ **Used when trying every possibility is necessary.**

### **🔹 Example: Generate All Valid Parentheses**
```js
function generateParentheses(n) {
    let result = [];

    function backtrack(open, close, str) {
        if (str.length === 2 * n) {
            result.push(str);
            return;
        }
        if (open < n) backtrack(open + 1, close, str + "(");
        if (close < open) backtrack(open, close + 1, str + ")");
    }
    backtrack(0, 0, "");
    return result;
}
console.log(generateParentheses(3));
```
⏳ **Time Complexity:** `O(2^N)`

---

## **8️⃣ Trie (Prefix Tree)**
📌 **Use case:** Fast search in a dictionary, autocomplete.  
✅ **Speeds up prefix-based searches.**

### **🔹 Example: Implement a Trie**
```js
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEnd;
    }
}
let trie = new Trie();
trie.insert("hello");
console.log(trie.search("hello")); // true
```
⏳ **Time Complexity:** `O(N)`

---

## **🔥 Summary: Which Pattern to Use?**
| **Pattern** | **Use Case** | **Time Complexity** |
|------------|------------|----------------|
| **Two Pointers** | Palindromes, reversing | `O(N)` |
| **Sliding Window** | Longest substring | `O(N)` |
| **Hashing (Map/Set)** | Anagrams, frequency count | `O(N)` |
| **Prefix Sum** | Balanced substrings | `O(N)` |
| **Sorting + Comparator** | Grouping words | `O(N log K)` |
| **KMP Algorithm** | String searching | `O(N)` |
| **Backtracking** | Generate all possible patterns | `O(2^N)` |
| **Trie (Prefix Tree)** | Dictionary lookup | `O(N)` |

Would you like **more problems** to practice with these patterns? 🚀