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

3. **Efficiency**: (How it is faster)
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

