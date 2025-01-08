## Call, Apply and Bind

In JavaScript, `call()`, `apply()`, and `bind()` are methods of functions that allow you to control the context (`this`) in which a function is executed. 

These methods are useful when you want to borrow methods from one object or explicitly set the `this` value.

---

### **1. `call()`**
- Invokes a function **immediately** and allows you to set the value of `this`.
- Accepts arguments as a **comma-separated list**.

#### Syntax:
```javascript
functionName.call(thisArg, arg1, arg2, ...);
```

#### Example:
```javascript
const person = {
    name: "Alice",
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
};

const anotherPerson = { name: "Bob" };

person.greet(); // Output: Hello, my name is Alice.

person.greet.call(anotherPerson); // Output: Hello, my name is Bob.
```

---

### **2. `apply()`**
- Similar to `call()`, but accepts arguments as an **array** or array-like object.
- Useful when the arguments are already in an array.

#### Syntax:
```javascript
functionName.apply(thisArg, [arg1, arg2, ...]);
```

#### Example:
```javascript
function sum(a, b, c) {
    return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum.apply(null, numbers)); // Output: 6
```

#### Comparison of `call()` vs. `apply()`:
```javascript
sum.call(null, 1, 2, 3); // Output: 6
sum.apply(null, [1, 2, 3]); // Output: 6
```

---

### **3. `bind()`**
- Returns a **new function** with a specified `this` value and optionally preset arguments.
- The new function can be called later.

#### Syntax:
```javascript
const boundFunction = functionName.bind(thisArg, arg1, arg2, ...);
```

#### Example:
```javascript
const person = {
    name: "Alice",
    greet(greeting) {
        console.log(`${greeting}, my name is ${this.name}.`);
    }
};

const anotherPerson = { name: "Bob" };
const greetBob = person.greet.bind(anotherPerson, "Hi");

greetBob(); // Output: Hi, my name is Bob.
```

---

### **Key Differences**
| Feature         | `call()`             | `apply()`            | `bind()`                |
|------------------|----------------------|----------------------|-------------------------|
| **Execution**    | Executes immediately | Executes immediately | Returns a new function  |
| **Arguments**    | Passed as a list     | Passed as an array   | Passed when binding     |
| **Return Value** | Result of the call   | Result of the call   | A new bound function    |

---

### **Use Cases**
1. **`call()`**:
   - Borrow methods from another object.
   - Invoke a function with a specific `this` value.

2. **`apply()`**:
   - Useful when arguments are already in an array.
   - Borrow functions like `Math.max`:
     ```javascript
     const numbers = [1, 5, 2];
     console.log(Math.max.apply(null, numbers)); // Output: 5
     ```

3. **`bind()`**:
   - Useful for event handlers or callbacks where you want to preserve `this`.
   ```javascript
   const person = { name: "Alice" };
   const greet = function() {
       console.log(`Hello, ${this.name}`);
   }.bind(person);

   greet(); // Output: Hello, Alice
   ```

---
## Why we are using call(), apply() and bind()?
In **simple terms**, we use `call()`, `apply()`, and `bind()` in JavaScript to **control the value of `this`** when we run a function. This is important because the value of `this` can change depending on **how** and **where** the function is called.

Here’s a straightforward explanation:

---

### **Why do we need these methods?**
Sometimes, you want to:
1. **Borrow a method** from one object to use it on another.
2. **Set `this` manually** to ensure the function works in a specific context.
3. **Re-use a function** with a pre-defined `this` and/or arguments.

---

### **How do they work in simple terms?**

#### **1. `call()`**
- **Use `call()` to run a function immediately and set `this`.**
- Arguments are passed one-by-one (comma-separated).

Example:  
Imagine you have a `sayHi` function in one object, but you want to use it for another object.

```javascript
const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

function sayHi(greeting) {
    console.log(`${greeting}, my name is ${this.name}`);
}

// Use call to set `this`
sayHi.call(person1, "Hello"); // Output: Hello, my name is Alice
sayHi.call(person2, "Hi");    // Output: Hi, my name is Bob
```

---

#### **2. `apply()`**
- **Use `apply()` just like `call()`, but pass arguments as an array.**
- It’s useful when arguments are already in an array.

Example:  
Using the same `sayHi` function, but passing arguments as an array:

```javascript
sayHi.apply(person1, ["Hello"]); // Output: Hello, my name is Alice
sayHi.apply(person2, ["Hi"]);    // Output: Hi, my name is Bob
```

---

#### **3. `bind()`**
- **Use `bind()` to create a new function with a fixed `this`.**
- It doesn’t call the function immediately; instead, it returns a new function.

Example:  
Imagine you want to save the `sayHi` function with `this` already set to `person1`:

```javascript
const sayHiToAlice = sayHi.bind(person1, "Hello");
sayHiToAlice(); // Output: Hello, my name is Alice
```

With `bind()`, you can call the new function whenever you want, and it will always use the `this` you set.

---

### **Why Use Them?**
1. **Re-using Functions**:  
   Instead of writing a new method for each object, you can borrow existing methods.

2. **Controlling `this`:**  
   Ensure the function runs in the correct context, especially in callbacks or event handlers.

3. **Delayed Execution (with `bind()`):**  
   Save a function for later use with a pre-defined `this` and arguments.

---

### **Summary Table**

| Method  | When to Use                  | Arguments Format              | Calls Function Immediately? |
|---------|------------------------------|--------------------------------|-----------------------------|
| `call()` | Run a function immediately with a specific `this`. | Comma-separated (`arg1, arg2`) | Yes                         |
| `apply()` | Same as `call()`, but arguments are in an array. | Array (`[arg1, arg2]`)        | Yes                         |
| `bind()` | Create a new function with `this` fixed. | Comma-separated (`arg1, arg2`) | No                          |

---

### **Simple Analogy**
- **`call()`**: Borrow a tool from a neighbor and use it right now.  
- **`apply()`**: Borrow a tool, but the neighbor needs an itemized list of what you’ll use with it.  
- **`bind()`**: Borrow a tool, take it home, and use it whenever you want.

---
