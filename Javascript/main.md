- Closure
    - Lexical Environment
-   Hoisting
    - Variable Hoisting
    - Temporal Dead Zone
    - Function Hoisting


## What is Closure?
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). When you create a closure, you gain access to an outer function’s scope from an inner function. Closures are automatically created every time a function is defined in JavaScript.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}
let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1

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

## Lexical Environment
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

## Hoisting
Hoisting refers to the process where the JavaScript interpreter moves declarations (variable and function declarations) to the top of their containing scope during the compile phase. This means that a variable or function can be used before it has been declared in the code.

However, only the declarations are hoisted, not the initializations.

#### Variable Hoisting - var, let, const

```javascript
// Variable declaration (hoisted)
console.log(myVar); // undefined
var myVar = 10;

// Let declaration (not hoisted)    
console.log(myLet); // ReferenceError: myLet is not defined 
let myLet = 20;

// Const declaration (not hoisted)  
console.log(myConst); // ReferenceError: myConst is not defined
const myConst = 30; 

```
Explanation:

Temporal Dead Zone (TDZ): The time between the entering of the scope and the declaration where accessing the variable leads to a ReferenceError.

Initialization: let and const variables are not initialized until the declaration is executed.

#### Function Hoisting - function declaration and function expression

```javascript
// Function declaration (hoisted)
console.log(myFunction()); // "Hello, World!"
function myFunction() {
    return "Hello, World!";
}

// Function expression (not hoisted)
console.log(myFuncExpression()); // TypeError: myFuncExpression is not a function
var myFuncExpression = function() {
    return "Hi, there!";
};
```

Explanation: Function declarations are hoisted, while function expressions are not. This means that you can call a function before it is defined, but you cannot call a function expression before it is defined. 