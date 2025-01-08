# ProtoTypes

## JavaScript Prototypes

In JavaScript, a **prototype** is an object that serves as a blueprint for other objects. 

It allows objects to inherit properties and methods from other objects, enabling reusability and efficient memory usage.

we can add properties and methods to the prototype of an object using `prototype` keyword, which will be shared by all instances of that object.

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

### Key Points:
1. Every JavaScript object has an internal link to another object called its **prototype**. This is accessible via the `__proto__` property (deprecated but still available for learning purposes) or through `Object.getPrototypeOf()`.

2. Functions in JavaScript also have a `prototype` property, which is used when creating new objects with the `new` keyword.

3. Methods and properties defined on an object's prototype are shared among all objects that inherit from it.

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

### Explanation:
1. **`Person.prototype`**:
   - This is an object that is automatically created when a function is declared.
   - It serves as a blueprint for objects created using the `new` keyword.
   
2. **Shared Methods**:
   - The `greet` method is added to `Person.prototype`. This method is shared by all instances of `Person`, saving memory as it is not duplicated for each instance.

3. **Prototype Chain**:
   - When you call `person1.greet()`, JavaScript first looks for the `greet` method in `person1`. If not found, it searches in `person1.__proto__` (or `Person.prototype`).

### Extending Prototypes:
You can also extend built-in prototypes like `Array` or `Object`. However, **this practice is discouraged**, as it can lead to unexpected behavior if other code relies on the unaltered prototype.

```javascript
Array.prototype.sum = function() {
    return this.reduce((acc, curr) => acc + curr, 0);
};

const numbers = [1, 2, 3, 4];
console.log(numbers.sum()); // Output: 10
```

### Summary:
- Prototypes are the foundation of inheritance in JavaScript.
- They allow objects to share behaviors and properties efficiently.
- Use `Object.create` or constructor functions with prototypes for prototypal inheritance. 

Let me know if you'd like to explore **ES6 classes**, which are a more modern way to use prototypes in JavaScript.
### **Benefits of Using Prototypes**
1. **Memory Efficiency**: Methods shared across objects do not need to be recreated for every instance.
2. **Inheritance**: Enables sharing and extending functionality between objects.
3. **Dynamic Addition**: You can add methods or properties to prototypes even after objects are created.



[javascript.info--native-prototypes](https://javascript.info/native-prototypes)
```js
let arr = [1, 2, 3];

// it inherits from Array.prototype?
console.log( arr.__proto__ === Array.prototype ); // true

// then from Object.prototype?
console.log( arr.__proto__.__proto__ === Object.prototype ); // true

// and null on the top.
console.log( arr.__proto__.__proto__.__proto__ ); // null
```



[javascript.info--prototype-inheritance](https://javascript.info/prototype-inheritance)


---

## **`prototype` vs `__proto__` vs `Prototype`**
Understanding the differences between `prototype`, `__proto__`, and `Prototype` in JavaScript can be confusing at first. Let’s break it down:

---

### **1. `prototype`**
- A **property** of constructor functions.
- Used to define methods and properties that should be shared among all instances of objects created by the constructor.
- Objects created by the constructor function inherit from the `prototype`.

#### Example:
```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}.`);
};

const person1 = new Person("Alice");
const person2 = new Person("Bob");

// The `greet` method is shared via the `prototype`.
person1.greet(); // Output: Hello, my name is Alice.
person2.greet(); // Output: Hello, my name is Bob.
```

- **Key Points**:
  - The `prototype` is used as a blueprint for instances created using the constructor function.
  - When a property or method is not found on the object itself, JavaScript looks for it in the `prototype`.

---

### **2. `__proto__`**
- A **property of all objects** that points to the prototype of the object’s constructor.
- This is how JavaScript implements the **prototype chain**.
- **Deprecated** but still widely used for learning purposes and debugging. The modern equivalent is `Object.getPrototypeOf()`.

#### Example:
```javascript
const person = { name: "Alice" };
console.log(person.__proto__); // Points to Object.prototype
console.log(Object.getPrototypeOf(person)); // Preferred way to access prototype
```

- **Key Points**:
  - `__proto__` links an object to its prototype (i.e., `Person.prototype` in the previous example).
  - Used to traverse the prototype chain.

#### Example of Prototype Chain:
```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}.`);
};

const person = new Person("Alice");

console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true (end of chain)
```

---

### **3. `Prototype` (as a concept)**
- Refers to the **mechanism of inheritance** in JavaScript.
- Allows objects to share properties and methods via a "prototype chain."

---

### **Comparison Table**

| Feature          | `prototype`                     | `__proto__`                      | Concept of Prototype            |
|-------------------|----------------------------------|-----------------------------------|----------------------------------|
| **What is it?**   | A property of constructor functions. | A property of all objects pointing to their prototype. | The overall mechanism of inheritance in JavaScript. |
| **Purpose**       | Defines shared methods and properties. | Enables access to the prototype chain. | Allows objects to inherit behavior. |
| **Type**          | Object                          | Object                            | Concept                          |
| **Usage**         | Used for inheritance and method sharing in constructors. | Debugging and accessing prototype objects. | The foundation of JavaScript's inheritance. |
| **Modern Usage**  | Actively used.                  | Avoided (use `Object.getPrototypeOf()`). | Always relevant.                |

---

### **How They Work Together**

1. **`prototype`**:
   - When a constructor function (e.g., `Person`) is created, it has a `prototype` property.
   - This `prototype` becomes the prototype for all objects created by the constructor.

2. **`__proto__`**:
   - When you create an object using `new`, the object's `__proto__` points to the constructor's `prototype`.

3. **Prototype Chain**:
   - When you try to access a property or method on an object, JavaScript searches:
     - The object itself.
     - The object's `__proto__` (constructor's `prototype`).
     - The prototype chain continues until `null`.

---

### Visual Example

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}.`);
};

const person = new Person("Alice");

// person.__proto__ points to Person.prototype
console.log(person.__proto__ === Person.prototype); // true

// Person.prototype.__proto__ points to Object.prototype
console.log(Person.prototype.__proto__ === Object.prototype); // true

// Object.prototype.__proto__ is null
console.log(Object.prototype.__proto__ === null); // true
```

---

### Summary:
- Use **`prototype`** for defining shared properties and methods in constructor functions.
- Avoid **`__proto__`**; instead, use `Object.getPrototypeOf()` for accessing the prototype chain.
- Understand the **prototype chain** to debug inheritance and method resolution issues effectively.

Let me know if you'd like examples on **Object.create()**, how to modify prototypes dynamically, or other related topics!

---

### **Common Misunderstandings**
- Prototypes do not copy methods or properties; objects reference them through the prototype chain.
- `class` is just a cleaner way to work with prototypes, not a separate system.

Let me know if you'd like examples or further clarifications!


For a deeper understanding, explore the [MDN documentation on JavaScript prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes).

## FAQ's
Here are some frequently asked questions (FAQs) about prototypes in JavaScript:

---

### **General FAQs**

1. **What is a prototype in JavaScript?**
   - A prototype is an object associated with every JavaScript function and object, enabling inheritance and property/method sharing.

2. **How is a prototype different from `__proto__`?**
   - `prototype` is a property of constructor functions, used for inheritance and defining shared methods.
   - `__proto__` is a property of objects that points to the prototype of their constructor.

3. **What is the prototype chain?**
   - The prototype chain is a series of links between objects and their prototypes, enabling JavaScript to search for properties and methods up the chain until `null` is reached.

4. **What is the difference between `Object.getPrototypeOf()` and `__proto__`?**
   - `Object.getPrototypeOf()` is the modern, preferred way to access an object's prototype, while `__proto__` is an older, deprecated way.

5. **Can I modify the prototype of an object?**
   - Yes, but modifying prototypes dynamically (especially built-in prototypes like `Array.prototype`) is discouraged as it can lead to unexpected behavior.

---

### **Practical FAQs**

6. **How do I add a method to all instances of a constructor?**
   - By adding the method to the constructor's `prototype` property:
     ```javascript
     function Person(name) {
         this.name = name;
     }
     Person.prototype.greet = function() {
         console.log(`Hello, my name is ${this.name}`);
     };
     ```

7. **What happens if I override an object's prototype?**
   - Overriding an object's prototype can break its connection to the constructor's `prototype` and disrupt the prototype chain:
     ```javascript
     const obj = {};
     Object.setPrototypeOf(obj, null); // Now obj has no prototype
     console.log(obj.toString); // undefined
     ```

8. **What is the purpose of `Object.create()`?**
   - `Object.create()` creates a new object with the specified prototype:
     ```javascript
     const proto = { greet() { console.log("Hello!"); } };
     const obj = Object.create(proto);
     obj.greet(); // Output: Hello!
     ```

---

### **Advanced FAQs**

9. **What is the relationship between `Function.prototype` and `Object.prototype`?**
   - `Function.prototype` is itself an object, and its prototype is `Object.prototype`.

10. **Can I add properties to `Object.prototype`?**
    - Yes, but it’s a bad practice because it affects all objects in the environment:
      ```javascript
      Object.prototype.newMethod = function() { console.log("New method!"); };
      const obj = {};
      obj.newMethod(); // Output: New method!
      ```

11. **What happens if a property exists both in an object and its prototype?**
    - The property in the object takes precedence over the property in the prototype.

12. **How do ES6 classes relate to prototypes?**
    - ES6 classes are syntactic sugar over prototypes. Methods in a class are added to the `prototype` of the class.

13. **How does JavaScript resolve methods during runtime?**
    - When a method is called, JavaScript first checks the object itself. If not found, it traverses the prototype chain.

---

### **Debugging/Code FAQs**

14. **How can I check if an object has a specific property?**
    - Use `hasOwnProperty()` to check for properties that are direct members of the object:
      ```javascript
      obj.hasOwnProperty('key');
      ```

15. **How do I know if an object inherits from another?**
    - Use `instanceof` or `isPrototypeOf()`:
      ```javascript
      console.log(obj instanceof Constructor);
      console.log(Constructor.prototype.isPrototypeOf(obj));
      ```

16. **How do I find the prototype of an object?**
    - Use `Object.getPrototypeOf()`:
      ```javascript
      console.log(Object.getPrototypeOf(obj));
      ```

17. **Can a prototype have its own prototype?**
    - Yes, every prototype object itself has a prototype, except `Object.prototype`, which is the root and has `null` as its prototype.

---

### Common Interview Questions
1. **How does prototypal inheritance work?**
2. **What are the advantages of using prototypes?**
3. **What are the limitations of prototypes in JavaScript?**
4. **What is the difference between classical and prototypal inheritance?**
5. **How do you implement inheritance without using `class` or `extends`?**

Let me know if you'd like explanations or code examples for any of these FAQs!

## Senarios based Questions

Here are the **scenario-based questions with answers and detailed explanations**:

---

### **1. Prototype Inheritance Behavior**

```javascript
function A() {}
function B() {}
B.prototype = new A();
const b = new B();
console.log(b instanceof A);
```

**Answer**:  
`true`

**Explanation**:  
- `b instanceof A` checks whether `b`'s prototype chain includes `A.prototype`.  
- Since `B.prototype = new A()`, `b`'s prototype points to an object created by `A`.
- Hence, `b` is considered an instance of `A`.

---

### **2. Method Resolution in Prototype Chain**

```javascript
const obj = {
    greet() {
        console.log("Hello from obj!");
    }
};
const child = Object.create(obj);
child.greet = function() {
    console.log("Hello from child!");
};
const grandchild = Object.create(child);

grandchild.greet();
```

**Answer**:  
`Hello from child!`

**Explanation**:  
- `grandchild.greet()` first checks `grandchild` for the `greet` method.
- Since `greet` is not on `grandchild`, it goes up the chain to `child`, where it finds the overridden `greet` method.
- The method in `obj` is shadowed by the method in `child`.

---

### **3. Prototype Shadowing**

```javascript
function Person() {
    this.name = "Alice";
}
Person.prototype.name = "Bob";

const person = new Person();
console.log(person.name);
```

**Answer**:  
`"Alice"`

**Explanation**:  
- `person.name` exists as an **own property** on the `person` object, so it is used directly.
- The `name` property in `Person.prototype` is shadowed and not accessed unless the `name` property on `person` is deleted.

---

### **4. Adding Properties Dynamically**

```javascript
const parent = {};
const child = Object.create(parent);

parent.sayHello = function() {
    console.log("Hello from parent");
};

child.sayHello();
```

**Answer**:  
`Hello from parent`

**Explanation**:  
- Adding the `sayHello` method to `parent` dynamically updates the prototype chain.
- When `child.sayHello()` is called, it resolves `sayHello` in `parent`.

---

### **5. Prototype Chain and `hasOwnProperty`**

```javascript
const parent = { value: 42 };
const child = Object.create(parent);

console.log("value" in child); // true
console.log(child.hasOwnProperty("value")); // false
```

**Explanation**:  
- `"value" in child` checks the prototype chain and finds the `value` property in `parent`.
- `hasOwnProperty` only checks the object's own properties, not the prototype chain.

---

### **6. End of Prototype Chain**

```javascript
const obj = Object.create(null);
console.log(obj.toString);
```

**Answer**:  
`undefined`

**Explanation**:  
- `Object.create(null)` creates an object with no prototype (`null`).
- Since there is no prototype, `toString` (defined in `Object.prototype`) is not available.

---

### **7. Modifying Built-In Prototypes**

```javascript
Array.prototype.sum = function() {
    return this.reduce((acc, val) => acc + val, 0);
};

const arr = [1, 2, 3];
console.log(arr.sum());
```

**Answer**:  
`6`

**Explanation**:  
- By adding the `sum` method to `Array.prototype`, it becomes available to all arrays.
- The array `[1, 2, 3]` calls the `sum` method, which calculates the sum.

**Caution**: Modifying built-in prototypes can lead to conflicts or unexpected behavior in third-party libraries.

---

### **8. Changing Prototype Dynamically**

```javascript
const obj = { name: "Alice" };
const proto = { greet() { console.log("Hello!"); } };

Object.setPrototypeOf(obj, proto);
obj.greet();
```

**Answer**:  
`Hello!`

**Explanation**:  
- `Object.setPrototypeOf(obj, proto)` dynamically changes the prototype of `obj` to `proto`.
- This makes the `greet` method available on `obj`.

**Caution**: Dynamically modifying the prototype is slow and can lead to hard-to-debug issues.

---

### **9. Prototype Chain Traversal**

```javascript
const obj = { a: 1 };
const child = Object.create(obj);
const grandchild = Object.create(child);

console.log(grandchild.a);
```

**Answer**:  
`1`

**Explanation**:  
- JavaScript looks for the property `a` in `grandchild`.
- If not found, it moves to `child`, and finally to `obj`, where it finds `a: 1`.

---

### **10. Circular References in Prototypes**

```javascript
const obj = {};
obj.__proto__ = obj;

console.log(obj.toString());
```

**Answer**:  
**TypeError: Cannot convert circular structure to string**

**Explanation**:  
- Setting `obj.__proto__ = obj` creates a circular reference.
- JavaScript cannot resolve the `toString()` call as it ends up in an infinite loop trying to traverse the circular prototype chain.

---

Let me know if you'd like further clarifications or additional scenarios!
