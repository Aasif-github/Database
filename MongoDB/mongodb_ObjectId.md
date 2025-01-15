## 4. What is Object Id.
In MongoDB, `ObjectId` is a special data type that is commonly used as the default primary key for documents in a collection. It is a 12-byte identifier typically used to uniquely identify documents.

### Structure of ObjectId

The 12-byte `ObjectId` consists of:

1. **4-byte Timestamp**: The timestamp representing the ObjectId's creation, measured in seconds since the Unix epoch (January 1, 1970). This allows the ObjectId to be roughly sorted by creation time.
2. **5-byte Random Value**: A random value generated once per process. This ensures uniqueness across machines and processes.
3. **3-byte Incrementing Counter**: An auto-incrementing counter, initialized to a random value. This adds uniqueness in the context of a single process.

### Example

Here is an example of an `ObjectId`:

```
ObjectId("507f1f77bcf86cd799439011")
```

### Breakdown

- **507f1f77**: Timestamp (4 bytes)
- **bcf86cd7**: Random value (5 bytes)
- **99439011**: Incrementing counter (3 bytes)

### Properties and Uses

1. **Uniqueness**: The combination of a timestamp, random value, and counter ensures that each `ObjectId` is unique, even across different machines and processes.
2. **Efficiency**: The size of the `ObjectId` (12 bytes) is small compared to other possible UUIDs (16 bytes), which helps keep the index size and storage space efficient.
3. **Sorting**: Since the timestamp is part of the `ObjectId`, documents with `ObjectId`s are roughly sorted by creation time.
4. **Scalability**: `ObjectId`s are generated client-side, which reduces the load on the database server and allows for high insertion rates in distributed systems.

### Usage in Code

#### Creating an ObjectId

In a MongoDB shell or using a MongoDB driver, you can create an `ObjectId`:

```javascript
// In MongoDB shell
var newId = ObjectId();
print(newId);
```

In Node.js using the `mongodb` driver:

```javascript
const { ObjectId } = require('mongodb');
const newId = new ObjectId();
console.log(newId);
```

#### Querying with ObjectId

When querying documents by `_id` using an `ObjectId`, ensure you are passing an `ObjectId` instance, not a string:

```javascript
// In MongoDB shell
db.collection.find({ _id: ObjectId("507f1f77bcf86cd799439011") });
```

In Node.js using the `mongodb` driver:

```javascript
const { MongoClient, ObjectId } = require('mongodb');

async function run() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('testdb');
    const collection = db.collection('testcollection');

    const doc = await collection.findOne({ _id: new ObjectId("507f1f77bcf86cd799439011") });
    console.log(doc);
    
    client.close();
}

run();
```

### Summary

- **ObjectId** is a 12-byte identifier used by MongoDB for unique identification of documents.
- It consists of a 4-byte timestamp, a 5-byte random value, and a 3-byte incrementing counter.
- `ObjectId` provides efficient uniqueness, small storage footprint, and approximate sorting by creation time.
- It is used as the default `_id` field for documents in MongoDB collections.
