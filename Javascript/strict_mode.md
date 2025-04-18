## How JS Engine Reacts to Strict Mode

**Strict Mode** in JavaScript is a setting that enforces stricter rules for writing code, catching common errors (like undeclared variables), preventing unsafe practices, and ensuring `this` is `undefined` in functions unless explicitly set. It’s enabled by adding `"use strict";` at the start of a script or function.

### How to Enable Strict Mode
- Add the string `"use strict";` at the beginning of a script or function.
  - **Global Scope**: Place it at the top of a JavaScript file to apply to the entire script.
    ```javascript
    "use strict";
    x = 10; // Error: x is not declared
    ```
  - **Function Scope**: Place it at the start of a function to apply only within that function.
    ```javascript
    function myFunction() {
      "use strict";
      y = 20; // Error: y is not declared
    }
    ```

### Key Effects of Strict Mode
1. **Eliminates Silent Errors**:
   - Undeclared variables cause errors (e.g., `x = 10` throws a `ReferenceError`).
   - Assigning values to non-writable properties or read-only globals (e.g., `NaN = 5`) throws errors.

2. **Prevents Bad Practices**:
   - Disallows duplicate parameter names in functions (e.g., `function foo(a, a) {}` throws a `SyntaxError`).
   - Prohibits `with` statements, which can lead to ambiguous code.
   - Disallows deleting undeletable properties (e.g., `delete Object.prototype` throws an error).

3. **Stricter `this` Behavior**:
   - In non-strict mode, `this` in a function defaults to the global object (e.g., `window` in browsers). In strict mode, `this` is `undefined` unless explicitly set.
     ```javascript
     "use strict";
     function myFunction() {
       console.log(this); // undefined
     }
     myFunction();
     ```

4. **Reserved Keywords**:
   - Reserves words like `implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, and `yield` for future use, preventing their use as variable names.

5. **Improved Security**:
   - Prevents access to `caller` and `arguments` properties in functions, reducing risks of exposing sensitive data.

### Benefits
- **Catches Errors Early**: Helps identify mistakes during development (e.g., typos in variable names).
- **Cleaner Code**: Encourages explicit variable declarations and avoids deprecated features.
- **Better Performance**: Some engines optimize strict mode code more effectively.

### Limitations
- Cannot be undone once enabled in a scope.
- May break older code relying on non-strict behavior (e.g., global `this`).
- Not all environments fully support strict mode (rare in modern contexts).

### Example
```javascript
// Without strict mode
x = 10; // No error, x becomes global
console.log(x); // 10

// With strict mode
"use strict";
y = 20; // ReferenceError: y is not defined
```

### Interview Tips
- **Why use strict mode?** To write safer, cleaner code and avoid common pitfalls.
- **Common question**: “What’s the difference in `this` behavior with and without strict mode?”
- **Practice**: Write a function with and without strict mode to see how errors and `this` behave differently.

If you want me to clarify a specific strict mode behavior or provide more examples, let me know!

### Additional Resources:
For more details on strict mode, check out this [guide on JavaScript strict mode](https://codingtorque.com/tic-tac-toe-game-using-javascript/).
```
