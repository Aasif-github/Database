# Mongodb Security
***(What are the security practices we must follow for mongodb )***
Securing a MongoDB deployment is critical to prevent unauthorized access, data breaches, and ensure the integrity of your data. Below are best practices for MongoDB security:

---

### **1. Enable Authentication and Authorization**
- **Authentication**: Ensure that users must authenticate before accessing the database.
  - Use `--auth` when starting `mongod` or enable it in the configuration file.
  - Create administrative and application-specific users with strong passwords:
    ```javascript
    use admin
    db.createUser({
      user: "admin",
      pwd: "securepassword",
      roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase"]
    });
    ```

- **Authorization**: Use role-based access control (RBAC) to assign minimal privileges needed for each user.
  - Example:
    ```javascript
    db.createUser({
      user: "appUser",
      pwd: "appPassword",
      roles: [{ role: "readWrite", db: "applicationDB" }]
    });
    ```

---

### **2. Use Network Security**
- **Bind IP Addresses**: Restrict MongoDB to listen on trusted IP addresses.
  - Update `bindIp` in the `mongod.conf` file:
    ```yaml
    net:
      bindIp: 127.0.0.1,192.168.1.100
    ```
- **Enable Firewall Rules**: Limit access to trusted IPs using firewalls like **iptables** or cloud provider security groups.

- **Disable Direct Internet Access**: Avoid exposing MongoDB instances directly to the internet.

---

### **3. Use Encryption**
- **Enable TLS/SSL**: Encrypt data in transit between clients and MongoDB instances.
  - Generate certificates and enable SSL in the `mongod.conf`:
    ```yaml
    net:
      ssl:
        mode: requireSSL
        PEMKeyFile: /etc/ssl/mongodb.pem
    ```

- **Encrypt Data at Rest**: Use MongoDB’s native **Encrypted Storage Engine** or a disk encryption tool.

---

### **4. Use Strong Passwords and Key Management**
- Use strong, unique passwords for all accounts.
- Rotate keys and credentials periodically.
- Use a **Key Management Service (KMS)**, such as AWS KMS, for encrypting keys.

---

### **5. Enable Auditing**
- Enable MongoDB’s **Auditing** feature to track access and actions taken on the database.

---

### **6. Regular Updates and Patches**
- Keep MongoDB and its dependencies up to date to ensure vulnerabilities are patched.
- Monitor MongoDB’s Security Alerts for updates.

---

### **7. Limit Database Permissions**
- Follow the **principle of least privilege**.
- Avoid running MongoDB with root privileges.

---

### **8. Use Strong Configuration Settings**
- **Disable JavaScript Execution**: Prevent server-side JavaScript execution if not needed.
  ```yaml
  security:
    javascriptEnabled: false
  ```
- **Disable HTTP Interface**: Avoid enabling the deprecated HTTP status interface.

---

### **9. Implement Monitoring and Logging**
- Use monitoring tools like **MongoDB Cloud Manager** or **Prometheus** to detect abnormal activity.
- Enable logging to monitor unauthorized access attempts.

---

### **10. Backup and Disaster Recovery**
- Use encrypted backups and automate the backup process.
- Test restoring backups to ensure they work when needed.

---

### **11. Secure MongoDB with a VPN**
- Use a Virtual Private Network (VPN) for secure connections to the MongoDB cluster if it is not within a private network.

---

### **12. Leverage External Security Tools**
- Use cloud provider-specific tools (e.g., AWS Security Groups, Azure Defender) for added security.
- Integrate MongoDB with tools like **Vault** for secret management.

---

### **13. Protect Against Injection Attacks**
- Sanitize input data in your application.
- Use parameterized queries and avoid dynamic query building.

---

### Checklist:
| Practice                          | Implemented? |
|-----------------------------------|--------------|
| Authentication Enabled            | ✅ / ❌       |
| TLS/SSL Configured                | ✅ / ❌       |
| IP Whitelisting                   | ✅ / ❌       |
| Firewall Rules Applied            | ✅ / ❌       |
| Backups Configured                | ✅ / ❌       |
| Monitoring Enabled                | ✅ / ❌       |
| MongoDB Updated                   | ✅ / ❌       |


# **13. Protect Against Injection Attacks**
### **Protecting Against Injection Attacks in MongoDB**

Injection attacks occur when an attacker manipulates queries to execute unauthorized commands or retrieve sensitive data. MongoDB is susceptible to these attacks if queries are not properly sanitized. Here’s how you can protect your MongoDB application from injection attacks:

---

### **1. Use Parameterized Queries**
Avoid dynamically constructing queries with user inputs. Instead, use parameterized queries to ensure user inputs are treated as data, not code.

#### Example:
**Unsafe Query:**
```javascript
const user = req.body.username;
const password = req.body.password;

db.users.findOne({ username: user, password: password });
```

An attacker could input `{ $ne: null }` in the `password` field, potentially bypassing authentication.

**Safe Query:**
```javascript
const user = req.body.username;
const password = req.body.password;

db.users.findOne({ username: user, password: password }); // Ensure user inputs are sanitized
```

---

### **2. Validate and Sanitize Inputs**
Validate all user inputs to ensure they conform to expected formats. Use libraries like **Joi** or **Validator.js** for validation.

#### Example:
```javascript
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
});

const { error, value } = schema.validate(req.body);
if (error) {
  return res.status(400).send('Invalid input');
}
```

---

### **3. Use Object Validation in MongoDB Queries**
Ensure that inputs conform to expected query structures. Reject queries containing unexpected operators like `$ne`, `$gt`, etc.

#### Example:
```javascript
const sanitize = (query) => {
  for (const key in query) {
    if (key.startsWith('$')) {
      throw new Error('Invalid query');
    }
  }
};

sanitize(req.body); // Validate before using in a MongoDB query
```

---

### **4. Avoid Allowing Direct User-Controlled Filters**
Don’t allow users to directly specify query filters unless necessary. If you do, restrict permissible fields.

#### Example:
**Risky Implementation:**
```javascript
const filters = req.body.filters;
db.collection.find(filters);
```

**Safer Implementation:**
```javascript
const allowedFields = ['name', 'age', 'email'];
const filters = {};

allowedFields.forEach((field) => {
  if (req.body[field]) {
    filters[field] = req.body[field];
  }
});

db.collection.find(filters);
```

---

### **5. Use MongoDB Native Operators Safely**
If your application allows users to query with operators like `$regex`, `$in`, or `$or`, validate their usage carefully.

#### Example:
Limit `$regex` usage:
```javascript
if (req.body.search && typeof req.body.search === 'string') {
  const regex = new RegExp(req.body.search, 'i'); // Case-insensitive search
  db.collection.find({ name: regex });
}
```

---

### **6. Use Aggregation Framework with Caution**
If using MongoDB’s aggregation framework, ensure that pipeline stages are sanitized and do not accept raw user inputs.

---

### **7. Implement Query Timeouts**
Set query timeouts to prevent resource exhaustion from malicious or poorly-constructed queries.

#### Example:
```javascript
db.collection.find(query).maxTimeMS(1000); // Set a 1-second timeout
```

---

### **8. Enable MongoDB Logs**
Monitor logs for abnormal query patterns that may indicate injection attempts.

---

### **9. Keep MongoDB Driver and Dependencies Updated**
Regularly update the MongoDB driver and dependencies to patch vulnerabilities.

---

### **10. Disable Server-Side JavaScript**
By default, MongoDB allows JavaScript execution in certain operations like `mapReduce`. Disable this feature unless explicitly needed:
```yaml
security:
  javascriptEnabled: false
````

--- 