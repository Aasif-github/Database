# JWT

**JWT (JSON Web Token)** is a compact and self-contained way to securely transmit information between parties as a JSON object. It is widely used for authentication and information exchange in web applications.

---

### Structure of JWT
A JWT consists of three parts:
1. **Header**: Contains metadata about the token, such as the type (`JWT`) and the signing algorithm (e.g., `HS256` or `RS256`).
   ```json
   { "alg": "HS256", "typ": "JWT" }
   ```

2. **Payload**: Contains the claims, which are the data you want to transmit (e.g., user ID, roles, expiration time).
   ```json
   { "userId": "12345", "role": "admin", "exp": 1673827200 }
   ```

3. **Signature**: Ensures the token's integrity and authenticity. It's created by hashing the encoded header and payload with a secret or private key.
   ```
   HMACSHA256(
     base64UrlEncode(header) + "." + base64UrlEncode(payload),
     secret
   )
   ```

The token looks like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY3MzgyNzIwMH0.Qd4T2wYZkI8NiFRwG4KmjGhiZIoU9GrT5F0hTM_xnOQ
```

---

### Why Use JWT?
1. **Authentication**:
   - Used to verify the identity of a user.
   - After login, a server generates a JWT and sends it to the client. The client includes this token in subsequent requests to access protected resources.
   - Example: Adding the JWT in an HTTP header:
     ```
     Authorization: Bearer <token>
     ```

2. **Statelessness**:
   - The server doesn't need to store session data, as the token itself carries all the necessary information (self-contained).

3. **Security**:
   - JWTs are signed, ensuring that their contents cannot be tampered with. If the payload is altered, the signature validation will fail.

4. **Cross-domain support**:
   - JWTs work well in distributed systems and across different domains, as they are portable and do not require cookies.

---

### How JWT Works (Authentication Flow)
1. **User Login**:
   - The client sends credentials (e.g., username and password) to the server.
2. **Token Generation**:
   - The server validates the credentials and generates a JWT containing user information.
3. **Token Storage**:
   - The client stores the token (e.g., in localStorage, sessionStorage, or cookies).
4. **Subsequent Requests**:
   - The client includes the JWT in the `Authorization` header when making requests to the server.
5. **Token Verification**:
   - The server verifies the token's signature to ensure it is valid and checks the claims (e.g., expiration).

---

### Key Advantages
1. **Compact**: Lightweight and easy to transmit over the network.
2. **Self-contained**: Carries all the information needed for verification.
3. **Secure**: Tamper-proof when signed with a secret or private key.
4. **Scalable**: Stateless nature reduces server load, suitable for distributed systems.

---

### Use Cases
- **Authentication**: Implementing login functionality in APIs.
- **Authorization**: Granting access to specific resources based on user roles.
- **Information Exchange**: Securely transmitting information between services.

---
