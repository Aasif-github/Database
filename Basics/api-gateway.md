## What is api-gateway?

An **API Gateway** is a **server that acts as an entry point** for all client requests in a system with multiple services (like microservices). It **manages, routes, secures, and optimizes** API requests between clients and backend services.

---

### **Why Use an API Gateway?**
🔹 **Centralized Entry Point:** Clients send requests to one URL, and the gateway routes them to the correct backend service.  
🔹 **Security & Authentication:** Handles authentication (JWT, OAuth, API keys) and rate limiting.  
🔹 **Load Balancing:** Distributes traffic efficiently among backend services.  
🔹 **Request Transformation:** Converts requests and responses (e.g., JSON to XML).  
🔹 **Caching:** Stores responses to improve performance.  
🔹 **Logging & Monitoring:** Tracks API usage and errors.  

---

### **How Does API Gateway Work?**
1️⃣ **Client Request** → Client sends a request (e.g., `GET /users/123`) to the API Gateway.  
2️⃣ **Authentication & Authorization** → The gateway checks API keys, tokens, or IP restrictions.  
3️⃣ **Routing** → The request is forwarded to the correct microservice.  
4️⃣ **Load Balancing & Transformation** → The gateway may modify the request or split it into multiple service calls.  
5️⃣ **Response Handling** → Aggregates, caches, and sends the response back to the client.  

---

### **Example in AWS API Gateway**
AWS API Gateway is a **fully managed service** that allows you to create, deploy, and manage APIs at scale.

```bash
aws apigateway create-rest-api --name "MyAPI"
```

---

### **Popular API Gateway Tools**
✅ **AWS API Gateway** – Best for serverless applications.  
✅ **NGINX API Gateway** – Lightweight, fast, and customizable.  
✅ **Kong API Gateway** – Open-source, scalable, and supports plugins.  
✅ **Express Gateway** – API Gateway built on Node.js Express.  
✅ **Apigee** (by Google) – Enterprise-level API management.  

---

### **When to Use an API Gateway?**
✔️ Your system has **multiple microservices**.  
✔️ You need **authentication, rate-limiting, or caching**.  
✔️ You want to **simplify API management** for external users.  
✔️ Your system is built using **serverless or cloud functions**.  

### API Gateway built on Node.js Express.

### **Building an API Gateway Using Node.js and Express**  

You can build a simple **API Gateway** in Node.js using **Express.js** to route requests to different microservices.  

---

### **📌 Features of This API Gateway**
✅ Routes requests to different microservices  
✅ Handles authentication (JWT token validation)  
✅ Supports rate limiting using `express-rate-limit`  
✅ Implements request logging using `morgan`  

---

### **1️⃣ Install Required Packages**  
```sh
npm init -y
npm install express http-proxy-middleware cors dotenv express-rate-limit jsonwebtoken morgan
```
- `express` → Web framework  
- `http-proxy-middleware` → Proxy requests to microservices  
- `cors` → Handle cross-origin requests  
- `dotenv` → Load environment variables  
- `express-rate-limit` → Prevent API abuse  
- `jsonwebtoken` → Authenticate API requests  
- `morgan` → Log HTTP requests  

---

### **2️⃣ Create the API Gateway (`server.js`)**
```js
require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Logs API requests

// Rate Limiting (Prevent API abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Middleware to check JWT Authentication
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided." });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized." });
    req.user = decoded;
    next();
  });
};

// Proxy requests to User Microservice
app.use(
  "/api/users",
  verifyToken,
  createProxyMiddleware({
    target: "http://localhost:5001", // User Service URL
    changeOrigin: true,
  })
);

// Proxy requests to Order Microservice
app.use(
  "/api/orders",
  verifyToken,
  createProxyMiddleware({
    target: "http://localhost:5002", // Order Service URL
    changeOrigin: true,
  })
);

// Proxy requests to Product Microservice
app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://localhost:5003", // Product Service URL
    changeOrigin: true,
  })
);

// Root API Gateway Response
app.get("/", (req, res) => {
  res.send("API Gateway is Running 🚀");
});

// Start API Gateway Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
```

---

### **3️⃣ Run the API Gateway**
1. Create a `.env` file to store the **JWT Secret**:
   ```
   PORT=4000
   JWT_SECRET=mysecretkey
   ```
2. Start the API Gateway:
   ```sh
   node server.js
   ```
   API Gateway will run on `http://localhost:4000`.

---

### **4️⃣ How It Works?**
| API Gateway Route   | Target Microservice | URL Forwarded To |
|----------------------|----------------------|------------------|
| `/api/users`        | User Service (5001)  | `http://localhost:5001/api/users` |
| `/api/orders`       | Order Service (5002) | `http://localhost:5002/api/orders` |
| `/api/products`     | Product Service (5003) | `http://localhost:5003/api/products` |

- Requests to `/api/users` and `/api/orders` require a **JWT Token**.  
- `/api/products` is open for public access.  
- The **API Gateway** routes traffic to corresponding services.  

---

### **5️⃣ Example Request Using Postman or cURL**
#### ✅ **Get Users (Authenticated)**
```sh
curl -H "Authorization: Bearer <your_jwt_token>" http://localhost:4000/api/users
```

#### ✅ **Get Products (Public)**
```sh
curl http://localhost:4000/api/products
```

---

### **🚀 Next Steps**
1. **Deploy to AWS EC2, Docker, or Kubernetes**  
2. **Add Service Discovery (e.g., Consul, Eureka)**  
3. **Improve Security (OAuth2, API Keys)**  
4. **Use a Managed API Gateway (AWS API Gateway, Kong, NGINX)**  

Would you like help with **deploying this API Gateway**? 🚀