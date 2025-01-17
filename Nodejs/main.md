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
````

## What is Event-emmiter in Nodejs?

Event-emitter is a class in Node.js that allows you to create and manage events. It is a part of the core Node.js library and is used to handle asynchronous operations in Node.js.

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

## What is stream in Nodejs?

 

## What is Buffer in Nodejs?

 

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

## 

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
Middleware is a function that acts as a bridge between an HTTP request and response, enabling additional processing, like logging, authentication, or error handling, during the request-response cycle. It enhances modularity, reusability, and maintainability in Node.js applications.

a. Build-in middleware - morgan, cors, helmet.
b. Custom middleware - logger, auth, error handler
