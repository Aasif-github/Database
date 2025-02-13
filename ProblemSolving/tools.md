# Strings - methods

### Slice - The slice() method of Array instances returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

# Includes
[MDN-Includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

The includes() method of Array instances determines whether an array includes a certain value among its entries, returning true or false as appropriate.

```js
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

console.log(pets.includes('at'));
// Expected output: false
```

# What is difference between slice and substring in js.
In JavaScript, both `slice()` and `substring()` are used to extract parts of a string, but they have key differences in behavior.  

---

### **1. `slice(start, end)`**
- Extracts a section of a string **from `start` to `end` (excluding `end`)**.
- Supports **negative indices** (counts from the end of the string).
- **Does not modify** the original string.

#### **Example:**
```javascript
let str = "Hello World";
console.log(str.slice(0, 5));   // "Hello"  (Extracts from index 0 to 4)
console.log(str.slice(-5));     // "World"  (Extracts last 5 characters)
console.log(str.slice(6, 11));  // "World"  (Extracts "World")
```

---

### **2. `substring(start, end)`**
- Also extracts from `start` to `end` (**excluding `end`**).
- **Does NOT support negative indices** (negative values are treated as `0`).
- **Swaps** `start` and `end` if `start > end`.

#### **Example:**
```javascript
let str = "Hello World";
console.log(str.substring(0, 5));   // "Hello"
console.log(str.substring(6, 11));  // "World"
console.log(str.substring(6, 2));   // "llo "  (Swaps `start` and `end`)
console.log(str.substring(-3, 5));  // "Hello" (Negative treated as 0)
```

---

### **Key Differences**
| Feature          | `slice()`                     | `substring()` |
|-----------------|------------------------------|--------------|
| Supports negative indices? | ✅ Yes | ❌ No |
| Modifies original string? | ❌ No | ❌ No |
| If `start > end`? | Returns empty string | Swaps `start` and `end` |
| Use case | Precise extraction (e.g., negative indexing) | Simple cases where order doesn’t matter |

#### **Which one to use?**
- Use **`slice()`** if you need **negative indices** or want a strict range.
- Use **`substring()`** if you want to handle swapped indices automatically.

---

### **Conclusion**
`slice()` is more flexible, especially when working with negative indices, making it **preferable in most cases**. 🚀