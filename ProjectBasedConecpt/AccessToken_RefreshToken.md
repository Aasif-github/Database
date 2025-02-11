# In user login what to do with access token and refresh token.

In user login, **access tokens** and **refresh tokens** are used for authentication and maintaining user sessions securely. Here’s how they work and what you should do with them:

---

## **1. What is an Access Token?**
An **access token** is a short-lived token (e.g., JWT) that allows the user to access protected resources (e.g., API endpoints).  
- **Lifespan**: Typically expires in **15 minutes to 1 hour**.
- **Stored in**: Frontend (memory, localStorage, or HTTP-only cookies).
- **Used in**: `Authorization` header as `Bearer <access_token>` when making API requests.

### ✅ **What to do with Access Tokens?**
- Generate the token after login.
- Send it in the `Authorization` header of API requests.
- Store it **securely**:
  - **Best practice:** Store in **HTTP-only cookies** (prevents XSS attacks).
  - **Alternative (less secure):** Store in `localStorage` or `sessionStorage` (prone to XSS attacks).
- When expired, request a **new access token** using the refresh token.

---

## **2. What is a Refresh Token?**
A **refresh token** is a long-lived token that is used to generate a new access token **without requiring the user to log in again**.
- **Lifespan**: Typically **7 days to 30 days**.
- **Stored in**: HTTP-only cookies or secure storage on the server.
- **Used for**: Getting a new access token when the old one expires.

### ✅ **What to do with Refresh Tokens?**
- Generate and return it alongside the access token after login.
- Store it **securely**, preferably in an **HTTP-only cookie** (to prevent XSS attacks).
- When the access token expires, send a request to the backend to refresh it.
- If the refresh token expires, the user must log in again.

---

## **3. How to Use Tokens in Login Flow?**
### **Step 1: User Logs In**
1. User enters credentials and submits them to the backend.
2. Backend verifies credentials and generates:
   - **Access Token** (short-lived)
   - **Refresh Token** (long-lived)
3. The **access token** is sent in the response and stored securely on the frontend.
4. The **refresh token** is stored securely (preferably in an HTTP-only cookie).

---

### **Step 2: Using the Access Token for API Requests**
1. The frontend includes the **access token** in the `Authorization` header:
   ```http
   Authorization: Bearer <access_token>
   ```
2. The backend verifies the token before processing the request.

---

### **Step 3: Refreshing the Access Token**
When the **access token expires**, the frontend requests a new one using the **refresh token**:
1. Send a request to the **/refresh-token** endpoint with the refresh token.
2. Backend verifies the refresh token.
3. If valid, backend generates a **new access token** and sends it back.
4. The frontend stores the new **access token** and continues making API requests.

---

### **Step 4: Logging Out the User**
To log out the user:
1. **Delete the refresh token** from storage (server-side or cookies).
2. **Remove the access token** from frontend storage.

---

## **4. Example: Access Token & Refresh Token Flow in Express.js**
### **Backend (Node.js + Express)**
```javascript
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = "your-access-secret";
const REFRESH_TOKEN_SECRET = "your-refresh-secret";

let refreshTokens = []; // Store refresh tokens securely (use DB in production)

// Generate Access Token
function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Generate Refresh Token
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    refreshTokens.push(refreshToken);
    return refreshToken;
}

// Login Route
app.post('/login', (req, res) => {
    const user = { id: 1, username: req.body.username };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
});

// Refresh Token Route
app.post('/refresh-token', (req, res) => {
    const { token } = req.body;
    if (!token || !refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
        res.json({ accessToken: newAccessToken });
    });
});

// Logout Route
app.post('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(t => t !== req.body.token);
    res.sendStatus(204);
});
```

---

### **Frontend (Using Fetch API)**
#### **Making API Calls with Access Token**
```javascript
async function fetchProtectedData() {
    const token = localStorage.getItem('accessToken'); // Get access token from storage

    const response = await fetch('/protected-route', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        await refreshAccessToken();
        return fetchProtectedData(); // Retry after refreshing token
    }

    return response.json();
}
```

#### **Refreshing Access Token**
```javascript
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token

    const response = await fetch('/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken })
    });

    const data = await response.json();
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
    }
}
```

---

## **5. Best Practices**
### ✅ **Security Measures**
1. **Use HTTP-only cookies** for refresh tokens (prevents XSS attacks).
2. **Expire access tokens quickly** (e.g., 15 minutes) and refresh only when needed.
3. **Blacklist revoked refresh tokens** (store in DB and check before issuing new tokens).
4. **Use HTTPS** to encrypt all token transmissions.
5. **Implement token revocation on logout** to prevent reuse.

---

## **6. Summary**
| Feature | Access Token | Refresh Token |
|---------|-------------|---------------|
| **Purpose** | Authenticate API requests | Get new access token |
| **Storage** | LocalStorage / HTTP-only Cookie | HTTP-only Cookie |
| **Lifespan** | Short (15 min - 1 hour) | Long (7 - 30 days) |
| **Used in** | `Authorization: Bearer <token>` header | `/refresh-token` API |
| **Security Risk** | Exposed to XSS if stored in localStorage | Must be protected from theft (use HTTP-only cookies) |

---

## **7. Final Thoughts**
- Use **access tokens** for authentication in API requests.
- Use **refresh tokens** to get new access tokens **without requiring login**.
- Store **refresh tokens in HTTP-only cookies** for security.
- Always **invalidate refresh tokens** on logout.

Would you like any modifications or explanations for a specific part? 🚀