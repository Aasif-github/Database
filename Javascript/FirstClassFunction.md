## What is First-Class Function?

In JavaScript, a **first-class function** (or **first-class citizen**) means that functions in JavaScript are treated as **objects**. They can be assigned to variables, passed as arguments to other functions, and returned from other functions. Essentially, functions can be used in all places where any other value (like numbers or strings) can be used.

### Key Characteristics of First-Class Functions:
1. **Can be assigned to variables**: A function can be assigned to a variable just like any other value.
2. **Can be passed as arguments to other functions**: You can pass functions as arguments to other functions.
3. **Can be returned from other functions**: Functions can return other functions, enabling closures.
4. **Can be stored in data structures**: Functions can be stored in arrays, objects, etc.

### Example:

```javascript
// 1. Function can be assigned to a variable
const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet('John')); // Output: Hello, John!

// 2. Function can be passed as an argument to another function
function executeFunction(func, value) {
    return func(value);
}

console.log(executeFunction(greet, 'Alice')); // Output: Hello, Alice!

// 3. Function can return another function
function outer() {
    return function inner() {
        console.log('This is the inner function!');
    };
}

const innerFunction = outer();
innerFunction(); // Output: This is the inner function!

// 4. Function can be stored in an array or object
const functions = [greet, outer];
console.log(functions[0]('Bob')); // Output: Hello, Bob!

const obj = {
    sayHello: greet,
};
console.log(obj.sayHello('Charlie')); // Output: Hello, Charlie!
```

### Explanation:
- **Assigned to variables**: The function `greet` is assigned to the variable `greet`, and we call it as `greet('John')`.
- **Passed as arguments**: The `greet` function is passed as an argument to `executeFunction`, which calls the passed function.
- **Returned from functions**: The function `outer` returns the `inner` function, and `innerFunction` is called to log a message.
- **Stored in data structures**: The function `greet` is stored in an array and an object, showing that functions are treated as values.

### Why is this important?
- **Higher-order functions**: First-class functions enable higher-order functions (functions that take other functions as arguments or return functions). This is a key concept in functional programming.
- **Flexibility**: The ability to treat functions as first-class citizens allows for greater flexibility in designing dynamic and modular code, such as callbacks, event handlers, and custom utility functions.