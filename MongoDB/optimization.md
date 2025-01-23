# MongoDB Query Optimization

Optimizing MongoDB queries is crucial for improving application performance and ensuring efficient use of resources. Below are key techniques and best practices to optimize MongoDB queries:

---

### 1. **Use Indexes Effectively**
Indexes are critical for query performance as they reduce the amount of data MongoDB scans.
- **Create Indexes**:
  Use indexes on fields that are frequently queried, sorted, or used in filtering.
  ```javascript
  db.collection.createIndex({ field: 1 }); // Ascending index
  db.collection.createIndex({ field: -1 }); // Descending index
  ```
- **Compound Indexes**:
  Create indexes on multiple fields when queries filter or sort by more than one field.
  ```javascript
  db.collection.createIndex({ field1: 1, field2: -1 });
  ```
- **Covered Queries**:
  Ensure the index contains all the fields used in the query and projection, so MongoDB doesn't need to fetch documents from the disk.

---

### 2. **Analyze Query Performance**
- **Explain Plan**:
  Use `explain()` to analyze how MongoDB executes queries and identify inefficiencies.
  ```javascript
  db.collection.find({ field: value }).explain('executionStats');
  ```
- **Key Metrics**:
  - `stage`: Indicates the operation stage (e.g., COLLSCAN, IXSCAN).
  - `nReturned`: Number of documents returned.
  - `executionTimeMillis`: Time taken to execute the query.
  - `totalDocsExamined`: Total documents scanned.

---

### 3. **Filter Data Early**
- Use precise query filters to reduce the dataset MongoDB needs to process.
  - Example:
    ```javascript
    db.collection.find({ status: "active", age: { $gt: 25 } });
    ```

---

### 4. **Limit and Paginate Results**
- Use `limit()` and `skip()` to paginate results efficiently.
  ```javascript
  db.collection.find().skip(100).limit(10);
  ```
- Avoid high `skip()` values, as they degrade performance. Instead, use range queries on indexed fields.

---

### 5. **Optimize Data Models**
- **Schema Design**:
  - Use denormalization for read-heavy workloads.
  - Use embedding for related data that is queried together.
  - Use referencing for relationships with large datasets or many references.
- **Avoid Large Documents**:
  Split large documents to ensure they remain below the BSON document size limit (16 MB).

---

### 6. **Use Projection to Limit Returned Fields**
- Only return necessary fields to reduce the size of the result set.
  ```javascript
  db.collection.find({ field: value }, { field1: 1, field2: 1 });
  ```

---

### 7. **Leverage Aggregation Pipeline**
- Use aggregation pipelines for complex queries to reduce application-side processing.
  ```javascript
  db.collection.aggregate([
    { $match: { status: "active" } },
    { $group: { _id: "$category", total: { $sum: 1 } } },
    { $sort: { total: -1 } },
  ]);
  ```

---

### 8. **Avoid Expensive Operations**
- Avoid regular expressions (`$regex`) on large datasets without indexes.
- Minimize the use of `$where` and JavaScript in queries, as they can’t use indexes.

---

### 9. **Optimize Writes**
- Use **bulk operations** for inserting or updating multiple documents.
  ```javascript
  const bulk = db.collection.initializeUnorderedBulkOp();
  bulk.insert({ field1: value1 });
  bulk.insert({ field2: value2 });
  bulk.execute();
  ```

---

### 10. **Monitor and Tune Performance**
- **MongoDB Profiler**:
  Use the profiler to identify slow queries.
  ```javascript
  db.setProfilingLevel(2); // Captures all operations
  db.system.profile.find();
  ```
- **Optimize Query Patterns**:
  Regularly review slow queries and modify patterns or add indexes.

---

### 11. **Sharding for Scalability**
- For large datasets, use sharding to distribute data across multiple servers.
  - Choose a shard key carefully to ensure even data distribution.
  - Example:
    ```javascript
    sh.shardCollection("database.collection", { shardKey: 1 });
    ```

---

### 12. **Caching with Query Results**
- Cache frequently accessed results using in-memory stores like Redis.
- Example: Store the output of frequently used aggregation queries.

---

By implementing these techniques and monitoring your queries regularly, you can significantly enhance MongoDB query performance. Let me know if you’d like examples for any specific optimization!