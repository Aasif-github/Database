## CRUD

[MongoDB Doc - CRUD](https://www.mongodb.com/docs/manual/crud/)

###  1. Create


- db.collection.insertOne()

ex. 
```json
db.Users.insertOne({
    name:'Jake',
    age:23,
    status:'pending'    
});
```

- db.collection.insertMany() 

[MongoDB Doc - insertMany](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany)

ex.
```json
try {
   db.products.insertMany( [
      { item: "card", qty: 15 },
      { item: "envelope", qty: 20 },
      { item: "stamps" , qty: 30 }
   ] );
} catch (e) {
   print (e);
}
```
### 2. Read

- db.collection.find()
```json
db.Users.find(
{ age: { $gt:18 }},
{ name:1, address: 1},
).limit(5)
```

- Query an Array

ex.
```json
await db.collection('inventory').insertMany([
  {
    item: 'journal',
    qty: 25,
    tags: ['blank', 'red'],
    dim_cm: [14, 21]
  },
  {
    item: 'notebook',
    qty: 50,
    tags: ['red', 'blank'],
    dim_cm: [14, 21]
  },
  {
    item: 'paper',
    qty: 100,
    tags: ['red', 'blank', 'plain'],
    dim_cm: [14, 21]
  },
  {
    item: 'planner',
    qty: 75,
    tags: ['blank', 'red'],
    dim_cm: [22.85, 30]
  },
  {
    item: 'postcard',
    qty: 45,
    tags: ['blue'],
    dim_cm: [10, 15.25]
  }
]);
```

The following example queries for all documents where the field tags value is an array with exactly two elements, "red" and "blank", in the specified order:

```js
const cursor = db.inventory.find({ tags:['black', 'red'] })
```

If, instead, you wish to find an array that contains both the elements "red" and "blank", without regard to order or other elements in the array, use the $all operator:

```js
const cursor = db.collection('inventory').find({
  tags: { $all: ['red', 'blank'] }
});
```

### 3. Update 
- db.collection.updateOne()
- db.collection.updateMany()
- db.collection.replaceOne()

- updateOne()

```js
await db.collection('inventory').updateOne(
  { item: 'paper' },
  {
    $set: { 'size.uom': 'cm', status: 'P' },
    $currentDate: { lastModified: true }
  }
);
```

- updateMany()
```json
db.Users.updateMany(            # <- collection
    {  
        age: { $gt: 18 }            # <- update filter
    },
    {
        $set: { status: 'reject' }       # <-update action
    }
)
```

```json
{ "_id" : 1, "name" : "Central Perk Cafe", "Borough" : "Manhattan" },
{ "_id" : 2, "name" : "Rock A Feller Bar and Grill", "Borough" : "Queens", "violations" : 2 },
{ "_id" : 3, "name" : "Empire State Pub", "Borough" : "Brooklyn", "violations" : 0 }
```
- replaceOne()

```json
try {
   db.restaurant.replaceOne(
      { "name" : "Central Perk Cafe" },
      { "name" : "Central Pork Cafe", "Borough" : "Manhattan" }
   );
} catch (e){
   print(e);
}
```

### Delete
- db.collection.deleteOne()
- db.collection.deleteMany()

```js
try {
   db.orders.deleteOne( { _id: ObjectId("563237a41a4d68582c2509da") } );
} catch (e) {
   print(e);
}
```

What if we,

```js
try {
   db.orders.deleteOne( { expiryts: { $lt: ISODate("2015-11-01T12:40:15Z") } } );
} catch (e) {
   print(e);
}
```
```js
{ acknowledged: true, deletedCount: 1 }
```
The following operation deletes the first document with expiryts greater than ISODate("2015-11-01T12:40:15Z")

- deleteMany()
```js
db.Users.deleteMany(
    {
        status: "reject"
    }
)
```

Additional Methods for Inserts

The following methods can also add new documents to a collection, including collections hosted in MongoDB Atlas:

db.collection.updateOne() when used with the upsert: true option.

db.collection.updateMany() when used with the upsert: true option.

db.collection.findAndModify() when used with the upsert: true option.

db.collection.findOneAndUpdate() when used with the upsert: true option.

db.collection.findOneAndReplace() when used with the upsert: true option.

db.collection.bulkWrite().

In MongoDB, `find()`, `findOneAndUpdate()`, and `updateOne()` each serve different purposes and have specific use cases. Here’s a comparison of what each one does and when to use them:

### 1. `find()`

- **Purpose**: Retrieve multiple documents that match the specified filter criteria.
- **Usage**: Returns a cursor to the documents that match the query, allowing you to iterate over multiple results.
- **Does Not Modify Data**: `find()` is a read-only operation. It only retrieves data and does not modify any documents.
- **Return Value**: Returns a cursor to all documents matching the query criteria. In code, this is typically used with `.toArray()` or a loop to process each result.

   **Example**:
   ```javascript
   db.collection.find({ status: "active" });
   ```
   This returns all documents where `status` is `"active"`.

### 2. `findOneAndUpdate()`

- **Purpose**: Finds a single document based on the specified filter, updates it, and returns the document (either before or after the update, depending on options).
- **Atomic Operation**: Ensures that no other write operations affect the document in between finding and updating it, which is useful for specific atomic transactions.
- **Usage**: Typically used when you want to update a single document and immediately get the updated document for further processing.
- **Return Value**: Returns the document either before or after the update, depending on the `returnDocument` option:
   - `{ returnDocument: 'after' }`: Returns the document **after** the update (default in newer MongoDB versions).
   - `{ returnDocument: 'before' }`: Returns the document **before** the update.

   **Example**:
   ```javascript
   db.collection.findOneAndUpdate(
       { status: "active" },
       { $set: { status: "inactive" } },
       { returnDocument: "after" }
   );
   ```
   This finds the first document where `status` is `"active"`, sets its `status` to `"inactive"`, and returns the updated document.

### 3. `updateOne()`

- **Purpose**: Updates the first document that matches the filter criteria without returning it.
- **Usage**: Use when you only need to perform an update without retrieving the updated document. This is typically faster than `findOneAndUpdate()` when the return value isn’t needed.
- **Does Not Return Updated Document**: Unlike `findOneAndUpdate()`, `updateOne()` does not return the document itself; it only returns metadata about the operation (e.g., matched count, modified count).
- **Return Value**: Returns an object containing information about the update operation, such as:
   - `matchedCount`: The number of documents that matched the filter.
   - `modifiedCount`: The number of documents that were modified (usually 0 or 1 for `updateOne()`).
   - `upsertedId`: If an upsert occurred, this contains the `_id` of the inserted document.

   **Example**:
   ```javascript
   db.collection.updateOne(
       { status: "active" },
       { $set: { status: "inactive" } }
   );
   ```
   This finds the first document where `status` is `"active"` and updates it to `"inactive"`. The actual document is not returned, only metadata.

### Summary of Key Differences

| Operation             | Main Purpose                | Updates Document? | Returns Document?            | When to Use                                                                                   |
|-----------------------|-----------------------------|-------------------|------------------------------|------------------------------------------------------------------------------------------------|
| `find()`              | Retrieve documents          | No                | All matching documents       | When you need to retrieve multiple documents based on a query without modifying them.          |
| `findOneAndUpdate()`  | Find, update, and return    | Yes              | Single document (before/after) | When you need to update a single document and immediately use the updated (or original) result. |
| `updateOne()`         | Update a single document    | Yes               | No                           | When you want to update a document without retrieving it after the update.                    |

Each of these operations has its own specific use case depending on whether you want to retrieve documents, update and retrieve a document, or just update without needing a return document.