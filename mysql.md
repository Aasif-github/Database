In MySQL, *joins* are used to combine data from two or more tables based on related columns. Here are the main types of joins in MySQL:

### 1. **INNER JOIN**:
- **Definition**: Returns rows that have matching values in both tables.
- **Usage**: Commonly used to find matching data between tables.
- **Syntax**:
  ```sql
  SELECT columns
  FROM table1
  INNER JOIN table2 ON table1.common_column = table2.common_column;
  ```
- **Example**:
  ```sql
  SELECT orders.order_id, customers.name
  FROM orders
  INNER JOIN customers ON orders.customer_id = customers.customer_id;
  ```

### 2. **LEFT JOIN (LEFT OUTER JOIN)**:
- **Definition**: Returns all rows from the left table and the matched rows from the right table. If no match is found, NULLs are returned for columns from the right table.
- **Usage**: Useful for finding all records in one table, with or without matches in another.
- **Syntax**:
  ```sql
  SELECT columns
  FROM table1
  LEFT JOIN table2 ON table1.common_column = table2.common_column;
  ```
- **Example**:
  ```sql
  SELECT customers.name, orders.order_id
  FROM customers
  LEFT JOIN orders ON customers.customer_id = orders.customer_id;
  ```

### 3. **RIGHT JOIN (RIGHT OUTER JOIN)**:
- **Definition**: Returns all rows from the right table and the matched rows from the left table. If no match is found, NULLs are returned for columns from the left table.
- **Usage**: Used when all records from the right table need to be included, even if there are no matches in the left table.
- **Syntax**:
  ```sql
  SELECT columns
  FROM table1
  RIGHT JOIN table2 ON table1.common_column = table2.common_column;
  ```
- **Example**:
  ```sql
  SELECT orders.order_id, customers.name
  FROM orders
  RIGHT JOIN customers ON orders.customer_id = customers.customer_id;
  ```

### 4. **FULL JOIN (FULL OUTER JOIN)**:
- **Definition**: Returns all rows when there is a match in either the left or right table. Rows without a match in one of the tables will contain NULLs for that table’s columns.
- **Usage**: MySQL does not natively support `FULL JOIN`, but it can be simulated using `UNION`.
- **Example**:
  ```sql
  SELECT columns
  FROM table1
  LEFT JOIN table2 ON table1.common_column = table2.common_column
  UNION
  SELECT columns
  FROM table1
  RIGHT JOIN table2 ON table1.common_column = table2.common_column;
  ```

### 5. **CROSS JOIN**:
- **Definition**: Returns the Cartesian product of the two tables, meaning all possible combinations of rows. Typically used when every row in one table needs to be combined with all rows in another.
- **Usage**: Be cautious with large tables as the result set can be very large.
- **Syntax**:
  ```sql
  SELECT columns
  FROM table1
  CROSS JOIN table2;
  ```
- **Example**:
  ```sql
  SELECT products.product_name, categories.category_name
  FROM products
  CROSS JOIN categories;
  ```

### 6. **SELF JOIN**:
- **Definition**: A table is joined with itself to compare rows within the same table.
- **Usage**: Often used when working with hierarchical data or finding relationships within the same table.
- **Syntax**:
  ```sql
  SELECT a.column_name, b.column_name
  FROM table a, table b
  WHERE a.common_column = b.common_column;
  ```
- **Example**:
  ```sql
  SELECT e1.employee_id, e1.name, e2.name AS manager_name
  FROM employees e1
  JOIN employees e2 ON e1.manager_id = e2.employee_id;
  ```

### Summary:
- **INNER JOIN**: Matches rows in both tables.
- **LEFT JOIN**: Matches all rows in the left table, with matching rows in the right (NULL if no match).
- **RIGHT JOIN**: Matches all rows in the right table, with matching rows in the left (NULL if no match).
- **FULL JOIN**: Combines the results of both `LEFT` and `RIGHT` JOINs (using `UNION`).
- **CROSS JOIN**: Returns Cartesian product of two tables.
- **SELF JOIN**: Joins a table with itself.

These joins help in combining and analyzing data across multiple related tables in a relational database efficiently.


# In MySQL, Where Index is Store ?
In MySQL, **indexes are primarily stored in disk storage (main memory)** as part of the database files. However, they can also be **loaded into RAM (cache)** for faster access during query execution. Let's clarify the distinction:

---

### **1. Indexes on Disk (Main Memory)**
- By default, indexes are stored on disk along with table data, as part of the database's physical storage.
- For the **InnoDB** storage engine:
  - The data and clustered index are stored together in the `*.ibd` file (or in the shared `ibdata` file in older setups).
  - Secondary indexes are also stored on disk but separately from the table's clustered index.
- For **MyISAM**:
  - Indexes are stored in `.MYI` files on disk.

Indexes persist on disk to ensure they are durable and can survive server restarts.

---

### **2. Indexes in RAM**
- Indexes are **loaded into RAM** when they are frequently accessed during query execution. MySQL uses caching mechanisms to optimize this process:
  - **InnoDB Buffer Pool**:
    - A portion of the RAM is allocated as a buffer pool to cache frequently accessed data and indexes.
    - When a query accesses an index, the relevant portion of the index tree is loaded into the buffer pool for faster access.
    - If the buffer pool cannot hold all the indexes, less frequently used portions remain on disk.
  - **Key Cache (MyISAM)**:
    - For the MyISAM engine, the **key cache** stores index blocks in memory to speed up access.

#### Example:
When you perform a query:
1. MySQL checks the buffer pool (RAM) to see if the relevant part of the index is already loaded.
2. If it’s not in memory, it reads the index from disk and caches it in RAM.

---

### **3. Memory Storage Engine**
- For tables using the **Memory** storage engine, all indexes and data are stored entirely in RAM. This makes it extremely fast but non-persistent (data is lost on restart).

---

### **Summary**
- **Disk Storage (Main Memory)**:
  - Indexes are permanently stored on disk to ensure persistence.
- **RAM (Cache)**:
  - Indexes are dynamically loaded into RAM when accessed, improving query performance.
  - MySQL uses caching mechanisms like the **InnoDB Buffer Pool** and **Key Cache** to manage this.

So, indexes reside on disk but are often cached in RAM during runtime for efficiency.
