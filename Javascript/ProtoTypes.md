# ProtoTypes

## JavaScript Prototypes

In JavaScript, prototypes are a fundamental concept behind inheritance and a core aspect of how objects are created and interact.

### Concept:
- Every object in JavaScript has a hidden property called its prototype.
- The prototype itself is another object that can hold properties and methods.
- When you try to access a property on an object:
  - JavaScript first checks the object itself for the property.
  - If not found directly, JavaScript looks in the object's prototype.
  - This chaining process continues up the prototype chain until:
    - A property with a matching name is found, or
    - The end of the chain is reached (`null`).

### Benefits:
1. **Code Reusability**: 
   - Methods and properties in the prototype can be shared among all objects created using the same constructor function.
2. **Inheritance**:
   - Objects can inherit properties and methods from their prototypes, enabling specialized objects based on generic ones.

### Example:
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hi, my name is " + this.name);
};

const person1 = new Person("Alice");
const person2 = new Person("Bob");

person1.greet(); // Outputs: "Hi, my name is Alice"
person2.greet(); // Outputs: "Hi, my name is Bob"
```

- In this example:
  - The `greet` method is defined in `Person.prototype`.
  - When `person1.greet()` or `person2.greet()` is called:
    - JavaScript checks `person1` and `person2` objects respectively.
    - Since the `greet` method is not found directly on the objects, it looks up the prototype chain and finds it in `Person.prototype`.
    - Both objects share the functionality.

For a deeper understanding, explore the [MDN documentation on JavaScript prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes).

---

## How JS Engine Reacts to Strict Mode

When you enable strict mode in JavaScript using `"use strict";`, the JavaScript engine enters a more restricted execution environment.

### Key Reactions:
1. **Parsing and Syntax Checks**:
   - Enforces stricter syntax rules.
   - Reserved keywords as variable names will throw errors.

2. **Error Handling**:
   - Actions that silently continue in sloppy mode throw errors in strict mode (e.g., using undeclared variables, assigning to read-only properties).

3. **Code Analysis and Optimization**:
   - Strict mode allows clearer analysis, enabling better performance optimizations.

4. **Global Scope Management**:
   - Prevents accidental creation of global variables by throwing reference errors for undeclared variables.

5. **Function Behavior**:
   - **Arguments Object**: Modifications to the `arguments` object won't affect function parameters, and vice versa.
   - **`this` Keyword**: Stricter handling of `this`, improving clarity and reducing ambiguity.

6. **Security Considerations**:
   - Restricts insecure features like `eval` and `with`.

### Overall Impact:
- Strict mode catches errors earlier, enforces best practices, and may optimize performance. 
- While implementation details vary across engines, the principles of stricter parsing, error handling, and code optimization remain consistent.

### Additional Resources:
For more details on strict mode, check out this [guide on JavaScript strict mode](https://codingtorque.com/tic-tac-toe-game-using-javascript/).
```

```
## sequence to study

1. **Object**
2. **Prototype**
3. **Class and Constructor**
4. **This - Keyword**
5. **Delegation** (Refer: *You Don’t Know JS Yet* - Book)

## Asynchronous Programming

1. **Hoisting**
2. **Scopes**
3. **Closure**
4. **Callback**
5. **Promise**
6. **Async - Await**

For more details on prototypes, refer to this [JavaScript prototype inheritance](https://javascript.info/prototype-inheritance).

---
# ProtoTypes and Inheritance in detail
``` 
### What is Prototype in JavaScript?

In JavaScript, **prototype** is a core concept in its object-oriented programming model. It is the mechanism through which objects in JavaScript inherit features from one another. Every JavaScript object has a hidden property called `[[Prototype]]`, which points to another object (or `null`). This other object is called the **prototype**.

### Key Concepts of Prototypes:

1. **Prototype Chain:**
   - When accessing a property or method on an object, JavaScript first looks at the object itself. 
   - If it doesn't find the property, it looks at the object's prototype. 
   - This process continues up the prototype chain until it finds the property or reaches the end of the chain (`null`).

2. **Prototype Property (`.prototype`):**
   - Functions in JavaScript (which can act as constructors) have a `prototype` property. 
   - This property is used to define methods and properties that are shared among all instances created by the constructor function.

3. **`Object.prototype`:**
   - The root of the prototype chain. Most objects in JavaScript inherit from `Object.prototype`, which provides commonly used methods like `.toString()` and `.hasOwnProperty()`.

4. **`__proto__` vs `.prototype`:**
   - `__proto__`: This is an accessor property available on objects that gives direct access to their prototype (`[[Prototype]]`).
   - `.prototype`: This is a property of functions and is used to define the prototype for objects created by that function.

---

### Example of Prototypes

#### 1. Basic Prototype Chain
```javascript
const parent = {
  greet() {
    console.log('Hello from parent');
  }
};

const child = Object.create(parent);

child.greet(); // Output: Hello from parent
```
In this example:
- `child` does not have the `greet` method, but its prototype (`parent`) does.
- The method is found on `parent` via the prototype chain.

---

#### 2. Using Constructor Functions with Prototype
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const john = new Person('John');
john.sayHello(); // Output: Hello, my name is John
```
Here:
- `sayHello` is defined on the `Person.prototype`.
- Every instance of `Person` (e.g., `john`) can access `sayHello`.

---

#### 3. Prototypes in ES6 Classes
Classes in JavaScript are syntactic sugar over the prototype-based inheritance.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const jane = new Person('Jane');
jane.sayHello(); // Output: Hello, my name is Jane
```
Here, the `sayHello` method is added to the `Person.prototype`.

---

### Prototype vs Inheritance
- Prototypes are the foundation of inheritance in JavaScript.
- Prototypal inheritance is more flexible compared to classical inheritance in languages like Java or C++.

---

### Key Methods and Properties Related to Prototype
1. **`Object.create(proto)`**:
   - Creates a new object with its `[[Prototype]]` set to `proto`.
   ```javascript
   const proto = { greet: () => console.log('Hello!') };
   const obj = Object.create(proto);
   obj.greet(); // Output: Hello!
   ```

2. **`Object.getPrototypeOf(obj)`**:
   - Returns the prototype of the object.
   ```javascript
   const obj = {};
   console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
   ```

3. **`Object.setPrototypeOf(obj, proto)`**:
   - Sets the prototype of the object.
   ```javascript
   const proto = { greet: () => console.log('Hi') };
   const obj = {};
   Object.setPrototypeOf(obj, proto);
   obj.greet(); // Output: Hi
   ```

4. **`instanceof` Operator**:
   - Checks whether an object’s prototype chain includes the prototype of a specific constructor.
   ```javascript
   const john = new Person('John');
   console.log(john instanceof Person); // true
   ```

5. **Prototype Pollution**:
   - A potential security risk where malicious code manipulates an object's prototype.

---

### Key Points to Remember:
- Prototypes enable sharing properties and methods among objects.
- JavaScript uses prototypes for inheritance instead of classical OOP.
- Modern ES6+ classes still use prototypes under the hood.
- Avoid modifying `Object.prototype` directly as it affects all objects.

Would you like to dive deeper into specific prototype methods or real-world examples?
