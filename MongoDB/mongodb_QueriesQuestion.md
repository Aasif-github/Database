## MongoDB Queries

Here are some of the most commonly asked **MongoDB query** questions in interviews:  

---

## **1. Basic Queries**
### **1.1 How to find all documents in a collection?**  
```js
db.users.find({});
```
---

### **1.2 How to find a document with a specific field value?**  
```js
db.users.find({ email: "test@example.com" });
```
---

### **1.3 How to find documents with a condition (greater than, less than, etc.)?**  
Find users whose age is **greater than 25**:
```js
db.users.find({ age: { $gt: 25 } });
```
Find users whose age is **between 20 and 30**:
```js
db.users.find({ age: { $gte: 20, $lte: 30 } });
```
---

## **2. Aggregation Queries**
### **2.1 How to count the number of documents in a collection?**  
```js
db.users.countDocuments({});
```
Find users whose age is greater than 25 and count them:
```js
db.users.countDocuments({ age: { $gt: 25 } });
```
---

### **2.2 How to group by a field and get counts?**  
Find the number of users for each city:
```js
db.users.aggregate([
  { $group: { _id: "$city", count: { $sum: 1 } } }
]);
```
---

### **2.3 How to find the highest salary in an employees collection?**  
```js
db.employees.aggregate([
  { $sort: { salary: -1 } },
  { $limit: 1 }
]);
```
---

## **3. Update and Delete Queries**
### **3.1 How to update a field in a document?**  
```js
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { age: 30 } }
);
```
---

### **3.2 How to update multiple documents?**  
```js
db.users.updateMany(
  { city: "New York" },
  { $set: { status: "Active" } }
);
```
---

### **3.3 How to delete a document?**  
```js
db.users.deleteOne({ email: "test@example.com" });
```
---

### **3.4 How to delete multiple documents?**  
```js
db.users.deleteMany({ age: { $lt: 18 } });
```
---

## **4. Indexing & Performance**
### **4.1 How to create an index for faster searches?**  
```js
db.users.createIndex({ email: 1 });
```
---

### **4.2 How to check existing indexes?**  
```js
db.users.getIndexes();
```
---

### **4.3 How to drop an index?**  
```js
db.users.dropIndex("email_1");
```
---

## **5. Joins (Using `$lookup`)**
### **5.1 How to perform a left join (similar to SQL joins)?**  
```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  }
]);
```
This joins the `orders` collection with the `users` collection based on `userId`.

---

## **6. Removing Duplicates**
Find and remove duplicate emails:
```js
db.users.aggregate([
  { $group: { _id: "$email", count: { $sum: 1 }, docs: { $push: "$_id" } } },
  { $match: { count: { $gt: 1 } } }
]).forEach(doc => {
  db.users.deleteMany({ _id: { $in: doc.docs.slice(1) } });
});
```
---

## **7. Finding Documents with Missing or Null Fields**
Find users where the `phone` field is missing:
```js
db.users.find({ phone: { $exists: false } });
```
Find users where the `phone` field is `null`:
```js
db.users.find({ phone: null });
```
---

## **8. Sorting & Pagination**
### **8.1 How to sort documents?**  
Sort users by age in descending order:
```js
db.users.find().sort({ age: -1 });
```
---

### **8.2 How to paginate results (skip and limit)?**  
```js
db.users.find().skip(10).limit(10);
```
---

### **9. How to check MongoDB server status?**  
```js
db.serverStatus();
```

---

These are some of the most **frequently asked** MongoDB interview questions. Let me know if you need more details! 🚀



Here are **more advanced** MongoDB interview questions along with their queries:  

---

## **10. Advanced Find Queries**
### **10.1 How to find users with multiple conditions (AND, OR, NOT)?**  
Find users in **New York** and with **age > 25**:  
```js
db.users.find({ city: "New York", age: { $gt: 25 } });
```
Find users in **New York** OR with **age > 25**:  
```js
db.users.find({
  $or: [{ city: "New York" }, { age: { $gt: 25 } }]
});
```
Find users **NOT in New York**:  
```js
db.users.find({ city: { $ne: "New York" } });
```
---

### **10.2 How to find users where a field is an array?**  
Find users who have **"JavaScript"** in their skills array:  
```js
db.users.find({ skills: "JavaScript" });
```
Find users who have **both JavaScript and Python** (match all):  
```js
db.users.find({ skills: { $all: ["JavaScript", "Python"] } });
```
Find users who have at **least one** of the skills:  
```js
db.users.find({ skills: { $in: ["JavaScript", "Python"] } });
```
---

## **11. Date Queries**
### **11.1 How to find users created in the last 7 days?**  
```js
const last7Days = new Date();
last7Days.setDate(last7Days.getDate() - 7);

db.users.find({ createdAt: { $gte: last7Days } });
```
Find users registered in **January 2024**:  
```js
db.users.find({
  createdAt: { 
    $gte: new ISODate("2024-01-01"), 
    $lt: new ISODate("2024-02-01") 
  }
});
```
---

## **12. Working with Nested Documents**
### **12.1 How to find users with a specific field inside a nested object?**  
If user documents have an address like this:
```json
{
  "name": "John",
  "address": { "city": "New York", "zip": "10001" }
}
```
Find users living in **New York**:
```js
db.users.find({ "address.city": "New York" });
```
Update the **zip code** for users in New York:
```js
db.users.updateMany(
  { "address.city": "New York" },
  { $set: { "address.zip": "99999" } }
);
```
---

## **13. Aggregation Pipelines**
### **13.1 How to calculate the total salary of all employees?**  
```js
db.employees.aggregate([
  { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
]);
```
---

### **13.2 How to find the highest and lowest salary?**  
```js
db.employees.aggregate([
  {
    $group: {
      _id: null,
      maxSalary: { $max: "$salary" },
      minSalary: { $min: "$salary" }
    }
  }
]);
```
---

### **13.3 How to calculate the average salary per department?**  
```js
db.employees.aggregate([
  { $group: { _id: "$department", avgSalary: { $avg: "$salary" } } }
]);
```
---

## **14. Transactions (MongoDB 4.0+)**
### **14.1 How to perform a transaction (e.g., transfer money)?**  
```js
const session = db.getMongo().startSession();
session.startTransaction();

try {
  db.accounts.updateOne({ name: "Alice" }, { $inc: { balance: -100 } }, { session });
  db.accounts.updateOne({ name: "Bob" }, { $inc: { balance: 100 } }, { session });

  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
}
```
---

## **15. Replication & Sharding**
### **15.1 How to check replication status?**  
```js
rs.status();
```
---

### **15.2 How to check sharding status?**  
```js
sh.status();
```
---

## **16. Working with Large Datasets**
### **16.1 How to use `$sample` to get random documents?**  
```js
db.users.aggregate([{ $sample: { size: 5 } }]);
```
---

### **16.2 How to delete all documents in a collection?**  
```js
db.users.deleteMany({});
```
---

### **16.3 How to drop a collection?**  
```js
db.users.drop();
```
---

## **17. Performance Optimization**
### **17.1 How to analyze query performance?**  
```js
db.users.find({ email: "test@example.com" }).explain("executionStats");
```
---

### **17.2 How to compact a collection to improve performance?**  
```js
db.runCommand({ compact: "users" });
```
---

## **18. Miscellaneous**
### **18.1 How to rename a field in all documents?**  
```js
db.users.updateMany({}, { $rename: { "oldFieldName": "newFieldName" } });
```
---

### **18.2 How to copy a collection?**  
```js
db.sourceCollection.aggregate([{ $match: {} }, { $out: "destinationCollection" }]);
```
---

### **18.3 How to export and import data?**  
Export MongoDB collection to JSON:
```sh
mongoexport --db=myDB --collection=users --out=users.json
```
Import JSON into MongoDB:
```sh
mongoimport --db=myDB --collection=users --file=users.json
```
---

These are **commonly asked MongoDB interview queries**, covering **basic to advanced** levels. 🚀  

Let me know if you need **hands-on examples** for a specific use case!
