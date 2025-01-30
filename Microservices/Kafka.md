# Resources
https://www.youtube.com/watch?v=N9TDwaDfCW0&t=2053s

# Kafka
### **🔹 Kafka Interview Questions & Answers Cheat Sheet 🚀**  

Here’s a **detailed list of Kafka interview questions** with **answers**, covering **beginner, intermediate, and advanced** topics.  

---

## **🔹 Beginner Kafka Interview Questions & Answers**  

### **1. What is Apache Kafka, and why is it used?**  
💡 **Answer:**  
Apache Kafka is a **distributed event streaming platform** used for **real-time data processing, messaging, and log aggregation**. It is designed to handle large volumes of **high-throughput, fault-tolerant, and scalable** data streams.  
📌 **Use Cases:**  
- Event-driven microservices  
- Real-time analytics  
- Log aggregation  
- Messaging queues  

---

### **2. What are Kafka’s key components?**  
💡 **Answer:**  
Kafka consists of:  
1. **Producer** → Sends messages to Kafka topics  
2. **Broker** → A Kafka server that stores messages  
3. **Topic** → A category where messages are published  
4. **Partition** → A subset of a topic for scalability  
5. **Consumer** → Reads messages from a topic  
6. **Consumer Group** → A set of consumers reading from a topic in parallel  
7. **ZooKeeper** → Manages Kafka’s cluster metadata (deprecated in new versions)  [KRaft - kafka RAFT (Kafka's newer version)] 

---

### **3. What is a Kafka Broker?**  
💡 **Answer:**  
A **Kafka Broker** is a server that stores topics and handles incoming/outgoing data. Kafka clusters typically have **multiple brokers** to achieve scalability and redundancy.  

---

### **4. What is a Kafka Partition? Why is it important?**  
💡 **Answer:**  
A **Partition** is a way to split topics for parallelism. Kafka distributes messages across **multiple partitions**, allowing:  
✔ **Scalability** – Multiple consumers can read in parallel.  
✔ **Fault tolerance** – Data is replicated across brokers.  

---

### **5. How does Kafka ensure message durability?**  
💡 **Answer:**  
Kafka ensures message durability through:  
✔ **Replication Factor** – Messages are copied to multiple brokers.  
✔ **Acknowledgments (`acks`)** – Producers confirm message persistence.  
✔ **Log Retention Policies** – Messages are stored for a set duration.  

---

### **6. What is a Kafka Consumer Group?**  
💡 **Answer:**  
A **Consumer Group** is a set of consumers that **work together** to consume messages from a topic.  
✔ **Each partition is consumed by only one consumer within a group.**  
✔ **If a consumer fails, another one in the group takes over.**  

---

### **7. What are Kafka Offsets, and why are they important?**  
💡 **Answer:**  
Offsets represent the **position of a message** in a Kafka partition. Consumers use offsets to track which messages they have read.  
✔ Kafka **stores offsets in internal topics** or **external storage** (e.g., database).  
✔ Consumers can **commit offsets** manually or automatically.  

---

## **🔹 Intermediate Kafka Interview Questions & Answers**  

### **8. How does Kafka ensure message ordering?**  
💡 **Answer:**  
Kafka **preserves order within a partition**. If you need strict ordering:  
✔ Use **a single partition** for a topic.  
✔ Use **the same partition key** to ensure ordering across messages.  

---

### **9. Explain the `acks` parameter in Kafka Producers.**  
💡 **Answer:**  
✔ `acks=0` → Producer does **not wait** for acknowledgment (Fast but risky).  
✔ `acks=1` → Producer waits for the leader broker **only** (Balanced).  
✔ `acks=all` → Producer waits for **all replicas** (Ensures durability but slower).  

---

### **10. What is Kafka ISR (In-Sync Replicas)?**  
💡 **Answer:**  
✔ **ISR (In-Sync Replicas)** – Brokers that **contain up-to-date copies** of a partition.  
✔ If a broker goes down, Kafka elects a new **leader** from the ISR.  

---

### **11. What happens if a Kafka Consumer fails?**  
💡 **Answer:**  
✔ Kafka **reassigns** the partitions to another consumer in the same **consumer group**.  
✔ If all consumers fail, messages stay in Kafka **until a new consumer joins**.  

---

### **12. How does Kafka handle backpressure?**  
💡 **Answer:**  
✔ **Consumer Lag Monitoring** – Checks unprocessed messages.  
✔ **Rate Limiting & Throttling** – Slows producer speed.  
✔ **Batch Processing** – Consumers fetch messages in bulk.  

---

## **🔹 Advanced Kafka Interview Questions & Answers**  

### **13. How does Kafka achieve high throughput?**  
💡 **Answer:**  
✔ **Partitioning** – Distributes data across multiple nodes.  
✔ **Batched Writes** – Groups messages before writing.  
✔ **Compression** – Reduces payload size.  
✔ **Zero-Copy Transfer** – Uses the OS’s memory mapping.  

---

### **14. Explain Kafka's Leader Election mechanism.**  
💡 **Answer:**  
✔ Kafka selects a **leader** for each partition.  
✔ If the leader fails, **a new leader** is elected from the **ISR (In-Sync Replicas)**.  
✔ ZooKeeper (or KRaft in newer versions) coordinates leader elections.  

---

### **15. What is the role of `min.insync.replicas`?**  
💡 **Answer:**  
✔ Defines the **minimum number of replicas** that must acknowledge a message before a producer gets a confirmation.  
✔ Prevents **data loss** by ensuring messages are safely replicated.  

---

### **16. How does Kafka handle exactly-once processing?**  
💡 **Answer:**  
✔ Kafka **transactions** ensure that messages are processed **exactly once**.  
✔ **Idempotent Producers** prevent duplicate writes.  
✔ **Kafka Streams API** supports exactly-once semantics.  

---

### **17. How do you scale Kafka Producers and Consumers?**  
💡 **Answer:**  
✔ **Producers** – Increase the number of producers **writing** to multiple partitions.  
✔ **Consumers** – Increase the number of consumers **in a consumer group** to parallelize reads.  

---

### **18. What are Kafka’s security features?**  
💡 **Answer:**  
✔ **Authentication** – Uses **SSL, SASL** for secure communication.  
✔ **Authorization** – Uses **ACLs** to restrict topic access.  
✔ **Encryption** – Uses **TLS/SSL** for encrypted data transfer.  

---

### **19. What is Kafka Log Compaction?**  
💡 **Answer:**  
✔ **Log Compaction** ensures Kafka retains **the latest value** for each key, removing older records.  
✔ Useful for **event sourcing and stateful applications**.  

---

### **20. What is the difference between Kafka and RabbitMQ?**  
💡 **Answer:**  
| Feature | Kafka | RabbitMQ |
|---------|-------|----------|
| **Use Case** | Streaming & Event Processing | Message Queues |
| **Message Retention** | Stores messages | Deletes after consumption |
| **Message Ordering** | Guaranteed within partitions | No guaranteed order |
| **Scalability** | Horizontally scalable | Limited scalability |

---

### **🔹 Real-World Kafka Scenario Questions**
💡 **21. How would you design a real-time chat system using Kafka?**  
✔ Use **Kafka topics** for each chat room.  
✔ Use **Kafka Streams** to process messages.  
✔ Store messages in **Cassandra/PostgreSQL** for history.  

💡 **22. How do you troubleshoot Kafka Consumer lag?**  
✔ Check `consumer-lag` metrics.  
✔ Increase consumer **parallelism** (more consumers).  
✔ Optimize `fetch.min.bytes` and `max.poll.records`.  

---

### **💡 Pro Tip:**  
✅ **Prepare hands-on examples** with Kafka **Producer, Consumer, and Streams API**.  
✅ **Practice Kafka integration** with **Node.js, Java, or Python**.  
✅ **Know Kafka tuning & troubleshooting strategies**.  

Would you like **code examples** for Kafka Producers, Consumers, or Streams? 🚀 Let me know! 😊
