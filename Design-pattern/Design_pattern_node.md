## List all design pattern that is used to build Nodejs application
Node.js applications often utilize a variety of design patterns to ensure maintainability, scalability, and efficiency. Here’s a categorized list of commonly used design patterns in Node.js:

---

### **1. Creational Design Patterns**
These patterns focus on object creation mechanisms, optimizing for a specific situation.

- **Singleton Pattern**  
  Ensures a class has only one instance and provides a global access point to it.  
  Example: Database connections, configuration management.

- **Factory Pattern**  
  Provides a way to create objects without specifying their exact class.  
  Example: Modular creation of request handlers or services.

- **Builder Pattern**  
  Constructs complex objects step-by-step.  
  Example: Building configuration objects for APIs or database queries.

---

### **2. Structural Design Patterns**
These patterns deal with object composition and how relationships are formed between them.

- **Module Pattern**  
  Encapsulates related functions, properties, and objects.  
  Example: Using `require` or ES6 `import/export`.

- **Proxy Pattern**  
  Provides a surrogate or placeholder for another object to control access to it.  
  Example: API request caching, lazy-loading resources.

- **Adapter Pattern**  
  Bridges the gap between incompatible interfaces.  
  Example: Wrapping third-party APIs to match your internal API structure.

- **Decorator Pattern**  
  Dynamically adds responsibilities to an object.  
  Example: Middleware functions in Express.js.

---

### **3. Behavioral Design Patterns**
These patterns focus on communication between objects.

- **Observer Pattern**  
  Allows an object to notify other objects of changes.  
  Example: Event Emitters in Node.js.

- **Command Pattern**  
  Encapsulates requests as objects, allowing for parameterization and queuing.  
  Example: Task runners like `gulp` or `grunt`.

- **Strategy Pattern**  
  Defines a family of algorithms and makes them interchangeable.  
  Example: Authentication strategies in Passport.js.

- **Chain of Responsibility Pattern**  
  Passes requests along a chain of handlers.  
  Example: Express.js middleware chain.

- **Mediator Pattern**  
  Facilitates communication between components.  
  Example: Pub/Sub systems or event-driven architectures.

---

### **4. Concurrency Patterns**
These patterns address asynchronous programming challenges.

- **Callback Pattern**  
  Used for asynchronous operations.  
  Example: Legacy callback-based APIs in Node.js.

- **Promise Pattern**  
  Used for managing async operations in a cleaner way.  
  Example: Native Promises, libraries like `bluebird`.

- **Async/Await Pattern**  
  Built on Promises for sequential asynchronous programming.  
  Example: Writing non-blocking code in a synchronous style.

- **Reactive Pattern**  
  Implements streams and observables for event-driven architectures.  
  Example: RxJS or Node.js Streams.

---

### **5. Architectural Design Patterns**
These patterns help in structuring the overall application.

- **Model-View-Controller (MVC)**  
  Separates concerns into models, views, and controllers.  
  Example: Web frameworks like Express.js + a view engine (e.g., EJS).

- **Model-View-Presenter (MVP)**  
  Focuses on presentation logic with a Presenter acting as an intermediary.  
  Example: Similar to MVC but with Presenter managing views.

- **Model-View-ViewModel (MVVM)**  
  Binds the view model to the view for reactive updates.  
  Example: Used with frontend frameworks, can be adapted for full-stack.

- **Microservices**  
  Divides the application into smaller, independently deployable services.  
  Example: Using Docker, Kubernetes with Node.js.

- **Event-Driven Architecture**  
  Decouples components via events.  
  Example: Using `EventEmitter` or message brokers like RabbitMQ.

- **Serverless Architecture**  
  Breaks down functionality into serverless functions.  
  Example: AWS Lambda with Node.js.

---

### **6. Others (Node.js Specific)**
- **Stream Pattern**  
  Efficiently processes data in chunks instead of loading everything into memory.  
  Example: File I/O, network streams in Node.js.

- **Middleware Pattern**  
  Used to handle request-response cycles in layers.  
  Example: Express.js middleware pipeline.

- **Proxy Design for API Gateways**  
  To aggregate and transform multiple services behind a unified API.  
  Example: Using tools like Apollo Gateway.

---

**a.** Want detailed examples of any specific pattern in a Node.js application?  
**b.** Should I list libraries or frameworks that implement these patterns?