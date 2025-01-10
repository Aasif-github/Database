## when to use interface and when to use type in typescript?

In TypeScript, both `interface` and `type` can be used to define the shape of objects, functions, or other structures. However, there are subtle differences between the two, and the choice between them depends on the use case and your project's needs. Here's a detailed comparison to help you decide when to use `interface` and when to use `type`.

---

### **When to Use `interface`**

1. **For Defining Object Shapes**:
   - Use `interface` when defining the structure of objects.
   - Interfaces are extendable, making them ideal for use cases where you anticipate the need to add properties in the future.
   ```typescript
   interface User {
     id: number;
     name: string;
   }

   const user: User = { id: 1, name: "Alice" };
   ```

2. **For Extensibility**:
   - `interface` supports declaration merging, allowing multiple declarations with the same name to combine.
   - This is useful when extending third-party interfaces or augmenting libraries.
   ```typescript
   interface User {
     age?: number;
   }

   const user: User = { id: 1, name: "Alice", age: 25 }; // Works because of merged interface.
   ```

3. **For Class Implementations**:
   - Use `interface` to define contracts for classes to implement.
   ```typescript
   interface Animal {
     name: string;
     makeSound(): void;
   }

   class Dog implements Animal {
     name: string;
     constructor(name: string) {
       this.name = name;
     }
     makeSound() {
       console.log("Woof!");
     }
   }
   ```

4. **Performance**:
   - `interface` is generally more efficient for TypeScript’s compiler and tooling, as it's more optimized for type-checking.

---

### **When to Use `type`**

1. **For Advanced Types**:
   - Use `type` for more complex type compositions like unions, intersections, and mapped types.
   ```typescript
   type ID = number | string;

   const userId: ID = "abc123"; // Can be either a number or a string.
   ```

2. **For Defining Aliases**:
   - Use `type` to create type aliases for primitive types, tuples, or specific function signatures.
   ```typescript
   type Coordinates = [number, number];

   const point: Coordinates = [10, 20];
   ```

3. **For Literal Types**:
   - Use `type` to define exact values or literals.
   ```typescript
   type Direction = "north" | "south" | "east" | "west";

   const move: Direction = "north";
   ```

4. **For Composing Types**:
   - `type` allows the creation of complex types through intersections or unions.
   ```typescript
   type Admin = { id: number; role: string };
   type User = { name: string; email: string };
   type AdminUser = Admin & User;

   const adminUser: AdminUser = { id: 1, role: "admin", name: "Alice", email: "alice@example.com" };
   ```

5. **For Functions**:
   - Use `type` to define function types, especially when readability matters.
   ```typescript
   type Greet = (name: string) => string;

   const greet: Greet = (name) => `Hello, ${name}!`;
   ```

---

### **Key Differences Between `interface` and `type`**

| Feature                       | `interface`                                     | `type`                                             |
|-------------------------------|------------------------------------------------|---------------------------------------------------|
| **Extensibility**              | Supports declaration merging.                  | Does not support declaration merging.             |
| **Union and Intersection**     | Limited support (only intersections indirectly).| Fully supports unions and intersections.          |
| **Use in Class Implementation**| Can be implemented by a class.                 | Cannot be directly implemented by a class.        |
| **Complex Types**              | Not ideal for unions, literals, or tuples.     | Excellent for unions, literals, and tuples.       |
| **Tooling Optimization**       | Slightly better performance in tooling.        | Slightly less optimized in tooling.               |

---

### **Practical Recommendations**
1. **Prefer `interface` for object shapes and when extensibility is needed**:
   - Example: APIs, classes, or when working with libraries.

2. **Use `type` for everything else**, especially when:
   - You need unions, intersections, or complex type manipulations.
   - Working with primitive or tuple types.

3. **Stick to one style for consistency**:
   - In projects where `interface` is the norm, try to use it consistently unless `type` is required.
   - Similarly, in projects favoring `type`, follow that convention.

---

Would you like examples of more advanced use cases, like using `type` for utility types or combining both in a project?