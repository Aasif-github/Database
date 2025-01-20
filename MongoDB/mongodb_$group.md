## Group Aggregation ($group)

The `$group` aggregation stage in MongoDB is used to group documents by a specific field or expression and perform aggregations like sum, average, count, etc., on grouped data. It’s a versatile operator used in the aggregation pipeline.

Performance
`$group` is a blocking stage, which causes the pipeline to wait for all input data to be retrieved for the blocking stage before processing the data. A blocking stage may reduce performance because it reduces parallel processing for a pipeline with multiple stages. A blocking stage may also use substantial amounts of memory for large data sets.

$group and Memory Restrictions
If the $group stage exceeds `100 megabytes of RAM`, MongoDB writes data to temporary files. However, if the allowDiskUse option is set to false, $group returns an error. For more information, refer to Aggregation Pipeline Limits.

Here’s how to use `$group` for different cases:

---

### 1. **Basic Grouping with `$sum`**
#### Use Case: Count the total documents grouped by a specific field.

**Example: Count total orders per customer**
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",  // Group by customerId
      totalOrders: { $sum: 1 } // Increment by 1 for each document
    }
  }
]);
```

---

### 2. **Group and Calculate Totals**
#### Use Case: Calculate the total sales per product.

**Example: Total revenue per product**
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$productId",  // Group by productId
      totalRevenue: { $sum: "$amount" } // Sum the 'amount' field
    }
  }
]);
```

---

### 3. **Average Calculation**
#### Use Case: Calculate the average score of students.

**Example: Average score per student**
```javascript
db.students.aggregate([
  {
    $group: {
      _id: "$studentId",  // Group by studentId
      averageScore: { $avg: "$score" } // Calculate average of 'score' field
    }
  }
]);
```

---

### 4. **Group with Multiple Aggregations**
#### Use Case: Calculate total and average in the same query.

**Example: Total and average sales per product**
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$productId",  // Group by productId
      totalSales: { $sum: "$amount" },  // Total sales
      averageSales: { $avg: "$amount" } // Average sales
    }
  }
]);
```

---

### 5. **Find Maximum or Minimum**
#### Use Case: Find the highest and lowest scores for students.

**Example: Highest and lowest scores per student**
```javascript
db.scores.aggregate([
  {
    $group: {
      _id: "$studentId",  // Group by studentId
      highestScore: { $max: "$score" },  // Maximum score
      lowestScore: { $min: "$score" }   // Minimum score
    }
  }
]);
```

---

### 6. **Group by Calculated Field**
#### Use Case: Group by a custom category.

**Example: Group sales by year**
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: { $year: "$date" },  // Extract year from date field
      totalSales: { $sum: "$amount" }
    }
  }
]);
```

---

### 7. **Count Unique Values**
#### Use Case: Count distinct values in a group.

**Example: Count distinct products sold by each seller**
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$sellerId",  // Group by sellerId
      uniqueProducts: { $addToSet: "$productId" } // Collect unique product IDs
    }
  },
  {
    $project: {
      _id: 1,
      productCount: { $size: "$uniqueProducts" } // Count unique products
    }
  }
]);
```

---

### 8. **Combine `$group` with Other Stages**
#### Use Case: Filter and then group.

**Example: Total sales per product for sales greater than $100**
```javascript
db.sales.aggregate([
  {
    $match: { amount: { $gt: 100 } }  // Filter documents
  },
  {
    $group: {
      _id: "$productId",
      totalSales: { $sum: "$amount" }
    }
  }
]);
```

---

### 9. **Group and Sort**
#### Use Case: Find top-selling products.

**Example: Top 5 products by sales**
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$productId", 
      totalSales: { $sum: "$amount" }
    }
  },
  {
    $sort: { totalSales: -1 }  // Sort by totalSales in descending order
  },
  {
    $limit: 5  // Limit to top 5
  }
]);
```

---

### 10. **Grouping with Nested Documents**
#### Use Case: Group by a field inside a nested document.

**Example: Total sales per city**
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$address.city",  // Group by city field in address
      totalSales: { $sum: "$amount" }
    }
  }
]);
```

---

### Key Points:
- The `_id` field in `$group` specifies the grouping key. Use `null` to calculate aggregates for all documents together.
- You can use aggregation operators like `$sum`, `$avg`, `$max`, `$min`, `$push`, and `$addToSet`.
- Combine `$group` with stages like `$match`, `$sort`, `$project`, and `$limit` for more complex queries.

## How to use `null` as grouping key:

In MongoDB's `$group` stage, the `_id` field is used to define the key by which documents are grouped. If you set `_id` to `null`, it tells MongoDB to treat **all documents as belonging to a single group**, effectively aggregating data across the entire collection without any grouping key.

---

### Example: Aggregate All Documents Without Grouping

#### **Use Case 1: Count Total Documents**
If you want to count the total number of documents in a collection without grouping them by a specific field:
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: null,           // No grouping key; all documents are in one group
      totalDocuments: { $sum: 1 }  // Count total documents
    }
  }
]);
```
**Output:**
```json
[
  {
    "_id": null,
    "totalDocuments": 100  // Total documents in the collection
  }
]
```

---

#### **Use Case 2: Calculate Total Sum for a Field**
If you want to calculate the total sum of a field (e.g., `amount`) across all documents:
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: null,           // No grouping key; aggregate all documents
      totalAmount: { $sum: "$amount" }  // Sum the 'amount' field
    }
  }
]);
```
**Output:**
```json
[
  {
    "_id": null,
    "totalAmount": 5000  // Total amount from all orders
  }
]
```

---

#### Why Use `_id: null`?
- **Global Aggregation:** Setting `_id` to `null` allows you to compute totals, averages, or other aggregations across the entire dataset.
- **No Grouping Key Needed:** When your goal is to perform calculations on the whole collection without dividing the data into groups, `_id: null` is the way to go.

---

### Important Notes:
1. **Single Group:** When `_id` is `null`, the `$group` stage produces only one document in the output since all documents belong to the same group.
2. **Other Fields:** You can still include other computed fields in the output, such as totals, averages, or arrays of collected values.

---