# Call, Apply, Bind

# 1. Call
### ✅ **Definition of `call()` in JavaScript (for Interviews):**

> The `call()` method is a built-in JavaScript function that allows you to **invoke a function immediately**, while explicitly setting the value of `this` and passing arguments **individually**.

Example:
```js
function greet() {
  console.log(this.animal, "typically sleep between", this.sleepDuration);
}

const obj = {
  animal: "cats",
  sleepDuration: "12 and 16 hours",
};

greet.call(obj); // cats typically sleep between 12 and 16 hours
```

---

### 🔹 **Syntax:**
```js
functionName.call(thisArg, arg1, arg2, ...);
```

- `thisArg`: The value to use as `this` inside the function.
- `arg1, arg2, ...`: Arguments passed to the function.

---

### 🔹 **Example:**
```js
function greet(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

const person = { name: "Aasif" };

greet.call(person, "Hi");
// Output: Hi, I'm Aasif
```

---

### 🔹 **Use Case:**
- Borrow a method from one object to use with another.
- Invoke a function with a custom `this` context immediately.

---
```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

console.log(new Food("cheese", 5).name);
// Expected output: "cheese"
```

[Call() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)



# 2. Apply










# Real-World Use Cases
Perfect! Let’s look at **real-world use cases** for `call()`, `apply()`, and `bind()` — the kind of scenarios that **interviewers love**, especially for frontend or JavaScript-heavy roles.

---

## ✅ **Real-World Use Cases**

---

### 🔹 1. **Borrowing Methods Between Objects** (✅ use `call()`)

You can borrow methods from one object and use them on another.

```js
const person1 = { name: "Aasif" };
const person2 = { name: "Iqbal" };

function sayHello(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

sayHello.call(person2, "Hi");  
// Output: Hi, I'm Iqbal
```

✅ You reused `sayHello()` for `person2` without rewriting the method.

---

### 🔹 2. **Using `apply()` to Call Math Functions on Arrays**

JavaScript’s `Math.max()` and `Math.min()` don’t accept arrays — `apply()` helps here.

```js
const numbers = [4, 2, 8, 6];

const max = Math.max.apply(null, numbers);
console.log(max); // 8
```

📌 Why `null`? Because `Math.max` doesn’t need a `this` value.

---

### 🔹 3. **Creating Pre-Configured Functions** (✅ use `bind()`)

`bind()` is useful when you want to **lock a value of `this`** and reuse the function.

```js
const user = {
  name: "Aasif",
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

const greetLater = user.greet.bind(user);
setTimeout(greetLater, 1000); // Output: Hello, Aasif
```

Without `bind()`, `this` inside `greet()` would refer to `window` or `undefined`.

---

### 🔹 4. **Event Handlers with Preserved Context**

When passing methods as callbacks, `this` often gets lost — use `bind()` to fix it.

```js
function Counter() {
  this.count = 0;
  this.increment = function () {
    this.count++;
    console.log(this.count);
  };
}

const c = new Counter();
document.getElementById("btn").addEventListener("click", c.increment.bind(c));
```

Without `bind(c)`, `this.count` would be `undefined` or refer to the button element.

---

### 🔹 5. **Dynamic Inheritance / Mixin Pattern**

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

const apple = new Food("Apple", 10);
console.log(apple); // Food { name: 'Apple', price: 10, category: 'food' }
```

You're using `call()` to inherit the constructor behavior from `Product`.

---