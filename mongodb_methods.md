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


