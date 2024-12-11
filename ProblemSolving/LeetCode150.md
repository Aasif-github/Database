```text
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings. 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.
```

```js
//Method 1: 

function longestCommonPrefix(strs) {
    if (strs.length === 0) return ""; // No strings in the array

    // Sort the array to bring similar prefixes closer
    strs.sort();

    // Compare the first and last string only, as they will be the most dissimilar
    const first = strs[0];
    const last = strs[strs.length - 1];

    let i = 0;
    while (i < first.length && first[i] === last[i]) {
        i++;
    }

    return first.slice(0, i); // Common prefix
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""

// Method 2:

function longestCommonPrefix(strs) {
    if (strs.length === 0) return ""; // No strings in the array

    // Start with the first string as the prefix
    let prefix = strs[0];

    // Compare the prefix with each subsequent string
    for (let i = 1; i < strs.length; i++) {
        // Keep reducing the prefix until it matches the start of the current string
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1); // Remove the last character from the prefix
            if (prefix === "") return ""; // No common prefix
        }
    }

    return prefix;
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""
```