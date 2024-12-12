[LeetCode-150](https://leetcode.com/studyplan/top-interview-150/)

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

# 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum

```txt
You are given a 0-indexed array of integers nums.

A prefix nums[0..i] is sequential if, for all 1 <= j <= i, nums[j] = nums[j - 1] + 1. In particular, the prefix consisting only of nums[0] is sequential.

Return the smallest integer x missing from nums such that x is greater than or equal to the sum of the longest sequential prefix.

Example 1:

Input: nums = [1,2,3,2,5]
Output: 6
Explanation: The longest sequential prefix of nums is [1,2,3] with a sum of 6. 6 is not in the array, therefore 6 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
Example 2:

Input: nums = [3,4,5,1,12,14,13]
Output: 15
Explanation: The longest sequential prefix of nums is [3,4,5] with a sum of 12. 12, 13, and 14 belong to the array while 15 does not. Therefore 15 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
 

Constraints:

1 <= nums.length <= 50
1 <= nums[i] <= 50
```

```js
function findSmallestMissing(nums) {
    let sum = nums[0];
     
    let i = 1;

    // Find the longest sequential prefix
    while (i < nums.length && nums[i] === nums[i - 1] + 1) {
        sum += nums[i];
        i++;
    }
    
    console.log(sum)
    
    // Find the smallest missing integer >= sum 
    // 
    while (nums.includes(sum)) {      
        sum++;
        console.log('inside:',sum) //13,14,15
    }

    return sum;
}

// Example usage:
// console.log(findSmallestMissing([1, 2, 3, 2, 5])); // Output: 6
console.log(findSmallestMissing([3, 4, 5, 1, 12, 14, 13])); // Output: 15
```
# 121. Best Time to Buy and Sell Stock
```markdown 
12Dec24
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
 

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104
```
```js
// let prices = [7,6,4,3,1];
let prices = [7,1,5,3,6,4]

function maxStockProfit(prices){
  
/**
 * @param {number[]} prices
 * @return {number}
*/

  let profit = 0
  let tempArr = 0;
  let result = [];  
  for(let i=0; i <= prices.length-1; i++){ 
    for(let j=i; j <= prices.length-1; j++){                  
      if(prices[i] <  prices[j]){        
        profit = prices[j] - prices[i];         
        result.push(profit);
      }       
    }  
  }  
  tempArr = result.sort((a,b) => a - b);
  return result.length == 0 ? 0 : tempArr.at(-1);
};

let profit = maxStockProfit(prices)
console.log(profit)
```
!NOTE: The error FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory occurs when your Node.js application runs out of memory. This often happens when the application attempts to allocate more memory than the allowed heap size for the Node.js process.

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let minPrice = Infinity; // Track the minimum price encountered so far
  let maxProfit = 0; // Track the maximum profit

  for (let i = 0; i < prices.length; i++) {
    // Update the minimum price if the current price is lower
    if (prices[i] < minPrice) {
        
      minPrice = prices[i];
    } else {
      // Calculate the profit if we sell at the current price
      let profit = prices[i] - minPrice;
      // Update the maximum profit
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
};
console.log('profit',maxProfit([7, 1, 5, 3, 6, 4])); // Output: 5 (Buy at 1, Sell at 6)
// console.log(maxProfit([7, 6, 4, 3, 1])); // Output: 0 (No profit possible)

```