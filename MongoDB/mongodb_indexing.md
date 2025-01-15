## 5. What is Indexing. How to create index in mongodb.
### What is Indexing?
**Indexing** in MongoDB is the process of creating a special data structure that improves the speed of data retrieval operations at the cost of additional space and slower write operations. Indexes are used to quickly locate and access the data without having to scan every document in a collection, making queries more efficient.

**Key Benefits of Indexing**:
- **Faster Query Performance**: Reduces the time taken for read operations.
- **Improved Sorting**: Helps with queries that require sorted results.
- **Optimized Search**: Makes filtering based on specific fields more efficient.

**Trade-offs**:
- **Increased Storage**: Indexes take up additional disk space.
- **Slower Writes**: Insert, update, and delete operations can be slower due to the need to update the indexes.

### How to Create Indexes in MongoDB
You can create indexes in MongoDB using the **`createIndex()`** method. By default, MongoDB automatically creates an index on the `_id` field of each collection. Additional indexes can be created on other fields as needed.

#### 1. **Basic Syntax**:
```javascript
db.collection.createIndex({ <field>: <type> })
```
- `<field>`: The field name to be indexed.
- `<type>`: The type of index, where `1` represents an **ascending** index and `-1` represents a **descending** index.

#### 2. **Example of Creating an Index**:
Suppose you have a collection called `users` and you want to create an index on the `username` field:
```javascript
db.users.createIndex({ username: 1 })
```
This will create an ascending index on the `username` field.

#### 3. **Compound Indexes**:
You can create an index on multiple fields to optimize queries that filter on multiple conditions:
```javascript
db.users.createIndex({ firstName: 1, lastName: 1 })
```
This compound index supports queries that filter by `firstName`, `lastName`, or both.

#### 4. **Unique Index**:
To create an index that ensures uniqueness for a field, you can add the `unique` option:
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
```
This will ensure that no two documents in the collection have the same value for the `email` field.

#### 5. **Other Types of Indexes**:
- **Text Index**: For full-text search.
  ```javascript
  db.articles.createIndex({ content: "text" })
  ```
- **Geospatial Index**: For location-based queries.
  ```javascript
  db.places.createIndex({ location: "2dsphere" })
  ```
- **TTL (Time-to-Live) Index**: Automatically deletes documents after a certain time.
  ```javascript
  db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
  ```

### Viewing Existing Indexes:
To see the current indexes in a collection, use:
```javascript
db.collection.getIndexes()
```

### Dropping an Index:
If you need to remove an index:
```javascript
db.collection.dropIndex({ <field>: <type> })
```
Or drop all indexes except the `_id` index:
```javascript
db.collection.dropIndexes()
```

### Summary:
- **Indexing** improves read performance but increases storage use and can slow down write operations.
- Use `createIndex()` to create indexes on fields or combinations of fields as required by your queries.

## 6. Where index is store.
In databases, an **index** is stored as a separate data structure that holds pointers to the actual data in the main table, providing a quick way to access rows. Where the index is stored depends on the database system:

### 1. **Relational Databases (e.g., MySQL, PostgreSQL)**:
   - **B-tree or B+ Tree Structure**: The index is commonly stored in the form of a B-tree or B+ tree structure within the database storage system. It is separate from the actual data but resides on disk alongside it.
   - **File System**: The index may be stored in a specific data file that the database manages.
   
### 2. **NoSQL Databases (e.g., MongoDB)**:
   - **B-tree-like Structures**: MongoDB uses B-tree-like structures for indexing and stores them as part of its data files (e.g., WiredTiger storage engine).
   - **Separate from Collections**: The index exists separately from the collection documents but is still stored on disk within the same database.

### 3. **In-Memory Databases (e.g., Redis)**:
   - **In RAM**: Indexes are stored in-memory for faster access, making operations extremely fast but potentially limited by available system memory.

### 4. **Search Engines (e.g., Elasticsearch)**:
   - **Inverted Index**: Search engines often use an inverted index to store indexes, which maps keywords to document identifiers. These are stored in files on disk managed by the search engine.

### Where Exactly?
Indexes are stored:
- On **disk storage** (HDDs or SSDs) for persistent databases.
- In **memory** for in-memory databases.
- Managed in the database's data directory, often alongside or within the files used for storing actual data.

Indexes are created and updated automatically when data is inserted, updated, or deleted, ensuring fast lookups at the cost of additional storage space and slightly slower write operations.

## 7. In mongodb does index is store in cache or in disk.
In MongoDB, **indexes are stored on disk**, but they can also be loaded into **memory (cache)** to speed up access.

### How MongoDB Manages Index Storage:
- **Primary Storage on Disk**: Indexes, like the actual data, are stored persistently on disk within the database files. This ensures that the index is available even after a server restart or system crash.
- **Memory (Cache)**: When a query runs that requires an index, MongoDB loads the relevant parts of that index into memory (RAM). The WiredTiger storage engine uses a combination of in-memory caching and disk storage to handle data efficiently.

### WiredTiger Cache:
- **Index Usage**: The WiredTiger engine includes an internal cache to store frequently accessed data and index pages. This helps improve the performance of read operations, as accessing data from memory is much faster than reading from disk.
- **Adaptive Caching**: The size of the cache is adjustable and is typically set as a portion of the available system memory. WiredTiger intelligently manages what data (including index data) stays in the cache based on access patterns.

### Practical Implications:
- **Initial Load**: When a query is run for the first time, MongoDB may need to load the index from disk to memory, which can take time.
- **Repeated Access**: If the same query or similar queries are repeated, the relevant index portions may already be cached in memory, resulting in faster access.

### Summary:
- **Indexes are stored on disk** for persistence.
- **Indexes are cached in memory** during operations to improve query performance. MongoDB’s memory management ensures that frequently accessed index portions stay in memory for efficient access.

## 8. What is TTL (Time-to-Live) Index
A **TTL (Time-to-Live) index** in MongoDB is a special type of index that is used to automatically delete documents from a collection after a specified period of time. This is particularly useful for data that only needs to be stored for a limited duration, such as session data, logs, or cache entries.

### How TTL Index Works:
- The TTL index monitors documents in a collection and deletes documents whose expiration time has passed.
- The TTL index only applies to a single field that contains a **date** or **timestamp** value.
- MongoDB periodically scans the collection and removes expired documents based on the value of the TTL field. This background process runs every 60 seconds, so there can be a delay between the actual expiration time and the removal.

### Key Features:
- **Automatic Deletion**: Documents are deleted automatically by MongoDB without needing to run a separate process.
- **Efficient Expiry Management**: Ideal for managing data that should only persist for a set amount of time.

### How to Create a TTL Index:
A TTL index is created by specifying the `expireAfterSeconds` option when creating an index. The indexed field must contain a **Date** value.

**Example**:
Suppose you have a `sessions` collection with documents that include a `createdAt` field indicating when the session was created. To automatically remove documents 1 hour (3600 seconds) after they are created, you can create a TTL index as follows:

```javascript
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

### How It Works:
- The `createdAt` field must be a **Date** object in each document.
- MongoDB uses the value of `createdAt` and the `expireAfterSeconds` setting to determine when a document should be removed.

### Important Points to Consider:
1. **No Immediate Deletion**: TTL deletion does not happen in real-time; it runs periodically in the background, so there may be a delay of up to 60 seconds before documents are removed.
2. **Single-Field Limitation**: TTL indexes can only be applied to a single field that holds a `Date` type.
3. **Write Operations**: Updates to the TTL field reset the expiration timer, so changing the date field can delay or accelerate when a document is deleted.

### Use Cases for TTL Indexes:
- **Session Management**: Automatically remove expired user sessions after a certain period.
- **Temporary Data**: Delete data like one-time tokens, cache records, or logs that should not be retained indefinitely.
- **Event-Based Cleanup**: Clear records that are only needed for a fixed period, such as temporary event registrations or notifications.

### Viewing and Dropping TTL Indexes:
To see all indexes, including TTL indexes, in a collection:
```javascript
db.sessions.getIndexes()
```

To drop a TTL index:
```javascript
db.sessions.dropIndex({ createdAt: 1 })
```

### Summary:
A **TTL index** is an efficient way to manage data expiration in MongoDB. By setting up a TTL index on a field, MongoDB can automatically remove documents once they reach their specified age, simplifying data lifecycle management.

### Real-life example
```js
const OTPSchema = new schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 2,  // This document will be automatically deleted after 2 minutes of its creation time

    }
});
```
Note: Here, createdAt is TTL index.