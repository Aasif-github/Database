# What is API?
An **API (Application Programming Interface)** is a set of rules and tools that allows different software applications to communicate with each other. It acts as a middleman, enabling one application to request data or services from another.

### Key Components of an API:
1. **Requests**: When one app sends a message to another app asking for data or an action.
2. **Responses**: The other app replies with the requested data or confirms the action.
3. **Endpoints**: Specific URLs in an API where requests are sent.
4. **Methods**: Define what kind of operation the request is (e.g., GET, POST, PUT, DELETE).

### Example in Daily Life:
Think of an API as a **waiter at a restaurant**:
- The menu is what the restaurant (system) offers.
- You place an order (request) with the waiter (API).
- The waiter takes your order to the kitchen (another system) and brings back your food (response).

### Real-World Use Cases:
1. **Login with Google/Facebook**: APIs handle authentication and share your login information with apps securely.
2. **Weather Apps**: They use APIs to fetch the latest weather data from weather services.
3. **Online Shopping**: APIs connect websites to payment gateways, allowing you to pay seamlessly.

### Common Types of APIs:
- **REST API**: Uses HTTP requests to interact with web services.
- **GraphQL API**: Allows clients to request specific data, reducing over-fetching or under-fetching.
- **SOAP API**: A more structured and secure API format used in legacy systems.

APIs enable the seamless integration of different systems, making modern apps interconnected and user-friendly.

# What is REST API?

- REST is the most used API architecture for modern web services. They use URIs to find resources (both data and functionalities) and standard HTTP methods to get to them.

- GET, POST, PUT, DELETE correspond to read, create, update, and delete operations. They typically use JSON for data formatting, though XML is also supported.

- A key feature of REST APIs is stateless communication. Each request contains all the information it needs and servers don't have to keep session information between calls.

- This makes REST APIs very flexible and scalable. In addition, it makes caching work better, and the whole creation process more straightforward.

- However, REST is not without limitations. It has limited support for complex queries and operations, which can make it need many requests and get too much or too little data. Also, it does not always handle errors or exceptions consistently as it uses HTTP status codes, which are not always clear or correct.

- Despite these drawbacks, REST remains the most common choice for public APIs and web services that prioritize simplicity and efficiency.
---

A **REST API** (Representational State Transfer Application Programming Interface) is a way for applications to communicate over the internet by following specific rules and conventions. It uses **HTTP** (the same protocol your browser uses) to let different systems exchange data in a predictable and structured way.

---

### **Simple Terms**

1. **What It Does**:  
   - A REST API lets you ask for information or make changes in another system.  
   - Example: If you use a weather app, the app talks to a weather REST API to get the current weather.

2. **How It Works**:  
   - A REST API organizes data into **resources** (like users, products, or posts).
   - You access these resources using URLs (web addresses).  
     Example:  
     - `/users` for a list of users.  
     - `/users/1` for the user with ID 1.

3. **What You Can Do**:  
   REST APIs let you:
   - **GET**: Retrieve information (e.g., "Show me the weather").
   - **POST**: Add new information (e.g., "Create a new user").
   - **PUT**: Update information (e.g., "Change the name of a user").
   - **DELETE**: Remove information (e.g., "Delete a user").

---

### **Technical Terms**

1. **Stateless Communication**:  
   - Every request from the client to the server is independent.  
   - Example: The server doesn’t remember what you asked for before. If needed, the client includes all information in each request.

2. **Resources and Representations**:  
   - A **resource** is a specific piece of data (e.g., a user).  
   - The **representation** is the format of the data (usually **JSON** or **XML**).  
     Example:  
     ```json
     {
         "id": 1,
         "name": "John Doe",
         "email": "johndoe@example.com"
     }
     ```

3. **HTTP Methods**:  
   REST uses HTTP methods to define what action to perform:  
   - **GET**: Retrieve resources.  
   - **POST**: Create new resources.  
   - **PUT**: Update or replace resources.  
   - **PATCH**: Partially update resources.  
   - **DELETE**: Delete resources.

4. **HTTP Status Codes**:  
   The server responds with a status code to indicate success or failure:  
   - **200 OK**: The request succeeded.  
   - **201 Created**: A resource was created.  
   - **400 Bad Request**: The request was invalid.  
   - **401 Unauthorized**: Authentication is required.  
   - **404 Not Found**: The requested resource doesn’t exist.  

5. **URI (Uniform Resource Identifier)**:  
   - Each resource is accessible via a unique URI.  
   - Example:  
     - `/users`: List of users.  
     - `/users/1`: A specific user.

---

### **Example**

#### Scenario: REST API for Managing Books

1. **Base URL**: `https://api.example.com`

2. **Endpoints**:
   - `GET /books`: Get all books.
   - `POST /books`: Add a new book.
   - `GET /books/1`: Get the book with ID 1.
   - `PUT /books/1`: Update the book with ID 1.
   - `DELETE /books/1`: Delete the book with ID 1.

#### Request Example:
To get the details of a book:
```http
GET /books/1 HTTP/1.1
Host: api.example.com
```

#### Response Example:
```json
{
    "id": 1,
    "title": "JavaScript Basics",
    "author": "John Doe",
    "year": 2021
}
```

---

### **Why REST APIs are Popular**

1. **Simplicity**: Follows HTTP conventions, easy to understand.
2. **Language-Agnostic**: Can be used with any programming language.
3. **Scalability**: Stateless design supports distributed systems.

---

In summary, a **REST API** provides a structured way for systems to exchange data over the internet, leveraging HTTP methods and standard conventions for simplicity and efficiency. Would you like to see how to **build a REST API** in JavaScript?


# Why it is called REST?
The term **REST API** stands for **Representational State Transfer Application Programming Interface**, and it is called this because it follows the principles of the **REST architectural style**, which was introduced by Roy Fielding in his doctoral dissertation in 2000. Here's why the name **REST** is significant:

---

### **1. Representational**
- **REST** operates on resources, which are abstractions of data or services.
- The resources themselves are represented in various formats such as **JSON**, **XML**, or **HTML**.
- For example, a "user" resource might be represented as:
  ```json
  {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com"
  }
  ```
- The client doesn't interact directly with the resource but works with its **representation**.

---

### **2. State Transfer**
- The term **state transfer** refers to how REST APIs communicate between clients and servers.
- The **state** of a resource (its data, configuration, etc.) is transferred to the client in a stateless manner.
  - Example: A client requests a user's data (`GET /users/1`), and the server sends the current state of the resource.
- Similarly, when a client updates a resource (e.g., via `PUT` or `POST`), it sends the new state to the server.

---

### **3. REST Principles**

The REST architecture has a set of principles that influence why it’s called **Representational State Transfer**:

#### **A. Statelessness**
- Every request from the client to the server must contain all the information needed to process the request.
- The server does not store any client-specific information between requests (no sessions).

#### **B. Uniform Interface**
- A consistent and standardized way to interact with resources, defined by:
  - **Resource identification**: Resources are identified by URIs (e.g., `/users/1`).
  - **Resource representation**: The server sends a representation of the resource (e.g., JSON, XML).
  - **Standard HTTP methods**: REST uses HTTP verbs like `GET`, `POST`, `PUT`, and `DELETE`.

#### **C. Client-Server Separation**
- The client and server operate independently.
- The client is responsible for the user interface, while the server handles data and business logic.

#### **D. Cacheability**
- Responses should indicate if they are cacheable, allowing clients to reuse prior responses and improve performance.

#### **E. Layered System**
- A client cannot tell if it is connected directly to the end server or through intermediaries (like load balancers or caches).

---

### **Why Use the Term REST API?**
- **"Representational"** refers to the fact that the client interacts with resource representations, not the resources themselves.
- **"State Transfer"** emphasizes that the current state of a resource is transferred between the client and server during each interaction.
- The name **REST API** reflects these fundamental ideas, distinguishing it from other architectural styles like SOAP or RPC.

Would you like examples of how REST differs from other architectures like **SOAP** or further details about its **constraints and benefits**?