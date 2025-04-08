-   [Hoisting](#hoisting) *
    - Variable Hoisting
    - Temporal Dead Zone
    - Function Hoisting 
  
- Objects
- [ProtoTypes](#prototypes) *
  - Prototype Chaining
- class and constructor
- This Keyword *
  - Call, Apply and Bind *


- Pure Function
- First Class Function

- [Higher-Order Functions](#higher-order-functions) *

    
- Closure *
    - Lexical Environment    

- [CallBack Functions](#callback-functions) * 
- [Promises](#promises) *
    - Promise state: pending, fulfilled, rejected
    - How it works
    - Promise chaining
    - Promise Api's
- [Async-Await](#async-await) *

## What is Javascript?

JavaScript (JS) is a high-level, dynamic typed, multi-paradigm programming language used for client-side and server-side web development.

It is interpreted (JIT compiler) and executed in a browser or runtime environment (like Node.js) to enable interactive and asynchronous web functionalities.

Technical Features:

- Event-Driven and Non-Blocking: Uses an event loop to handle asynchronous operations without blocking the main thread.
- Prototype-Based Object Orientation: Implements inheritance and object manipulation using prototypes rather than classes (though ES6 introduced class syntax as syntactic sugar).
- Dynamically Typed: Variable types are determined at runtime.
- JIT Compilation: Uses Just-In-Time (JIT) compilers to improve execution speed.
- Garbage-Collected: Automatically manages memory allocation and deallocation.

## Hoisting

`Hoisting` refers to the process where the JavaScript interpreter moves declarations (ie, variable and function declarations) to the top of their containing scope during the compile phase. 

This means that a variable or function can be used before it has been declared in the code.

However, only the declarations are hoisted, not the initializations.

Note: JavaScript moves declarations (not initializations) to the top of their scope. var and function declarations are hoisted.

***Temporal Dead Zone(TDZ)***: It is a period within a scope where variables declared with let or const are inaccessible, and attempting to access them results in a ReferenceError. 

```js
    console.log(myVariable); // ReferenceError: Cannot access 'myVariable' before initialization
    let myVariable = "Hello";
```

### Hoisting of Variables

#### Using `var`

When using `var`, the variable declaration is hoisted to the top, but the initialization stays in place. The variable is initialized with `undefined` until the assignment is encountered.

**Example**:
```javascript
console.log(myVar); // Output: undefined
var myVar = 10;
console.log(myVar); // Output: 10
```

#### Using `let` and `const`

With `let` and `const`, the declarations are also hoisted to the top of their block scope, but they are not initialized until the line of code where they are declared. Accessing them before the declaration results in a `ReferenceError`.

**Example**:
```javascript
console.log(myLet); // Uncaught ReferenceError: Cannot access 'myLet' before initialization
let myLet = 20;

console.log(myConst); // Uncaught ReferenceError: Cannot access 'myConst' before initialization
const myConst = 30;
```
### Hoisting of Functions

#### Function Declarations

Function declarations are hoisted entirely, meaning both the function name and its definition are moved to the top of their scope.

**Example**:
```javascript
console.log(myFunction()); // Output: "Hello, World!"

function myFunction() {
    return "Hello, World!";
}
```

#### Function Expressions

Function expressions, whether assigned to a variable with `var`, `let`, or `const`, are not hoisted. This means the function definition remains at its place in the code.

**Example**:
```javascript
console.log(myFuncExpression()); // Uncaught TypeError: myFuncExpression is not a function

var myFuncExpression = function() {
    return "Hi, there!";
};
```
## ProtoTypes

In JavaScript, a **prototype** is an object that serves as a blueprint for other objects. 

It allows objects to inherit properties and methods from other objects, enabling reusability and efficient memory usage.

we can add properties and methods to the prototype of an object using `prototype` keyword, which will be shared by all instances of that object.

### Example: Prototypes in Action

```javascript
// Step 1: Create a constructor function
function Person(name, age) {
    this.name = name; // Instance property
    this.age = age;   // Instance property
}

// Step 2: Add a method to the prototype
Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Step 3: Create instances
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

// Both instances can access the prototype method
person1.greet(); // Output: Hello, my name is Alice and I am 30 years old.
person2.greet(); // Output: Hello, my name is Bob and I am 25 years old.

// Step 4: Check the prototype chain
console.log(person1.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(person1) === Person.prototype); // true
```
### Prototype Chaining
- If a property or method is not found directly on the object, JavaScript looks for it in the object's prototype.
  
- This continues up the chain until the property/method is found or the chain ends with `null`.

## Higher-Order Functions

- A higher-order function is a function that takes a function as an argument 
- or returns a function as a result.

1. Takes one or more functions as arguments
   ```js
   function calculate(operationCallback, a, b) {
     return operationCallback(a, b);
   }

   function add(a, b) {
     return a + b;
   }

   function sub(a, b) {
     return a - b;
   }

   const result = calculate(add, 3, 4);
   const result2 = calculate(sub, 7, 3);

   console.log(result); // 7
   console.log(result2); // 4
   ```
2. Returns a function as its result
```js
function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  }
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
```
#### Built-in Higher-Order Functions

- `map()`
- `filter()`
- `reduce()`
- `forEach()`
- `find()`
- `findIndex()`
- `some()`
- `every()`
- `sort()`    

## What is Closure?

A closure in JavaScript is a function that can access variables from its outer scope even after the outer function has finished execution. 

It "remembers" these variables, allowing it to use them later.  

Closures are created automatically every time a when we create a function in JavaScript.

```js

function counter(){
  let count = 0;
  // here the variable of outer scope is accessble by inner function 
  return function(){
    return count++;
  }
}

// after outer function finished execution
let makeCount = counter();

console.log(makeCount());
console.log(makeCount());
console.log(makeCount());
```
Here we make two counters: counter and counter2 using the same makeCounter function.

Are they independent? What is the second counter going to show? 0,1 or 2,3 or something else?
```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
//independent counters 
alert( counter2() ); // 0
alert( counter2() ); // 1
```
Reason: 
```
Functions counter and counter2 are created by different invocations of makeCounter.

So they have independent outer Lexical Environments, each one has its own count.
```

Why we need Closure?

***Data Encapsulation and Privacy:***
Closures allow you to create private variables and methods within a function scope, hiding them from the global scope and preventing unintended external access. This promotes modularity and maintainability by encapsulating data and logic within functions. 

***Maintaining State:***
Closures enable functions to retain access to variables from their outer scope, even after the outer function has finished executing, allowing you to maintain state between function calls. 

***Event Handling:***
Closures are essential for event handlers in web development, allowing you to attach functions to events while retaining access to the surrounding scope and data, which is particularly useful for data encapsulation and avoiding global variables. 

***Higher-Order Functions:***
Closures are fundamental to creating higher-order functions, where functions can be dynamically created and configured, allowing for the simple generation of functions with preset states. 

***Currying:***
Closures are used to implement currying, a technique where a function that takes multiple arguments is transformed into a sequence of functions that each take a single argument. 

### Lexical Environment
Lexical Environment is a runtime data structure that holds variable bindings (name-value pairs) and manages the scope of variables during code execution. 

It consists of two main parts:

- Environment Record: an object that stores all local variables as its properties (and some other information like the value of this).

- Outer Lexical Environment Reference: A link to the parent environment, enabling access to variables in outer scopes.
    
### Real World Example - Closures
---

### Example: Logging with Custom Prefix

```javascript
function createLogger(prefix) {
    return (message) => {
        console.log(`[${prefix}] ${message}`);
    };
}

// Example usage
const infoLogger = createLogger('INFO');
const errorLogger = createLogger('ERROR');

infoLogger('Server started'); // Outputs: [INFO] Server started
errorLogger('Unable to connect to the database'); // Outputs: [ERROR] Unable to connect to the database
```

---

### How It Works:
1. **Closure**: The `createLogger` function captures the `prefix` variable when it’s called.
2. **Custom Functionality**: Each returned function remembers the `prefix` value and uses it in the `console.log`.
3. **Reusability**: The same function (`createLogger`) creates loggers with different prefixes for various parts of an application.

---

### Practical Application:
You can use this in a larger app to create loggers with specific contexts, such as debugging, warnings, or error tracking.

## CallBack Functions
A callback is a function passed as an argument to another function and executed later.

Callbacks are a way to handle asynchronous operations/tasks like 
- Network requests, 
- File operations like read and write, 
- Database queries, or 
- User interactions in JavaScript.

scenario:`Greeting user`

```js
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

function sayThanks() {
  console.log('Thank you for visiting again!');
}

greet('Alice', sayThanks);
// Output: Hello, Alice!
//        Thank you for visiting again!

```

`Real use case of callback`

```js
function fetchData(url, callback) {
  console.log(`Fetching data from ${url}`);

  setTimeout(() => {
    const data = {
      name: 'John',
      age: 30
    };
    
    console.log(`Data fetched: ${data}`);

    if (callback) {
      callback(data); 
    }   
  })
}

fetchData('https://api.example.com/data', (data) => {
  console.log('Data received:', data);
});

  
```

### **What is Callback Hell?**  

Callback hell happens when we use many nested callbacks in asynchronous code, making it difficult to read, understand, and maintain. It often looks like a pyramid or staircase of functions.

---

### **Example of Callback Hell**  
Imagine we need to do 3 tasks in order:
1. Get user details.
2. Fetch their orders.
3. Send them a confirmation email.

In **callback hell**, it looks like this:

```javascript
getUserDetails("userID", (user) => {
  fetchOrders(user, (orders) => {
    sendConfirmation(orders, (message) => {
      console.log(message);
    });
  });
});
```

---

### **Problem with Callback Hell**
- **Hard to Read**: Too many layers of nested functions.
- **Hard to Fix**: Debugging or changing the code is confusing.

---

### **How to Fix It?**
Use **Promises** or **Async/Await** to make the code cleaner.

#### **Using Promises**
```javascript
getUserDetails("userID")
  .then((user) => fetchOrders(user))
  .then((orders) => sendConfirmation(orders))
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

#### **Using Async/Await**
```javascript
async function handleTasks() {
  try {
    const user = await getUserDetails("userID");
    const orders = await fetchOrders(user);
    const message = await sendConfirmation(orders);
    console.log(message);
  } catch (error) {
    console.error(error);
  }
}

handleTasks();
```

---

### **Simple Analogy**  
Callback hell is like writing instructions in a messy way. Fixing it with Promises or Async/Await is like organizing those instructions step by step, so they’re easy to follow.

## Promises

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. 

It provides a clean way to write asynchronous code, avoiding the pitfalls of callback hell by chaining asynchronous operations.

Terms:
Eventual Completion:

- Instead of getting the result right away, the result of the task will be available at some point in the future. The exact time of completion is unknown when the task is started.

- Once the task completes (either successfully or with an error), the Promise will be settled, and you can handle the result.

States of a Promise :
- **Pending**: The task is still running.
- **Resolved** (Fulfilled): The task completed successfully.
- **Rejected**: Something went wrong, and the task failed.

How it Works:

1. Creating a Promise:
   - You create a promise by using new Promise(). It takes a function with two parameters: resolve (for success) and reject (for failure).

2. Using the Promise:
   - You can use .then() for when it’s resolved and .catch() for when it’s rejected.

***Create a Promise:***
```javascript
const task = new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
        const success = true; // Simulate success or failure
        if (success) {
            resolve('Operation was successful!');
        } else {
            reject('Operation failed!');
        }
    }, 1000);
});
```
***Using the Promise:***
```javascript
task
  .then(result => {
        console.log(result); // 'Operation was successful!'
    })
    .catch(error => {
        console.error(error); // 'Operation failed!'
    })
    .finally(() => {
        console.log('Promise has been settled.');
    });
```

### Promise Chaining

Promise chaining is a technique in JavaScript where we connect multiple `.then()` handlers together to handle the results of asynchronous tasks sequentially. Each `.then()` passes its resolved value to the next `.then()` in the chain, creating a smooth flow of execution.

### **Why Use Promise Chaining?**  
1. To handle multiple asynchronous operations in sequence.
2. To avoid **callback hell**.
3. To manage dependencies between operations cleanly.

---

### **How Promise Chaining Works**  
1. Each `.then()` returns a new promise.
2. The result of one `.then()` is passed as input to the next `.then()`.

---

### **Example: Fetching Data in Steps**
Imagine you:
1. Get user details.
2. Fetch their orders.
3. Send a thank-you message.

Here’s how you can chain these tasks:

```javascript
getUserDetails("userID")
  .then((user) => {
    console.log("User Details:", user);
    return fetchOrders(user); // Pass the user data to the next task
  })
  .then((orders) => {
    console.log("User Orders:", orders);
    return sendThankYou(orders); // Pass the orders to the next task
  })
  .then((message) => {
    console.log(message); // Final output
  })
  .catch((error) => {
    console.error("Error:", error); // Handle any errors in the chain
  });
```
---

### **Detailed Analogy**  
Think of it as passing a task down a production line:  
- **Step 1**: Get raw materials (user details).  
- **Step 2**: Process the materials (fetch orders).  
- **Step 3**: Finalize the product (send a thank-you).  
- If any step fails, the error stops the process, and `catch()` handles it.

---
Note: If our task1, task2 and task3 are depending with each other.Best way to handle it - Promise Chaining or Async/Await(Recommended)

### Promise Api's

- Promise.all()
- Promise.allSettled()
- Promise.race()
- Promise.any()
- Promise.resolve()
- Promise.reject()


The **Promise API** in JavaScript provides various methods to work with promises effectively. These methods allow you to combine, resolve, or reject promises in different ways based on your use case.

---

### **1. Promise.all()**
- Waits for **all promises** in an array to resolve.
- If any promise is rejected, the entire method is rejected.
- Used when you want all tasks to complete before proceeding.

#### Example:
```javascript
const promise1 = Promise.resolve(10);
const promise2 = Promise.resolve(20);
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // [10, 20, 30]
  })
  .catch((error) => {
    console.error("One of the promises failed:", error);
  });
```

---

### **2. Promise.allSettled()**
- Waits for **all promises** to either resolve or reject.
- Returns an array with the status (`fulfilled` or `rejected`) and value for each promise.
- Used when you want to know the result of each promise regardless of failure.

#### Example:
```javascript
const promise1 = Promise.resolve("Success");
const promise2 = Promise.reject("Error");
const promise3 = Promise.resolve("Another Success");

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  console.log(results);
  // [
  //   { status: "fulfilled", value: "Success" },
  //   { status: "rejected", reason: "Error" },
  //   { status: "fulfilled", value: "Another Success" }
  // ]
});
```

---

### **3. Promise.race()**
- Returns the result of the **first promise** that resolves or rejects.
- Used when you want the fastest result.

#### Example:
```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 500));

Promise.race([promise1, promise2]).then((result) => {
  console.log(result); // "Second" (whichever resolves first)
});
```

---

### **4. Promise.any()**
- Returns the result of the **first promise that resolves**.
- If all promises reject, it throws an `AggregateError`.

#### Example:
```javascript
const promise1 = Promise.reject("Error 1");
const promise2 = Promise.reject("Error 2");
const promise3 = Promise.resolve("Success");

Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log(result); // "Success"
  })
  .catch((error) => {
    console.error(error); // If all promises reject
  });
```

---

### **5. Promise.resolve()**
- Creates a promise that is **already resolved** with a given value.

#### Example:
```javascript
const promise = Promise.resolve(42);

promise.then((value) => {
  console.log(value); // 42
});
```

---

### **6. Promise.reject()**
- Creates a promise that is **already rejected** with a given reason.

#### Example:
```javascript
const promise = Promise.reject("Error occurred");

promise.catch((error) => {
  console.error(error); // "Error occurred"
});
```

---

### **Summary Table**

| Method             | Description                                                                     |
|--------------------|---------------------------------------------------------------------------------|
| `Promise.all()`     | Resolves when all promises resolve, rejects if any promise rejects.            |
| `Promise.allSettled()` | Resolves with results of all promises, regardless of resolve/reject.         |
| `Promise.race()`    | Resolves or rejects with the first promise to complete.                        |
| `Promise.any()`     | Resolves with the first promise to resolve, rejects only if all promises reject.|
| `Promise.resolve()` | Returns a promise that is already resolved.                                    |
| `Promise.reject()`  | Returns a promise that is already rejected.                                    |

---

### **When to Use What**
- Use `Promise.all()` when **all tasks must succeed**.
- Use `Promise.allSettled()` when you care about **all results**, even if some fail.
- Use `Promise.race()` when you need the **fastest result**.
- Use `Promise.any()` when you care about the **first success**, ignoring failures.

## Async-Await

`async` and `await` are syntactic sugar built on top of Promises. They simplify writing and reading asynchronous code, making it look more like synchronous code.

---

### **What is `async`?**
- The `async` keyword is used to define a function that always returns a **Promise**.
- It makes it easier to work with promises.
- Inside an `async` function, you can use the `await` keyword.

#### Example:
```javascript
async function greet() {
  return "Hello, World!";
}

greet().then((message) => {
  console.log(message); // "Hello, World!"
});
```
Even though the function `greet()` looks like it's returning a value, it actually returns a promise.

---

### **What is `await`?**
- The `await` keyword can only be used inside `async` functions.
- It pauses the execution of the `async` function until the promise is resolved (or rejected).
- Once the promise resolves, `await` gives you the resolved value of that promise.

- It maintain the sequence of promises. like Task1,Task2,Task3 are executed one after another. If it outputs depending on each other.
  
#### Example:
```javascript
async function fetchData() {
  const data = await Promise.resolve("Data received");
  console.log(data); // "Data received"
}

fetchData();
```

---

### **How Async and Await Work Together**
They simplify the process of chaining promises and handling asynchronous operations.

#### Real-World Example:
Suppose you want to:
1. Fetch user details.
2. Fetch the user's orders based on the user details.
3. Process those orders.

Here's how it works with `async` and `await`:

```javascript
function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("User Details"), 1000);
  });
}

function fetchOrders(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Orders for ${user}`), 1000);
  });
}

async function processOrders() {
  console.log("Fetching user...");
  const user = await fetchUser(); // Pauses here until resolved
  console.log(user);

  console.log("Fetching orders...");
  const orders = await fetchOrders(user); // Pauses here until resolved
  console.log(orders);

  console.log("All tasks completed!");
}

processOrders();
```

---

### **Output**
```plaintext
Fetching user...
User Details
Fetching orders...
Orders for User Details
All tasks completed!
```

---

### **Key Points**
1. **Async functions return a promise**:
   - You can use `.then()` on them if you want.
2. **Await pauses execution**:
   - It stops the `async` function at that point until the promise resolves.
3. **Error handling is easier**:
   - Use `try-catch` to handle errors in async/await.

---

### **Why Use Async/Await?**
- Makes code easier to read and maintain.
- Avoids deeply nested `.then()` and `.catch()` blocks (i.e., callback hell).
- Clean error handling with `try-catch`.

---

## ES6 (ECMAScript 2015)

ES6 (also known as **ECMAScript 6** or **ECMAScript 2015**) is a major update to JavaScript that introduced many powerful and much-needed features to the language. It was finalized in **June 2015** and significantly improved how developers write and organize JavaScript code.

Let’s break it down in detail:

---

## 📌 **What is ECMAScript (ES)?**

**ECMAScript** is the standard specification that JavaScript follows. JavaScript is an implementation of ECMAScript.

- ES5: Published in 2009 (widely supported by all browsers).
- **ES6 (ECMAScript 2015):** Major upgrade with new syntax and features.
- ES7, ES8, …: Incremental updates released yearly after ES6.

---

## 🚀 **Key Features of ES6 (ECMAScript 2015)**

### 1. **`let` and `const`**
Before ES6, we used only `var`. ES6 introduced `let` and `const` with **block scope**.

```js
let x = 10; // can be reassigned
const y = 20; // cannot be reassigned
```

---

### 2. **Arrow Functions**
Shorter syntax and no binding of `this`.

```js
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```

---

### 3. **Template Literals**
Use backticks \``\` for strings. Supports interpolation.

```js
const name = "Aasif";
console.log(`Hello, ${name}!`); // Hello, Aasif!
```

---

### 4. **Default Parameters**
Set default values for function parameters.

```js
function greet(name = "Guest") {
  return `Hello, ${name}`;
}
console.log(greet()); // Hello, Guest
console.log(greet("Aasif")); // Hello, Aasif
```

---

### 5. **Destructuring Assignment**
Extract values from arrays or objects easily.

```js
const person = { name: "Aasif", age: 25 };
const { name, age } = person;

const arr = [1, 2];
const [a, b] = arr;
```

---

### 6. **Rest & Spread Operators**
- **Rest (`...`)**: Gathers values.
- **Spread (`...`)**: Spreads values.

```js
// Rest
function sum(...nums) {
  return nums.reduce((a, b) => a + b);
}

// Spread
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
```

---

### 7. **Enhanced Object Literals**
Shorthand property and method definitions.

```js
const name = "Aasif";
const person = {
  name, // same as name: name
  greet() {
    console.log("Hi!");
  }
};
```

---

### 8. **For...of Loop**
Simplifies iteration over iterable objects (like arrays).

```js
for (let value of [1, 2, 3]) {
  console.log(value);
}
```

---

### 9. **Classes**
A cleaner, more intuitive way to create objects and deal with inheritance.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```

---

### 10. **Promises**
Used for asynchronous operations. Replaces callback hell.

```js
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

### 11. **Modules (`import` / `export`)**
Allows code splitting and modular development.

```js
// file1.js
export const greet = () => "Hello";

// file2.js
import { greet } from './file1.js';
```

---

### 12. **Symbol Type**
New primitive type for unique identifiers.

```js
const sym = Symbol("id");
const obj = {
  [sym]: "value"
};
```

---

### 13. **Map and Set**
- `Map`: Key-value pairs with any type of key.
- `Set`: Collection of unique values.

```js
const map = new Map();
map.set("key", "value");

const set = new Set([1, 2, 2, 3]); // => {1, 2, 3}
```

---

## 🎯 Summary: Why ES6 Matters

| Feature | Benefit |
|--------|---------|
| `let` & `const` | Safer variable declarations |
| Arrow Functions | Shorter syntax, lexical `this` |
| Classes | OOP support |
| Promises | Easier async code |
| Modules | Better code organization |
| Template Literals | Easier string formatting |
| Destructuring | Cleaner syntax |
| Spread/Rest | Simpler handling of collections |

---