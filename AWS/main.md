## What is Microservices and Monolithic Architecture.
- Microservices Architecture
  Microservices Architecture is a software design pattern where an application is developed as a collection of independent, loosely coupled services that focus on a specific business function and communicate with each other via APIs or messaging queues.

- Monolithic Architecture
  A Monolithic Architecture is a software design where an entire application is built as a single, unified unit. All components (UI, business logic, and database) are tightly coupled and run as a single codebase and deployment.


## What is CQRS(Command Query Responsibility Segregation).
- It stand for Command, Query, and Responsibility Segregation.
- It is a software design pattern that separates the Read Query and Write Command operations into different models to improve performance, scalability, and maintainability of the application.
- Due to this segregation, the application becomes high optimized the performance of the application.

[Folder Structure for CQRS - nest-cqrs-example](https://github.com/kamilmysliwiec/nest-cqrs-example/tree/master)

## What is AWS Lambda.
- AWS Lambda is a serverless computing service that runs your code only when needed, without requiring you to manage servers. It automatically scales, executes code in response to events, and you only pay for the execution time used.

## What is life cycle of AWS lambda.
### **Life Cycle of an AWS Lambda Function (Short & Simple)**  

AWS Lambda executes functions in **three main phases**:  

1️⃣ **Initialization Phase (Cold Start)**  
   - AWS **creates a new execution environment**.  
   - Loads function **code, dependencies, and environment variables**.  
   - Runs any **global/static code** outside the handler.  
   - **Takes more time (cold start).**  

2️⃣ **Invocation Phase (Execution)**  
   - AWS invokes the **handler function** in response to an event.  
   - The function **processes the request** and returns a response.  
   - If the environment is warm, execution is **faster (warm start).**  

3️⃣ **Termination Phase (Shutdown/Timeout)**  
   - If no new requests come in, AWS **keeps the environment active** for some time.  
   - If unused, AWS **destroys the environment** to free resources.  

🔹 **Cold Start** = New environment creation (slower).  
🔹 **Warm Start** = Reusing the existing environment (faster).  


## What is cold start of AWS lambda.
### **Cold Start in AWS Lambda (Short & Simple)**  
A **cold start** happens when AWS **creates a new execution environment** to run your Lambda function **after a period of inactivity**. This includes:  
✅ Setting up a new **container**  
✅ Loading **code and dependencies**  
✅ Initializing **global variables**  

💡 **Cold starts cause higher latency** because the function takes longer to execute.  

🔹 **Occurs when:**  
- The function is **invoked for the first time**.  
- The function **hasn’t been used for a while**.  
- AWS **scales up** by creating new instances.  

**Solution:** Keep your Lambda warm using **provisioned concurrency** or scheduled invocations. 

## What are the solutions for cold start in AWS Lambda.

#### **1. Use Provisioned Concurrency** ✅ **(Best for Critical Applications)**
Provisioned Concurrency **keeps Lambda instances warm** so that they are ready to execute immediately.  
- **Reduces cold start latency to near-zero**  
- **Costs extra but ensures fast responses**  

##### **How to Enable Provisioned Concurrency**  
###### **Using AWS Console**  
1. Go to **AWS Lambda > Functions**  
2. Select your function  
3. Click on **Configuration > Concurrency**  
4. Enable **Provisioned Concurrency** and set a value  

#### **Using AWS CDK**  
```typescript
const myFunction = new lambda.Function(this, 'MyFunction', {
  runtime: lambda.Runtime.NODEJS_18_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda'),
  memorySize: 256
});

// Enable Provisioned Concurrency
const alias = new lambda.Alias(this, 'LambdaAlias', {
  aliasName: 'live',
  version: myFunction.currentVersion
});

new lambda.CfnProvisionedConcurrencyConfig(this, 'ProvisionedConcurrency', {
  functionName: myFunction.functionName,
  provisionedConcurrentExecutions: 5,
  qualifier: alias.aliasName
});
```

### **2. Keep Lambda Functions Warm Manually** 🕒 **(Cheaper Alternative)**
- Invoke your Lambda function **every 5-15 minutes** to keep it warm.  
- You can use **Amazon EventBridge (CloudWatch Events) or a simple cron job**.  

#### **Using AWS EventBridge (Preferred)**
1. Go to **AWS EventBridge > Create Rule**  
2. Choose **Schedule Expression** and set `rate(5 minutes)`  
3. Select **Target** as your Lambda function  

#### **Using AWS CDK**
```typescript
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

const rule = new events.Rule(this, 'KeepWarmRule', {
  schedule: events.Schedule.rate(cdk.Duration.minutes(5))
});

rule.addTarget(new targets.LambdaFunction(myFunction));
```

### **3. Increase Memory Allocation**
- **More memory = faster cold starts** (even if you don’t need extra RAM).  
- Try **512MB or 1024MB** instead of **128MB**.  

#### **Using AWS Console**  
Go to **Lambda > Configuration > General Configuration** → Increase **Memory (MB)**  

#### **Using AWS CDK**
```typescript
const myFunction = new lambda.Function(this, 'MyFunction', {
  memorySize: 1024, // Increased memory
  timeout: cdk.Duration.seconds(10)
});
```

## What is serverless framework.
- Serverless Framework is an open-source tool that helps you build, deploy, and manage serverless applications easily on cloud platforms like AWS, Azure, and Google Cloud.  
- It provides a **simple and flexible way** to create and manage serverless applications without the need for complex infrastructure management.
- Simplifies AWS Lambda deployment (No manual setup).

## What is sam cli(serverless application model command line interface).
AWS SAM (Serverless Application Model) CLI is a command-line tool that helps developers build, test, and deploy serverless applications on AWS, especially using AWS Lambda, API Gateway, DynamoDB, and other services.

🔹 Why Use AWS SAM CLI?

✅ Simplifies deployment of serverless apps. 

✅ Local testing before deploying to AWS.

✅ Faster development with live-reloading.

✅ Supports infrastructure as code (IaC) using template.yaml.


## What is API Gateway?
- An API gateway is a server that acts as an entry point for API calls. It receives requests from clients and forwards them to the appropriate services.

## What is AWS API Gateway.
- AWS **API Gateway (HTTP API)** is a fully managed service that allows you to **create, manage, and secure APIs** for your applications. It enables you to expose AWS Lambda functions, backend services, or any HTTP-based endpoint as RESTful APIs with minimal configuration.

## What is EC2(Elastic Compute Cloud)
- AWS EC2 (Elastic Compute Cloud) is a cloud service that provides virtual servers (instances) to run applications. It allows you to scale computing power on demand without managing physical hardware.

🔹 Why Use AWS EC2?

✅ Flexible – Choose OS, CPU, RAM, and storage.

✅ Scalable – Increase or decrease instances as needed.

✅ Cost-Effective – Pay only for What you use.

✅ Secure – Integrated with AWS security features.

💡 Example Use Cases:

- Hosting a website or web app.
- Running databases, backend services, or APIs.
- Deploying machine learning models.

## What is RDS(Relational Database Service)
- AWS RDS (Relational Database Service) is a managed database service that makes it easy to set up, operate, and scale relational databases in the cloud without managing servers.

🔹 Why Use AWS RDS?

✅ Automated backups & maintenance

✅ Highly available & scalable

✅ Supports multiple database engines (MySQL, PostgreSQL, MariaDB, SQL Serve
r, and more)

✅ Secure with encryption & IAM integration

💡 Example Use Cases:

- Hosting a MySQL/PostgreSQL database for a web app.
- Storing user data for an e-commerce platform.
- Managing transactional data for banking applications.

## What is S3(Simple Storage Service)

AWS S3 (Simple Storage Service) - Short & Simple

AWS S3 (Simple Storage Service) is a scalable cloud storage service that lets you store and retrieve any type of data (files, images, videos, backups, etc.) securely.

🔹 Why Use AWS S3?

✅ Unlimited storage – Store as much data as needed.

✅ Highly durable & available – 99.999999999% (11 9’s) durability.

✅ Secure – Supports encryption & access control.

✅ Cost-effective – Pay only for What you use.

💡 Example Use Cases:

- Storing website images, videos, and documents.
- Hosting a static website.
- Keeping backup files and logs.

## What is AWS cloudFront.
AWS **CloudFront** is a **Content Delivery Network (CDN)** that speeds up the delivery of websites, videos, APIs, and other content to users worldwide by caching it at **edge locations** close to them.  

🔹 **Why Use AWS CloudFront?**  
✅ **Faster content delivery** – Reduces latency by caching data near users.  
✅ **Global reach** – Uses AWS **edge locations** worldwide.  
✅ **Secure** – Integrates with **AWS Shield, WAF, and IAM**.  
✅ **Cost-efficient** – Reduces bandwidth costs by caching data.  

💡 **Example Use Cases:**  
- Speeding up **website load times**.  
- Streaming **videos and music** globally.  
- Distributing **API responses** with low latency.  

---

## What is IaC(Infrastructure-as-Code)?
### **Infrastructure as Code (IaC) - Short & Simple**  

**Infrastructure as Code (IaC)** is a method of **automating infrastructure provisioning** using **code** instead of manual processes. It helps manage servers, databases, networks, and cloud resources **consistently and efficiently**.  

🔹 **Why Use IaC?**  
✅ **Automates infrastructure deployment** (No manual setup).  
✅ **Consistent & repeatable** (Avoids human errors).  
✅ **Easily scalable** (Deploy new environments quickly).  
✅ **Version control** (Track and rollback changes like code).  

💡 **Popular IaC Tools:**  
- **AWS CloudFormation** (YAML/JSON)  
- **Terraform** (HCL)  
- **AWS CDK** (TypeScript, Python, Java)  

---

## What is cdk(cloud development kit)
AWS Cloud Development Kit (CDK) is an open-source framework that lets you define and provision cloud infrastructure using programming languages like Python, Java, and TypeScript. instead of writing YAML/JSON.

🔹 Why Use AWS CDK?

✅ Code-based infrastructure – Use real programming languages instead of YAML.

✅ Reusable & Scalable – Write modular, reusable infrastructure components.

✅ Easier Deployment – Generates AWS CloudFormation templates automatically.

✅ Supports multiple AWS services – EC2, S3, Lambda, API Gateway, etc.

---

## What is CloudFormation.
### **AWS CloudFormation (Short & Simple)**  

AWS **CloudFormation** is an **Infrastructure as Code (IaC)** service that lets you define and provision AWS infrastructure **automatically** using **YAML or JSON templates**.  

🔹 **Why Use AWS CloudFormation?**  
✅ **Automates infrastructure deployment** (No manual setup).  
✅ **Manages multiple AWS resources** in a single template.  
✅ **Ensures consistency** across environments (Dev, Staging, Prod).  
✅ **Supports version control** (Rollback changes if needed).  

💡 **Example Use Cases:**  
- Deploying **EC2, S3, RDS, Lambda, API Gateway, and more** automatically.  
- **Scaling applications** with reusable templates.  
- **Disaster recovery** by restoring infrastructure using templates.  

---

## What is Event Driven Architecture.

Event-Driven Architecture (EDA) is a **software design pattern** where system components **communicate asynchronously** by producing and consuming **events**, rather than making direct, synchronous requests. It enables **loose coupling**, real-time processing, and scalable system interactions.

### **Simple Explanation of Event-Driven Architecture (EDA)**  
Event-Driven Architecture is like a **domino effect**—when one thing happens, it **triggers** another automatically.  

Instead of directly calling a function or service (like making a phone call), an event is **announced** (like sending a message in a group chat), and whoever is interested can respond when they are ready.  

💡 **Example: Ordering a Pizza**  
1. You **place an order** online. (**Event happens**: "Order Placed")  (**Event Producer**)  
2. The **restaurant gets notified** and starts preparing. (**Event Consumer**)  
3. The **delivery person gets notified** when the order is ready.  
4. You receive a **notification** when the pizza is on the way.  

Event Broker(Channel): A system that passes the order information from the producer to the consumer. (Like a message queue like Kafka or RabbitMQ, AWS SNS/SQS)
Here, no one is waiting for a direct response—everyone **reacts to the event** when it's their turn. This makes the process **faster and more efficient**.  

## What is PubSub(Publish-Subscribe) Architecture.
### **Pub-Sub Architecture (Short & Simple)**  

**Publish-Subscribe (Pub-Sub) Architecture** is a messaging pattern where **senders (publishers) don’t directly send messages to receivers (subscribers)**. Instead, messages go through an **intermediary (message broker)** that delivers them to interested subscribers.  

🔹 **How It Works?**  
1️⃣ **Publisher** sends an **event/message**.  
2️⃣ **Message Broker (Event Bus)** receives and routes the message.  
3️⃣ **Subscribers** receive the message **if they have subscribed to that topic.**  

🔹 **Why Use Pub-Sub?**  
✅ **Decouples services** – Publishers & subscribers don’t need to know each other.  
✅ **Scalable** – Multiple subscribers can process events independently.  
✅ **Asynchronous processing** – Improves system performance.  

💡 **Example in AWS:**  
- **Amazon SNS (Simple Notification Service)** – Sends messages to multiple subscribers.  
- **Amazon SQS (Simple Queue Service)** – Queues messages for processing.  
- **EventBridge / Kafka** – Event-driven architecture for microservices.  

---

## What is SNS(Simple Notification Service)

AWS **SNS (Simple Notification Service)** is a **fully managed messaging service** that allows applications to send **notifications or messages** to multiple subscribers **at once** using a **Pub-Sub model**.  

🔹 **How AWS SNS Works?**  
1️⃣ **Publishers** send messages to an **SNS topic**.  
2️⃣ **SNS topic** forwards messages to **subscribers** (Email, SMS, Lambda, SQS, etc.).  
3️⃣ **Subscribers** receive messages **instantly** if they are subscribed to the topic.  

🔹 **Why Use AWS SNS?**  
✅ **Instant message delivery** to multiple subscribers.  
✅ **Supports multiple protocols** (SMS, Email, HTTP, Lambda, SQS).  
✅ **Decouples services** – Publishers don’t need to know the subscribers.  
✅ **Scalable & reliable** – Built-in AWS fault tolerance.  

💡 **Example Use Cases:**  
- Sending **email/SMS alerts** for application events.  
- Triggering **Lambda functions** when an event occurs.  
- Broadcasting **system notifications** across microservices.  

## What is SQS(Simple Queue Service)

AWS **SQS (Simple Queue Service)** is a **fully managed message queue** that allows **asynchronous communication** between distributed systems, microservices, and serverless applications.  

🔹 **How AWS SQS Works?**  
1️⃣ **Producers** send messages to an **SQS queue**.  
2️⃣ **Messages are stored** in the queue until processed.  
3️⃣ **Consumers** (workers, Lambda, EC2, etc.) retrieve and process messages.  

🔹 **Why Use AWS SQS?**  
✅ **Decouples microservices** – No direct dependency between sender & receiver.  
✅ **Scalable & reliable** – Handles millions of messages per second.  
✅ **Message retention** – Stores messages for up to **14 days**.  
✅ **Supports two queue types**:  
   - **Standard Queue** – Best effort ordering, unlimited throughput.  
   - **FIFO Queue** – First-In-First-Out ordering, exactly-once processing.  

💡 **Example Use Cases:**  
- Processing **order requests** in e-commerce applications.  
- **Task queues** for background jobs (e.g., video encoding, data processing).  
- **Event-driven architectures** with AWS Lambda.  

## What is Docker.

### **Docker - Short & Simple**  

Docker is a **containerization platform** that allows developers to **package applications and dependencies into lightweight, portable containers** that run consistently across different environments.  

🔹 **Why Use Docker?**  
✅ **Works Everywhere** – Run the same app on any OS (Windows, Mac, Linux).  
✅ **Lightweight & Fast** – Uses fewer resources than virtual machines.  
✅ **Isolated Environment** – No conflicts between different applications.  
✅ **Easy Deployment** – Move code from development to production seamlessly.  

🔹 **Key Concepts:**  
- **Container** – A running instance of an application with everything it needs.  
- **Image** – A blueprint for creating containers.  
- **Dockerfile** – A script defining how to build an image.  
- **Docker Hub** – A registry to store and share images.  

💡 **Basic Example:**  
1️⃣ **Create a `Dockerfile`**  
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY . .
   RUN npm install
   CMD ["node", "server.js"]
   ```
2️⃣ **Build & Run the Container**  
   ```bash
   docker build -t my-app .
   docker run -p 3000:3000 my-app
   ```
