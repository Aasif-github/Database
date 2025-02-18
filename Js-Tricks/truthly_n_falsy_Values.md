### **Truthy and Falsy Values in JavaScript**  

In JavaScript, values are categorized as either **truthy** or **falsy** based on how they are evaluated in a boolean context (e.g., inside an `if` statement).  

#### **Truthy Values**  
A **truthy** value is any value that is considered `true` when evaluated in a boolean context. All values in JavaScript are truthy **except** for a few falsy values.  

**Examples of Truthy Values:**  
- Non-empty strings: `"Hello"`, `"0"`, `"false"`  
- Non-zero numbers: `1`, `-1`, `3.14`  
- Objects: `{}`, `[]`  
- Functions: `function() {}`  
- `Infinity` and `-Infinity`  
- `true`  

#### **Falsy Values**  
A **falsy** value is a value that evaluates to `false` in a boolean context.  

**There are only 8 falsy values in JavaScript:**  
1. `false`  
2. `0` (zero)  
3. `-0` (negative zero)  
4. `0n` (BigInt zero)  
5. `""` (empty string)  
6. `null`  
7. `undefined`  
8. `NaN`  

#### **Example Usage:**  
```js
if ("Hello") {
    console.log("Truthy!"); // Output: Truthy!
}

if (0) {
    console.log("Falsy!"); // This will not execute
}
```

Understanding truthy and falsy values is essential for writing clean and efficient conditional statements in JavaScript.
