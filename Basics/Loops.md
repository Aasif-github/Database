## Loops in JavaScript

JavaScript provides multiple looping constructs, each with unique behavior. Here’s a detailed comparison of different loops:

| Loop Type  | Use Case | Works On | Access to Index? | Performance | When to Use |
|------------|---------|----------|------------------|-------------|-------------|
| **`for` loop** | Traditional loop with explicit control | Arrays, Strings, Ranges | ✅ Yes (`i` variable) | 🔼 Fast (optimized for indexed collections) | When you need an index or iterate a fixed number of times |
| **`forEach` (Array method)** | Iterates over an array with a callback function | Arrays | ✅ Yes (as callback parameter) | 🔽 Slower (cannot break/continue) | When using functional programming or need a clean syntax |
| **`for...of`** | Iterates over iterable objects (values) | Arrays, Strings, Maps, Sets, Generators, NodeList | ❌ No | 🔼 Fast (optimized for iterables) | When iterating over values (especially iterables) |
| **`for...in`** | Iterates over object keys (enumerable properties) | Objects, Arrays | ✅ Yes (keys/index) | 🔽 Slow (includes prototype properties) | When looping through object properties |
| **`while` loop** | Runs until a condition is `false` | Any condition-based logic | ✅ Possible (custom counter) | 🔼 Fast (condition-based) | When the loop count is unknown |
| **`do...while`** | Ensures at least one iteration | Any condition-based logic | ✅ Possible (custom counter) | 🔼 Fast (condition-based) | When you want to execute the loop at least once |

---

### 🔹 **Detailed Differences with Examples**
#### **1. `for` Loop (Classic)**
   - Best for numerical loops or when an index is needed.
   ```js
   for (let i = 0; i < 5; i++) {
       console.log(i); // Output: 0, 1, 2, 3, 4
   }
   ```

#### **2. `forEach` (Array method)**
   - Only for arrays, doesn't support `break` or `continue`.
   ```js
   const arr = [10, 20, 30];
   arr.forEach((value, index) => {
       console.log(index, value);
   });
   ```

#### **3. `for...of` (Iterates Values)**
   - Works with iterables (Arrays, Strings, Maps, Sets).
   ```js
   const nums = [5, 10, 15];
   for (const num of nums) {
       console.log(num); // Output: 5, 10, 15
   }
   ```

#### **4. `for...in` (Iterates Keys)**
   - Used for object properties but not ideal for arrays.
   ```js
   const obj = { name: "Aasif", age: 25 };
   for (const key in obj) {
       console.log(key, obj[key]); // Output: name Aasif, age 25
   }
   ```

#### **5. `while` Loop (Condition-Based)**
   - Runs until a condition becomes false.
   ```js
   let count = 0;
   while (count < 3) {
       console.log(count);
       count++;
   }
   ```

#### **6. `do...while` Loop (Runs at least once)**
   ```js
   let num = 5;
   do {
       console.log(num);
       num--;
   } while (num > 0);
   ```

---

### ✅ **Which Loop Should You Use?**
| Scenario | Recommended Loop |
|----------|----------------|
| Need full control (index, condition, increment) | `for` |
| Iterating over an array (functional style) | `forEach` |
| Looping through values of an iterable | `for...of` |
| Iterating over object keys | `for...in` |
| Unknown iterations (until a condition is met) | `while` |
| Ensuring at least one execution | `do...while` |

---

Would you like more examples or a specific use case? 🚀