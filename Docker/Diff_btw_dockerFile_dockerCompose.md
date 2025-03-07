## **Dockerfile vs Docker Compose**

Both **Dockerfile** and **Docker Compose** are used in Docker, but they serve different purposes.  

| Feature            | **Dockerfile** 📝 | **Docker Compose** 📦 |
|-------------------|------------------|----------------------|
| **Purpose**       | Defines how to build a single Docker **image**. | Manages multiple **containers** (services) in one configuration. |
| **Use Case**      | Creating a single app container (e.g., Node.js app). | Running multi-container apps (e.g., Node.js + MongoDB + Redis). |
| **File Type**     | `Dockerfile` | `docker-compose.yml` |
| **Command**       | `docker build` & `docker run` | `docker-compose up` |
| **Example**       | Defines **one container** (like a blueprint). | Runs **multiple services** together. |

---

### **Example of Each**  

🔹 **Dockerfile (For a Node.js App)**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
```

🔹 **docker-compose.yml (To Run Node.js + MongoDB Together)**
```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: mongo
    ports:
      - "27017:27017"
```

### **Key Difference in One Line:**  
- **Dockerfile** → Builds a **single container**.  
- **Docker Compose** → Manages **multiple containers** together.  

---