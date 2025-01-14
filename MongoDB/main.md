## Aggregation Pipeline

The **aggregation pipeline** in MongoDB is a way to process and transform data by passing it through a series of steps called stages. Each stage performs a specific task, like filtering data, grouping it, sorting it, or calculating totals.

---

### **How It Works (Simple Example)**

Imagine you have a collection of users:
```json
[
  { "name": "Alice", "age": 25, "status": "active" },
  { "name": "Bob", "age": 30, "status": "inactive" },
  { "name": "Charlie", "age": 35, "status": "active" }
]
```

We want to:
1. Get only the users with `"active"` status.
2. Show their names and ages, but not the `_id`.
3. Sort them by age.

**Aggregation Pipeline Code:**
```javascript
db.users.aggregate([
  { $match: { status: "active" } },  // Step 1: Filter active users
  { $project: { name: 1, age: 1, _id: 0 } },  // Step 2: Select specific fields
  { $sort: { name: 1 } }  // Step 3: Sort by age
]);
```

**Result:**
```json
[
  { "name": "Alice", "age": 25 },
  { "name": "Charlie", "age": 35 }
]
```

---

### **Key Points to Remember**
- It works like a step-by-step assembly line for processing data.
- Each step modifies or filters the data for the next step.
- Common tasks include filtering (`$match`), grouping (`$group`), selecting fields (`$project`), and sorting (`$sort`).

Think of the aggregation pipeline as a tool to break down a complex task into smaller, manageable steps!

## Grouping them by age
If you want to **group users by age** in MongoDB using the aggregation pipeline, you can use the `$group` stage. Here's a simplified explanation and example:

---

### **Goal**: Group users by their age and count how many users are in each age group.

---

### **Updated Example**

Suppose you have the following `users` collection:
```json
[
  { "name": "Alice", "age": 25, "status": "active" },
  { "name": "Bob", "age": 30, "status": "inactive" },
  { "name": "Charlie", "age": 25, "status": "active" },
  { "name": "David", "age": 30, "status": "active" }
]
```

**Aggregation Pipeline:**
```javascript
db.users.aggregate([
  { 
    $group: { 
      _id: "$age",            // Group by age
      count: { $sum: 1 }      // Count the number of users in each age group
    } 
  }
]);
```

**Result:**
```json
[
  { "_id": 25, "count": 2 },
  { "_id": 30, "count": 2 }
]
```

---

### **What Happened?**
1. **`$group`**:
   - Groups documents by the `age` field (specified by `_id: "$age"`).
   - The `count` field uses `$sum: 1` to count how many users belong to each group.

---

### **If You Want More Details**
You can include other aggregated data, like listing all names in each age group:
```javascript
db.users.aggregate([
  { 
    $group: { 
      _id: "$age",                     // Group by age
      count: { $sum: 1 },              // Count users in each group
      names: { $push: "$name" }        // Collect names in each age group
    } 
  }
]);
```

**Result:**
```json
[
  { "_id": 25, "count": 2, "names": ["Alice", "Charlie"] },
  { "_id": 30, "count": 2, "names": ["Bob", "David"] }
]
```

---

This approach makes it easy to group, count, and analyze your data in MongoDB!


## What is Diff between `ref` and `$lookup`?
The main difference between **`ref`** (in Mongoose) and **`$lookup`** (in MongoDB) is how they handle relationships between documents:

### **`ref` (Mongoose)**:
- Used in **Mongoose schemas** to create references between collections.
- Requires an additional query with **`populate()`** to fetch the related data.
- Example: Linking a `Post` to a `User` using the `ref` option in Mongoose.

**Pro**: Easy to use with Mongoose for relational data.  
**Con**: Involves multiple queries (one to fetch the main document and another to populate).

---

### **`$lookup` (MongoDB)**:
- A **MongoDB aggregation operator** used to join collections at the database level.
- Works directly in MongoDB without requiring an external library.
- Performs a **left outer join** to merge related data in a single query.

**Pro**: Combines data in one query, reducing round trips to the database.  
**Con**: Slightly more complex to set up than `ref`.

---

### Summary:
- Use **`ref`** with **Mongoose** for simpler schema-based relationships and queries.
- Use **`$lookup`** when working directly with MongoDB or for performance when combining data in a single query.