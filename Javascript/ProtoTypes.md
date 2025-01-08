# ProtoTypes

## JavaScript Prototypes

In JavaScript, a **prototype** is an object that serves as a blueprint for other objects. 

It allows objects to inherit properties and methods from other objects, enabling reusability and efficient memory usage.

---

### **Key Points About Prototypes**
1. **Every Object Has a Prototype**
   - When you create an object, it has an internal property called `[[Prototype]]` that refers to another object (its prototype).
   - In JavaScript, the prototype chain determines how properties and methods are resolved when accessed on an object.

2. **Prototype Chain**
   - If a property or method is not found directly on the object, JavaScript looks for it in the object's prototype.
   - This continues up the chain until the property/method is found or the chain ends with `null`.

---

### **Examples**

#### 1. Prototype of Objects
```javascript
const obj = { name: "Alice" };
console.log(obj.toString()); // [object Object]

// `toString` is not defined in `obj` but is found in its prototype.
console.log(Object.getPrototypeOf(obj)); // {constructor: ƒ, toString: ƒ, ...}
```

#### 2. Using Constructor Functions and Prototypes
   - Constructor functions allow you to define shared properties and methods using prototypes.

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding methods to the prototype
Person.prototype.greet = function () {
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
};

const alice = new Person("Alice", 25);
const bob = new Person("Bob", 30);

console.log(alice.greet()); // Hi, my name is Alice and I am 25 years old.
console.log(bob.greet());   // Hi, my name is Bob and I am 30 years old.

// Prototype chain
console.log(alice.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
```

#### 3. Prototype Inheritance
   - Objects can inherit from other objects using prototypes.

```javascript
const animal = {
    speak: function () {
        return `${this.name} makes a sound.`;
    },
};

const dog = Object.create(animal); // `dog` inherits from `animal`
dog.name = "Buddy";
dog.bark = function () {
    return `${this.name} barks.`;
};

console.log(dog.speak()); // Buddy makes a sound.
console.log(dog.bark());  // Buddy barks.
```

---

### **Prototype Chain Visualization**
```plaintext
dog ---> animal ---> Object.prototype ---> null
```

---

### **Class Syntax and Prototypes**
   - ES6 `class` syntax is syntactic sugar over prototypes.

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

const charlie = new Person("Charlie", 35);
console.log(charlie.greet()); // Hi, my name is Charlie and I am 35 years old.
```

---

### **Benefits of Using Prototypes**
1. **Memory Efficiency**: Methods shared across objects do not need to be recreated for every instance.
2. **Inheritance**: Enables sharing and extending functionality between objects.
3. **Dynamic Addition**: You can add methods or properties to prototypes even after objects are created.

---

### **Prototype vs `__proto__` vs `prototype`**
- `prototype`: A property of constructor functions used to define properties/methods that will be shared by all instances.
- `__proto__`: Refers to the internal `[[Prototype]]` link of an object. It points to the prototype object.
- `Object.getPrototypeOf(obj)`: Recommended way to access an object's prototype.

---

### **Common Misunderstandings**
- Prototypes do not copy methods or properties; objects reference them through the prototype chain.
- `class` is just a cleaner way to work with prototypes, not a separate system.

Let me know if you'd like examples or further clarifications!


For a deeper understanding, explore the [MDN documentation on JavaScript prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes).

---

# ProtoTypes and Inheritance in detail

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
