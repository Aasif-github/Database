### **Common MongoDB Interview Questions and Answers**

---

### **Basic Questions**
1. **What is MongoDB?**
   MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called BSON. It’s schema-less, highly scalable, and supports horizontal scaling.

2. **What is BSON?**
   BSON (Binary JSON) is the binary-encoded version of JSON that MongoDB uses to store documents, including support for additional data types like Date and Binary.

3. **Explain the difference between MongoDB and relational databases.**
   - MongoDB stores data in collections of documents, while relational databases use tables.
   - MongoDB is schema-less; relational databases have a fixed schema.
   - MongoDB uses NoSQL queries; relational databases use SQL.

4. **What are collections in MongoDB?**
   A collection is a group of MongoDB documents, similar to a table in relational databases, but it doesn’t enforce a schema.

5. **What are indexes in MongoDB?**
   Indexes are special data structures that improve the efficiency of query operations by allowing MongoDB to search faster.

---

### **Intermediate Questions**
6. **What is the aggregation pipeline?**
   The aggregation pipeline processes data through a series of stages (e.g., `$match`, `$group`, `$sort`, etc.) to transform and analyze it.

7. **How does sharding work in MongoDB?**
   Sharding distributes data across multiple servers or shards to handle large datasets and ensure horizontal scalability.

8. **What is a replica set in MongoDB?**
   A replica set is a group of MongoDB servers that maintain the same data, providing redundancy and high availability.

9. **What are the types of relationships in MongoDB?**
   - **One-to-One**
   - **One-to-Many**
   - **Many-to-Many**
   Relationships can be modeled using embedded documents or references.

10. **What is the difference between `$lookup` and `$group`?**
    - `$lookup`: Performs a join between two collections.
    - `$group`: Groups documents and performs aggregate calculations.

---

### **Advanced Questions**
11. **How do you ensure data consistency in MongoDB?**
    - Use replica sets for redundancy.
    - Enable journaling to ensure durability.
    - Use transactions for multi-document consistency.

12. **What are MongoDB transactions?**
    Transactions allow multiple operations to be executed in a single, atomic unit to ensure data consistency.

13. **How does MongoDB handle large datasets?**
    - Through sharding, indexing, and aggregation pipelines.
    - By optimizing queries and using appropriate data models.

14. **What is the capped collection in MongoDB?**
    A capped collection is a fixed-size, circular collection that maintains insertion order and automatically removes the oldest documents when it reaches its size limit.

15. **Explain the role of the oplog in MongoDB.**
    The oplog (operations log) is a special capped collection that stores all changes made to the database, used for replication.

---

### **Scenario-Based Questions**
16. **How would you design a schema for a blog application in MongoDB?**
    - Use embedded documents for comments.
    - Separate collections for users and posts for scalability.

17. **How would you optimize a slow query?**
    - Add indexes on the queried fields.
    - Use `$match` early in the aggregation pipeline and `$group` at the end as it blocks further processing.
    - Avoid unnecessary projections and sorts.

18. **What happens if a primary node in a replica set fails?**
    - MongoDB automatically promotes a secondary node to primary.
    - The new primary starts accepting write operations.

19. **How do you handle backups in MongoDB?**
    - Use `mongodump` and `mongorestore` for backups and restores.
    - Leverage MongoDB Atlas for automated backups.

20. **How do you ensure a unique field in MongoDB?**
    Use a unique index:
    ```javascript
    db.collection.createIndex({ email: 1 }, { unique: true });
    ```

---

### **Tips for Interview Preparation**
- Focus on MongoDB features like `replication`, `sharding`, and `indexing`.
- Practice writing aggregation pipelines and optimizing queries.
- Be familiar with modeling relationships and designing schemas for real-world scenarios.