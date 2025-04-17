# Shallow and Deep Copy

In JavaScript, **shallow copy** and **deep copy** refer to how objects or arrays are duplicated. The key difference lies in how nested objects or arrays (references) are handled during the copying process.

---

### **Shallow Copy**
A **shallow copy** creates a new object or array, but it only copies the top-level properties or elements. If the original object contains nested objects or arrays (reference types), the shallow copy will reference the same nested objects as the original. Changes to nested objects in the copy will affect the original, and vice versa.

#### **Key Characteristics**
- Copies primitive values (e.g., numbers, strings, booleans) by value.
- Copies reference types (e.g., objects, arrays) by reference.
- Only the top-level structure is duplicated.

#### **Methods to Create a Shallow Copy**
1. **Spread Operator (`...`)**
   ```javascript
   const original = { a: 1, b: { c: 2 } };
   const shallowCopy = { ...original };
   shallowCopy.b.c = 3;
   console.log(original.b.c); // 3 (original is affected)
   ```

2. **Object.assign()**
   ```javascript
   const original = { a: 1, b: { c: 2 } };
   const shallowCopy = Object.assign({}, original);
   shallowCopy.b.c = 3;
   console.log(original.b.c); // 3 (original is affected)
   ```

3. **Array.prototype.slice()** (for arrays)
   ```javascript
   const original = [1, [2, 3]];
   const shallowCopy = original.slice();
   shallowCopy[1][0] = 4;
   console.log(original[1][0]); // 4 (original is affected)
   ```

#### **When to Use**
- Use shallow copy when you only need to duplicate the top-level structure and are okay with shared references for nested objects.

---

### **Deep Copy**
A **deep copy** creates a completely independent copy of an object or array, including all nested objects and arrays. The copy has no shared references with the original, so changes to the copy do not affect the original, and vice versa.

#### **Key Characteristics**
- Recursively copies all levels of the object or array.
- No references are shared between the original and the copy.
- More computationally expensive than shallow copy.

#### **Methods to Create a Deep Copy**
1. **JSON.parse(JSON.stringify())**
   ```javascript
   const original = { a: 1, b: { c: 2 } };
   const deepCopy = JSON.parse(JSON.stringify(original));
   deepCopy.b.c = 3;
   console.log(original.b.c); // 2 (original is unaffected)
   ```
   **Limitations**:
   - Does not handle functions, `undefined`, `Symbol`, or circular references.
   - Converts `Date` objects to strings.

2. **Structured Clone (Modern Browser/Node.js)**
   ```javascript
   const original = { a: 1, b: { c: 2 } };
   const deepCopy = structuredClone(original);
   deepCopy.b.c = 3;
   console.log(original.b.c); // 2 (original is unaffected)
   ```
   **Advantages**:
   - Handles more complex data types (e.g., `Date`, `Map`, `Set`, circular references).
   - Available in modern JavaScript environments.

3. **Custom Recursive Function**
   ```javascript
   function deepCopy(obj) {
     if (obj === null || typeof obj !== 'object') return obj;
     const copy = Array.isArray(obj) ? [] : {};
     for (let key in obj) {
       copy[key] = deepCopy(obj[key]);
     }
     return copy;
   }

   const original = { a: 1, b: { c: 2 } };
   const copy = deepCopy(original);
   copy.b.c = 3;
   console.log(original.b.c); // 2 (original is unaffected)
   ```

4. **Libraries (e.g., Lodash)**
   ```javascript
   const _ = require('lodash');
   const original = { a: 1, b: { c: 2 } };
   const deepCopy = _.cloneDeep(original);
   deepCopy.b.c = 3;
   console.log(original.b.c); // 2 (original is unaffected)
   ```

#### **When to Use**
- Use deep copy when you need a fully independent copy of an object or array, including all nested structures.

---

### **Key Differences**

| **Aspect**             | **Shallow Copy**                          | **Deep Copy**                            |
|------------------------|-------------------------------------------|------------------------------------------|
| **Depth**              | Copies only top-level properties          | Copies all levels recursively            |
| **References**         | Shares references to nested objects       | No shared references                     |
| **Performance**        | Faster, less memory-intensive             | Slower, more memory-intensive            |
| **Use Case**           | When nested objects can be shared         | When complete independence is needed     |
| **Methods**            | Spread, `Object.assign`, `slice`          | `structuredClone`, `JSON.stringify`, etc.|

---

### **Example to Illustrate**
```javascript
// Shallow Copy
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };
shallowCopy.b.c = 3;
console.log(original.b.c); // 3 (original is affected)

// Deep Copy
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.b.c = 4;
console.log(original.b.c); // 3 (original is unaffected)
```

---

### **Summary**
- **Shallow copy** is quick but only duplicates the top level, sharing references to nested objects.
- **Deep copy** creates a fully independent duplicate but is more resource-intensive.
- Choose based on whether you need shared references (shallow) or complete independence (deep). For modern JavaScript, `structuredClone` is a robust deep copy method, while the spread operator or `Object.assign` is great for shallow copies.