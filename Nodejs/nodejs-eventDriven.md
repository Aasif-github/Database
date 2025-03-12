# How nodejs is event driven.

### **How Node.js is Event-Driven** 🚀  
Node.js is **event-driven** because it uses an **event loop** to handle asynchronous operations efficiently. Instead of blocking execution, Node.js reacts to events (like HTTP requests, I/O operations, or timers) using **callbacks, Promises, or async/await**.

---

## **1️⃣ Event Loop – The Heart of Event-Driven Node.js**
Node.js runs on **a single-threaded event loop** that handles multiple operations **asynchronously**.

🔹 **Example:** A blocking vs. non-blocking approach:

### **Blocking (Synchronous) Code**
```javascript
console.log("Start");
const result = fs.readFileSync('file.txt', 'utf8'); // Blocks execution
console.log(result);
console.log("End");
```
👉 **Problem:** The execution stops until `file.txt` is read.

---

### **Non-Blocking (Asynchronous) Code**
```javascript
import fs from 'fs';

console.log("Start");
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data); // Executes later
});
console.log("End");
```
✅ **Node.js doesn't wait for the file read operation to complete**—it continues execution, making it more efficient.

---

## **2️⃣ Built-in EventEmitter – Event-Driven Architecture**
Node.js has an **EventEmitter** class that allows components to communicate asynchronously.

### **Example: Custom Event Handling**
```javascript
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

// Listener (Subscriber)
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emitting an Event
eventEmitter.emit('greet', 'Aasif');
```
### **How It Works?**
1. `eventEmitter.on('greet', callback)` → Listens for the **"greet"** event.
2. `eventEmitter.emit('greet', 'Aasif')` → Triggers the event.

📌 **No direct function calls!** Services react to emitted events, making them **decoupled**.

---

## **3️⃣ Node.js is Event-Driven in Real-World Scenarios**
### **1. Handling HTTP Requests (Express.js)**
```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send("Hello, World!"); // Handles request asynchronously
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
✔ **Event:** `GET /`  
✔ **Listener:** Handles HTTP request  
✔ **Non-blocking:** The server stays responsive  

---

### **2. Real-Time Apps (Socket.io)**
```javascript
import { Server } from "socket.io";
const io = new Server(3000);

io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on('message', (msg) => {
        console.log("Received:", msg);
    });
});
```
✔ **Event:** `"connection"` (User joins)  
✔ **Event:** `"message"` (Chat message received)  
✔ **Event Loop processes requests asynchronously**

---

## **🔹 Summary: Why is Node.js Event-Driven?**
✅ **Event Loop** → Executes non-blocking I/O  
✅ **EventEmitter** → Built-in event-driven mechanism  
✅ **Asynchronous Callbacks** → Avoids blocking execution  
✅ **Real-Time Capabilities** → Ideal for chat apps, notifications, etc.  

Would you like a **deep dive into the Event Loop**? 🚀