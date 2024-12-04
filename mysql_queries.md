# MySQL Queries

```markdown
# SQL Interview Problems and Queries

---

## 1. Employee Hierarchy

**Table: employees**

| id  | name     | manager |
|-----|----------|---------|
| 1   | Alice    | NULL    |
| 2   | Bob      | 1       |
| 3   | Charlie  | 2       |
| 4   | David    | 1       |
| 5   | Eve      | 4       |

### Problem:  
Write a query to display the name of each employee along with their manager's name. If an employee has no manager, display "No Manager."

---

## 2. Top N Salaries

**Table: salaries**

| id  | emp_id  | salary  |
|-----|---------|---------|
| 1   | 1       | 50000   |
| 2   | 2       | 70000   |
| 3   | 3       | 60000   |
| 4   | 4       | 80000   |
| 5   | 5       | 40000   |

### Problem:  
Write a query to find the 2nd highest salary in the table. Can you generalize it to find the Nth highest salary?

---

## 3. Products with Maximum Sales

**Tables: products, sales**

**products**

| id  | name      |
|-----|-----------|
| 1   | Phone     |
| 2   | Laptop    |
| 3   | Tablet    |

**sales**

| id  | product_id  | units  |
|-----|-------------|--------|
| 1   | 1           | 200    |
| 2   | 2           | 300    |
| 3   | 1           | 150    |
| 4   | 3           | 100    |

### Problem:  
Write a query to find the product with the highest total sales (sum of units).

---

## 4. Customers with No Orders

**Tables: customers, orders**

**customers**

| id  | name      |
|-----|-----------|
| 1   | Alice     |
| 2   | Bob       |
| 3   | Charlie   |

**orders**

| id  | customer_id  | total  |
|-----|--------------|--------|
| 1   | 1            | 300    |
| 2   | 1            | 200    |
| 3   | 2            | 400    |

### Problem:  
Write a query to find customers who have not placed any orders.

---

## 5. Sales Growth Over Time

**Table: sales**

| sale_date  | product_id  | amount  |
|------------|-------------|---------|
| 2024-01-01 | 1           | 1000    |
| 2024-01-01 | 2           | 500     |
| 2024-02-01 | 1           | 1500    |
| 2024-02-01 | 2           | 800     |

### Problem:  
Write a query to calculate the month-over-month sales growth for each product.

---

## 6. Employee Departments

**Tables: employees, departments, department_employees**

**employees**

| id  | name      |
|-----|-----------|
| 1   | Alice     |
| 2   | Bob       |
| 3   | Charlie   |

**departments**

| id  | name      |
|-----|-----------|
| 1   | HR        |
| 2   | IT        |

**department_employees**

| id  | employee_id  | department_id  |
|-----|--------------|----------------|
| 1   | 1            | 2              |
| 2   | 2            | 2              |
| 3   | 3            | 1              |

### Problem:  
Write a query to display all employees and their respective department names. Include employees who are not assigned to any department.

---

## 7. Consecutive Absentees

**Table: attendance**

| id  | emp_id  | date       | status    |
|-----|---------|------------|-----------|
| 1   | 1       | 2024-01-01 | Present   |
| 2   | 1       | 2024-01-02 | Absent    |
| 3   | 1       | 2024-01-03 | Absent    |
| 4   | 1       | 2024-01-04 | Present   |
| 5   | 2       | 2024-01-01 | Present   |

### Problem:  
Write a query to find employees who were absent for two or more consecutive days.

---

These problems test a variety of SQL skills such as:
- **Joins:** (e.g., employee departments, customers with no orders).  
- **Aggregation:** (e.g., maximum sales, sales growth).  
- **Window Functions:** (e.g., Nth highest salary, month-over-month growth).  
- **Subqueries:** (e.g., customers with no orders).  
```

```markdown
# SQL Query Solutions

---

## 1. Employee Hierarchy

**Problem:**  
Display the name of each employee along with their manager's name. If an employee has no manager, display "No Manager".

**Solution:**
```sql
SELECT 
    e.name AS employee_name,
    COALESCE(m.name, 'No Manager') AS manager_name
FROM 
    employees e
LEFT JOIN 
    employees m ON e.manager = m.id;
```

---

## 2. Top N Salaries

**Problem:**  
Find the 2nd highest salary and generalize to the Nth highest.

**Solution (2nd Highest Salary):**
```sql
SELECT DISTINCT salary
FROM salaries
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

**Solution (Nth Highest Salary):**
```sql
SELECT DISTINCT salary
FROM salaries
ORDER BY salary DESC
LIMIT 1 OFFSET N-1;
```
Replace `N` with the desired rank.

---

## 3. Products with Maximum Sales

**Problem:**  
Find the product with the highest total sales.

**Solution:**
```sql
SELECT 
    p.name AS product_name, 
    SUM(s.units) AS total_units_sold
FROM 
    products p
JOIN 
    sales s ON p.id = s.product_id
GROUP BY 
    p.id, p.name
ORDER BY 
    total_units_sold DESC
LIMIT 1;
```

---

## 4. Customers with No Orders

**Problem:**  
Find customers who have not placed any orders.

**Solution:**
```sql
SELECT 
    c.name AS customer_name
FROM 
    customers c
LEFT JOIN 
    orders o ON c.id = o.customer_id
WHERE 
    o.id IS NULL;
```

---

## 5. Sales Growth Over Time

**Problem:**  
Calculate month-over-month sales growth for each product.

**Solution:**
```sql
SELECT 
    product_id,
    DATE_FORMAT(sale_date, '%Y-%m') AS month,
    SUM(amount) AS total_sales,
    SUM(amount) - LAG(SUM(amount)) OVER (PARTITION BY product_id ORDER BY DATE_FORMAT(sale_date, '%Y-%m')) AS sales_growth
FROM 
    sales
GROUP BY 
    product_id, month
ORDER BY 
    product_id, month;
```

---

## 6. Employee Departments

**Problem:**  
Display all employees and their respective department names. Include employees who are not assigned to any department.

**Solution:**
```sql
SELECT 
    e.name AS employee_name,
    d.name AS department_name
FROM 
    employees e
LEFT JOIN 
    department_employees de ON e.id = de.employee_id
LEFT JOIN 
    departments d ON de.department_id = d.id;
```

---

## 7. Consecutive Absentees

**Problem:**  
Find employees who were absent for two or more consecutive days.

**Solution:**
```sql
SELECT 
    emp_id, 
    GROUP_CONCAT(date ORDER BY date) AS absent_dates
FROM (
    SELECT 
        emp_id,
        date,
        DATEDIFF(date, LAG(date) OVER (PARTITION BY emp_id ORDER BY date)) AS day_diff
    FROM 
        attendance
    WHERE 
        status = 'Absent'
) subquery
WHERE 
    day_diff = 1
GROUP BY 
    emp_id;
```

## How to find date difference between two dates in MySQL

```sql  
SELECT DATEDIFF('2024-12-15', '2024-12-01') AS days_difference;
```
```js
output: 14  // 14 days, it returns data in term of days
```

