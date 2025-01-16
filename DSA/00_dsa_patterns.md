# Patterns in Data Structures and Algorithms
[20-essential-coding-patterns](https://dev.to/arslan_ah/20-essential-coding-patterns-to-ace-your-next-coding-interview-32a3)

Here’s a detailed list of **patterns and types** commonly used in solving Data Structures and Algorithms (DSA) problems. These patterns act as templates or strategies that can be applied across various problem types:

---

### **1. Sliding Window**
- Used to find subarrays or substrings that meet specific criteria.
- **Applications:**
  - Maximum/minimum sum of subarray of size `k`.
  - Longest substring with at most `k` distinct characters.
- **Examples:**
  - LeetCode 3: Longest Substring Without Repeating Characters.
  - LeetCode 209: Minimum Size Subarray Sum.

---

### **2. Two Pointers**
- Uses two pointers to reduce time complexity for sorted or iterable data structures.
- **Applications:**
  - Finding pairs or triplets that meet a condition.
  - Removing duplicates.
- **Examples:**
  - LeetCode 167: Two Sum II - Input Array Is Sorted.
  - LeetCode 15: 3Sum.

---

### **3. Fast and Slow Pointers**
- Often used in linked lists to detect cycles or find the middle node.
- **Applications:**
  - Cycle detection (Floyd’s Tortoise and Hare).
  - Finding the middle of a linked list.
- **Examples:**
  - LeetCode 141: Linked List Cycle.
  - LeetCode 876: Middle of the Linked List.

---

### **4. Merge Intervals**
- Focuses on solving problems related to overlapping intervals.
- **Applications:**
  - Merging intervals.
  - Finding gaps or free time.
- **Examples:**
  - LeetCode 56: Merge Intervals.
  - LeetCode 435: Non-overlapping Intervals.

---

### **5. Subsets**
- Used to generate all subsets or combinations of a given set.
- **Applications:**
  - Subset generation.
  - Combination problems.
- **Examples:**
  - LeetCode 78: Subsets.
  - LeetCode 90: Subsets II.

---

### **6. Binary Search**
- Efficiently narrows down search space in sorted data.
- **Applications:**
  - Finding an element or condition in sorted arrays.
  - Searching in rotated sorted arrays.
- **Examples:**
  - LeetCode 704: Binary Search.
  - LeetCode 33: Search in Rotated Sorted Array.

---

### **7. Bit Manipulation**
- Solves problems using bitwise operators.
- **Applications:**
  - Finding unique elements.
  - Subset generation using bit masking.
- **Examples:**
  - LeetCode 136: Single Number.
  - LeetCode 78: Subsets (using bits).

---

### **8. Greedy Algorithms**
- Makes the locally optimal choice at each step.
- **Applications:**
  - Interval scheduling.
  - Minimum cost problems.
- **Examples:**
  - LeetCode 55: Jump Game.
  - LeetCode 435: Non-overlapping Intervals.

---

### **9. Divide and Conquer**
- Recursively breaks down a problem into smaller sub-problems.
- **Applications:**
  - Sorting algorithms like Merge Sort, Quick Sort.
  - Finding the maximum or minimum in an array.
- **Examples:**
  - LeetCode 53: Maximum Subarray.
  - Merge Sort and Quick Sort.

---

### **10. Backtracking**
- Explores all possible options recursively.
- **Applications:**
  - Permutations and combinations.
  - Solving mazes or puzzles.
- **Examples:**
  - LeetCode 46: Permutations.
  - LeetCode 51: N-Queens.

---

### **11. Dynamic Programming (DP)**
- Breaks problems into overlapping sub-problems.
- **Types:**
  - **Memoization (Top-Down):** Recursive with caching.
  - **Tabulation (Bottom-Up):** Iterative approach.
- **Applications:**
  - Fibonacci sequence.
  - Knapsack problem.
- **Examples:**
  - LeetCode 70: Climbing Stairs.
  - LeetCode 300: Longest Increasing Subsequence.

---

### **12. Tree Traversal**
- Focuses on traversing tree nodes.
- **Types:**
  - Inorder, Preorder, Postorder.
  - Level-order traversal.
- **Examples:**
  - LeetCode 94: Binary Tree Inorder Traversal.
  - LeetCode 102: Binary Tree Level Order Traversal.

---

### **13. Graph Algorithms**
- Solves problems on graphs like traversal and pathfinding.
- **Types:**
  - BFS, DFS.
  - Shortest Path: Dijkstra’s, Bellman-Ford.
  - Minimum Spanning Tree: Kruskal’s, Prim’s.
- **Examples:**
  - LeetCode 207: Course Schedule (Topological Sorting).
  - LeetCode 743: Network Delay Time.

---

### **14. Union-Find (Disjoint Set Union)**
- Used for connected components in a graph.
- **Applications:**
  - Detecting cycles.
  - Kruskal’s algorithm.
- **Examples:**
  - LeetCode 547: Number of Provinces.
  - LeetCode 323: Number of Connected Components in an Undirected Graph.

---

### **15. Heap (Priority Queue)**
- Maintains order dynamically with minimum/maximum priority.
- **Applications:**
  - Find top `k` elements.
  - Merge sorted arrays.
- **Examples:**
  - LeetCode 215: Kth Largest Element in an Array.
  - LeetCode 23: Merge k Sorted Lists.

---

### **16. Trie (Prefix Tree)**
- Special tree used for string searching.
- **Applications:**
  - Autocomplete systems.
  - Word search in a dictionary.
- **Examples:**
  - LeetCode 208: Implement Trie.
  - LeetCode 211: Add and Search Word.

---

### **17. Mathematical Patterns**
- Number theory, combinatorics, etc.
- **Applications:**
  - Prime numbers (Sieve of Eratosthenes).
  - Permutations and combinations.
- **Examples:**
  - LeetCode 204: Count Primes.
  - LeetCode 31: Next Permutation.

---

### **18. String Matching**
- Techniques for pattern matching.
- **Applications:**
  - Substring search.
  - Regular expressions.
- **Examples:**
  - LeetCode 28: Implement strStr().
  - LeetCode 242: Valid Anagram.

---

By mastering these patterns and types, you can confidently tackle most DSA problems with efficiency and clarity.