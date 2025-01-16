### How to get Updated Document in MongoDB - immediately
Also, If There is no data matched in DB then it will insert in DB then
To get the **updated data immediately** in the response when performing an update operation in MongoDB, you can use the `findOneAndUpdate` method with the `returnDocument` option.

Here’s how it works:

---

### **`findOneAndUpdate` with `returnDocument`**
The `returnDocument` option determines whether the response contains the **updated document** or the **original document** before the update.

- `returnDocument: "after"` → Returns the updated document.
- `returnDocument: "before"` → Returns the original document (default).

---

### **Example: Get Updated Document in Response**

```javascript
const result = await collection.findOneAndUpdate(
    { _id: "12345" }, // Filter: Find the document to update
    { $set: { name: "Updated Name", age: 30 } }, // Update: Update fields
    {
        returnDocument: "after", // Return the updated document
        upsert: true,            // Insert a new document if no match is found
    }
);

console.log(result.value);
```

---

### **Explanation**
1. **`returnDocument: "after"`**:
   Ensures that the updated document is returned after the update.
2. **`upsert: true`**:
   Inserts a new document if no document matches the filter.

---

### **Sample Output**
If a document with `_id: "12345"` exists, the result will be:
```json
{
  "_id": "12345",
  "name": "Updated Name",
  "age": 30
}
```

If no document exists and `upsert: true` is used:
- A new document will be inserted with the given values.
- The inserted document will be returned in the response.

---

### **Additional Options**
You can use other options to customize behavior:
- `projection`: Specify which fields to include or exclude in the response.
- `sort`: If multiple documents match, specify the sort order to determine which one to update.

**Example with Projection:**
```javascript
const result = await collection.findOneAndUpdate(
    { username: "aasif" },
    { $set: { city: "Mumbai" } },
    {
        returnDocument: "after",
        projection: { username: 1, city: 1, _id: 0 }, // Include only `username` and `city`
        upsert: true,
    }
);

console.log(result.value);
```

---

This approach ensures that you always get the updated data immediately in the response!

