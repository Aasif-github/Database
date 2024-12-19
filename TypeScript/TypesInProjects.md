## Why we use `user.d.ts` in `types` folder.


In a TypeScript project, using a `user.d.ts` file (or similar declaration files) serves specific purposes, especially in projects with complex type definitions or when you need to define global or shared types. Here's why you might use `user.d.ts` in the `types` folder:

---

### 1. **Centralized Type Definitions**
   - The `user.d.ts` file allows you to define types related to the `User` entity in a single, centralized location.
   - This ensures that all parts of your project can use consistent type definitions without duplicating code.

   ```typescript
   declare module "types/user" {
       interface IUser {
           name: string;
           email: string;
           password: string;
           role: number;
           createdAt: Date;
           updatedAt: Date;
       }
   }
   ```

---

### 2. **Separation of Concerns**
   - Keeping type definitions in dedicated `.d.ts` files separates them from implementation logic. This makes the project more maintainable and easier to understand.

---

### 3. **Global Accessibility**
   - If `user.d.ts` includes type declarations for global use (e.g., globally accessible interfaces, enums, or types), you can ensure they are accessible throughout the project without needing to import them everywhere.
   - To achieve this, you can add the following in your `tsconfig.json`:

     ```json
     {
       "compilerOptions": {
         "typeRoots": ["./types"]
       }
     }
     ```

     Example `user.d.ts`:
     ```typescript
     declare global {
         interface IUser {
             name: string;
             email: string;
             password: string;
             role: number;
             createdAt: Date;
             updatedAt: Date;
         }
     }

     export {}; // To prevent this file from being treated as a script
     ```

---

### 4. **Collaboration and Scalability**
   - In large projects, teams often work on different modules or features. Having a `user.d.ts` file in a `types` folder provides a shared contract for the `User` entity that everyone can rely on.

---

### 5. **Third-Party Package Integration**
   - When integrating Mongoose or other third-party libraries, you often need to extend or define custom types. Declaring these extensions in a `.d.ts` file keeps your project organized.

     Example:
     ```typescript
     import { Document } from "mongoose";

     declare module "types/user" {
         interface UserDocument extends Document {
             name: string;
             email: string;
             password: string;
             role: number;
             createdAt: Date;
             updatedAt: Date;
         }
     }
     ```

---

### 6. **Avoid Import Loops**
   - Type definitions in `.d.ts` files are declarations and don't require runtime imports, reducing the risk of circular dependencies in your codebase.

---

### 7. **Clarity for External Contributors**
   - When other developers (or your future self) look at the project, the `types` folder and files like `user.d.ts` make it immediately clear where to find type definitions for a specific entity.

---

### When Should You Use `user.d.ts`?

- When your project involves shared or global types.
- When working in a team with multiple developers.
- When you want to avoid runtime import/export overhead for type definitions.
- When defining or extending third-party library types.

Let me know if you'd like to explore how to structure your `types` folder for optimal organization!