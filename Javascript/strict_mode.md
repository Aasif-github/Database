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
