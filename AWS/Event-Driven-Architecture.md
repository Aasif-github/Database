### **Definition of Event-Driven Architecture (EDA)**  

**Event-Driven Architecture (EDA)** is a software design pattern where system components communicate by producing and consuming events. Instead of direct calls between services, components react to **events** asynchronously, making the system more **scalable, flexible, and decoupled**.

#### **Key Concepts:**
- **Event**: A significant change or action in the system (e.g., "Order Placed").
- **Event Producer (Publisher)**: Generates and emits events (e.g., an order service emitting an "OrderPlaced" event).
- **Event Broker (Message Queue)**: A middleware that routes events between producers and consumers (e.g., Kafka, RabbitMQ, AWS SQS).
- **Event Consumer (Subscriber)**: Listens for events and takes appropriate action (e.g., a payment service processing payment after an order is placed).

## Example:
A simple example of **Event-Driven Architecture (EDA)** is an **order processing system** for an e-commerce platform.

### **Components in the Event-Driven System:**
1. **Event Emitter (Producer):** Order Service (emits events when an order is placed)
2. **Event Broker (Message Queue):** Kafka, RabbitMQ, or AWS SNS/SQS (handles event delivery)
3. **Event Consumers (Subscribers):** Services that listen for events and act accordingly (e.g., Payment Service, Notification Service)

---

### **Example Flow:**
1. A user places an order → `Order Service` emits an **"OrderPlaced"** event.
2. The event is published to an event broker like **Kafka** or **RabbitMQ**.
3. Multiple consumers subscribe to this event:
   - **Payment Service** listens and processes the payment.
   - **Inventory Service** listens and updates stock.
   - **Notification Service** listens and sends an order confirmation email.

---

### **Implementation in Node.js using EventEmitter (Basic Example)**

```javascript
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

// Order Service (Publisher)
function placeOrder(orderId) {
    console.log(`Order placed: ${orderId}`);
    eventEmitter.emit('OrderPlaced', orderId);
}

// Payment Service (Subscriber)
eventEmitter.on('OrderPlaced', (orderId) => {
    console.log(`Processing payment for order: ${orderId}`);
});

// Inventory Service (Subscriber)
eventEmitter.on('OrderPlaced', (orderId) => {
    console.log(`Updating stock for order: ${orderId}`);
});

// Notification Service (Subscriber)
eventEmitter.on('OrderPlaced', (orderId) => {
    console.log(`Sending confirmation email for order: ${orderId}`);
});

// Simulating an order
placeOrder(101);
```

### **Expected Output:**
```
Order placed: 101
Processing payment for order: 101
Updating stock for order: 101
Sending confirmation email for order: 101
```

---

### **Why Use Event-Driven Architecture?**
✅ **Scalability** – Services are decoupled and can scale independently.  
✅ **Flexibility** – New services can subscribe to events without modifying existing code.  
✅ **Asynchronous Processing** – Improves performance by not blocking operations.  

Would you like an advanced example using **Kafka or RabbitMQ**? 🚀