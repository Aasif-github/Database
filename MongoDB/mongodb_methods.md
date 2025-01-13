### $elemMatch

`$elemMatch` is a MongoDB operator used to match documents based on conditions applied to elements in an array field. It allows you to query for documents where at least one element in an array meets all specified conditions. This is especially useful when you need to match a subset of fields within a single array element rather than any field across multiple elements.

### Use Cases for `$elemMatch`

1. **Filtering Documents with Array Elements Matching Multiple Conditions**  
   Use `$elemMatch` when you want to retrieve documents that have an array field where at least one element satisfies multiple conditions.

2. **Efficient Queries on Complex Array Structures**  
   `$elemMatch` is particularly useful for optimizing queries on large or complex arrays, where it ensures MongoDB evaluates only elements that meet all conditions, reducing unnecessary checks.

### Syntax of `$elemMatch`

The general syntax for `$elemMatch` is:

```javascript
{ <field>: { $elemMatch: { <condition1>, <condition2>, ... } } }
```

### Examples

#### 1. Basic Example

Suppose we have a collection of documents where each document represents a student with an array of `scores`. Each element in `scores` contains fields for `type` (e.g., "homework", "exam") and `score`.

```javascript
{
    name: "John Doe",
    scores: [
        { type: "homework", score: 80 },
        { type: "exam", score: 90 },
        { type: "quiz", score: 85 }
    ]
}
```

To find students who have at least one `homework` score greater than `85`, you would use `$elemMatch`:

```javascript
db.students.find({
    scores: { $elemMatch: { type: "homework", score: { $gt: 85 } } }
});
```

This query returns documents where at least one `scores` element has both `type: "homework"` and `score` greater than `85`.

#### 2. Multiple Conditions on Array Elements

Suppose we have a collection of documents for properties with a `rooms` array. Each `rooms` element contains fields like `type` (e.g., "bedroom", "bathroom") and `size`.

```javascript
{
    property: "123 Main St",
    rooms: [
        { type: "bedroom", size: 200 },
        { type: "bathroom", size: 50 },
        { type: "kitchen", size: 100 }
    ]
}
```

To find properties where there is a `bedroom` that has a size of at least `180`, you can use:

```javascript
db.properties.find({
    rooms: { $elemMatch: { type: "bedroom", size: { $gte: 180 } } }
});
```

This query ensures that only rooms with `type: "bedroom"` and `size >= 180` are considered, matching documents that meet both conditions within a single array element.

#### 3. Matching Against Nested Arrays

Consider a collection where each document has a `grades` field, which itself is an array of arrays representing scores for different subjects across terms.

```javascript
{
    name: "Alice",
    grades: [
        [ { subject: "math", score: 95 }, { subject: "science", score: 90 } ],
        [ { subject: "math", score: 85 }, { subject: "science", score: 80 } ]
    ]
}
```

To find students with a `math` score greater than `90` in any term, you would use `$elemMatch` with an additional query structure:

```javascript
db.students.find({
    grades: { $elemMatch: { $elemMatch: { subject: "math", score: { $gt: 90 } } } }
});
```

### Summary of `$elemMatch`

- **Purpose**: Match array elements where at least one element satisfies multiple conditions.
- **Optimized for Complex Queries**: Efficiently filters arrays based on complex, nested conditions.
- **Scope**: Matches only within a single array element rather than across multiple elements in the array.

Using `$elemMatch` can streamline queries involving arrays with complex or nested data, making MongoDB's document search both powerful and precise.


### $cond

In My Booking app, i have use one condition - booked: { $cond: [{ $in: ['$_id', available_slot_id] }, 1, 0] }

The line of code you provided is from a MongoDB aggregation pipeline and uses the `$cond` operator to create a conditional field called `booked` in the output. Here’s a detailed breakdown of how it works:

```javascript
booked: { $cond: [{ $in: ['$_id', available_slot_id] }, 1, 0] }
```

### Explanation

- **`$cond`**: This is a conditional operator in MongoDB's aggregation framework. It works like an `if-else` statement and has three parts:
  1. **Condition**: The expression to evaluate.
  2. **True Result**: The value returned if the condition is `true`.
  3. **False Result**: The value returned if the condition is `false`.

- **`$in`**: This operator checks if a specified value exists within an array. In this case:
  - `['$_id', available_slot_id]` checks if the document's `_id` is present in the `available_slot_id` array.
  - `$_id` refers to the `_id` field of each document in the pipeline. The dollar sign (`$`) is used to access field values in MongoDB.

- **Condition Breakdown**:
  - `{ $in: ['$_id', available_slot_id] }` checks if the `_id` of the current document exists in the `available_slot_id` array.
  - If `_id` is found in `available_slot_id`, the condition evaluates to `true`; otherwise, it evaluates to `false`.

- **Result**:
  - If the condition is `true` (i.e., the `_id` is in `available_slot_id`), `booked` is set to `1`.
  - If the condition is `false` (i.e., the `_id` is not in `available_slot_id`), `booked` is set to `0`.

### Example Use Case

Suppose `available_slot_id` is an array of slot IDs that have been booked. This code helps you identify which documents (or slots) are booked and which are not by setting the `booked` field accordingly.

#### Sample Scenario

Let’s say we have a collection of slot documents:

```javascript
[
    { _id: 1, time: "10:00 AM" },
    { _id: 2, time: "11:00 AM" },
    { _id: 3, time: "12:00 PM" }
]
```

And `available_slot_id` is `[1, 3]`, indicating that slots with IDs `1` and `3` are booked.

When you apply the `$cond` logic in an aggregation pipeline, the result would look like this:

```javascript
[
    { _id: 1, time: "10:00 AM", booked: 1 },
    { _id: 2, time: "11:00 AM", booked: 0 },
    { _id: 3, time: "12:00 PM", booked: 1 }
]
```

- Slot 1 (`_id: 1`) and Slot 3 (`_id: 3`) have `booked` set to `1` because their IDs are found in `available_slot_id`.
- Slot 2 (`_id: 2`) has `booked` set to `0` because its ID is not in `available_slot_id`.

### Summary

This line effectively tags each slot with a `booked` status, where `1` means the slot is booked, and `0` means it is not booked. This is particularly useful when you want to distinguish between booked and available slots within a single query.

Another Use-cases

The `$cond` operator in MongoDB is used to implement conditional logic within an aggregation pipeline, allowing you to apply an "if-else" style evaluation directly in your queries. With `$cond`, you can choose between two values depending on whether a specified condition evaluates to `true` or `false`.

### Syntax of `$cond`

The basic syntax for `$cond` is:

```javascript
{ $cond: { if: <condition>, then: <true-case>, else: <false-case> } }
```

Alternatively, `$cond` can also be used in a simpler, positional format:

```javascript
{ $cond: [ <condition>, <true-case>, <false-case> ] }
```

### Components of `$cond`

- **`<condition>`**: The condition you want to evaluate. This can be any expression that returns `true` or `false`.
- **`<true-case>`**: The value to return if the condition is `true`.
- **`<false-case>`**: The value to return if the condition is `false`.

### Example Use Cases of `$cond`

#### 1. Basic Conditional Logic

Suppose we have a collection called `orders` where each document has a `quantity` and `price` field. We want to add a `discounted_price` field that applies a discount only if the `quantity` is greater than 10.

```javascript
db.orders.aggregate([
    {
        $project: {
            item: 1,
            quantity: 1,
            price: 1,
            discounted_price: {
                $cond: {
                    if: { $gt: ["$quantity", 10] },
                    then: { $multiply: ["$price", 0.9] }, // 10% discount
                    else: "$price"
                }
            }
        }
    }
]);
```

In this example:
- **Condition**: `{ $gt: ["$quantity", 10] }` checks if `quantity` is greater than 10.
- **True Case**: `{ $multiply: ["$price", 0.9] }` applies a 10% discount if the condition is true.
- **False Case**: `"$price"` (the original price) is used if the condition is false.

#### 2. Using `$cond` with `$in` for Array Membership Check

Suppose you have an array of `preferred_customers` and you want to mark orders from preferred customers with a `priority` field.

```javascript
db.orders.aggregate([
    {
        $project: {
            customer: 1,
            amount: 1,
            priority: {
                $cond: [
                    { $in: ["$customer", ["Alice", "Bob", "Charlie"]] },
                    "High",
                    "Normal"
                ]
            }
        }
    }
]);
```

In this case:
- **Condition**: `{ $in: ["$customer", ["Alice", "Bob", "Charlie"]] }` checks if the `customer` is in the preferred list.
- **True Case**: `"High"` is set as `priority` if the customer is in the list.
- **False Case**: `"Normal"` is used if the customer is not in the list.

#### 3. Conditional Field Assignment in Nested Arrays

Suppose we have a collection where each document has an `items` array, and each item has a `price` and `type`. We want to add a `discounted` field, which is `1` if the `price` is over `100` and `0` otherwise.

```javascript
db.orders.aggregate([
    {
        $project: {
            items: {
                $map: {
                    input: "$items",
                    as: "item",
                    in: {
                        price: "$$item.price",
                        type: "$$item.type",
                        discounted: { $cond: [{ $gt: ["$$item.price", 100] }, 1, 0] }
                    }
                }
            }
        }
    }
]);
```

Here:
- The `$map` operator iterates over the `items` array.
- **Condition**: `{ $gt: ["$$item.price", 100] }` checks if the price of each item is greater than 100.
- **True Case**: `1` (sets `discounted` to `1` if `price` > 100).
- **False Case**: `0` (sets `discounted` to `0` if `price` ≤ 100).

### Summary of `$cond`

- **Purpose**: `$cond` enables conditional evaluations in aggregation pipelines.
- **Structure**: Has a simple if-then-else structure, making it flexible for various logic needs.
- **Common Use Cases**: Setting fields based on conditions, computing conditional values, handling array processing with conditions.

Using `$cond` can significantly enhance the versatility of MongoDB aggregation queries by adding logic directly within the database layer.


### Group
[MongoDB - Group(aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#std-label-ex-agg-group-stage)





#### Calculate Count, Sum, and Average

Collection: Sales

```js
db.sales.insertMany([
  { "_id" : 1, "item" : "abc", "price" : Decimal128("10"), "quantity" : Int32("2"), "date" : ISODate("2014-03-01T08:00:00Z") },
  { "_id" : 2, "item" : "jkl", "price" : Decimal128("20"), "quantity" : Int32("1"), "date" : ISODate("2014-03-01T09:00:00Z") },
  { "_id" : 3, "item" : "xyz", "price" : Decimal128("5"), "quantity" : Int32( "10"), "date" : ISODate("2014-03-15T09:00:00Z") },
  { "_id" : 4, "item" : "xyz", "price" : Decimal128("5"), "quantity" :  Int32("20") , "date" : ISODate("2014-04-04T11:21:39.736Z") },
  { "_id" : 5, "item" : "abc", "price" : Decimal128("10"), "quantity" : Int32("10") , "date" : ISODate("2014-04-04T21:23:13.331Z") },
  { "_id" : 6, "item" : "def", "price" : Decimal128("7.5"), "quantity": Int32("5" ) , "date" : ISODate("2015-06-04T05:08:13Z") },
  { "_id" : 7, "item" : "def", "price" : Decimal128("7.5"), "quantity": Int32("10") , "date" : ISODate("2015-09-10T08:43:00Z") },
  { "_id" : 8, "item" : "abc", "price" : Decimal128("10"), "quantity" : Int32("5" ) , "date" : ISODate("2016-02-06T20:20:13Z") },
])
```

*** Group by Day of the Year ***

The following pipeline calculates the total sales amount, average sales quantity, and sale count for each day in the year 2014:

```js
db.sales.aggregate([
  // First Stage
  {
    $match : { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
  },
  // Second Stage
  {
    $group : {
       _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
       totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
       averageQuantity: { $avg: "$quantity" },
       count: { $sum: 1 }
    }
  },
  // Third Stage
  {
    $sort : { totalSaleAmount: -1 }
  }
 ])
```

First Stage:

The $match stage filters the documents to only pass documents from the year 2014 to the next stage.

Second Stage:

The $group stage groups the documents by date and calculates the total sale amount, average quantity, and total count of the documents in each group.

Third Stage:

The $sort stage sorts the results by the total sale amount for each group in descending order.


The operation returns the following results:

```js
{
   "_id" : "2014-04-04",
   "totalSaleAmount" : Decimal128("200"),
   "averageQuantity" : 15, "count" : 2
}
{
   "_id" : "2014-03-15",
   "totalSaleAmount" : Decimal128("50"),
   "averageQuantity" : 10, "count" : 1
}
{
   "_id" : "2014-03-01",
   "totalSaleAmount" : Decimal128("40"),
   "averageQuantity" : 1.5, "count" : 2
}

```
This aggregation operation is equivalent to the following SQL statement:

```sql
SELECT date,
       Sum(( price * quantity )) AS totalSaleAmount,
       Avg(quantity)             AS averageQuantity,
       Count(*)                  AS Count
FROM   sales
WHERE  date >= '01/01/2014' AND date < '01/01/2015'
GROUP  BY date
ORDER  BY totalSaleAmount DESC
```

#### show me multiple case of group in mongodb

In MongoDB, you can use the `$group` stage in multiple ways to aggregate data. Below are different use cases demonstrating how to group and perform various operations:

### 1. Count Documents by a Field
Count how many documents exist for each category:
```javascript
db.products.aggregate([
  {
    $group: {
      _id: "$category", // Group by the 'category' field
      count: { $sum: 1 } // Count the number of documents in each group
    }
  }
]);
```

### 2. Sum of a Field
Calculate the total sales amount for each product:
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$productName", // Group by 'productName'
      totalSales: { $sum: "$amount" } // Sum the 'amount' field for each product
    }
  }
]);
```

### 3. Average Calculation
Find the average score for students in a course:
```javascript
db.students.aggregate([
  {
    $group: {
      _id: "$course", // Group by 'course'
      averageScore: { $avg: "$score" } // Calculate the average score
    }
  }
]);
```

### 4. Maximum and Minimum Values
Determine the highest and lowest scores in each subject:
```javascript
db.scores.aggregate([
  {
    $group: {
      _id: "$subject", // Group by 'subject'
      highestScore: { $max: "$score" }, // Find the max score
      lowestScore: { $min: "$score" }   // Find the min score
    }
  }
]);
```

### 5. Grouping by Date
Count how many orders were made each day:
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }, // Group by formatted date
      ordersCount: { $sum: 1 } // Count the number of orders for each date
    }
  }
]);
```

### 6. Grouping with Multiple Accumulators
Calculate the total and average salaries in each department:
```javascript
db.employees.aggregate([
  {
    $group: {
      _id: "$department", // Group by 'department'
      totalSalary: { $sum: "$salary" }, // Sum of salaries
      averageSalary: { $avg: "$salary" } // Average of salaries
    }
  }
]);
```

### 7. Using an Array of Group Keys
Group by multiple fields (e.g., category and subcategory):
```javascript
db.products.aggregate([
  {
    $group: {
      _id: { category: "$category", subCategory: "$subCategory" }, // Group by both category and subCategory
      totalProducts: { $sum: 1 } // Count the number of products in each group
    }
  }
]);
```

### 8. Combining `$group` with `$project`
Group data and project specific fields:
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$store", // Group by 'store'
      totalRevenue: { $sum: "$revenue" }
    }
  },
  {
    $project: {
      _id: 1,
      totalRevenue: 1,
      formattedRevenue: { $concat: ["$", { $toString: "$totalRevenue" }] } // Format the revenue as a string with a dollar sign
    }
  }
]);
```

These examples showcase the versatility of the `$group` stage in MongoDB's aggregation pipeline, allowing you to perform different types of aggregations to suit a variety of data analysis needs.

- $unwind
- $lookup

## show all use case of $lookup

The `$lookup` stage in MongoDB's aggregation pipeline is used for performing a left outer join to another collection in the same database. Below are various use cases of `$lookup` with explanations and examples:

### 1. **Basic `$lookup` for Simple Joins**
Join two collections based on a single field.

**Example**: Join a `orders` collection with a `customers` collection using `customerId`.
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",           // Collection to join
      localField: "customerId",    // Field in 'orders' collection
      foreignField: "_id",         // Field in 'customers' collection
      as: "customerDetails"        // Alias for the joined result
    }
  }
]);
```

### 2. **Unwind the Joined Array**
If `$lookup` results in an array and you need to flatten it, use `$unwind`.

**Example**: Flatten the `customerDetails` array so that each document has a single customer detail.
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  },
  { $unwind: "$customerDetails" }
]);
```

### 3. **Join Using Multiple Fields**
Perform a join where the local field is an array and the foreign field matches any value in that array.

**Example**: Match orders with products using an array of `productIds`.
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productIds",    // 'productIds' is an array
      foreignField: "_id",
      as: "productDetails"
    }
  }
]);
```

 ### 4. **Self-Join Using `$lookup`**
Join a collection with itself to find related data.

**Example**: Join `employees` with their managers using a `managerId` field.
```javascript
db.employees.aggregate([
  {
    $lookup: {
      from: "employees",
      localField: "managerId",
      foreignField: "_id",
      as: "managerDetails"
    }
  }
]);
```

### 5. **Combine `$lookup` with `$project`**
Select specific fields from the joined collection.

**Example**: Project only the `name` field from `customerDetails` in `orders`.
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  },
  {
    $project: {
      orderId: 1,
      "customerDetails.name": 1   // Include only the 'name' field
    }
  }
]);
```

### 6. **Performing Multiple `$lookup` Stages**
Use multiple `$lookup` stages to join with different collections within the same aggregation.

**Example**: Join `orders` with `customers` and `products`.
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails"
    }
  }
]);
```
These examples illustrate various ways `$lookup` can be used in MongoDB to perform simple and complex joins, filter data, and transform documents.

### How can we perform inner join.

To perform an inner join in MongoDB using the `$lookup` stage in the aggregation pipeline, you need to combine `$lookup` with `$match` to filter out documents where the join didn't find a match. While `$lookup` itself is inherently a left outer join, using `$match` after the `$lookup` helps simulate the behavior of an inner join by removing documents that don't have matching results.

### Example: Performing an Inner Join
Assume you have two collections:
- `orders`
- `customers`

You want to join these collections on `customerId` (in `orders`) and `_id` (in `customers`), returning only documents where the join is successful.

**Query to Perform an Inner Join**:
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",           // The collection to join
      localField: "customerId",    // The field in the 'orders' collection
      foreignField: "_id",         // The field in the 'customers' collection
      as: "customerDetails"        // Alias for the joined result
    }
  },
  // Use $match to filter out orders where no customer details were found (inner join behavior)
  {
    $match: { "customerDetails": { $ne: [] } }
  },
  // Optionally, use $unwind to flatten the array if only one match is expected per order
  {
    $unwind: "$customerDetails"
  }
]);
```

### Explanation:
1. **`$lookup`**: Joins the `orders` collection with the `customers` collection and stores the matching documents in `customerDetails`.
2. **`$match`**: Filters out documents where `customerDetails` is an empty array, effectively performing an inner join by removing documents without a match.
3. **`$unwind`**: (Optional) Flattens the `customerDetails` array so that each document only has a single matched customer entry.

### Result:
Only documents in the `orders` collection that have corresponding matches in the `customers` collection are returned.


### What is Ref. How to use it. When to use it?

`Ref` in MongoDB typically refers to the concept of using **references** in a document to establish relationships between documents across different collections. This is similar to foreign keys in relational databases. The `ref` keyword is often associated with Mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js.

### What is `ref`?
`ref` is used in Mongoose schema definitions to specify a relationship between collections. It indicates that a particular field references a document from another collection. This helps in creating a link between documents so that you can later populate and retrieve related data easily.

### Use Case of `ref`:
Suppose you have a `users` collection and a `posts` collection, where each post references the user who created it.

**User Schema**:
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);
```

**Post Schema with `ref`**:
```javascript
const postSchema = new Schema({
  title: String,
  content: String,
  author: { 
    type: Schema.Types.ObjectId,  // Stores the ID of the user
    ref: 'User'                   // Refers to the 'User' model
  }
});

const Post = mongoose.model('Post', postSchema);
```

## How to Use `ref` in Practice:
When you have a document in the `posts` collection that has an `author` field referencing the `_id` of a document in the `users` collection, you can use Mongoose's `.populate()` method to automatically replace the `author` field with the complete user document.

**Example of Populating a Reference**:
```javascript
Post.find()
  .populate('author')  // Replaces 'author' with the referenced user document
  .exec((err, posts) => {
    if (err) return console.error(err);
    console.log(posts);  // Each post will include the full user document for 'author'
  });
```

### Benefits of Using `ref`:
1. **Data Normalization**: Keeps data structured in a normalized format, reducing redundancy.
2. **Ease of Querying**: Mongoose's `.populate()` makes it easy to retrieve related documents.
3. **Flexibility**: You can keep collections lightweight and modular by referencing related data instead of embedding it.

### When to Use `ref`:
- When you have related data stored across different collections that need to be linked.
- When you need to keep collections separate to maintain flexibility and reduce redundancy.

### Example Scenario:
In a blogging platform, where you have `users` and `posts`:
- The `posts` collection stores references to the `users` collection using `author` as a reference.
- When you query for posts, you can populate the `author` field to show detailed user information.

Using `ref` and populating references are common practices when implementing relationships between different collections in MongoDB with Mongoose.

## What is TTL (time to live) - i used it on OTP expiry (after 2 min it delete by itself)

TTL (Time-To-Live) in MongoDB is a feature used to automatically remove documents from a collection after a specified period of time. This is particularly useful for data that is only relevant for a limited duration, such as session information, temporary logs, or cache data.

### Key Points About TTL in MongoDB:
1. **TTL Index**: To enable TTL, you create a special index called a TTL index on a field that contains a `Date` or `ISODate` value.
2. **Automatic Deletion**: MongoDB will automatically delete documents once the field's value is older than the TTL setting.
3. **Background Process**: TTL deletion is handled by a background thread in MongoDB, ensuring minimal performance impact.

### How TTL Works:
- When you create a TTL index on a field, MongoDB continuously checks that field's value to determine if the document should be deleted based on the expiration time.
- The field must be of the `Date` type, and the TTL value is specified in seconds.

### Creating a TTL Index:
To create a TTL index, use the `db.collection.createIndex()` method with the `expireAfterSeconds` option.

**Example**:
```javascript
db.sessions.createIndex(
  { "createdAt": 1 },               // Field to index
  { expireAfterSeconds: 3600 }       // TTL set to 1 hour (3600 seconds)
);
```

**Explanation**:
- This index will remove documents where the `createdAt` field is older than one hour from the current time.

### Use Cases for TTL:
1. **Session Management**: Automatically remove expired user sessions after a certain period.
2. **Temporary Data**: Delete cache entries or temporary data after a specified time.
3. **Logs and Auditing**: Clear logs or audit records after a set duration to save storage space.

### Important Considerations:
- **Expiration Precision**: The TTL background task runs approximately every 60 seconds, so documents may not be deleted immediately after they expire.
- **Impact on Updates**: If the indexed `Date` field is updated to a new value, the expiration time will be reset accordingly.
- **Single-Field Index**: TTL can only be applied to single-field indexes; compound indexes are not supported.

### Example Scenario:
You have a `notifications` collection where each notification is relevant only for 24 hours:

```javascript
db.notifications.createIndex(
  { "createdAt": 1 },
  { expireAfterSeconds: 86400 }  // TTL set to 24 hours (86400 seconds)
);
```

In this setup, any document with a `createdAt` field older than 24 hours will be automatically deleted by MongoDB.

TTL indexes are an efficient way to manage data lifecycle in MongoDB, simplifying the removal of outdated data without needing manual scripts or additional code.


### For OTP

Using TTL indexes on OTP (One-Time Password) collections in MongoDB is a great way to ensure that expired OTPs are automatically removed after a set period, enhancing security and efficiency.

### How to Implement TTL for OTP Expiry:
Suppose you have a collection that stores OTPs with their creation timestamps. You can create a TTL index on the `createdAt` field to automatically delete expired OTPs after a certain duration (e.g., 5 minutes).

### Step-by-Step Implementation:
1. **Create an OTP Collection Schema**:
   Ensure your OTP documents have a `createdAt` field that records the timestamp when the OTP was created.

   ```javascript
   {
     _id: ObjectId("..."),
     otp: "123456",
     userId: ObjectId("..."),
     createdAt: new Date()  // Field used for TTL
   }
   ```

2. **Create a TTL Index**:
   Use the `db.collection.createIndex()` method to set up a TTL index on the `createdAt` field.

   ```javascript
   db.otps.createIndex(
     { "createdAt": 1 },            // Field to index
     { expireAfterSeconds: 300 }     // TTL set to 5 minutes (300 seconds)
   );
   ```

   **Explanation**:
   - The `expireAfterSeconds` value specifies how long (in seconds) the document should live after the `createdAt` timestamp.
   - In this case, OTPs will be deleted automatically 5 minutes after their creation.

### Full Implementation Example in Node.js with Mongoose:
If you're using Mongoose for your Node.js project, you can define the schema and TTL index as follows:

```javascript
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now, index: { expires: '5m' } }  // TTL index
});

// Create the model
const Otp = mongoose.model('Otp', otpSchema);

// Example: Creating an OTP document
const newOtp = new Otp({
  otp: '123456',
  userId: '605c5adf02c3c72b9c2f4d6b'
});
newOtp.save().then(() => console.log('OTP created and will expire in 5 minutes.'));
```

### How It Works:
- The `createdAt` field is indexed with a TTL setting of 5 minutes (`expires: '5m'`).
- MongoDB will automatically delete OTP documents 5 minutes after their `createdAt` timestamp.
- This ensures that expired OTPs do not stay in the database, improving security and performance.

### Benefits:
- **Automatic Expiry**: No need to write custom scripts to remove expired OTPs.
- **Security**: Ensures that OTPs are not valid beyond their intended lifespan.
- **Performance**: Reduces storage and keeps the collection lean by cleaning up expired documents.

Using TTL for OTPs is a simple and effective way to handle expiration logic directly in the database.


## What is $$ROOT, How to use it, When to use it?

Absolutely, let's dive deeper into the details and usage of the `$root` operator in MongoDB's aggregation framework.

### The `$root` Operator
The `$root` operator is used in the context of `$project`, `$replaceRoot`, and other stages within the aggregation pipeline to reference the entire document at its current stage of the aggregation process. This is especially useful when you want to transform or reshape the document structure in the aggregation output.

Here are some more detailed examples to illustrate its usage:

### Example 1: Using `$project` with `$$ROOT`
Suppose you have a collection of documents where you want to keep the original document and add a new field. The `$$ROOT` system variable represents the entire document, allowing you to easily reference and include it in the transformation.

```javascript
db.collection.aggregate([
    {
        $project: {
            fullDocument: "$$ROOT",
            newField: "some value"
        }
    }
]);
```

In this case, the output document includes the entire original document under the `fullDocument` field and adds a new field `newField` with the specified value.

### Example 2: Using `$replaceRoot` to Promote a Nested Document
Imagine you have documents with a nested field, and you want to promote this nested document to the top level. The `$replaceRoot` stage can replace the root document with a specified subdocument.

```javascript
db.collection.aggregate([
    {
        $replaceRoot: { newRoot: "$nestedDocument" }
    }
]);
```

Here, the `nestedDocument` within each document is promoted to the root level, effectively making it the entire document in the output.

### Example 3: Combining `$lookup` with `$replaceRoot`
When you join data from another collection using `$lookup`, you often end up with an array of joined documents. If you want to replace the root document with the first element of this joined array, you can combine `$unwind` and `$replaceRoot`.

```javascript
db.collection.aggregate([
    {
        $lookup: {
            from: "otherCollection",
            localField: "foreignKey",
            foreignField: "_id",
            as: "joinedDoc"
        }
    },
    {
        $unwind: "$joinedDoc"
    },
    {
        $replaceRoot: { newRoot: "$joinedDoc" }
    }
]);
```

In this example, `joinedDoc` becomes the new root document for each entry after the `$unwind` stage, effectively flattening the structure and promoting the joined document.

### Example 4: Advanced Usage with `$group`
You can also use `$$ROOT` within the `$group` stage to include the entire document in the grouping operation.

```javascript
db.collection.aggregate([
    {
        $group: {
            _id: "$category",
            documents: { $push: "$$ROOT" }
        }
    }
]);
```

This groups documents by the `category` field and includes the entire original document in the `documents` array for each group.

### Detailed Breakdown of the Aggregation Pipeline
Let's consider a more complex example where you use multiple stages and `$$ROOT` to transform the document structure:

```javascript
db.collection.aggregate([
    {
        $match: { status: "active" }
    },
    {
        $group: {
            _id: "$category",
            count: { $sum: 1 },
            averageScore: { $avg: "$score" },
            documents: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 1,
            count: 1,
            averageScore: 1,
            firstDocument: { $arrayElemAt: ["$documents", 0] }
        }
    }
]);
```

- **$match**: Filters documents where `status` is "active".
- **$group**: Groups documents by `category`, calculates the count and average score, and includes the entire documents in the `documents` array.
- **$project**: Projects the group `_id`, `count`, `averageScore`, and the first document from the `documents` array.

### Summary
The `$$ROOT` operator is a powerful tool within MongoDB’s aggregation framework, allowing you to reference the entire document and perform complex transformations. Whether you're reshaping the document structure, promoting nested documents, or combining data from different collections, `$$ROOT` provides flexibility and control over the output format.

I hope these detailed examples help! If you have more specific scenarios or further questions, feel free to ask.

# What is the use of `$unwind` in MongoDB?

In MongoDB, the `$unwind` stage is an aggregation pipeline operator used to deconstruct an array field in a document. It outputs a separate document for each element of the array, effectively "unwinding" the array into multiple documents.

### Key Use Cases of `$unwind`

1. **Flatten Array Fields**: Breaks down documents containing arrays into multiple documents, each with a single array element.
2. **Enable Further Operations on Array Elements**: Simplifies performing operations like `$group`, `$match`, or `$sort` on individual array elements.
3. **Data Normalization**: Converts nested data structures into a flatter form for easier analysis.

### Syntax
```json
{
  $unwind: {
    path: "$arrayField", 
    includeArrayIndex: "arrayIndexField", 
    preserveNullAndEmptyArrays: true
  }
}
```

### Parameters
1. **`path`**: Specifies the array field to unwind (e.g., `$tags`).
2. **`includeArrayIndex`** *(optional)*: Outputs an additional field with the index of the array element.
3. **`preserveNullAndEmptyArrays`** *(optional)*: If `true`, documents with `null` or empty arrays will still be included in the output.

### Example
#### Input Collection:
```json
[
  { "_id": 1, "name": "Alice", "hobbies": ["reading", "cycling", "hiking"] },
  { "_id": 2, "name": "Bob", "hobbies": [] },
  { "_id": 3, "name": "Charlie", "hobbies": null },
  { "_id": 4, "name": "David" }
]
```

#### Aggregation Pipeline:
```javascript
db.users.aggregate([
  {
    $unwind: {
      path: "$hobbies",
      includeArrayIndex: "index",
      preserveNullAndEmptyArrays: true
    }
  }
])
```

#### Output:
```json
[
  { "_id": 1, "name": "Alice", "hobbies": "reading", "index": 0 },
  { "_id": 1, "name": "Alice", "hobbies": "cycling", "index": 1 },
  { "_id": 1, "name": "Alice", "hobbies": "hiking", "index": 2 },
  { "_id": 2, "name": "Bob", "hobbies": null },
  { "_id": 3, "name": "Charlie", "hobbies": null },
  { "_id": 4, "name": "David", "hobbies": null }
]
```

### Benefits
- **Transforms nested or hierarchical data**: Makes it easier to process and analyze data stored in arrays.
- **Handles sparse data gracefully**: With `preserveNullAndEmptyArrays`, you retain documents even if the array field is missing or empty.

### Common Use Cases
1. Reporting or analysis where array elements need to be treated as independent records.
2. Preprocessing data for joins with `$lookup`.
3. Aggregating statistics over array elements.

Let me know if you'd like further examples or explanations!