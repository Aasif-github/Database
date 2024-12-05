# Closures

Closures in JavaScript are functions that retain access to variables from their containing scope even after the parent function has finished executing. They’re useful for maintaining private data, creating modular code, and implementing callback functions with persistent state.

What is a Closure?
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). When you create a closure, you gain access to an outer function’s scope from an inner function. Closures are automatically created every time a function is defined in JavaScript.

Lexical Scoping
Lexical scoping refers to how a parser resolves variable names when functions are nested. The location where a variable is declared within the source code determines where that variable is available. Nested functions have access to variables declared in their outer scope. Consider the following example:

Example: This example shows the basic use of closure.

https://www.geeksforgeeks.org/closure-in-javascript/


### Closures are essential for handling callbacks and asynchronous operations SHow me real world example

Absolutely, closures are indeed crucial for managing callbacks and asynchronous operations in JavaScript. Here's a real-world example where closures are used to handle asynchronous data fetching, such as making an API call and then processing the data once it's available.

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



