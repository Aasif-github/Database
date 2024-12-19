## Working With Database - Mongoose
Questions:

```js
// Define the interface for the document
interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: number;
    // role: Array<number>; //[0,1,2]
    // permission: { id: string; value: number[] }[]; // Define an array of objects
    createdAt: Date;
    updatedAt: Date;
}
```

`Why  we are doing it ??`

we can also use 
```js
interface IUser {
name:string,
...
}
```


The reason for using the interface `UserDocument` extending `Document` in the context of MongoDB with Mongoose is primarily to leverage TypeScript's type-checking and better integration with Mongoose's schemas and models. Here's a breakdown of why this approach is useful and when to use it:

---

### Why Extend `Document`?

1. **Integration with Mongoose**:
   - Mongoose models return instances of the `Document` class, which includes methods like `.save()`, `.populate()`, and `.deleteOne()`. 
   - By extending `Document`, you explicitly indicate that your interface represents a Mongoose document and includes all its built-in properties and methods.

   ```typescript
   interface UserDocument extends Document {
       name: string;
       email: string;
       password: string;
       role: number;
       createdAt: Date;
       updatedAt: Date;
   }
   ```

2. **Type Safety for MongoDB Documents**:
   - When you query the database or create a new instance of a user, the resulting object will include both your custom properties (`name`, `email`, etc.) and Mongoose methods like `.save()` or `.populate()`.  
   - Extending `Document` ensures that the TypeScript compiler understands that the returned object has the complete set of Mongoose document properties.

3. **Additional Mongoose Features**:
   - Mongoose documents often include extra properties like `_id` and `__v`. When you extend `Document`, these are automatically included in the type definition, ensuring compatibility with MongoDB.

---

### Why Not Just Use `IUser`?

The `IUser` interface is better suited for scenarios where you're working with plain objects that do not involve Mongoose's built-in functionality. For example:

1. **Plain Objects for Data Transfer**:
   - If you're handling user data outside of Mongoose (e.g., for an API response, validation, or a plain JavaScript object), you can use `IUser` to define the structure.

   ```typescript
   interface IUser {
       name: string;
       email: string;
       password: string;
       role: number;
       createdAt: Date;
       updatedAt: Date;
   }
   ```

2. **Decoupled Logic**:
   - Using `IUser` allows you to decouple the data structure from Mongoose entirely. This is useful for services, DTOs (Data Transfer Objects), or when switching between database solutions.

---

### When to Use Each Approach?

| **Scenario**                              | **Use `UserDocument`**                      | **Use `IUser`**                    |
|-------------------------------------------|---------------------------------------------|-------------------------------------|
| Working directly with Mongoose documents  | Yes                                         | No                                  |
| API response or non-Mongoose operations   | No                                          | Yes                                 |
| Type-checking for Mongoose queries/models | Yes                                         | No                                  |
| General plain object structure            | No                                          | Yes                                 |

---

### Combined Approach for Flexibility

In many cases, you can use **both** interfaces to achieve a clean separation of concerns:

```typescript
interface IUser {
    name: string;
    email: string;
    password: string;
    role: number;
    createdAt: Date;
    updatedAt: Date;
}

// Extend both IUser and Document for Mongoose-specific use
interface UserDocument extends IUser, Document {}

// Example: API response might only use IUser
const apiResponse: IUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "hashed-password",
    role: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
};

// Example: Mongoose query returns UserDocument
async function getUserById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id);
}
```

This approach allows you to handle plain data objects (`IUser`) while still fully supporting Mongoose's features (`UserDocument`).