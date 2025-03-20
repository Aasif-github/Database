A **stack** is a linear data structure that follows the **LIFO (Last In, First Out)** principle. The most common operations in a stack are:  

- **Push**: Add an element to the top of the stack.  
- **Pop**: Remove and return the top element from the stack.  
- **Peek (Top)**: Return the top element without removing it.  
- **isEmpty**: Check if the stack is empty.  

### **Implementation of Stack using an Array in JavaScript**
```javascript
class Stack {
  constructor() {
    this.stack = []; // Initialize an empty array
  }

  // Push operation
  push(element) {
    this.stack.push(element);
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return null;
    }
    return this.stack.pop();
  }

  // Peek operation
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.stack[this.stack.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.length === 0;
  }

  // Get the size of the stack
  size() {
    return this.stack.length;
  }

  // Print the stack
  printStack() {
    console.log(this.stack.join(" -> "));
  }
}

// Usage
const myStack = new Stack();
myStack.push(10);
myStack.push(20);
myStack.push(30);
myStack.printStack();  // Output: 10 -> 20 -> 30

console.log("Top Element:", myStack.peek());  // Output: 30

console.log("Popped Element:", myStack.pop()); // Output: 30
myStack.printStack();  // Output: 10 -> 20
```

### **Implementation of Stack using a Linked List in JavaScript**
Instead of using an array, we can implement a stack using a **linked list** to optimize space complexity.

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null; // Top of the stack
    this.size = 0;
  }

  // Push operation
  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  // Pop operation
  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return null;
    }
    const poppedValue = this.top.value;
    this.top = this.top.next;
    this.size--;
    return poppedValue;
  }

  // Peek operation
  peek() {
    return this.isEmpty() ? null : this.top.value;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.size === 0;
  }

  // Print the stack
  printStack() {
    let current = this.top;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }
}

// Usage
const stackLL = new Stack();
stackLL.push(5);
stackLL.push(15);
stackLL.push(25);
stackLL.printStack(); // Output: 25 -> 15 -> 5

console.log("Top Element:", stackLL.peek());  // Output: 25

console.log("Popped Element:", stackLL.pop()); // Output: 25
stackLL.printStack(); // Output: 15 -> 5
```

### **Which Implementation to Use?**
| Approach | Pros | Cons |
|----------|------|------|
| **Array-based Stack** | Simple, fast operations (push/pop are O(1)) | Fixed size (if using a fixed-size array), resizing overhead |
| **Linked List-based Stack** | Dynamic size, no need to resize | Extra memory needed for pointers |

Would you like an implementation with custom stack limits or additional features?