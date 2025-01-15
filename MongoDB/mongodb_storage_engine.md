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