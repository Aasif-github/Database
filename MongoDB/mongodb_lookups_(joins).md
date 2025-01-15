## 11. In Mongodb, how we can join two collection?

In MongoDB, you can **join** two collections using the **`$lookup`** aggregation stage. The `$lookup` stage allows you to perform a left outer join to another collection within the same database, making it possible to combine documents based on a shared field.

### Syntax of `$lookup`:
Here's the general syntax for using `$lookup` in an aggregation pipeline:

```javascript
db.collection.aggregate([
    {
        $lookup: {
            from: 'otherCollection', // Name of the other collection to join
            localField: 'fieldInThisCollection', // Field from the current collection
            foreignField: 'fieldInOtherCollection', // Field from the other collection
            as: 'joinedData' // Name of the array field to store the joined data
        }
    }
]);
```

### Example Scenario:
Suppose you have two collections: `orders` and `customers`.

#### `orders` Collection:
```json
{
    "_id": 1,
    "orderNumber": "1001",
    "customerId": 101,
    "amount": 250
}
```

#### `customers` Collection:
```json
{
    "_id": 101,
    "name": "John Doe",
    "email": "john.doe@example.com"
}
```

### Using `$lookup` to Join:
To join the `orders` collection with the `customers` collection based on `customerId`, you can use the following aggregation pipeline:

```javascript
db.orders.aggregate([
    {
        $lookup: {
            from: 'customers', // The collection to join
            localField: 'customerId', // Field in 'orders'
            foreignField: '_id', // Field in 'customers'
            as: 'customerDetails' // The result will be stored in 'customerDetails'
        }
    }
]);
```

### Result:
The result of the aggregation will look like this:

```json
[
    {
        "_id": 1,
        "orderNumber": "1001",
        "customerId": 101,
        "amount": 250,
        "customerDetails": [
            {
                "_id": 101,
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
        ]
    }
]
```

### Explanation:
- **`$lookup`** performs a left outer join, meaning that if a matching document in the `from` collection is found, it will be embedded as an array in the result.
- The `as` field specifies the name of the array that holds the joined documents.
- If no matching documents are found in the `from` collection, the `joinedData` array will be empty.

### Additional Options for `$lookup`:
MongoDB 3.6+ and newer versions introduced more advanced capabilities for `$lookup`, such as:
- **`pipeline`**: Instead of a direct field match, you can use an aggregation pipeline within `$lookup` for more complex conditions.
- **Unwinding Results**: Use `$unwind` after `$lookup` if you want to deconstruct the joined array so each element becomes a separate document.

### Example with Pipeline:
```javascript
db.orders.aggregate([
    {
        $lookup: {
            from: 'customers',
            let: { customerId: '$customerId' },
            pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$customerId'] } } },
                { $project: { name: 1, email: 1 } }
            ],
            as: 'customerDetails'
        }
    }
]);
```

### Summary:
- **`$lookup`** is the main tool for joining collections in MongoDB.
- Joins using `$lookup` can be as simple or as complex as needed, supporting conditions, projections, and pipeline stages for advanced use cases.


## 12. What is main difference between `ref` and `$lookup`?
The main difference between `ref` in Mongoose and `$lookup` in MongoDB lies in their usage and how they handle relationships between collections:

### 1. **Context and Usage**:
- **`ref` (Mongoose)**:
  - **Context**: Used in Mongoose, a Node.js ODM (Object Data Modeling) library for MongoDB.
  - **Purpose**: Defines relationships between collections at the schema level and is used for *populating* documents.
  - **How It Works**: When you set up a field with `ref`, Mongoose knows that this field references another collection. You can then use `.populate()` in your queries to automatically replace the referenced IDs with the actual documents from the related collection.
  - **Example**:
    ```javascript
    const postSchema = new mongoose.Schema({
        title: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // 'ref' sets up a reference to the User model
    });
    ```

- **`$lookup` (MongoDB)**:
  - **Context**: Part of MongoDB's aggregation framework, which runs directly on the MongoDB server.
  - **Purpose**: Performs *joins* between collections to combine data based on matching fields. It is used for creating more complex queries that need to fetch and merge data from multiple collections in a single query.
  - **How It Works**: The `$lookup` stage in an aggregation pipeline performs a left outer join to match documents from one collection with documents from another collection.
  - **Example**:
    ```javascript
    db.orders.aggregate([
        {
            $lookup: {
                from: 'customers',
                localField: 'customerId',
                foreignField: '_id',
                as: 'customerDetails'
            }
        }
    ]);
    ```

### 2. **Level of Abstraction**:
- **`ref`**:
  - Works at the **Mongoose level** and simplifies the process of referencing related data. It abstracts away the logic of joins, making it easier for developers using Node.js to manage relationships between documents.
  - Requires an explicit call to `.populate()` to fetch and replace the references with actual data.

- **`$lookup`**:
  - Works directly at the **MongoDB database level** as part of its aggregation framework, providing more control and flexibility. It does not require an ODM like Mongoose.
  - Operates as part of a more complex query structure and is suited for use cases where data from multiple collections needs to be combined in the database itself.

### 3. **Performance Considerations**:
- **`ref` (with `.populate()`)**:
  - Can add additional queries to the database when fetching related documents, which might affect performance for large datasets or deeply nested populations.
  - Suitable for simpler applications where Mongoose is used and join logic is abstracted.

- **`$lookup`**:
  - Executes entirely on the MongoDB server and is typically more efficient for complex queries because it fetches data in a single operation.
  - Better suited for handling complex joins involving large data sets where database-level performance is crucial.

### 4. **Flexibility**:
- **`ref`**:
  - More straightforward and easier to use within Mongoose-based applications. Limited to basic references without as much customization as `$lookup`.

- **`$lookup`**:
  - More flexible and powerful, allowing complex pipelines and custom matching logic. Can be used to create advanced data transformation pipelines beyond simple joins.

### Summary:
- Use **`ref`** in Mongoose when you want to create simple references between collections and manage them with the convenience of Mongoose's `.populate()` method.
- Use **`$lookup`** when working directly with MongoDB's aggregation framework to join collections for more complex and high-performance queries at the database level.


## What is Left Outer Join?
Yes, **LEFT JOIN** and **LEFT OUTER JOIN** are the same in SQL. The term **OUTER** is optional because all **LEFT JOINs** are by definition "outer" joins. 

### What Does a LEFT JOIN Do?
A **LEFT JOIN** retrieves:
1. All rows from the **left table** (the table mentioned first in the query).
2. Matching rows from the **right table** (the table joined to the left table).
3. If there is no match in the right table, the result will still include the row from the left table, with `NULL` values for columns from the right table.

---

### Example:
Imagine two tables:  
#### `employees`:
| emp_id | emp_name  |
|--------|-----------|
| 1      | Alice     |
| 2      | Bob       |
| 3      | Charlie   |

#### `salaries`:
| emp_id | salary  |
|--------|---------|
| 1      | 5000    |
| 2      | 7000    |

#### Query:
```sql
SELECT employees.emp_name, salaries.salary
FROM employees
LEFT JOIN salaries
ON employees.emp_id = salaries.emp_id;
```

#### Result:
| emp_name  | salary  |
|-----------|---------|
| Alice     | 5000    |
| Bob       | 7000    |
| Charlie   | NULL    |

---

### Why "LEFT OUTER JOIN" and "LEFT JOIN" Are the Same:
- **"OUTER"** explicitly describes the type of join, but it is optional since **LEFT JOIN** always implies an outer join.
- Writing **LEFT JOIN** is more common in practice.

#### Equivalent Query:
```sql
SELECT employees.emp_name, salaries.salary
FROM employees
LEFT OUTER JOIN salaries
ON employees.emp_id = salaries.emp_id;
```

---

### Other Joins for Comparison:
1. **INNER JOIN**: Returns only rows with matches in both tables.
2. **RIGHT JOIN**: Returns all rows from the right table and matching rows from the left table.
3. **FULL OUTER JOIN**: Returns all rows from both tables, with `NULL` for missing matches.

### Summary:
- **LEFT JOIN** = **LEFT OUTER JOIN** (they are identical).
- Use **LEFT JOIN** for simplicity unless you need to emphasize the join type.

