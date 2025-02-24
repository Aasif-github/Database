# AWS Lambda Lifecycle

[Click here - Official Document - Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html)

[concepts-event-driven-architectures](https://docs.aws.amazon.com/lambda/latest/dg/concepts-event-driven-architectures.html)

https://docs.aws.amazon.com/lambda/latest/dg/concepts-faqs.html

https://github.com/awsrun/aws-serverless

https://medium.com/aws-lambda-serverless-developer-guide-with-hands/aws-lambda-execution-environment-and-lifecycle-of-an-invocation-a85783e435e2

https://trackit.io/aws-lambda-lifecycle/


### **AWS Lambda Function Lifecycle 🚀**  

AWS **Lambda** follows a well-defined **lifecycle** from invocation to execution and termination. Understanding this lifecycle helps optimize **performance, cold starts, and resource management**.  

---

## **📌 Lambda Function Lifecycle Stages**  

1️⃣ **Function Creation / Update**  
2️⃣ **Invocation (Cold Start / Warm Start)**  
3️⃣ **Execution & Processing**  
4️⃣ **Scaling & Concurrency**  
5️⃣ **Shutdown & Cleanup**  

---

## **1️⃣ Function Creation / Update**  
When you **create or update** a Lambda function, AWS:  
✅ Stores the function code in **Amazon S3**.  
✅ Prepares the **execution environment** with the specified **runtime** (Node.js, Python, etc.).  
✅ Allocates necessary **permissions** (IAM role, networking, VPC).  

💡 **Tip:** Keep your function size small to improve deployment speed.  

---

## **2️⃣ Invocation (Cold Start vs. Warm Start)**  
Whenever a Lambda function is invoked, AWS decides whether to:  
✅ **Create a new execution environment (Cold Start)** if no instance is available.  
✅ **Reuse an existing execution environment (Warm Start)** for faster execution.  

### **❄️ Cold Start (First Invocation)**
- Happens **when the function is invoked for the first time** or after a long period of inactivity.  
- AWS **downloads the code**, initializes the runtime, and runs the function.  
- Can cause **latency (100ms – 1s)** depending on memory and runtime.  
- Happens in **VPC-configured Lambdas more often** due to networking setup.  

### **🔥 Warm Start (Subsequent Invocations)**
- AWS **reuses the execution environment** for a period (~5–15 mins).  
- Significantly **faster execution** since initialization is skipped.  
- Best for **high-traffic** functions to avoid latency.  

💡 **Optimization:** Use **provisioned concurrency** to reduce cold starts.  

---

## **3️⃣ Execution & Processing**  
Once the function starts execution:  
✅ **Receives input event** (e.g., API Gateway request, S3 event).  
✅ **Processes the logic** (database queries, computations, API calls).  
✅ **Returns a response** (if synchronous) or triggers another service (asynchronous).  
✅ **Logs execution details** to **Amazon CloudWatch**.  

💡 **Optimization:** Use **Lambda layers** for reusing dependencies and reducing package size.  

---

## **4️⃣ Scaling & Concurrency**  
AWS Lambda automatically scales **by launching multiple instances** when there are concurrent requests.  

### **🔹 Concurrency Types**  
1️⃣ **Reserved Concurrency** – Guarantees a fixed number of concurrent executions.  
2️⃣ **Provisioned Concurrency** – Keeps pre-warmed instances ready to avoid cold starts.  
3️⃣ **Unreserved Concurrency** – Uses any available compute capacity dynamically.  

💡 **Optimization:** Use **provisioned concurrency** for low-latency applications.  

---

## **5️⃣ Shutdown & Cleanup**  
After execution, AWS **keeps the environment warm** for a short period (~5–15 mins). If not invoked again, the environment **is terminated** to free resources.  

💡 **Cleanup Tasks in `context.callbackWaitsForEmptyEventLoop = false`**  
✅ Close DB connections  
✅ Clear cache (if needed)  
✅ Release file handles  

---

## **📌 Lambda Lifecycle Diagram**  
```
+----------------------------+
|    Create / Deploy         |
+----------------------------+
           ↓
+----------------------------+
|    Cold Start (First Run)  |
+----------------------------+
           ↓
+----------------------------+
|    Execution & Processing  |
+----------------------------+
           ↓
+----------------------------+
|    Warm Start (Reused Env) |
+----------------------------+
           ↓
+----------------------------+
|    Idle (5-15 min)         |
+----------------------------+
           ↓
+----------------------------+
|    Shutdown & Cleanup      |
+----------------------------+
```

---

## **📌 Real-World Example: Lambda in an Order System**  
🔹 **Event Trigger:** API Gateway receives a new order.  
🔹 **Lambda Execution:** Validates order, processes payment, updates database.  
🔹 **Scaling:** AWS Lambda scales dynamically if traffic increases.  
🔹 **Warm Start:** If more orders come within 5 minutes, the same environment is reused.  
🔹 **Shutdown:** If no activity, AWS shuts down the instance.  

---
