### **Introduction to Trees in Data Structures (DSA)**  

A **tree** is a hierarchical data structure used to represent relationships between elements. It consists of nodes connected by edges, with a special node called the **root** at the top.  

#### **Key Features of a Tree**  
- **Non-linear structure:** Unlike arrays or linked lists, trees organize data hierarchically.  
- **One-to-many relationship:** Each node can have multiple children but only one parent (except the root, which has no parent).  
- **Acyclic:** There are no cycles; every node is reachable from the root via a unique path.  

---

## **Basic Terminology**  

| Term        | Definition |
|-------------|------------|
| **Node** | A unit in the tree containing a value and references to its children. |
| **Root** | The topmost node in the tree. |
| **Parent** | A node that has child nodes. |
| **Child** | A node derived from another node (parent). |
| **Sibling** | Nodes that share the same parent. |
| **Leaf Node** | A node with no children. |
| **Depth** | The number of edges from the root to a node. |
| **Height** | The longest path from a node to a leaf. |
| **Degree** | The number of children a node has. |

---

## **Types of Trees**  

1. **Binary Tree**  
   - Each node has at most **two** children: **left** and **right**.
   
2. **Binary Search Tree (BST)**  
   - A binary tree where:  
     - Left subtree contains values **less than** the node.  
     - Right subtree contains values **greater than** the node.  

3. **Balanced Trees (AVL, Red-Black Tree)**  
   - Trees that self-balance to ensure search operations remain efficient.  

4. **Heap (Min-Heap / Max-Heap)**  
   - A complete binary tree where parent nodes follow a strict ordering property.  

5. **Trie (Prefix Tree)**  
   - Used for string searching; stores words character by character.  

6. **N-ary Tree**  
   - Each node can have up to **N** children (instead of just 2 in a binary tree).  

---

## **Binary Tree Implementation in JavaScript (ES6)**  

### **1. Defining a Tree Node**  
```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

### **2. Binary Search Tree (BST) Implementation**  

```js
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // Search for a value in the BST
  search(value) {
    let current = this.root;
    while (current) {
      if (current.value === value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // In-order Traversal (Left -> Root -> Right)
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.value);
      this.inorder(node.right, result);
    }
    return result;
  }
}

// Example Usage
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(2);
console.log(bst.inorder()); // Output: [2, 5, 10, 15]
console.log(bst.search(10)); // Output: true
console.log(bst.search(20)); // Output: false
```

---

## **Tree Traversal Methods**  

### **1. Depth-First Search (DFS)**
   - **Inorder (Left → Root → Right)**  
   - **Preorder (Root → Left → Right)**  
   - **Postorder (Left → Right → Root)**  

### **2. Breadth-First Search (BFS) (Level Order Traversal)**  
```js
bfs() {
  if (!this.root) return [];
  let queue = [this.root];
  let result = [];
  
  while (queue.length) {
    let node = queue.shift();
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
}
```

---

## **Time Complexity of Tree Operations**  

| Operation | Best Case | Average Case | Worst Case |
|-----------|-----------|-------------|------------|
| **Search** | O(log N) | O(log N) | O(N) (Skewed Tree) |
| **Insert** | O(log N) | O(log N) | O(N) |
| **Delete** | O(log N) | O(log N) | O(N) |

---

## **Conclusion**  
- Trees are used in databases, file systems, AI, and more.  
- Understanding **BST, AVL, Trie, and Heap** is crucial for coding interviews.  
- **Traversals (DFS & BFS)** are key techniques in tree processing.  

# What it mean by O(log n).

### **How to Calculate O(log N) in Time Complexity?**  

To determine if an algorithm runs in **O(log N)** time complexity, you need to check if the input size **reduces by a factor** (usually half) in each step.  

---

## **Step 1: Identify the Growth Pattern**  
If the problem size **N** is reduced to **N / K** (for some constant K, usually 2) in each step, then the time complexity is **O(logₖ N)**.  
- If **K = 2** (dividing by 2 each time), the complexity is **O(log₂ N)**.  
- If **K = 10** (dividing by 10 each time), the complexity is **O(log₁₀ N)**.  

However, we typically drop the base in Big-O notation and simply write **O(log N)**.

---

## **Step 2: Use the Mathematical Approach**  

1. Let’s assume an algorithm reduces **N** by half every step:  
   ```
   N → N/2 → N/4 → N/8 → ... → 1
   ```
2. After **k** steps, the remaining size is 1:  
   ```
   N / 2^k = 1
   ```
3. Solve for **k** (number of steps):  
   ```
   2^k = N
   ```
   ```
   k = log₂(N)
   ```
4. Since Big-O notation ignores constants, we write it as:  
   **O(log N)**  

---

## **Example 1: Binary Search**  
Binary Search **halves** the array size in each step.

For an array of **N = 16** elements:  
| Step | Remaining Elements |
|------|--------------------|
| 1    | 16 / 2 = 8        |
| 2    | 8 / 2 = 4         |
| 3    | 4 / 2 = 2         |
| 4    | 2 / 2 = 1         |

Since it takes **log₂(16) = 4** steps, the complexity is **O(log N)**.

---

## **Example 2: Tree Height in a Balanced BST**  
A balanced binary search tree (BST) has at most **log₂(N)** height.  
For **N = 16** nodes, the height (levels) is:  
```
log₂(16) = 4
```
So searching takes at most **4** steps, meaning **O(log N)**.

---

## **Example 3: Heap Insert/Delete (O(log N))**  
A **binary heap** is a **complete binary tree**, where inserting or deleting an element involves **moving up/down the tree**.

- Inserting an element in a **Min Heap**:
  - The element moves **up** at most **log₂(N)** levels.
- Deleting the root (heapify operation):
  - The last element moves **down** at most **log₂(N)** levels.

So both operations are **O(log N)**.

---

## **How to Calculate Logarithmically Growing Complexity?**  

If an algorithm:  
✅ **Halves the problem size each step** → O(log N)  
✅ **Divides the problem into multiple parts (but not O(N) divisions)** → O(log N)  
✅ **Uses a tree or hierarchical structure** → O(log N)  


