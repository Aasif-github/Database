# Closures

A closure in JavaScript is a function that can access variables from its outer scope even after the outer function has finished running. 

It "remembers" these variables, allowing it to use them later. Closures are automatically created whenever you define a function.

Lexical Scoping

Lexical scoping refers to how a parser resolves variable names when functions are nested. The location where a variable is declared within the source code determines where that variable is available. Nested functions have access to variables declared in their outer scope. Consider the following example:

Example: This example shows the basic use of closure.

https://www.geeksforgeeks.org/closure-in-javascript/

### is Lexical scope and Lexical enviroment is same or different?
**Lexical Scope** and **Lexical Environment** are related concepts but are not the same. Here's a concise distinction:

---

### **Lexical Scope**
- **Definition**: Refers to the region in the code where a variable is accessible, determined by where it is defined (i.e., the static structure of the code).
- **Key Idea**: The "rules" about variable accessibility based on the code's structure.

---

### **Lexical Environment**
- **Definition**: A runtime construct (or data structure) that contains variable bindings (names and values) for a specific execution context.
- **Key Idea**: It is created when a function or block is executed and includes:
  - Local variables defined in the function or block.
  - References to the outer environment (parent scope) to maintain the hierarchy.

---

### Example to Show the Relationship:

```javascript
function outer() {
    let outerVar = "Outer";

    function inner() {
        console.log(outerVar); // Access via Lexical Scope
    }

    inner();
}

outer();
```

- **Lexical Scope**: Determines that `inner` can access `outerVar` because `inner` is defined inside `outer`.
- **Lexical Environment**: At runtime, when `outer` executes, a Lexical Environment is created that contains `outerVar`. The `inner` function’s Lexical Environment also links to the `outer` Lexical Environment.

---

### Summary
- **Lexical Scope** is a **concept**.
- **Lexical Environment** is a **runtime construct** that implements the concept of Lexical Scope.


## Closures are essential for handling callbacks and asynchronous operations. ***Show me real world example***

Absolutely, closures are indeed crucial for managing callbacks and asynchronous operations in JavaScript. Here's a real-world example where closures are used to handle asynchronous data fetching, such as making an API call and then processing the data once it's available.

### Custom Logger with Closures
```js

function Logger(prefix:String){
  
  return (message:String)=>{
    console.log(`[${prefix}]`,`${message}`)
  }  
}

let ErrorMsg = Logger('ERROR');
ErrorMsg('404 not found');

output:[ERROR] 404 not found
```
### Example: Fetching Data from an API

Imagine you want to fetch user data from an API and then process it to display the user's name and email.

```javascript
// Function to fetch user data from an API
function fetchData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('Request failed'));
            }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send();
    });
}

// Function to process user data using a closure
function processUserData(url) {
    fetchData(url)
        .then(userData => {
            // This is where the closure comes into play
            return function() {
                console.log(`User Name: ${userData.name}`);
                console.log(`User Email: ${userData.email}`);
            };
        })
        .then(displayUserInfo => {
            // Calling the function returned by the closure
            displayUserInfo();
        })
        .catch(error => console.error(error));
}

// URL of the API endpoint
const apiURL = 'https://jsonplaceholder.typicode.com/users/1';
processUserData(apiURL);
```

### Explanation

1. **fetchData Function:** This function takes a URL and returns a promise that resolves with the fetched data or rejects if there's an error. 

2. **processUserData Function:** This function calls `fetchData` and processes the returned user data using a closure. The closure allows the function to remember and access the `userData` even after the asynchronous operation is complete.

3. **Using the Closure:** Once the data is fetched, the inner function (closure) is created to log the user's name and email. This inner function is then called to display the user information.

In this example, closures help manage asynchronous operations by ensuring that the data fetched asynchronously is accessible when needed. This pattern is often used in real-world applications to handle data fetching, event handling, and more.



