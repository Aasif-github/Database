## What is Nodejs?
Node.js is a runtime environment that allows us to run JavaScript code on the server side. Built on Google Chrome's V8 JavaScript engine.

It provides an event-driven, non-blocking I/O model that makes it well-suited for real-time applications and high-throughput systems.

## What is Runtime Environment?
- A runtime environment is a software layer that supports the execution of programs by providing the necessary Execution Engine(V8 engine), Memory management, and System Api's. 
- It acts as an abstraction layer between the application code and the underlying hardware or operating system.

Example:
Node.js Runtime Environment: Executes JavaScript code outside a browser and includes built-in modules like fs for file operations and http for networking.

## What is Asynchronous and Synchronous ?

Asynchronous refers to a non-blocking execution model where tasks are initiated and allowed to proceed independently. 

Instead of waiting for a task to complete, the program can continue executing other tasks, and when the asynchronous task finishes, it signals back (via callbacks, promises, or events) to handle the result.

`Non-Blocking Task` - It does not block the main thread or process.  

Example: File Read/Write, Network Requests, Database Queries, etc.

```js
const fs = require('node:fs');

console.log('start');

setTimeout(() => {
            console.log("Task complete");
}, 1000);

fs.readFile('file.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data);
})

console.log('end');
// Output: start, end, Task complete
```

## Synchronous means

In programming, **synchronous** means tasks are executed **sequentially**, one after the other. The program waits for each task to complete before moving on to the next one. If a task takes time, the entire program execution is paused until that task finishes.


```js
const fs = require('node:fs');

console.log('start');

fs.readFileSync('file.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data.toString());
})

console.log('end');

// Output: start, file content, end
```

## Is Nodejs is Single Threaded?

Yes, Node.js is single-threaded. It uses a single thread(main thread) to handle the execution of JavaScript code in the event loop.

But, This is not completly true. When it comes to handle CPU-intensive tasks,like querying databases or making network requests, Node.js offload task to Libuv (underlying C++-based libuv library). Libuv uses a thread pool/worker pool(default size: 4 threads) to handle these tasks in the background. 


## What is Event Driven Architecture?
Event-Driven Architecture (EDA) is a design pattern in which systems or applications communicate and operate based on events. 
An event is any significant change in state or occurrence, such as a user action (clicking a button), a system signal (file uploaded), or a message from another system (order received).

## What is Nodejs Event Loop?
The event loop is a mechanism that enables Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel whenever possible. This allows Node.js to handle multiple operations concurrently without blocking the execution of other code.

```javascript
console.log('start');

setTimeout(() => {
    console.log('from settimeout');
}, 2000);

Promise.resolve('from promise').then((value) => {
    console.log(value);
});

console.log('end');
```
1. The script is executed line by line using the V8 engine. Synchronous code is handled immediately in the call stack by the main thread.

2. When the `setTimeout` is encountered, its callback is registered in the **macrotask queue**, and the timer starts counting down (2 seconds).

3. The `Promise.resolve` is handled asynchronously, and its `.then()` callback is queued in the **microtask queue**, which has **higher priority** than the macrotask queue.

4. Once the synchronous code (`console.log('end')`) finishes, the event loop processes the **microtask queue** first, executing the `.then()` callback.

5. Finally, after the microtasks are cleared, the event loop moves to the **macrotask queue**, where it executes the `setTimeout` callback.

This priority handling between microtasks and macrotasks ensures that `from promise` is logged before `from settimeout`.

## What are the ways to take response from users in Nodejs?

1. Body
```json
   {
       "name": "John",
       "age": 30
   }
```

```javascript
app.post('/users', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    res.send(`Name: ${name}, Age: ${age}`);
})
```
2. Query Params
```lua
GET | http://localhost:3000/users?name=John&age=30
```

```javascript
app.get('/users', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.send(`Name: ${name}, Age: ${age}`);
})
```
3. Route Params
```lua
GET | http://localhost:3000/users/123
```
```js
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.send(`User ID: ${id}`);
})
```

## What is Event-emmiter in Nodejs?

- Event-emitter is a class in Node.js that allows you to create and manage events. 

- It is a part of the core Node.js library and is used to handle asynchronous operations in Node.js.

- It is a part of event module and allow object to communicate asynchronously by emitting and listening to events.

```javascript
const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Register an event listener for the event greet
eventEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the 'greet' event
eventEmitter.emit('greet', 'Alice'); // Output: Hello, Alice!
```

## What is Buffer in Nodejs?

In nodejs, a Buffer is a temporary storage area for handle binary data.

- Buffers are used to store data that is not a string, such as images, audio, or video data.

- Buffers are used to store data in a memory area that is not associated with a file or other permanent storage location.

- Buffers are designed to work with raw binary data, such as audio and video data, without having to worry about the encoding or decoding of the data. and make them useful when working with streams, which are used to handle large amounts of data.
```js
const buffer = Buffer.from('hello world');
console.log(buffer.toString()); // Output: hello world

-- OR

const fs = require('fs');

fs.readFile('file.jpg', (err, data) => {
    if (err) throw err;
    const buffer = Buffer.from(data);
    console.log(buffer);
});
```

## What is streams in Nodejs?

Streams are the Objects that allows us to read data from a source or write data to a destination.
continuously in chunks, without loading the entire file into memory at once.

This makes streams efficient for handling large amounts of data, such as files or other large data sources, in a way that is efficient and memory efficient.

```javascript
const fs = require('fs'); 

const readableStream = fs.createReadStream('file.txt');

readableStream.on('data', (chunk) => {
    console.log(chunk.toString());  
})

readableStream.on('end', () => {
    console.log('File read complete');  
})
readableStream.on('error', (err) => {
    console.log(err);
})
```
### Real World Example
### **🌍 Real-World Example: Streaming Large Files in a Node.js API**  

Imagine you have a **video streaming** service like **YouTube or Netflix**. Instead of loading an entire video file into memory (which would crash the server), **Node.js streams** allow you to serve videos in chunks efficiently.

---

### **📌 Scenario**  
- A client requests a **large video file**.  
- Instead of sending the whole file at once, we **stream it chunk by chunk**.  
- This reduces **memory usage** and improves **performance**.  

---

### **🚀 Video Streaming API with Node.js and Express**
```js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/video", (req, res) => {
  const filePath = path.join(__dirname, "big-video.mp4");
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  // Get the range header from request
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Requires Range header");
  }

  // Parse the range
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;

  // Create read stream for requested chunk
  const fileStream = fs.createReadStream(filePath, { start, end });

  // Set headers for streaming
  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": "video/mp4",
  });

  // Pipe the video chunk to response
  fileStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **🔹 How This Works**
1. The client sends a request with a **Range Header** (e.g., `Range: bytes=0-999999`).
2. The server reads **only the requested portion** of the file using `fs.createReadStream()`.
3. It sets the necessary **streaming headers** (`Content-Range`, `Accept-Ranges`).
4. The **video file is streamed** chunk by chunk instead of loading the entire file into memory.

---

### **🔥 Why Use Streams for Video?**
✅ **Efficient Memory Usage** – Doesn't load the entire file into RAM.  
✅ **Faster Streaming** – The client can start watching **immediately** instead of waiting for the full download.  
✅ **Resumable Playback** – Supports seeking within the video file using **range requests**.  

---
### **📌 Where This is Used in the Real World?**
- **YouTube, Netflix, Amazon Prime Video** – Streaming video content.  
- **Spotify, Apple Music** – Streaming audio.  
- **Cloud Storage Services** – Large file downloads (Google Drive, Dropbox).  


## Nodejs Security

1. Prevent Injection Attacks
   - Use `ORM`/`ODM` libraries (e.g., Sequelize, Mongoose) for database operations.

2. Use Validation and Sanitization
   - Use libraries like `Joi` or `Express Validator` to enforce strict validation rules.
   - Sanitize user inputs to prevent SQL or NoSQL injection.

3. Use Secure HTTP Headers
   - Use `Helmet.js` to set security-related HTTP headers.        

4. Protect Sensitive Data
  - Store sensitive data like API keys, database credentials, and secrets in `.env` files or use services like AWS Secrets Manager or Azure Key Vault.
  
5. Protect against Denial of Service (DoS)
   - Use rate limiting to prevent overloading the server.
 
6. Use Authentication and Authorization
 - Use `JWT (JSON Web Tokens)` or `OAuth 2.0` for stateless authentication.

7. Use CORS policies
 - Restrict CORS policies to trusted domains.

8. Use `Winston` and `morgan` for detailed logging. monitor logs for suspicious activity and implement alerts for anomalies.

9. Avoid Information Leak
  - Hide stack traces or other sensitive information in error responses.

  - Disable the `x-powered-by` header
```javascript
app.disable('x-powered-by');
```
  - handle errors
```javascript
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal Server Error' });
  });   
```
## What is Event-Driven Architecture in Nodejs?
Node.js uses an event-driven architecture, meaning it listens for events (like a file upload or a user request) and runs specific functions (event handlers) to handle them when they occur. This makes it fast and efficient for handling multiple tasks.

Example
```javascript
const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Register an event listener
eventEmitter.on('dataReceived', (data) => {
  console.log(`Data received: ${data}`);
});

// Emit the event
eventEmitter.emit('dataReceived', 'Hello, Event-Driven Architecture!');
```

## Difference between require and import

The `require` keyword is used to load modules in Node.js, while the `import` keyword is used to load modules in ECMAScript modules (ESM).

`require` is sync, while `import` is async.


## What is middleware in Nodejs?
Middleware is a function that acts as a bridge between an **HTTP request and response**, enabling additional processing, like logging, authentication, or error handling, during the request-response cycle. It enhances modularity, reusability, and maintainability in Node.js applications.

a. Build-in middleware - morgan, cors, helmet.
b. Custom middleware - logger, auth, error handler


## What is CORS in Nodejs?
## **🚀 Cross-Origin Resource Sharing (CORS) - Explained with Examples**  

### **🔹 What is CORS?**  
CORS (**Cross-Origin Resource Sharing**) is a **security feature** in web browsers that controls how resources (APIs, fonts, images) can be **requested from a different domain** than the one serving the web page.  

By default, **browsers block cross-origin requests** for security reasons (known as the **same-origin policy**). CORS **relaxes** this restriction **safely** by allowing certain cross-origin requests.

---

### **🔹 When Does CORS Happen?**
**Scenario:**  
- You have a frontend running at **`http://frontend.com`**  
- You have a backend API running at **`http://api.com`**  
- If the frontend tries to fetch data from `http://api.com`, the **browser blocks the request** due to the **same-origin policy**.  

👉 **Solution?** Enable CORS on the backend!

---

### **🔹 How to Enable CORS in Node.js (Express API Example)**  
#### **✅ Using `cors` Middleware (Best Practice)**
```js
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

app.get("/data", (req, res) => {
    res.json({ message: "CORS enabled!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

#### **✅ Restrict CORS to Specific Origins**
```js
app.use(cors({
    origin: "http://frontend.com", // Only allow this origin
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));
```
🚀 **Now, only `http://frontend.com` can access the API!**

---

### **🔹 CORS Errors & Fixes**
#### ❌ **Error: "Blocked by CORS Policy"**
```
Access to fetch at 'http://api.com/data' from origin 'http://frontend.com' has been blocked by CORS policy.
```
✅ **Fix:**  
- Enable CORS on the backend (using `cors` middleware).  
- Allow specific origins or use `"*"` (allow all).  

#### ❌ **Error: "Preflight Request Blocked"**
- Happens for **non-simple requests** (e.g., `PUT`, `DELETE`, `PATCH`).
- Browser sends an **OPTIONS request** before the actual request.
✅ **Fix:**  
```js
app.options("*", cors()); // Handle preflight requests globally
```

---

### **🔹 Where is CORS Used?**
✅ **APIs & Microservices** – Allowing frontend apps to access backend APIs.  
✅ **CDNs (Content Delivery Networks)** – Serving fonts, images, scripts across domains.  
✅ **Third-Party Integrations** – Allowing APIs to be consumed by external apps.  

---

### **🔥 Final Thoughts**
- CORS is **a security feature** that prevents unauthorized cross-origin requests.  
- You must **enable CORS on the backend** to allow specific domains.  
- Use the `cors` middleware in **Express** for an easy fix.  

🚀 **Need more advanced CORS handling (e.g., JWT authentication, cookies)? Let me know!**


## What are the ways to take input/response from users in Nodejs?

In an **Express.js** application, user input is typically received via **HTTP requests**. Here are different ways to handle input in an Express server:

---

## 1️⃣ **Taking Input from Query Parameters**
📌 **Example: `/greet?name=John`**
```js
const express = require("express");
const app = express();

app.get("/greet", (req, res) => {
    const name = req.query.name || "Guest";
    res.send(`Hello, ${name}!`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```
🔹 **Access input**: `req.query.name`  
🔹 **URL Example**: `http://localhost:3000/greet?name=John`  
🔹 **Response**: `Hello, John!`

---

## 2️⃣ **Taking Input from Route Parameters**
📌 **Example: `/greet/John`**
```js
app.get("/greet/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
});
```
🔹 **Access input**: `req.params.name`  
🔹 **URL Example**: `http://localhost:3000/greet/John`  
🔹 **Response**: `Hello, John!`

---

## 3️⃣ **Taking Input from Request Body (JSON)**
📌 **Example: Send a POST request with JSON data**
```js
app.use(express.json()); // Middleware to parse JSON

app.post("/submit", (req, res) => {
    const { name } = req.body;
    res.send(`Hello, ${name}!`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```
🔹 **Access input**: `req.body.name`  
🔹 **Use a tool like Postman or `curl` to send a request:**
```sh
curl -X POST http://localhost:3000/submit -H "Content-Type: application/json" -d '{"name": "John"}'
```
🔹 **Response**: `Hello, John!`

---

## 4️⃣ **Taking Input from Form Data (`application/x-www-form-urlencoded`)**
📌 **Example: Handling HTML form submissions**
```js
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.post("/form-submit", (req, res) => {
    const { name } = req.body;
    res.send(`Hello, ${name}!`);
});
```
🔹 **HTML Form Example**:
```html
<form action="http://localhost:3000/form-submit" method="post">
    <input type="text" name="name" />
    <button type="submit">Submit</button>
</form>
```
🔹 **Access input**: `req.body.name`

---

## 5️⃣ **Taking Input from File Upload (Multer)**
📌 **Example: Uploading files using Multer**
```js
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
    res.send(`File uploaded: ${req.file.originalname}`);
});
```
🔹 **Upload using HTML Form**:
```html
<form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <button type="submit">Upload</button>
</form>
```
🔹 **Access uploaded file**: `req.file`

---

6️⃣ **Taking Input from Headers**
Handling Authorization Headers (Bearer Token)

📌 Example: Checking for an Authorization header
```js
app.get("/protected", (req, res) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    res.json({ message: "Access granted", token });
});
```
🔹 Request Example using curl

```sh
curl -X GET http://localhost:3000/protected -H "Authorization: Bearer my-secret-token"
```

🔹 Response
```json
{
    "message": "Access granted",
    "token": "my-secret-token"
}
```



## Summary: Best Use Cases
| Input Method | Use Case |
|-------------|---------|
| `req.query` | Short parameters (e.g., filters, search terms) |
| `req.params` | Unique identifiers (e.g., user ID, product ID) |
| `req.body` | Complex data (e.g., forms, JSON payloads) |
| `multer` | File uploads |

Let me know if you need further details! 🚀 