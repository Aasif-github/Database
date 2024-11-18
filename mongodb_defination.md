## Table of Contents

- [1. What is MongoDB?](#1-what-is-mongodb)
  - [Scaling](#scaling)
    - [Horizontal Scaling](#horizontal-scaling)
      - [Sharding](#sharding)
      - [Replication](#replication)

- [2. Why we choose MongoDB?](#2-why-do-we-choose-mongodb)
- [3. What is BSON?](#3-what-is-bson)
- [4. What is ObjectID?](#4-what-is-objectid)
- [5. What is Indexing? How to create an index in MongoDB?](#5-what-is-indexing-how-to-create-an-index-in-mongodb)
- [6. Where is an index stored?](#6-where-is-an-index-stored)
- [7. In MongoDB, is the index stored in cache or on disk?](#7-in-mongodb-is-the-index-stored-in-cache-or-on-disk)
- [8. What is a TTL (Time-to-Live) Index?](#8-what-is-a-ttl-time-to-live-index)
- [9. What is a Storage Engine? Which storage engine does MongoDB use?](#9-what-is-a-storage-engine-which-storage-engine-does-mongodb-use)

- [10. What is Ref in MongoDB schema?](#10-What-is-ref-in-mongodb-schema)

- [11. In Mongodb, how can we join two collection?](#11-In-Mongodb-how-can-we-join-two-collection?)

## 1. What is MongoDB?

MongoDB is a document database built on a horizontal scale-out architecture that uses a flexible schema for storing data.

Instead of storing data in tables of rows or columns like SQL databases, each record in a MongoDB database is a document described in BSON, a binary representation of the data. Applications can then retrieve this information in a JSON format.

- What is Document database.
- A document database (also known as a document-oriented database or a document store) is a database that stores information in documents.

[Ref : What is Document database](https://www.mongodb.com/resources/basics/databases/document-databases)

- What is a Horizontal scale-out architecture.
- The horizontal scaling approach, sometimes referred to as "scaling out," entails adding more machines to further distribute the load of the database and increase overall storage and/or processing power. There are two common ways to perform horizontal scaling — they include `sharding`, which increases the overall capacity of the system, and `replication`, which increases the availability and reliability of the system.

## Explain Sharding in detail.
**Sharding** in MongoDB is a method for distributing data across multiple servers or nodes, enabling the database to handle large datasets and high-traffic loads efficiently. It is an essential feature for scaling horizontally and ensuring that performance remains high as the amount of data grows. Here's a detailed explanation:

### 1. **What is Sharding?**
   - **Sharding** is a database architecture pattern that divides a large dataset into smaller, more manageable pieces called **shards**. Each shard holds a subset of the overall data.
   - The process helps distribute data storage and query load across multiple servers, known as a **shard cluster**.
   - Sharding enables a MongoDB deployment to scale horizontally by adding more servers to the cluster.

### 2. **Why Use Sharding?**
   - **Handling Large Data Volumes**: When a single server cannot store and process large amounts of data efficiently, sharding splits the data across multiple servers.
   - **Improved Performance**: By spreading the data and query load across multiple servers, sharding can improve query performance and throughput.
   - **Scalability**: Sharding allows for linear scalability; adding more servers (shards) can increase the capacity and processing power of the database.

### 3. **Sharding Architecture Components**:
   - **Shards**: The individual servers or nodes that store a subset of the database. Each shard acts as an independent database with a complete copy of its portion of data.
   - **Shard Key**: A field or set of fields chosen to partition the data across shards. It determines how the data is distributed. Choosing an optimal shard key is crucial for even data distribution and balanced query loads.
   - **Mongos (Query Router)**: A routing service that acts as an interface between client applications and the sharded cluster. It routes queries to the appropriate shard(s) based on the shard key.
   - **Config Servers**: Special servers that store metadata about the cluster's structure, such as the mapping of data ranges to shards. This ensures that `mongos` can route queries efficiently.

### 4. **How Sharding Works**:
   - **Partitioning Data**: The shard key is used to split the data into **chunks**, which are distributed across the shards. Each chunk is a contiguous range of data based on the shard key.
   - **Data Distribution**: The `mongos` uses the shard key to determine which shard a document belongs to. For example, if the shard key is a field called `userId`, documents are distributed across shards based on the value of `userId`.
   - **Query Routing**: When a query is received, `mongos` routes the query to the relevant shard(s) using metadata from the config servers. This ensures that only the necessary shards are queried, reducing the load on the cluster.

### 5. **Shard Key Selection**:
   - **Balanced Distribution**: A good shard key ensures that data is distributed evenly across all shards to avoid hotspots (where one shard holds most of the data or receives the majority of queries).
   - **Query Efficiency**: The shard key should support queries commonly used by the application to allow `mongos` to direct them to a single shard whenever possible.
   - **Avoid Monotonous Growth**: Choosing a shard key that grows monotonically (e.g., timestamps) can lead to unbalanced shards, where one shard receives all new data. This should be avoided by selecting a more distributed key.

### 6. **Types of Sharding**:
   - **Range-Based Sharding**: Data is distributed based on a range of values from the shard key. This is suitable for scenarios where data can be divided into continuous ranges (e.g., numerical IDs or dates).
   - **Hash-Based Sharding**: The shard key is hashed to distribute data evenly across shards. This method helps prevent hotspots but may make range queries less efficient.
   - **Zone Sharding**: Data is distributed based on specified zones, which define data ranges that map to specific shards. This is useful for cases where data locality is important (e.g., data centers in different geographic regions).

### 7. **Shard Balancing and Rebalancing**:
   - **Automatic Balancing**: MongoDB continuously monitors the data distribution across shards. If chunks become unbalanced (e.g., one shard has more chunks than others), the **balancer process** migrates chunks between shards to maintain balance.
   - **Chunk Migration**: The balancer can move chunks between shards to ensure even distribution. This process happens in the background and is designed to minimize the impact on cluster performance.

### 8. **High Availability and Fault Tolerance**:
   - Each shard in a sharded cluster is typically deployed as a **replica set** to provide redundancy and fault tolerance. This ensures that if a shard server fails, the data is still available from a secondary member of the replica set.

### 9. **Advantages of Sharding**:
   - **Scalability**: Easily scale out by adding more shards to distribute data and workload.
   - **High Throughput**: Multiple shards handle queries and operations in parallel, increasing overall throughput.
   - **High Availability**: When combined with replica sets, sharding enhances data availability and fault tolerance.

### 10. **Challenges and Considerations**:
   - **Shard Key Selection**: Choosing the wrong shard key can lead to imbalanced data distribution, poor performance, and hotspots.
   - **Complex Query Routing**: Queries spanning multiple shards may require more complex routing and can result in higher latency.
   - **Maintenance Overhead**: Managing a sharded cluster can be more complex than managing a single-node database due to the need for config servers, `mongos` instances, and monitoring data distribution.

### **Example Scenario**:
Suppose you have a growing e-commerce platform that stores product and order data. Initially, a single MongoDB server might handle the load, but as your user base grows, performance could suffer. By implementing **sharding**:
- You can partition the data using a field like `userId` or `orderId`.
- The load of read and write operations can be spread across multiple shards.
- The system can continue scaling horizontally by adding more shards as the data volume and traffic increase.

In conclusion, **sharding in MongoDB** provides a way to scale out the database horizontally, distributing both data and query load across multiple servers. This approach ensures that MongoDB can handle large datasets and high traffic, maintaining performance and availability as the system grows.

## Explain Replication in detail
**Replication** in MongoDB is a key feature that ensures high availability, data redundancy, and fault tolerance. It allows data to be replicated across multiple servers, providing a safety net in case of server failure and enabling seamless recovery. Here’s a detailed look at how replication works in MongoDB:

### 1. **What is Replication?**
   - **Replication** is the process of synchronizing data across multiple servers. In MongoDB, this is achieved through **replica sets**, which are groups of MongoDB servers that maintain the same dataset.
   - The main goal of replication is to provide **redundancy** and **increase data availability** in distributed systems.

### 2. **Replica Set Architecture**:
   - A **replica set** consists of:
     - **Primary Node**: The main server that receives all write operations. It processes client requests and replicates the data to secondary nodes.
     - **Secondary Nodes**: Servers that replicate data from the primary node. These nodes can be used for read operations (depending on the read preference) and will step up as the new primary if the current primary fails.
     - **Arbiter (optional)**: A member of the replica set that participates in elections but does not hold data. Its main purpose is to break ties during elections to ensure that a majority is reached when electing a new primary.

### 3. **How Replication Works**:
   - **Initial Synchronization**: When a new secondary node is added to the replica set, it performs an initial sync by copying data from the primary node.
   - **Oplog (Operation Log)**:
     - The primary node records all write operations to a special capped collection called the **oplog** (operation log).
     - Secondary nodes continuously read the oplog and apply these operations to maintain an up-to-date state.
   - **Data Consistency**: Secondary nodes replicate data asynchronously, meaning there might be a slight delay before all nodes are fully synchronized. This is called **replication lag**.

### 4. **Failover and Election Process**:
   - If the **primary node** becomes unavailable due to a network issue or hardware failure, the **replica set** initiates an **election** to choose a new primary.
   - The election process is automatic, and it ensures minimal downtime. A secondary node that meets the required conditions becomes the new primary.
   - The **arbiter** can help resolve tie votes to expedite the election.

### 5. **Read and Write Operations in a Replica Set**:
   - **Write Operations**: By default, only the primary node accepts write operations. This maintains consistency as the single source of truth for writes.
   - **Read Operations**:
     - MongoDB allows read operations to be directed to secondary nodes for load balancing. This can be configured using **read preferences** (e.g., `primary`, `secondary`, `primaryPreferred`, `secondaryPreferred`).
     - Applications can leverage secondary reads to distribute the load, but this can lead to reading slightly stale data due to replication lag.

### 6. **Replica Set Deployment Best Practices**:
   - **Odd Number of Members**: To avoid split-brain scenarios and ensure a majority during elections, it’s recommended to have an odd number of members (e.g., 3 or 5 nodes).
   - **Geographical Distribution**: For better disaster recovery, members of a replica set can be distributed across different data centers or regions.
   - **Avoid Single Points of Failure**: Using an arbiter or ensuring multiple secondary nodes helps avoid situations where a failure prevents the election of a new primary.

### 7. **Advantages of Replication**:
   - **High Availability**: Continuous availability even in case of server failures.
   - **Data Redundancy**: Data is replicated across multiple nodes, reducing the risk of data loss.
   - **Load Distribution**: Secondary nodes can serve read requests, reducing the load on the primary node.
   - **Disaster Recovery**: Geographically distributed replica sets enhance resilience against regional outages.

### 8. **Challenges and Considerations**:
   - **Replication Lag**: Secondary nodes may not be fully in sync with the primary at all times. Applications requiring strong consistency need to account for this.
   - **Network Latency**: For geographically distributed replicas, network latency can affect replication speed and election processes.
   - **Maintenance Overhead**: Managing multiple nodes and ensuring their health can be more complex than a standalone server setup.

### Example Scenario:
Consider a **replica set** with three nodes: `Primary`, `Secondary1`, and `Secondary2`. When the `Primary` goes down unexpectedly:
- **Election**: The remaining secondaries vote, and `Secondary1` is chosen as the new `Primary`.
- **Data Integrity**: Once the failed node recovers, it rejoins the set as a secondary and catches up by syncing from the new primary’s oplog.

In summary, **replication in MongoDB** is crucial for building robust, fault-tolerant applications that can handle failures gracefully and ensure continuous availability of data.


[Ref : Database Scaling](https://www.mongodb.com/resources/basics/scaling)

[Ref : horizontal-vs-vertical-scaling](https://www.mongodb.com/resources/basics/horizontal-vs-vertical-scaling)

## 2. Why we choose MongoDB?

MongoDB is built on a scale-out architecture that has become popular with developers of all kinds for developing scalable applications with evolving data schemas.

As a document database, MongoDB makes it easy for developers to store structured or unstructured data. It uses a JSON-like format to store documents. This format directly maps to native objects in most modern programming languages, making it a natural choice for developers, as they don’t need to think about normalizing data. MongoDB can also handle high volume and can scale both vertically or horizontally to accommodate large data loads.

MongoDB was built for people building internet and business applications who need to evolve quickly and scale elegantly. Companies and development teams of all sizes use MongoDB for a wide variety of reasons.



[Reference Link](https://www.mongodb.com/resources/products/fundamentals/why-use-mongodb#:~:text=MongoDB%20is%20built%20on%20a,like%20format%20to%20store%20documents.)

[Ref: Mongodb working](https://www.techtarget.com/searchdatamanagement/definition/MongoDB#:~:text=MongoDB%20is%20used%20for%20high,JavaScript%20execution%20and%20other%20features.)

## 3. What is BSON. How it is diff from JSON. Why BSON.
BSON (Binary JSON) is a binary-encoded serialization format that extends the JSON (JavaScript Object Notation) model to provide more data types, and to be efficient both in storage space and scan speed. 
BSON is designed to be a superset of JSON, providing additional data types and being more efficient for certain operations. It is most notably used in MongoDB, a NoSQL database, to store and retrieve documents.

### Key Differences Between BSON and JSON

1. **Binary Format vs. Text Format**:
   - **BSON**: Binary format, making it more efficient for both storage and speed. It is designed for fast traversal and encoding/decoding.
   - **JSON**: Text-based format, easy to read and write by humans but less efficient in terms of storage and performance.

2. **Data Types**:
   - **BSON**: Supports a wider range of data types than JSON, including:
     - `Int32` and `Int64`
     - `Date`
     - `Binary Data`
     - `Decimal128`
     - `ObjectId`
     - `Regular Expression`
     - `Timestamp`
     - `Null`
     - `Boolean`
     - `Double`
     - `Array`
     - `Embedded Document`
   - **JSON**: Limited to a smaller set of data types:
     - `String`
     - `Number`
     - `Boolean`
     - `Array`
     - `Object`
     - `Null`

3. **Efficiency**:
   - **BSON**: More efficient for encoding and decoding due to its binary nature. It includes length prefixes for strings and arrays, allowing quick size calculations and direct access to elements.
   - **JSON**: Less efficient due to its text nature. Parsing JSON requires reading and interpreting the entire structure.

4. **Usage**:
   - **BSON**: Commonly used in databases like MongoDB to store documents. Its design focuses on being quick to encode and decode, and to support complex data types needed in database operations.
   - **JSON**: Widely used in web APIs, configuration files, and data interchange between systems, especially when human readability is essential.

### Example Comparison

#### JSON Example

```json
{
    "name": "Alice",
    "age": 30,
    "isStudent": false,
    "scores": [95, 82, 90],
    "address": {
        "street": "123 Main St",
        "city": "Springfield"
    }
}
```

#### BSON Equivalent

The BSON equivalent of the above JSON document would include additional metadata and be encoded in a binary format. It would look like this in a MongoDB shell (not in pure binary):

```shell
{
    "name": "Alice",          // String
    "age": 30,                // Int32
    "isStudent": false,       // Boolean
    "scores": [95, 82, 90],   // Array of Int32
    "address": {              // Embedded Document
        "street": "123 Main St",   // String
        "city": "Springfield"      // String
    }
}
```

### Why BSON?

- **Performance**: BSON is designed for speed in terms of encoding and decoding, which is crucial for database operations.
- **Storage Efficiency**: Binary format can be more compact than text-based JSON, saving storage space.
- **Additional Data Types**: Supports more complex and rich data types needed in databases.
- **Traversal and Indexing**: Length prefixes and binary format allow for efficient traversal and indexing, beneficial in databases like MongoDB.

### Summary

- **BSON** is a binary-encoded format, optimized for efficiency, speed, and additional data types, primarily used in databases like MongoDB.
- **JSON** is a text-based format, easy to read and widely used in web applications and data interchange where human readability is important.



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

## 9. What is storage engine.
A **storage engine** is the underlying software component that a database management system (DBMS) uses to store, retrieve, manage, and write data to disk or memory. It determines how data is structured, accessed, and managed in terms of performance, transactions, and other characteristics.

### Key Points about Storage Engines:
- **Data Management**: The storage engine handles reading and writing data, managing indexes, and ensuring data integrity.
- **Performance**: Different storage engines optimize for various aspects, such as read-heavy or write-heavy workloads, memory usage, or disk space efficiency.
- **Transactions and Concurrency**: Storage engines can provide different levels of support for ACID (Atomicity, Consistency, Isolation, Durability) transactions.

### **MongoDB's Storage Engine**:
MongoDB primarily uses the **WiredTiger** storage engine, but it previously also supported other engines like **MMAPv1**. Here’s a breakdown:

#### 1. **WiredTiger**:
   - **Default Engine**: WiredTiger is the default storage engine for MongoDB versions 3.2 and later.
   - **Features**:
     - **Compression**: Data and indexes are stored in a compressed format to save disk space.
     - **Document-Level Locking**: This improves concurrency by allowing multiple write operations to occur simultaneously without blocking.
     - **ACID Transactions**: WiredTiger supports multi-document ACID transactions, providing better data consistency for applications that need it.
   - **Performance**: WiredTiger is optimized for high-throughput workloads and provides better performance for write-heavy applications compared to older engines.

#### 2. **MMAPv1** (Legacy):
   - **Older Storage Engine**: Used in older MongoDB versions (before 3.2) as the default.
   - **Memory-Mapped Files**: MMAPv1 used memory-mapped files for data storage.
   - **Limitations**:
     - **Collection-Level Locking**: Only one write operation could be performed per collection at a time, limiting concurrency.
     - **No Compression**: Data was stored uncompressed, leading to higher disk usage.

### Why WiredTiger?
WiredTiger is favored for its balance of speed, data compression, and support for concurrent operations. It allows MongoDB to handle larger data volumes efficiently and supports modern use cases that require scalable and reliable database operations. 


[Ref: Storage engine](https://www.mongodb.com/docs/manual/faq/storage/)



## 10. What is `ref` in mongodb schema?

In MongoDB, when defining a schema using **Mongoose** (a popular ODM for MongoDB in Node.js), the `ref` option is used to create **references between documents in different collections**. This helps model **relationships** similar to foreign key constraints in relational databases.

### What Does `ref` Do?
The `ref` option in Mongoose allows you to establish a connection between documents in one collection and documents in another collection by referencing their unique IDs. This is known as **population**.

### Why Use `ref`?
- **To Create Relationships**: Helps link related data between collections. For example, a user document can refer to posts that they have authored.
- **Data Association**: Ensures that you can easily navigate and retrieve related data through Mongoose's built-in population feature.

### Example of Using `ref` in Mongoose Schema:
Suppose you have a collection for users and another collection for posts. Each post should reference the user who created it.

#### 1. **User Schema**:
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
```

#### 2. **Post Schema**:
```javascript
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId, // Reference type should be ObjectId
        ref: 'User' // 'User' refers to the name of the User model
    }
});

const Post = mongoose.model('Post', postSchema);
```

### Explanation:
- **`mongoose.Schema.Types.ObjectId`**: Specifies that the `author` field is an object ID, which is used to store references to documents in another collection.
- **`ref: 'User'`**: Tells Mongoose that the `author` field is referencing the `User` model. This allows Mongoose to perform a lookup to fetch the related user document when needed.

### How to Use `ref` with Population:
To retrieve a post and populate its author field with user details, you can use Mongoose's `populate()` method:

```javascript
Post.find()
    .populate('author') // Populates the author field with corresponding user data
    .exec((err, posts) => {
        if (err) {
            console.error(err);
        } else {
            console.log(posts); // Prints posts with author details included
        }
    });
```
output:
```json
[
    {
        "_id": "postId123",
        "title": "Understanding Mongoose Populate",
        "content": "This post explains how to use Mongoose's populate method.",
        "author": {
            "_id": "userId456",
            "name": "John Doe",
            "email": "john.doe@example.com"
        }
    },
    {
        "_id": "postId124",
        "title": "Learning Node.js",
        "content": "This post covers the basics of Node.js.",
        "author": {
            "_id": "userId789",
            "name": "Jane Smith",
            "email": "jane.smith@example.com"
        }
    }
]

```

### Benefits of Using `ref`:
- **Simplifies Joins**: Even though MongoDB is a NoSQL database, using `ref` and `populate()` allows for simple join-like functionality.
- **Clear Data Relationships**: Establishes a clear way of associating documents between collections.
- **Easy Querying**: Makes querying for related data simpler and more maintainable in code.

### When to Avoid `ref`:
- **Embedding vs. Referencing**: If you need fast access to related data or have a 1:1 or 1:few relationship, embedding documents within a document (denormalization) might be more efficient than using `ref`.
- **Performance Considerations**: Population can add extra queries to the database, which might impact performance if used extensively with large datasets.

### Summary:
- **`ref`** in a Mongoose schema allows you to create a reference to another collection by storing an object ID.
- This enables the use of **Mongoose's `populate()` method** to fetch related documents, simplifying the process of managing relationships between collections.

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


## 12. What is main difference between `ref` and $lookup?
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

# More Interview Questions on MongoDB based on Turing.com
[Click here to visit website - Interview questions on mongodb](https://www.turing.com/interview-questions/mongodb)