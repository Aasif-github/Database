 # Flow of JWT login

Implementation:  [JWT - Login github](https://github.com/Aasif-github/Login-with-jwt/blob/main/FAQ.md)

1. When user Login [username and password] -->> Matched(true) -->> Generate Access Token(15min) & Refresh Token(24hr) -->> Store Refresh Token in DB and set it in Cookies(HTTPOnly)  & send Access Token in Response to frontend.
   
2. This is how frontend get access token from backend and send it in the `Authorization` header of API requests.

```js
function startTokenRefreshCycle() {
    const accessTokenExpiry = 15 * 60000; // 1 minute (in milliseconds)
    const refreshBufferTime = 24* 60 *50000; // Refresh at 50 seconds (10 seconds before expiry)

    setTimeout(async () => {
        try {
            const newAccessToken = await fetchNewAccessToken(); // Call your `refresh-token` route
            updateClientAccessToken(newAccessToken); // Replace the stored token
            startTokenRefreshCycle(); // Restart the cycle
        } catch (error) {
            console.error('Failed to refresh token:', error);
            // Optionally handle re-login logic here if the refresh fails
        }
    }, refreshBufferTime);
}

function fetchNewAccessToken() {
    return fetch('/refresh-token', {
        method: 'POST',
        credentials: 'include' // if using cookies for refresh token
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        return response.json(); // Assuming the new access token is in the response body
    })
    .then(data => data.accessToken);
}

function updateClientAccessToken(newToken) {
    // Update your storage mechanism
    localStorage.setItem('accessToken', newToken);
}

// Start the token refresh cycle when the app is initialized
startTokenRefreshCycle();
```


3. [Middleware - verifyJWT] After login, user want to access some endpoints like `/edit-profile` so, we need to verify user access token. if it is valid then we can access endpoints. if it is not valid then we need to send user to login page.

```js
import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    
    const authHeader = req.headers.authorization || req.headers.Authorization; // access-token
    
    //console.log('jwt-->', req.cookies.jwt);  // refresh-token

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    
    const token = authHeader.split(' ')[1];

    // console.log('token::',token);    
    // console.log('authHeader', JSON.stringify(authHeader))

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden
            req.user = decoded.username;            
            next();
        }
    );
}

export {
    verifyJWT
}
```

#### ------------------ End ----------------------



## If our application contain access token of 1 hr and refresh token of 3 days. in case we exit application before 1 hr without logout. does we need to login again?

No, you don’t need to log in again. Here’s why:  

- **Access Token (1 hour):** If you reopen the app within an hour, the access token is still valid, and you can continue using the application without re-authenticating.  
- **Refresh Token (3 days):** If you reopen the app after more than an hour but within 3 days, the access token will have expired. However, the refresh token is still valid, so the app can use it to obtain a new access token without requiring the user to log in again.  
- **After 3 Days:** If you reopen the app after 3 days, the refresh token will also be expired, and you will need to log in again.  

To ensure a smooth experience, your application should implement a mechanism to **automatically refresh** the access token when it expires, using the refresh token.

---

## What if someone stole `refresh token`. how to handle this situation.

If someone steals the refresh token, they can generate new access tokens and maintain unauthorized access to the system. To mitigate this risk, you should implement the following security measures:  

### **1. Use Secure Storage for Tokens**  
- **On the client side:**  
  - Store the refresh token securely in **HttpOnly cookies** instead of local storage or session storage.  
  - If using mobile apps, store tokens securely using **Secure Enclave (iOS)** or **Keystore (Android)**.  

### **2. Rotate Refresh Tokens**  
- Implement **refresh token rotation**, meaning each time a refresh token is used to get a new access token, issue a **new refresh token** and invalidate the old one. This prevents stolen tokens from being used repeatedly.  

### **3. Set Shorter Expiry for Refresh Tokens**  
- Instead of 3 days, consider a **shorter expiry** like 24 hours and force re-authentication after that period.  

### **4. Implement Refresh Token Blacklisting**  
- Maintain a database of used or revoked refresh tokens.  
- If a user logs out or a refresh token is used twice (indicating potential theft), **invalidate all tokens** for that user.  

### **5. Bind Refresh Token to User’s Device/IP**  
- When issuing a refresh token, associate it with:  
  - **User’s device fingerprint** (device model, OS, browser).  
  - **User’s IP address.**  
- If the refresh request comes from a different device or suspicious location, reject the request and ask for re-authentication.  

### **6. Implement Multi-Factor Authentication (MFA)**  
- If suspicious activity is detected, require **MFA verification** before issuing new refresh tokens.  

### **7. Allow Users to Revoke Tokens**  
- Provide an option in the app for users to **log out of all devices**, invalidating all active refresh tokens.  

### **8. Monitor and Detect Unusual Behavior**  
- Use **logs and monitoring** to detect multiple refresh attempts from different locations/devices.  

By combining these measures, you can **minimize the risk of refresh token theft** and protect your users from unauthorized access.

---

## If user logs out does refresh token also delete or not?

Yes, when a user logs out, the **refresh token should be deleted** to prevent unauthorized reuse. The handling depends on where you store the refresh token:  

### **1. If Stored in HttpOnly Cookies (Recommended)**  
- On logout, the server should **clear the refresh token cookie** by setting:  
  ```js
  res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });
  ```
- This ensures the browser no longer sends the refresh token in future requests.  

### **2. If Stored in the Database (Token Blacklisting)**  
- If you store refresh tokens in a database (e.g., MongoDB, Redis), on logout:  
  - **Delete** the refresh token entry from the database.  
  - If using token rotation, mark the current refresh token as **revoked** to prevent reuse.  

### **3. If Stored in Local Storage or Async Storage (Not Recommended)**  
- Explicitly **remove** the refresh token from local storage on logout. However, this is insecure because malicious scripts can access local storage.  

### **4. Server-Side Session Management**  
- If using session-based authentication, destroy the session on logout, invalidating any associated refresh tokens.  

### **5. Expiring the Refresh Token on Logout**  
- Optionally, when a user logs out, **store the token in a blacklist** with an expiration time equal to its original expiry. This prevents an attacker from using a stolen refresh token even if the user logs out.  

### **Conclusion**  
Yes, logging out should delete the refresh token from the client and the server to prevent further use. If you don’t delete it, the user (or an attacker) could continue generating access tokens even after logging out.

---

## How to Implement Refresh Token Blacklisting. 

### **How to Implement Refresh Token Blacklisting**  

Blacklisting a refresh token means preventing its reuse after logout or when suspicious activity is detected. This is crucial to prevent unauthorized access if a refresh token is stolen.  

---

## **1. Store Refresh Tokens Securely**
Instead of storing refresh tokens on the client side (e.g., local storage), store them **securely in the database** or **a cache system like Redis**.

### **Example Refresh Token Schema (MongoDB)**
```js
const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false }, // Mark token as revoked
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
```

---

## **2. Issue and Store Refresh Tokens on Login**
Each time a user logs in, generate a refresh token and store it in the database.

### **Generating a Refresh Token**
```js
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken"); // Import model

const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: "3d" });

  // Store refresh token in the database
  await RefreshToken.create({
    token,
    userId,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days expiration
  });

  return token;
};
```

---

## **3. Verify and Blacklist a Refresh Token**
When a user requests a new access token using a refresh token, check if it is blacklisted.

### **Middleware to Validate Refresh Token**
```js
const validateRefreshToken = async (token) => {
  const existingToken = await RefreshToken.findOne({ token });

  if (!existingToken || existingToken.revoked) {
    throw new Error("Invalid or blacklisted refresh token");
  }

  return existingToken;
};
```

---

## **4. Revoke (Blacklist) Refresh Token on Logout**
When a user logs out, mark the refresh token as **revoked** instead of deleting it immediately. This prevents reuse.

### **Logout Route (Revoking Token)**
```js
app.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await RefreshToken.findOneAndUpdate({ token: refreshToken }, { revoked: true });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
});
```

---

## **5. Auto-Delete Expired Tokens (Cleanup)**
To prevent the database from filling up, periodically remove expired tokens.

### **Use a Cron Job or Scheduled Task**
```js
const cron = require("node-cron");
const RefreshToken = require("../models/RefreshToken");

cron.schedule("0 0 * * *", async () => { // Runs every midnight
  await RefreshToken.deleteMany({ expiresAt: { $lt: new Date() } });
  console.log("Expired refresh tokens deleted");
});
```

---

## **6. Use Redis for Better Performance (Alternative)**
For faster lookups and auto-expiry, use **Redis** to store refresh tokens.

### **Storing Refresh Token in Redis**
```js
const redisClient = require("./redisClient"); // Setup Redis connection

const storeRefreshToken = async (token, userId) => {
  await redisClient.setex(token, 259200, userId); // Expiry in 3 days (259200 sec)
};
```

### **Revoking Refresh Token in Redis**
```js
const revokeRefreshToken = async (token) => {
  await redisClient.del(token);
};
```

---

## **Conclusion**
🔹 **Best Practice**: Store refresh tokens in a **database or Redis**, not on the client.  
🔹 **Blacklist Tokens**: Mark them as revoked when logging out.  
🔹 **Regular Cleanup**: Remove expired tokens to optimize storage.  
🔹 **Use Redis for Speed**: Store short-lived refresh tokens for faster validation.  

This ensures **better security** and prevents unauthorized reuse of refresh tokens. 🚀

## How to handle if some one stole it before expire.

### **How to Handle Stolen Refresh Tokens Before Expiry**  

If a refresh token is stolen before it expires, an attacker can use it to generate new access tokens and maintain unauthorized access. Here’s how to detect and mitigate such attacks:  

---

## **1. Implement Refresh Token Rotation 🔄**  
### ✅ **What is Refresh Token Rotation?**  
Instead of reusing the same refresh token, issue a **new refresh token** every time a user requests a new access token and **invalidate the old one**.  

### 🔹 **Implementation**  
- When a refresh token is used to get a new access token:  
  1. Generate a new **refresh token**.  
  2. Store the new token in the database (or Redis).  
  3. Mark the old token as **revoked**.  

```js
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    const existingToken = await RefreshToken.findOne({ token: refreshToken });

    if (!existingToken || existingToken.revoked) {
      return res.status(403).json({ message: "Invalid or revoked token" });
    }

    // Verify the token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Issue new tokens
    const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, { expiresIn: "1h" });
    const newRefreshToken = jwt.sign({ userId: decoded.userId }, process.env.REFRESH_SECRET, { expiresIn: "3d" });

    // Revoke old refresh token and store the new one
    existingToken.revoked = true;
    await existingToken.save();

    await RefreshToken.create({ token: newRefreshToken, userId: decoded.userId, expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  } catch (error) {
    res.status(403).json({ message: "Token verification failed" });
  }
};
```
**🛡 Why?** If an attacker tries to use the old refresh token, it will already be revoked.  

---

## **2. Bind Refresh Tokens to User’s Device & IP 🌍**  
- Store the **device info (user-agent, OS, IP address)** when issuing a refresh token.  
- If a refresh request comes from a different device or suspicious location, **reject it** and force a re-login.  

### 🔹 **Implementation**  
```js
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  const userAgent = req.headers["user-agent"];
  const userIp = req.ip;

  const existingToken = await RefreshToken.findOne({ token: refreshToken });

  if (!existingToken || existingToken.revoked || existingToken.device !== userAgent || existingToken.ip !== userIp) {
    return res.status(403).json({ message: "Suspicious activity detected. Please log in again." });
  }

  // Proceed with issuing new tokens...
};
```
**🛡 Why?** If the refresh token is used from a different device/IP, it could indicate theft.  

---

## **3. Use Shorter Expiry & Auto-Reauthentication ⏳**  
- Instead of **3 days**, consider reducing refresh token lifespan to **24 hours**.  
- Require users to re-authenticate with their password or **MFA (Multi-Factor Authentication)** if a refresh token is too old.  

### 🔹 **Implementation**
```js
if (existingToken.expiresAt < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
  return res.status(401).json({ message: "Session expired, please log in again." });
}
```
**🛡 Why?** Limits the window for an attacker to exploit a stolen token.  

---

## **4. Monitor for Unusual Refresh Token Activity 🚨**  
- Track **refresh token usage** (time, location, device).  
- If a token is used **too frequently** or from different locations, trigger a security alert.  

### 🔹 **Implementation**
Use **MongoDB logs, Redis, or a logging system (e.g., ELK Stack, Datadog)** to track refresh token requests.

```js
const logRefreshTokenUsage = async (userId, ip, userAgent) => {
  console.log(`Refresh token used by User ${userId} from IP ${ip} on ${userAgent}`);
};
```
**🛡 Why?** Helps detect stolen tokens based on unusual patterns.  

---

## **5. Allow Users to Revoke All Tokens 🔑**  
Give users an option to **log out of all devices**, invalidating all refresh tokens linked to their account.  

### 🔹 **Implementation**
```js
app.post("/logout-all", async (req, res) => {
  await RefreshToken.updateMany({ userId: req.user.id }, { revoked: true });
  res.json({ message: "Logged out from all devices" });
});
```
**🛡 Why?** If a user suspects token theft, they can immediately revoke all active sessions.  

---

## **6. Use Secure Storage for Refresh Tokens 🔒**  
### ✅ **Best Practices for Token Storage:**  
- **For Web Apps:** Store refresh tokens in **HttpOnly, Secure cookies** instead of local storage.  
- **For Mobile Apps:** Use **Secure Enclave (iOS)** or **Android Keystore**.  

### 🔹 **Setting HttpOnly Cookies for Refresh Token**
```js
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
});
```
**🛡 Why?** Prevents **XSS (Cross-Site Scripting)** attacks from stealing tokens.  

---

## **Conclusion: How to Prevent Stolen Refresh Token Attacks?**
| 🛡 Security Measure | ✅ Solution |
|----------------|--------------------|
| **Refresh Token Rotation** | Issue a new refresh token every time, revoke the old one |
| **Bind Token to Device/IP** | Check if refresh request comes from the same device/IP |
| **Shorter Expiry & MFA** | Reduce lifespan to 24h, require Multi-Factor Authentication (MFA) |
| **Monitor Activity** | Detect multiple refresh requests from different locations |
| **Allow User to Revoke** | Provide a **logout from all devices** option |
| **Use HttpOnly Secure Cookies** | Prevents XSS attacks from stealing tokens |

By implementing these measures, you **reduce the risk of stolen refresh tokens being used for unauthorized access.** 🚀

---

## If we delete refresh token on logout then why we need to implement refresh token blacklisting.

### **If We Delete Refresh Token on Logout, Why Do We Need Blacklisting?**  

Even if we delete the refresh token on **logout**, **blacklisting is still necessary** in certain cases where the token might be stolen or misused. Here’s why:

---

### **1️⃣ Logout Only Works When the User Logs Out Normally**  
When a user logs out, we delete their refresh token from storage (database, Redis, or cookie). However, if an attacker has already stolen the refresh token before the user logs out, the attacker can continue using it **until it expires**.  

✅ **Blacklisting ensures that even if a stolen refresh token is used, it gets rejected immediately.**

---

### **2️⃣ Handling Compromised or Leaked Refresh Tokens**  
If a refresh token is stolen **before logout** (e.g., via malware, network attack, or XSS), the attacker can use it to generate new access tokens. Since the refresh token is valid for **3 days** (or more), the attacker remains logged in even after the real user logs out.

✅ **With blacklisting, we can manually revoke or flag suspicious tokens, preventing their use.**

---

### **3️⃣ Preventing Reuse of Old Refresh Tokens (Token Rotation)**  
When a user gets a new refresh token, the old one should **immediately become invalid**.  
Without blacklisting, an attacker with a stolen old refresh token could still generate new access tokens.

✅ **With refresh token rotation, we revoke old refresh tokens and store them in a blacklist.**  

---

### **4️⃣ Logout from All Devices (Global Logout)**  
If a user logs out from one device, they expect to be logged out from **all** devices. But if refresh tokens are still valid on other devices, they will remain logged in.

✅ **With blacklisting, we can revoke all active refresh tokens for a user, ensuring a complete logout.**

---

### **5️⃣ Detecting Suspicious Activity**  
If a refresh token is used from an **unusual location, device, or IP**, it may indicate an attack.  
Instead of waiting for the token to expire, we can **immediately revoke and blacklist it**.

✅ **With token blacklisting, we can monitor and block refresh tokens being used suspiciously.**

---

## **🔹 When to Use Blacklisting?**
| Scenario | Does Logout Handle It? | Does Blacklisting Help? |
|----------------|------------------|-----------------|
| Normal Logout | ✅ Yes | ❌ No need |
| Stolen Refresh Token | ❌ No | ✅ Yes |
| Refresh Token Rotation | ❌ No | ✅ Yes |
| Logging Out from All Devices | ❌ No | ✅ Yes |
| Unusual Login Attempts | ❌ No | ✅ Yes |

---

## **🔹 Best Approach: Combine Logout + Blacklisting**
1. **On logout:** Delete the refresh token from the database.  
2. **On token rotation:** Store the old token in a blacklist to prevent reuse.  
3. **On suspicious activity:** Force logout and blacklist the refresh token.  

### **Example: Blacklisting a Stolen Refresh Token**
```js
app.post("/revoke-token", async (req, res) => {
  const { refreshToken } = req.body;

  // Find the refresh token
  const token = await RefreshToken.findOne({ token: refreshToken });

  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }

  // Blacklist it by marking as revoked
  token.revoked = true;
  await token.save();

  res.json({ message: "Refresh token revoked successfully" });
});
```

---

## **🔹 Conclusion**
Even though we **delete refresh tokens on logout**, we still need **blacklisting** for cases where:  
- The token was **stolen** before logout.  
- An **old refresh token** is reused after rotation.  
- A **user logs out from all devices** at once.  
- Suspicious activity is detected.  

### **🚀 Best Practice:**  
✅ **Use both token deletion on logout + blacklisting for security!** 🔒

## What if user not logout just exit application then does it revoke refresh token.

 ### **What Happens If a User Exits the App Without Logging Out?**  

If a user **closes the app** without logging out, the **refresh token remains valid** until it expires or is explicitly revoked.  

---

## **🛑 Why Doesn't the Refresh Token Revoke Automatically?**  
1. **Logout is a User Action:** Revoking a refresh token typically happens only when the user **logs out manually**.  
2. **Token Storage:** The refresh token is usually stored in:
   - **Mobile Apps:** Secure storage (Keychain for iOS, Keystore for Android).  
   - **Web Apps:** HttpOnly Secure Cookies or Local Storage.  
3. **No API Call on App Exit:** Simply closing the app doesn’t trigger an API request to delete the refresh token from the backend.  

✅ **Result:** When the user reopens the app, they can use the refresh token to get a new access token without needing to log in again.

---

## **🛡 How to Handle App Exit Without Logout?**  

### **1️⃣ Set a Shorter Refresh Token Expiry**
- Reduce the refresh token validity (e.g., from **3 days to 24 hours**) to limit risks.  
- If the app is closed for too long, users must **log in again**.  

#### **Example: Generating a Refresh Token with 24h Expiry**
```js
const refreshToken = jwt.sign(
  { userId: user._id },
  process.env.REFRESH_SECRET,
  { expiresIn: "24h" } // Shorter expiry
);
```
✅ **Effect:** If the user exits and reopens after 24 hours, they need to log in again.  

---

### **2️⃣ Implement Token Rotation 🔄**
- Issue a **new refresh token** every time the old one is used.  
- **Revoke the old token** in the database.  

#### **Example: Refresh Token Rotation**
```js
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  const existingToken = await RefreshToken.findOne({ token: refreshToken });

  if (!existingToken || existingToken.revoked) {
    return res.status(403).json({ message: "Invalid or revoked token" });
  }

  // Generate new tokens
  const newAccessToken = jwt.sign({ userId: existingToken.userId }, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  const newRefreshToken = jwt.sign({ userId: existingToken.userId }, process.env.REFRESH_SECRET, { expiresIn: "3d" });

  // Revoke old refresh token
  existingToken.revoked = true;
  await existingToken.save();

  // Store new refresh token
  await RefreshToken.create({ token: newRefreshToken, userId: existingToken.userId });

  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};
```
✅ **Effect:** Even if an attacker steals the old refresh token, it **won’t work** because it’s revoked.  

---

### **3️⃣ Bind Refresh Token to Device & IP**
- Store device details & IP when issuing a refresh token.  
- If a refresh request comes from a different device, **force re-login**.  

#### **Example: Check Device & IP Before Refreshing**
```js
if (existingToken.device !== req.headers["user-agent"] || existingToken.ip !== req.ip) {
  return res.status(403).json({ message: "Suspicious activity detected. Please log in again." });
}
```
✅ **Effect:** Prevents attackers from using stolen tokens on different devices.  

---

### **4️⃣ Logout Stale Sessions**
- Track **last activity time** and revoke refresh tokens **if inactive for too long**.  
- Implement a **cron job** to delete expired refresh tokens.  

#### **Example: Cron Job to Remove Inactive Tokens**
```js
const deleteInactiveTokens = async () => {
  await RefreshToken.deleteMany({ updatedAt: { $lt: new Date(Date.now() - 48 * 60 * 60 * 1000) } });
};
setInterval(deleteInactiveTokens, 24 * 60 * 60 * 1000); // Runs every 24 hours
```
✅ **Effect:** Ensures inactive users must log in again.  

---

## **💡 Final Answer:**
❌ **No, the refresh token is NOT revoked when a user exits the app.**  
✅ **Solutions:**
1. **Use shorter refresh token expiry (24h instead of 3 days).**  
2. **Rotate refresh tokens and revoke old ones.**  
3. **Bind refresh tokens to the user’s device/IP.**  
4. **Log out stale sessions after inactivity.**  

🚀 **Best Practice:** If security is a priority, use **refresh token rotation + device binding** to prevent token theft!
---

## How frontend handle access token.

### **How Does the Frontend Handle Access Tokens?**  
The frontend is responsible for managing access tokens securely to authenticate API requests without exposing sensitive data. Here’s how it typically works:

---

## **🔹 1. Storing the Access Token Securely**  
Since the access token is short-lived (e.g., 1 hour), it needs to be stored securely while in use.

### **✅ Best Practice: Store Access Tokens in Memory (Not Local Storage or Cookies)**
- **Reason:** Storing tokens in `localStorage` or `sessionStorage` exposes them to **XSS (Cross-Site Scripting) attacks**.
- **Solution:** Store tokens in JavaScript memory (`useState` in React, Vue state, or Redux store).

```js
let accessToken = null; // Store access token in memory

const setAccessToken = (token) => {
  accessToken = token;
};

const getAccessToken = () => accessToken;
```

---

## **🔹 2. Attaching Access Token to API Requests**
The frontend needs to send the access token in every authenticated request. This is done using the `Authorization` header.

### **Example: Axios Interceptor (React/Vue/Angular)**
```js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://api.example.com",
});

// Add interceptor to attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // Get token from memory
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```
✅ **Effect:** Every API call automatically includes the access token in the `Authorization` header.

---

## **🔹 3. Handling Token Expiry and Refreshing**
When the access token expires, the frontend should **request a new one** using the refresh token.

### **📌 Two Common Approaches**
1. **Silent Refresh (Using an Axios Response Interceptor)**  
   - If an API call fails with `401 Unauthorized`, the frontend should automatically try to refresh the token.
2. **Manual Refresh (Frontend Redirect to Login)**  
   - If refresh fails (token expired/revoked), redirect the user to the login page.

### **🔄 Implementing Auto Refresh with Axios**
```js
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post("/auth/refresh", {
          refreshToken: getRefreshToken(), // Get stored refresh token
        });

        const newAccessToken = refreshResponse.data.accessToken;
        setAccessToken(newAccessToken); // Store new token in memory

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid
        logoutUser();
      }
    }

    return Promise.reject(error);
  }
);
```
✅ **Effect:**  
- If an API call fails due to an expired access token, it tries to **refresh the token automatically**.
- If refresh fails (token expired/revoked), the user is **logged out**.

---

## **🔹 4. Storing Refresh Tokens Securely**
Unlike access tokens, **refresh tokens should never be stored in JavaScript memory, localStorage, or sessionStorage** due to security risks.  
### **✅ Best Practice: Store Refresh Tokens in HttpOnly Secure Cookies**
- **HttpOnly:** JavaScript cannot access it (prevents XSS attacks).
- **Secure & SameSite:** Only sent over HTTPS and prevents CSRF.

### **Backend Sets HttpOnly Secure Cookie**
```js
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  path: "/auth/refresh",
});
```
✅ **Effect:**  
- The frontend **never sees** the refresh token.  
- It is automatically sent when making a request to `/auth/refresh`.  

---

## **🔹 5. Logging Out (Clearing Tokens)**
When logging out, the frontend should:  
1. **Remove the access token from memory.**  
2. **Call the logout API to invalidate the refresh token.**  
3. **Redirect the user to the login page.**  

### **Logout Function (React Example)**
```js
const logoutUser = async () => {
  try {
    await axios.post("/auth/logout"); // Backend revokes refresh token
    setAccessToken(null); // Clear access token from memory
    window.location.href = "/login"; // Redirect to login
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
```
✅ **Effect:**  
- Ensures the user **fully logs out** from the app.  

---

## **🔹 Summary of Best Practices**
| **Step** | **Best Practice** |
|----------|------------------|
| **1. Storing Access Token** | Keep in **memory** (not localStorage or cookies) |
| **2. Sending Access Token** | Attach it in **Authorization header** using Axios interceptor |
| **3. Handling Expiry** | Use **Axios response interceptor** to refresh token |
| **4. Refresh Token Storage** | Store **only in HttpOnly Secure Cookie** |
| **5. Logout** | Clear access token + invalidate refresh token |

### **🚀 Final Answer:**
✅ **The frontend stores access tokens in memory, attaches them to API requests, refreshes them when expired, and securely stores refresh tokens in HttpOnly cookies.**


