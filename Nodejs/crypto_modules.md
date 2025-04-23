## Crypto Module

The `crypto` module in Node.js can be used for various cryptographic operations such as hashing, encryption, and decryption. Below is a detailed guide on how to implement it in your Node.js application.

---

### 1. **Hashing Data**  
Hashing is a one-way process used to generate a unique fixed-length string from input data. It’s commonly used for password storage or verifying data integrity.

#### Example: Hashing with SHA-256
```javascript
import crypto from 'crypto';

const data = 'This is a secret message';
const hash = crypto.createHash('sha256').update(data).digest('hex');
console.log('Hash:', hash);
```

**Key Points**:  
- `createHash('algorithm')`: Specifies the hashing algorithm (e.g., `sha256`, `md5`).  
- `update(data)`: Adds data to hash.  
- `digest('format')`: Converts hash into specified format (`hex`, `base64`, etc.).

---

### 2. **Password Hashing with Salting**  
For securely storing passwords, you can use a salt (random data) to make the hash unique.

#### Example:
```javascript
import crypto from 'crypto';

const password = 'myPassword123';
const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

console.log('Salt:', salt);
console.log('Hashed Password:', hashedPassword);
```

**Key Points**:  
- `randomBytes(size)`: Generates a random salt of specified size in bytes.  
- `pbkdf2Sync`: Implements the PBKDF2 algorithm for securely hashing passwords.

---

### 3. **Encrypting and Decrypting Data**
You can use symmetric encryption (e.g., AES) for securely encrypting and decrypting data.

#### Example: AES Encryption and Decryption
```javascript
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // Initialization vector

// Encryption
const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

// Decryption
const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const text = 'Sensitive data';
const encrypted = encrypt(text);
const decrypted = decrypt(encrypted);

console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);
```

**Key Points**:  
- `createCipheriv` and `createDecipheriv`: Create cipher and decipher instances for encryption and decryption.  
- The key and IV must be securely shared between sender and receiver.

---

### 4. **Digital Signatures**
Digital signatures ensure the authenticity and integrity of messages.

#### Example:
```javascript
const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

// Sign data
const sign = crypto.createSign('SHA256');
sign.update('Important message');
const signature = sign.sign(privateKey, 'hex');

// Verify signature
const verify = crypto.createVerify('SHA256');
verify.update('Important message');
const isValid = verify.verify(publicKey, signature, 'hex');

console.log('Signature:', signature);
console.log('Is valid:', isValid);
```

**Key Points**:  
- `generateKeyPairSync`: Generates a public-private key pair.  
- `createSign` and `createVerify`: Used for signing and verifying data.

---

### 5. **Generating Random Tokens**
Tokens are useful for CSRF protection, session IDs, etc.

#### Example:
```javascript
const crypto = require('crypto');

const token = crypto.randomBytes(32).toString('hex');
console.log('Random Token:', token);
```

---

### 6. **HMAC (Hash-Based Message Authentication Code)**  
HMAC adds a secret key to hashing for data integrity and authenticity.

#### Example:
```javascript
const crypto = require('crypto');

const secret = 'mySecretKey';
const data = 'Message to hash';

const hmac = crypto.createHmac('sha256', secret).update(data).digest('hex');
console.log('HMAC:', hmac);
```

---

### Summary
The `crypto` module offers secure and versatile methods for cryptographic operations. Whether it's hashing passwords, encrypting data, or verifying messages, it’s an essential tool for building secure applications in Node.js. Always follow best practices, such as:
- Using strong keys.
- Avoiding outdated algorithms like `MD5` or `SHA1`.
- Properly managing and securing keys.