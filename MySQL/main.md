Here are some commonly asked **MySQL interview questions**, categorized by difficulty:

---

### 🔹 **Beginner Level**

1. **What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?**
2. **What are the different types of joins in MySQL?**
3. **What is a primary key vs. a foreign key?**
4. **What is the difference between `WHERE` and `HAVING`?**
5. **How does `GROUP BY` work?**
6. **What is indexing and why is it important?**
7. **What is the default storage engine in MySQL?**
8. **What are ACID properties in databases?**

---

### 🔹 **Intermediate Level**

1. **How does `INNER JOIN` differ from `LEFT JOIN`?**

2. **What are the advantages and disadvantages of using indexes?**

3. **Explain normalization and its types (1NF, 2NF, 3NF).**

4. **How would you detect and resolve a deadlock?**

5. **What is a composite index?**

6. **How would you find the second highest salary from a table?**

   ```sql
   SELECT MAX(salary) FROM employees
   WHERE salary < (SELECT MAX(salary) FROM employees);
   ```

7. **What are `UNION` and `UNION ALL`, and how are they different?**

8. **How do you implement pagination in MySQL?**

   ```sql
   SELECT * FROM products LIMIT 10 OFFSET 20;
   ```

---

### 🔹 **Advanced Level**

1. **What is a covering index?**
2. **Explain how query execution plans work in MySQL.**
3. **What is the difference between `InnoDB` and `MyISAM`?**
4. **How does MySQL handle transactions?**
5. **How would you optimize a slow query?**
6. **What is the difference between `NOW()` and `CURRENT_TIMESTAMP`?**
7. **What is the difference between `CHAR` and `VARCHAR`?**
8. **What are common causes of MySQL performance bottlenecks?**

---

Would you like detailed answers for these questions, or a quiz-style mock test with answers?

Great! Here are **detailed answers** to the MySQL interview questions across all levels:

---

## 🔹 Beginner Level

### 1. **Difference between `DELETE`, `TRUNCATE`, and `DROP`**

| Command    | Description                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------- |
| `DELETE`   | Deletes rows from a table with an optional `WHERE` clause. Transaction-safe (can rollback). |
| `TRUNCATE` | Deletes all rows quickly without logging individual deletions. Cannot rollback.             |
| `DROP`     | Completely removes a table or database. All data and structure are deleted.                 |

---

### 2. **Types of Joins**

* **INNER JOIN**: Returns rows with matching values in both tables.
* **LEFT JOIN**: Returns all rows from the left table, matched rows from the right.
* **RIGHT JOIN**: Opposite of LEFT JOIN.
* **FULL JOIN** *(Not supported in MySQL directly)*: Combines LEFT and RIGHT JOIN.
* **CROSS JOIN**: Returns the Cartesian product of two tables.

---

### 3. **Primary Key vs. Foreign Key**

* **Primary Key**: Uniquely identifies a record in a table. Cannot be NULL.
* **Foreign Key**: Refers to a primary key in another table to enforce referential integrity.

---

### 4. **Difference between `WHERE` and `HAVING`**

* `WHERE`: Filters rows *before* grouping.
* `HAVING`: Filters groups *after* `GROUP BY`.

---

### 5. **How does `GROUP BY` work?**

`GROUP BY` groups rows that have the same values in specified columns, often used with aggregate functions like `COUNT()`, `SUM()`.

---

### 6. **What is indexing and why is it important?**

Indexing creates a lookup structure that improves the speed of data retrieval. However, it can slow down `INSERT`, `UPDATE`, `DELETE` operations due to index maintenance.

---

### 7. **Default Storage Engine in MySQL**

As of MySQL 5.5+, the default engine is **InnoDB**, which supports transactions and foreign keys.

---

### 8. **ACID Properties**

* **Atomicity**: Transactions are all-or-nothing.
* **Consistency**: Ensures data integrity.
* **Isolation**: Transactions don’t affect each other.
* **Durability**: Committed data is saved even in crashes.

---

## 🔹 Intermediate Level

### 1. **`INNER JOIN` vs `LEFT JOIN`**

* `INNER JOIN`: Only matching records.
* `LEFT JOIN`: All records from the left, matched data from the right or `NULL`.

---

### 2. **Advantages and Disadvantages of Indexes**

* ✅ Speed up SELECT queries.
* ❌ Slower INSERT/UPDATE/DELETE operations.
* ❌ Use extra storage.

---

### 3. **Normalization (1NF, 2NF, 3NF)**

* **1NF**: Atomic columns (no repeating groups).
* **2NF**: 1NF + no partial dependency on composite PK.
* **3NF**: 2NF + no transitive dependency (non-key depending on non-key).

---

### 4. **Deadlock Detection and Resolution**

* A deadlock occurs when two transactions wait on each other.
* MySQL detects and rolls back one transaction automatically (usually the one with less cost).
* Use `SHOW ENGINE INNODB STATUS` to detect.

---

### 5. **Composite Index**

An index on multiple columns. E.g. `INDEX (col1, col2)` is useful for queries like:

```sql
SELECT * FROM table WHERE col1 = 'a' AND col2 = 'b';
```

---

### 6. **Second Highest Salary**

```sql
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

---

### 7. **`UNION` vs `UNION ALL`**

* `UNION`: Combines and removes duplicates.
* `UNION ALL`: Combines *without* removing duplicates (faster).

---

### 8. **Pagination in MySQL**

```sql
SELECT * FROM products LIMIT 10 OFFSET 20;
```

* Gets 10 records, skipping the first 20.

---

## 🔹 Advanced Level

### 1. **Covering Index**

An index that contains *all the columns* required by the query. MySQL can fetch data directly from the index without accessing the table.

---

### 2. **Query Execution Plans**

Use:

```sql
EXPLAIN SELECT * FROM your_table WHERE id = 1;
```

This shows how MySQL executes the query, what indexes are used, and what operations are expensive.

---

### 3. **`InnoDB` vs `MyISAM`**

| Feature         | InnoDB            | MyISAM      |
| --------------- | ----------------- | ----------- |
| Transactions    | Yes               | No          |
| Foreign Keys    | Yes               | No          |
| Locking         | Row-level         | Table-level |
| Crash Recovery  | Yes               | No          |
| Full-Text Index | No (prior to 5.6) | Yes         |

---

### 4. **MySQL Transaction Handling**

```sql
START TRANSACTION;
UPDATE table SET ...;
COMMIT; -- or ROLLBACK;
```

InnoDB supports transactions; other engines like MyISAM do not.

---

### 5. **Query Optimization Tips**

* Use indexes on columns used in `WHERE`, `JOIN`, `ORDER BY`.
* Avoid `SELECT *`.
* Use `EXPLAIN`.
* Limit subqueries.
* Use proper data types.

---

### 6. **`NOW()` vs `CURRENT_TIMESTAMP`**

Both return the current date and time.

```sql
SELECT NOW(); -- 2025-05-12 12:45:00
SELECT CURRENT_TIMESTAMP; -- Same result
```

---

### 7. **`CHAR` vs `VARCHAR`**

| Type         | Fixed or Variable? | Space usage            |
| ------------ | ------------------ | ---------------------- |
| `CHAR(n)`    | Fixed-length       | Always `n` bytes       |
| `VARCHAR(n)` | Variable-length    | Only uses needed bytes |

---

### 8. **Common MySQL Bottlenecks**

* Missing indexes
* Large table scans
* Poorly written queries
* Locking issues
* Disk I/O latency
* Inefficient joins

---

More: https://www.interviewbit.com/mysql-interview-questions/#how-many-triggers-are-allowed-in-mysql-table

