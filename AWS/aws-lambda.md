Aws lambda + Serverless framework(v3)

https://www.serverless.com/framework/docs/providers/aws/features/lambda 

How to setup aws lambda + serverless framework
[Click here - Serverless](https://www.serverless.com/framework/docs/getting-started)

Here are some commonly asked **AWS Lambda interview questions**, categorized by **basic, intermediate, and advanced levels**:

---

## **🔹 Basic AWS Lambda Interview Questions**
### 1️⃣ **What is AWS Lambda?**
   - AWS Lambda is a **serverless compute service** that allows running code without managing servers. It automatically scales and executes code in response to events.

### 2️⃣ **How does AWS Lambda work?**
   - AWS Lambda runs your function **only when triggered** by an event (e.g., API Gateway, S3 upload, DynamoDB stream).
   - It **allocates resources, executes the function, and then terminates the resources** once the execution is complete.

### 3️⃣ **What are the key features of AWS Lambda?**
   - Serverless execution (no infrastructure management)
   - Automatic scaling
   - Pay-per-use pricing (based on execution time)
   - Supports multiple event sources (S3, DynamoDB, API Gateway, etc.)
   - Can be written in multiple languages (Node.js, Python, Java, Go, etc.)

### 4️⃣ **What are the supported programming languages in AWS Lambda?**
   - Node.js, Python, Java, C#, Go, Ruby, and custom runtimes.

### 5️⃣ **How do you deploy an AWS Lambda function?**
   - Using AWS Console
   - Using AWS CLI (`aws lambda create-function`)
   - Using AWS SDK
   - Using **AWS CDK** (`cdk deploy`)
   - Using AWS Serverless Application Model (SAM)

---

## **🔹 Intermediate AWS Lambda Interview Questions**
### 6️⃣ **What are Lambda execution models?**
   - **Synchronous Execution** – The client waits for the response (e.g., API Gateway → Lambda).
   - **Asynchronous Execution** – The event is queued and processed later (e.g., S3 Event → Lambda).
   - **Streaming Execution** – Data is processed as a stream (e.g., Kinesis, DynamoDB Streams → Lambda).

### 7️⃣ **What is the AWS Lambda execution timeout?**
   - Default: **3 seconds**
   - Maximum: **15 minutes**
   - If execution exceeds the timeout, AWS terminates the function.

### 8️⃣ **How does AWS Lambda scale?**
   - AWS Lambda **automatically scales** by running multiple instances of the function concurrently.
   - Each new request triggers a new execution environment **(up to 1000 concurrent executions by default, configurable using concurrency limits).**

### 9️⃣ **What is the AWS Lambda cold start problem?**
   - A cold start occurs when AWS needs to **initialize a new execution environment** for a function.
   - Causes a slight delay (a few hundred milliseconds) when executing for the first time.
   - **Solution:** Enable **Provisioned Concurrency** to keep Lambda instances warm.

### 🔟 **What are Lambda function triggers?**
   - AWS Lambda can be triggered by:
     - **API Gateway** (HTTP requests)
     - **S3 Bucket** (file uploads)
     - **DynamoDB Streams** (database changes)
     - **SQS & SNS** (message processing)
     - **CloudWatch Events** (scheduled jobs)

### 1️⃣1️⃣ **What is Lambda@Edge?**
   - AWS Lambda@Edge **runs Lambda functions closer to users** by executing them at AWS CloudFront locations.
   - Used for **custom authentication, request modification, and real-time response generation**.

### 1️⃣2️⃣ **What is AWS Lambda Layers?**
   - Lambda **Layers** allow you to **reuse shared code and dependencies** across multiple Lambda functions.
   - Example: Packaging Node.js libraries like `lodash` or `ffmpeg` into a layer and reusing it in multiple functions.

### 1️⃣3️⃣ **What is the memory range for AWS Lambda?**
   - AWS Lambda allows memory allocation from **128 MB to 10 GB**.
   - More memory = **faster CPU** performance.

---

## **🔹 Advanced AWS Lambda Interview Questions**
### 1️⃣4️⃣ **How do you optimize AWS Lambda performance?**
   - **Minimize cold starts** (Use Provisioned Concurrency)
   - **Reduce package size** (Use AWS Lambda Layers)
   - **Use efficient data processing** (Use Step Functions for long-running tasks)
   - **Keep execution time low** (Avoid heavy computations in Lambda)

### 1️⃣5️⃣ **What is AWS Lambda Provisioned Concurrency?**
   - **Keeps functions "warm"** to reduce cold start latency.
   - Ensures that **a predefined number of instances are always ready**.

### 1️⃣6️⃣ **How does AWS Lambda handle retries?**
   - **Synchronous Invocations** (e.g., API Gateway) – No retries; errors are returned immediately.
   - **Asynchronous Invocations** (e.g., S3, SNS) – Retries **twice** before moving to a Dead Letter Queue (DLQ).
   - **Event Source Mapping (e.g., SQS, DynamoDB)** – Retries until the data expires.

### 1️⃣7️⃣ **How do you handle errors in AWS Lambda?**
   - Use **try-catch** in the code.
   - Use **Dead Letter Queues (DLQ)** to capture failed events.
   - Implement **AWS Step Functions** for fault-tolerant workflows.

### 1️⃣8️⃣ **What are AWS Lambda destinations?**
   - **Success Destination** → Forward successful execution results to **SNS, SQS, or Lambda**.
   - **Failure Destination** → Capture failures and send them to **SNS, SQS, or EventBridge**.

### 1️⃣9️⃣ **How can you secure AWS Lambda?**
   - Use **IAM roles** to limit permissions.
   - Encrypt environment variables using **AWS KMS**.
   - Use **VPC** for private network access.
   - Enable **AWS X-Ray** for monitoring and logging.

### 2️⃣0️⃣ **Can AWS Lambda access resources in a VPC?**
   - Yes, but you need to configure **VPC settings**.
   - Attach the Lambda function to a **private subnet** with **NAT Gateway** for internet access.

---

## **🚀 Bonus: Hands-on Questions**
🔹 **Write a Lambda function to process an S3 file upload and store metadata in DynamoDB.**  
🔹 **Implement an AWS Lambda function to send an SMS using AWS SNS when a user signs up.**  
🔹 **Create a Lambda function using AWS CDK to automatically delete old files from an S3 bucket.**  

---

💡 **Would you like solutions to these hands-on questions or code samples for your projects?** 🚀


---

