### **JavaScript Output-Based Questions**  

These types of questions test your understanding of JavaScript concepts like **hoisting, closures, async/await, promises, prototypes, and ES6 features**. Below are some common **output-based questions** with explanations.

---

## **🔹 Question 1: Hoisting**
```js
console.log(a);
var a = 10;
console.log(a);
```
### **Output:**  
```
undefined
10
```
### **Explanation:**
- **Hoisting:** `var a` is hoisted to the top, but its value (`10`) is assigned later.
- `console.log(a);` prints `undefined` because `a` is declared but not assigned at that point.
- After `a = 10`, the second `console.log(a);` prints `10`.

---

## **🔹 Question 2: `let` vs `var`**
```js
console.log(x);
let x = 5;
console.log(x);
```
### **Output:**  
```
ReferenceError: Cannot access 'x' before initialization
```
### **Explanation:**
- Unlike `var`, `let` is **not hoisted** in a usable way. It is in a **temporal dead zone (TDZ)** until it is declared.

---

## **🔹 Question 3: Closures**
```js
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}
const counter = makeCounter();
counter();
counter();
counter();
```
### **Output:**  
```
1
2
3
```
### **Explanation:**
- `makeCounter()` returns an inner function that accesses `count` from the outer scope.
- Each call to `counter()` increments `count`, maintaining state due to **closures**.

---

## **🔹 Question 4: Asynchronous `setTimeout`**
```js
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```
### **Output:**  
```
1
3
2
```
### **Explanation:**
- JavaScript is **single-threaded** and follows the **event loop**.
- `setTimeout` executes **after the main thread completes**.
- `console.log(1);` runs first, then `console.log(3);`, and finally `console.log(2);` after the event loop executes the timeout callback.

---

## **🔹 Question 5: Promise Execution Order**
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```
### **Output:**  
```
A
D
C
B
```
### **Explanation:**
1. `"A"` is logged first.
2. `setTimeout()` schedules `"B"` for the **macro-task queue**.
3. `Promise.resolve().then()` adds `"C"` to the **micro-task queue**.
4. `"D"` is logged immediately.
5. **Micro-tasks (Promise) run before macro-tasks (setTimeout)**, so `"C"` prints before `"B"`.

---

## **🔹 Question 6: Object Reference & Mutation**
```js
let obj1 = { a: 10 };
let obj2 = obj1;
obj2.a = 20;
console.log(obj1.a);
```
### **Output:**  
```
20
```
### **Explanation:**
- `obj1` and `obj2` reference the **same object** in memory.
- Modifying `obj2.a` changes `obj1.a` as well.

---

## **🔹 Question 7: `this` Keyword in Arrow Functions**
```js
const obj = {
  name: "BookMyDoc",
  getName: () => {
    console.log(this.name);
  },
};
obj.getName();
```
### **Output:**  
```
undefined
```
### **Explanation:**
- Arrow functions **do not have their own `this`**, they inherit `this` from the **parent scope** (which is `window` or `globalThis`).
- Since `window.name` is not defined, it prints `undefined`.

---

## **🔹 Question 8: `==` vs `===`**
```js
console.log(0 == "0");
console.log(0 === "0");
```
### **Output:**  
```
true
false
```
### **Explanation:**
- `0 == "0"` → **true** because `==` performs **type coercion**.
- `0 === "0"` → **false** because `===` checks **strict equality** (type + value).

---

## **🔹 Question 9: Destructuring and Default Values**
```js
const { x = 10 } = { y: 20 };
console.log(x);
```
### **Output:**  
```
10
```
### **Explanation:**
- The object `{ y: 20 }` does not contain `x`.
- Since `x` is not present, it takes the **default value `10`**.

---

## **🔹 Question 10: IIFE (Immediately Invoked Function Expression)**
```js
(function(x) {
  return (function(y) {
    console.log(x);
  })(2);
})(1);
```
### **Output:**  
```
1
```
### **Explanation:**
- The outer function is **immediately invoked** with `x = 1`.
- The inner function is called with `y = 2`, but it **logs `x` from the outer function scope**.

---

## **🔹 Question 11: Spread Operator**
```js
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log(arr1);
```
### **Output:**  
```
[1, 2, 3, 4]
```
### **Explanation:**
- `arr2` and `arr1` reference the **same array** in memory.
- Modifying `arr2` also affects `arr1`.

✅ **Solution: Clone with Spread Operator**
```js
const arr2 = [...arr1]; // Creates a new copy
```

---

## **🔹 Question 12: `map` vs `forEach`**
```js
const numbers = [1, 2, 3];
const result = numbers.forEach(num => num * 2);
console.log(result);
```
### **Output:**  
```
undefined
```
### **Explanation:**
- `.forEach()` **does not return** a new array, it just **loops** over elements.
- Use `.map()` if you want a new array.

✅ **Solution:**
```js
const result = numbers.map(num => num * 2);
console.log(result); // [2, 4, 6]
```

---

## **🔹 Question 13: `typeof null`**
```js
console.log(typeof null);
```
### **Output:**  
```
object
```
### **Explanation:**
- This is a **historical JavaScript bug**. `null` is **not** an object, but `typeof null` mistakenly returns `"object"`.

---

## **🔹 Question 14: Function Hoisting**
```js
foo();
function foo() {
  console.log("Hello");
}
```
### **Output:**  
```
Hello
```
### **Explanation:**
- Function **declarations** are **hoisted**.

✅ **But function expressions are not hoisted:**
```js
bar();
const bar = function() {
  console.log("Hi");
};
```
🚫 **Throws:** `TypeError: bar is not a function`

---

## **🔹 Question 15: Rest Operator**
```js
function sum(a, ...nums) {
  console.log(nums);
}
sum(1, 2, 3, 4);
```
### **Output:**  
```
[2, 3, 4]
```
### **Explanation:**
- The first argument `a = 1`.
- The rest `...nums = [2, 3, 4]`.

---

## **🚀 Summary**
✔ Hoisting (`var` vs `let`)  
✔ Closures and scope  
✔ Promises and `setTimeout` execution order  
✔ Object reference vs primitive values  
✔ Arrow function `this` binding  
✔ Spread, rest, and destructuring  

Would you like **more advanced** questions on ES6, async, or prototypes? 😃
---
### **Advanced JavaScript Output-Based Questions (ES6, Async, Prototypes) 🚀**

Now, let's dive into **advanced JavaScript concepts** like **prototypes, async/await, event loop, ES6 features, and classes.**  

---

## **🔹 Question 1: Prototypal Inheritance**
```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person("Aasif");
delete person1.sayHello;
person1.sayHello();
```
### **Output:**
```
Hello, my name is Aasif
```
### **Explanation:**
- `sayHello` is not a direct property of `person1`, it's on the **prototype**.
- `delete person1.sayHello;` **does not remove** the prototype method.
- The method still exists in `Person.prototype`, so it runs successfully.

---

## **🔹 Question 2: Async/Await Execution Order**
```js
async function foo() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
console.log("C");
foo();
console.log("D");
```
### **Output:**
```
C
A
D
B
```
### **Explanation:**
1. `"C"` prints first because it's outside any async function.
2. `foo()` is called, printing `"A"`.
3. `await Promise.resolve();` **pauses execution** at `"B"` (moving to the microtask queue).
4. `"D"` is printed next since `foo()` is still waiting.
5. Finally, `"B"` runs after the microtask queue is processed.

---

## **🔹 Question 3: `this` in Arrow Functions**
```js
const obj = {
  value: 42,
  getValue: () => {
    console.log(this.value);
  },
};
obj.getValue();
```
### **Output:**
```
undefined
```
### **Explanation:**
- Arrow functions **do not have their own `this`**.
- `this` refers to the **global object** (`window` in browsers or `globalThis` in Node.js), where `value` is `undefined`.

---

## **🔹 Question 4: Promise Chaining**
```js
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => {
    throw new Error("Error occurred");
  })
  .catch((err) => console.log(err.message))
  .then((x) => console.log(x));
```
### **Output:**
```
Error occurred
undefined
```
### **Explanation:**
1. The first `.then()` returns `2`.
2. The second `.then()` **throws an error**, skipping the next `.then()`.
3. The `.catch()` catches the error and logs `"Error occurred"`.
4. The final `.then()` receives `undefined` because the previous `.catch()` **doesn't return a value**.

---

## **🔹 Question 5: Class and Inheritance**
```js
class Parent {
  constructor() {
    this.name = "Parent";
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.name = "Child";
  }
}

const obj = new Child();
console.log(obj.name);
```
### **Output:**
```
Child
```
### **Explanation:**
- The `Child` constructor **calls `super()` first**, initializing `this.name = "Parent"`.
- Then, `this.name = "Child"` **overwrites** the value.

---

## **🔹 Question 6: `setTimeout` inside a Loop**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```
### **Output:**
```
3
3
3
```
### **Explanation:**
- `var` has **function scope**, not block scope.
- By the time `setTimeout` executes, the loop has already completed, making `i = 3`.
- To fix it, use **`let`**:
  ```js
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
  }
  ```
  **Output:**
  ```
  0
  1
  2
  ```

---

## **🔹 Question 7: Object Destructuring with Default Values**
```js
const { a, b = 10 } = { a: 5, b: undefined };
console.log(b);
```
### **Output:**
```
undefined
```
### **Explanation:**
- Default values only apply when the property **is missing**, **not when it's `undefined`**.

✅ **Fix:** If you want a default value even for `undefined`, use the **nullish coalescing operator** (`??`):
```js
const { a, b } = { a: 5, b: undefined };
console.log(b ?? 10); // Output: 10
```

---

## **🔹 Question 8: Generator Functions**
```js
function* generator() {
  yield 1;
  yield 2;
  return 3;
}

const gen = generator();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
```
### **Output:**
```
1
2
undefined
```
### **Explanation:**
- `yield 1;` → returns `1`.
- `yield 2;` → returns `2`.
- `return 3;` → does **not** return a value with `value`, only `{ value: 3, done: true }`, so `.value` is `undefined`.

---

## **🔹 Question 9: Object Property Deletion**
```js
const obj = { a: 1, b: 2 };
console.log(delete obj.a);
console.log(obj);
```
### **Output:**
```
true
{ b: 2 }
```
### **Explanation:**
- `delete obj.a` **removes** the property and returns `true`.

---

## **🔹 Question 10: Function Overriding**
```js
function foo() {
  console.log("First");
}

function foo() {
  console.log("Second");
}

foo();
```
### **Output:**
```
Second
```
### **Explanation:**
- JavaScript **hoists functions**, but **the last declaration overwrites the first**.

---

## **🔹 Question 11: `typeof NaN`**
```js
console.log(typeof NaN);
```
### **Output:**
```
number
```
### **Explanation:**
- `NaN` (**Not a Number**) is still of type `"number"`.

---

## **🔹 Question 12: Optional Chaining (?.)**
```js
const user = { profile: null };
console.log(user.profile?.name);
```
### **Output:**
```
undefined
```
### **Explanation:**
- `?.` **prevents errors** if a property is `null` or `undefined`, returning `undefined` instead.

---

## **🔹 Summary**
✔ **Closures & Prototypes** (`this` binding, prototype methods)  
✔ **Async/Await & Event Loop** (Promise chaining, `setTimeout`)  
✔ **ES6 Features** (destructuring, optional chaining, spread/rest)  
✔ **Generators & Classes**  

Would you like **more hands-on coding tasks or challenges**? 😃
---
Here are the **solutions and explanations** for all the challenges! 🚀  

---

## **🔹 Challenge 1: Hoisting and `var` vs `let`**
```js
console.log(x);
var x = 10;
console.log(y);
let y = 20;
```
### **Output:**
```
undefined
ReferenceError: Cannot access 'y' before initialization
```
### **Explanation:**
- **`var` is hoisted** but **initialized as `undefined`** → so `console.log(x)` prints `undefined`.
- **`let` is hoisted but not initialized** → accessing it before declaration **throws an error**.

---

## **🔹 Challenge 2: Event Loop & `setTimeout`**
```js
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
```
### **Output:**
```
1
4
3
2
```
### **Explanation:**
1. `console.log(1);` → Runs **synchronously**.
2. `setTimeout()` → Added to the **macro-task queue**.
3. `Promise.resolve().then(() => console.log(3));` → Goes to **micro-task queue**.
4. `console.log(4);` → Runs **synchronously**.
5. **Micro-task queue (faster than macro-task queue)** → `console.log(3);`
6. **Macro-task queue** → `console.log(2);`

---

## **🔹 Challenge 3: Closures & `this`**
```js
const obj = {
  x: 10,
  getX: function () {
    return this.x;
  },
};

const getX = obj.getX;
console.log(getX());  // ?
console.log(obj.getX()); // ?
```
### **Output:**
```
undefined
10
```
### **Explanation:**
- `getX()` inside `obj` correctly refers to `this.x = 10`.
- But `getX = obj.getX;` extracts the function, **losing the object context**, so `this` refers to `globalThis` (where `x` is `undefined`).

✅ **Fix:** Use `.bind()`  
```js
const boundGetX = obj.getX.bind(obj);
console.log(boundGetX()); // 10
```

---

## **🔹 Challenge 4: `this` in Arrow Functions**
```js
const person = {
  name: "Aasif",
  greet: () => {
    console.log(`Hello, ${this.name}`);
  },
};
person.greet();
```
### **Output:**
```
Hello, undefined
```
### **Explanation:**
- Arrow functions **don't have their own `this`**, they inherit from **lexical scope (global scope)** where `name` is `undefined`.

✅ **Fix:** Use a **regular function**:  
```js
const person = {
  name: "Aasif",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};
person.greet(); // Hello, Aasif
```

---

## **🔹 Challenge 5: Asynchronous Function Execution**
```js
async function asyncFunc() {
  console.log("Start");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("End");
}
console.log("Before");
asyncFunc();
console.log("After");
```
### **Output:**
```
Before
Start
After
End
```
### **Explanation:**
1. `"Before"` is logged first.
2. `asyncFunc()` starts, logging `"Start"`.
3. `await` pauses execution, **allowing `"After"` to print first**.
4. After 1s delay, `"End"` is logged.

---

## **🔹 Challenge 6: Object Property Access**
```js
const obj = {
  message: "Hello",
  getMessage() {
    return this.message + ", World!";
  },
};

const output = obj.getMessage;
console.log(output()); // Fix this
```
### **Fix:** Use `.bind()`
```js
const output = obj.getMessage.bind(obj);
console.log(output()); // "Hello, World!"
```

---

## **🔹 Challenge 7: Deep Copy vs Shallow Copy**
```js
const obj1 = { name: "Aasif" };
const obj2 = { ...obj1 };
obj1.name = "Updated";
console.log(obj2.name);
```
### **Output:**
```
Aasif
```
### **Explanation:**
- `{ ...obj1 }` creates a **shallow copy**.
- Since `name` is a **primitive**, it remains unchanged in `obj2`.

---

## **🔹 Challenge 8: `reduce()` Array Manipulation**
```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);
```
### **Output:**
```
15
```

---

## **🔹 Challenge 9: Prototypal Inheritance**
```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise`);
};

const dog = new Animal("Dog");
dog.speak();

delete dog.speak;
dog.speak();
```
### **Output:**
```
Dog makes a noise
Dog makes a noise
```
### **Explanation:**
- `delete dog.speak;` **does not remove the prototype method** (`speak()` is on `Animal.prototype`).
- `dog.speak()` still works.

---

## **🔹 Challenge 10: Logical Operators**
```js
console.log(false || 0 || "Hello" || 5);
console.log(true && "JS" && 100 && null);
```
### **Output:**
```
Hello
null
```
### **Explanation:**
- **`||` (OR operator)** → Returns the **first truthy value** (`"Hello"`).
- **`&&` (AND operator)** → Returns the **first falsy value** (`null`).

---

## **🔹 Bonus Challenge: Implement `debounce` Function**
### **Solution**
```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Example usage:
const sayHello = debounce(() => console.log("Hello"), 1000);
sayHello(); // Runs after 1 second if not called again within delay
```
### **How it Works?**
- **Prevents function execution** until a specified `delay` passes **without another call**.

---

## **🔥 Summary**
✔ **Hoisting & `var` vs `let`**  
✔ **Async/Await & Event Loop**  
✔ **Closures & `this` Binding**  
✔ **Shallow vs Deep Copy**  
✔ **Logical Operators & Short-circuiting**  
✔ **Prototypes & Function Binding**  

💡 **Want more challenges? Let me know!** 🚀

