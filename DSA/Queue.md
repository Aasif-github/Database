A **queue** is a linear data structure that follows the **FIFO (First In, First Out)** principle. The most common operations in a queue are:  

- **Enqueue**: Add an element to the end of the queue.  
- **Dequeue**: Remove and return the element from the front of the queue.  
- **Peek (Front)**: Return the front element without removing it.  
- **isEmpty**: Check if the queue is empty.  
- **Size**: Return the number of elements in the queue.  

---

### **1. Queue Implementation Using an Array (Simple Approach)**
```javascript
class Queue {
  constructor() {
    this.queue = [];
  }

  // Enqueue operation
  enqueue(element) {
    this.queue.push(element);
  }

  // Dequeue operation
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue Underflow");
      return null;
    }
    return this.queue.shift();
  }

  // Peek operation
  peek() {
    return this.isEmpty() ? null : this.queue[0];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.queue.length === 0;
  }

  // Get the size of the queue
  size() {
    return this.queue.length;
  }

  // Print the queue
  printQueue() {
    console.log(this.queue.join(" -> "));
  }
}

// Usage
const myQueue = new Queue();
myQueue.enqueue(10);
myQueue.enqueue(20);
myQueue.enqueue(30);
myQueue.printQueue(); // Output: 10 -> 20 -> 30

console.log("Front Element:", myQueue.peek()); // Output: 10

console.log("Dequeued Element:", myQueue.dequeue()); // Output: 10
myQueue.printQueue(); // Output: 20 -> 30
```

---
### **2. Queue Implementation Using a Linked List (Optimized for Large Data)**
Using a **linked list** ensures that enqueue and dequeue operations take constant time **O(1)** without the overhead of shifting elements.

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  // Enqueue operation
  enqueue(value) {
    const newNode = new Node(value);
    if (!this.rear) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.length++;
  }

  // Dequeue operation
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue Underflow");
      return null;
    }
    const dequeuedValue = this.front.value;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.length--;
    return dequeuedValue;
  }

  // Peek operation
  peek() {
    return this.isEmpty() ? null : this.front.value;
  }

  // Check if the queue is empty
  isEmpty() {
    return this.length === 0;
  }

  // Get the size of the queue
  size() {
    return this.length;
  }

  // Print the queue
  printQueue() {
    let current = this.front;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }
}

// Usage
const queueLL = new Queue();
queueLL.enqueue(5);
queueLL.enqueue(15);
queueLL.enqueue(25);
queueLL.printQueue(); // Output: 5 -> 15 -> 25

console.log("Front Element:", queueLL.peek()); // Output: 5

console.log("Dequeued Element:", queueLL.dequeue()); // Output: 5
queueLL.printQueue(); // Output: 15 -> 25
```

---
### **Which Implementation to Use?**
| Approach | Pros | Cons |
|----------|------|------|
| **Array-based Queue** | Simple, easy to implement | Dequeue (`shift()`) is O(n) due to element shifting |
| **Linked List-based Queue** | Enqueue and Dequeue are O(1) | Uses extra memory for pointers |

If you need **fast and efficient enqueues/dequeues**, a **linked list-based queue** is better. For **smaller data structures**, an **array-based queue** works fine.

Would you like a **circular queue** implementation as well?