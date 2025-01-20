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
### What is a REST API?

**REST API** (Representational State Transfer Application Programming Interface) is a way to allow communication between systems, typically over HTTP, in a stateless, scalable, and resource-oriented manner. REST is a set of architectural principles that define how APIs should be designed and accessed.

---

### Key Principles of REST APIs

1. **Resource-Based**:
   - Resources are entities or objects (e.g., users, products, orders).
   - Each resource is identified by a unique URL (Uniform Resource Locator).
   - Example: 
     - `https://api.example.com/users` (list of users)
     - `https://api.example.com/users/1` (details of user with ID 1)

2. **Stateless**:
   - Each request from a client contains all the information the server needs to fulfill the request.
   - The server does not store client state between requests.

3. **HTTP Methods**:
   - REST APIs leverage HTTP methods to perform actions on resources:
     - **GET**: Retrieve data (e.g., get user details).
     - **POST**: Create a new resource (e.g., add a new user).
     - **PUT**: Update an existing resource (e.g., update user info).
     - **DELETE**: Delete a resource (e.g., remove a user).

4. **Structured Representation**:
   - Resources are represented in a structured format, typically JSON or XML.
   - Example JSON response:
     ```json
     {
       "id": 1,
       "name": "John Doe",
       "email": "john@example.com"
     }
     ```

5. **Stateless Interactions**:
   - Each interaction is independent, requiring the client to send all necessary information (e.g., authentication tokens) with every request.

6. **Uniform Interface**:
   - APIs are designed with a consistent structure, making them easy to understand and use.

---

### Example of REST API Endpoints

Imagine an API for managing a library:

| HTTP Method | Endpoint                   | Action                                |
|-------------|----------------------------|---------------------------------------|
| GET         | `/books`                   | Fetch all books                      |
| GET         | `/books/1`                 | Fetch details of book with ID 1      |
| POST        | `/books`                   | Add a new book                       |
| PUT         | `/books/1`                 | Update details of book with ID 1     |
| DELETE      | `/books/1`                 | Delete the book with ID 1            |

---

### Example of a REST API Workflow

#### **1. Client Request:**
The client sends a `GET` request to fetch details about a specific book:
```http
GET /books/1 HTTP/1.1
Host: api.library.com
Authorization: Bearer <token>
```

#### **2. Server Response:**
The server responds with a JSON object containing the book's details:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
```

---

### REST API Design Best Practices

1. **Use Proper HTTP Methods**:
   - Use methods (GET, POST, PUT, DELETE) according to the intended action.
   
2. **Meaningful URIs**:
   - Endpoints should be descriptive and resource-based (e.g., `/users`, `/orders`).

3. **Use Query Parameters for Filtering**:
   - Example: `/books?author=Fitzgerald&year=1925`

4. **Status Codes for Responses**:
   - Use standard HTTP status codes:
     - `200 OK`: Successful request
     - `201 Created`: Resource created
     - `400 Bad Request`: Invalid input
     - `401 Unauthorized`: Authentication required
     - `404 Not Found`: Resource not found

5. **Pagination for Large Data**:
   - Return results in pages:
     - `/books?page=1&limit=10`

6. **Versioning**:
   - Maintain backward compatibility by versioning APIs:
     - Example: `/v1/books`, `/v2/books`

7. **Error Handling**:
   - Provide meaningful error messages:
     ```json
     {
       "error": "Book not found",
       "code": 404
     }
     ```

---

### Advantages of REST APIs

1. **Scalability**: Stateless design makes REST APIs scalable.
2. **Flexibility**: Works with any programming language and platform.
3. **Cacheable**: Supports HTTP caching mechanisms for better performance.
4. **Readability**: Clean and structured design is easy to understand.

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