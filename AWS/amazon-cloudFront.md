## Build a Serverless Node.js App: CloudFront & S3 Integration Explained
[Click here - CloudFront & S3 Integration Explained](https://www.youtube.com/watch?v=QkMwvRSW0Lo&list=PLaLqLOj2bk9Y0GmLjiXnX402SKYAGQiRr&index=11)

## AWS CloudFront

### **Amazon CloudFront: A Complete Overview**  

Amazon **CloudFront** is a **Content Delivery Network (CDN)** that securely delivers data, videos, applications, and APIs to users with **low latency and high speed**. It **caches content** at AWS edge locations worldwide, reducing load times and server costs.  

---

## **1. Key Features of CloudFront**  

🔹 **Global Edge Locations:**  
- CloudFront has **over 500+ Edge Locations** and **13 Regional Edge Caches** worldwide.  
- Users get data from the **nearest location**, reducing latency.  

🔹 **Automatic Scaling:**  
- Handles **millions of requests per second** without manual scaling.  

🔹 **Security & DDoS Protection:**  
- **AWS Shield & AWS Web Application Firewall (WAF)** protect against attacks.  

🔹 **Supports Dynamic & Static Content:**  
- Works with **websites, APIs, videos, images, and real-time data**.  
- Can **cache** both static (HTML, CSS, JS) and **dynamic** content (APIs, GraphQL, WebSockets).  

🔹 **Custom SSL/TLS Certificates:**  
- Uses **HTTPS** to secure connections.  
- Free SSL certificates via **AWS Certificate Manager (ACM)**.  

🔹 **Deep Integration with AWS Services:**  
- Works with **S3, EC2, Lambda@Edge, API Gateway, and AWS WAF**.  

---

## **2. How CloudFront Works**
CloudFront works as a **caching proxy** between **clients and origin servers**.  

### **Step-by-Step Process:**  
1️⃣ **User Requests Content**  
   - A user visits `https://example.com/image.png`.  

2️⃣ **CloudFront Checks Cache**  
   - If the image **exists in the nearest Edge Location**, CloudFront serves it instantly (**cache hit**).  
   - If not, CloudFront **fetches it from the origin server** (**cache miss**) and stores a copy.  

3️⃣ **CloudFront Delivers Content**  
   - The user gets the image **faster** because it's cached closer to them.  

### **CloudFront Caching Example**  
![CloudFront Architecture](https://d1.awsstatic.com/cloudfront/cloudfront-how-it-works.1234567890abc.jpg)  
*(Illustrative architecture of CloudFront content delivery.)*  

---

## **3. CloudFront Origins & Edge Locations**
CloudFront can **fetch content from multiple origins**, including:  

| **Origin** | **Usage** |
|------------|-----------|
| **Amazon S3** | Store and distribute images, videos, files, and websites |
| **EC2 / Load Balancer** | Serve dynamic web applications and APIs |
| **AWS Lambda@Edge** | Process requests in real-time at edge locations |
| **API Gateway** | Accelerate API responses globally |
| **On-Premises Servers** | Deliver content from your own data center |

---

## **4. Key Use Cases of CloudFront**
### **1️⃣ Accelerate Website Load Times (CDN)**
CloudFront caches **HTML, CSS, JS, and images**, reducing page load time.  

✅ **Example:**  
- A WordPress or React website hosted on **S3 + CloudFront** loads **faster worldwide**.  

---

### **2️⃣ Secure and Scale APIs**
CloudFront helps distribute API requests and **reduces backend load**.  

✅ **Example:**  
- A **Node.js/Express API** behind **CloudFront + API Gateway** delivers data faster.  

---

### **3️⃣ Live & On-Demand Video Streaming**
Supports **HLS, MPEG-DASH, MP4** for low-latency streaming.  

✅ **Example:**  
- **Netflix-like applications** use CloudFront to stream videos efficiently.  

---

### **4️⃣ DDoS Protection & Web Application Firewall (WAF)**
CloudFront integrates with **AWS WAF & AWS Shield** to block attacks.  

✅ **Example:**  
- A banking site uses CloudFront + WAF to prevent SQL injection and XSS attacks.  

---

### **5️⃣ AI/ML Data Distribution**
CloudFront speeds up **real-time AI model predictions** by caching API responses.  

✅ **Example:**  
- A **chatbot AI service** caches frequent user queries for faster responses.  

---

## **5. CloudFront Pricing**
CloudFront pricing is based on:  
- **Data Transfer (GB)**
- **Number of Requests**
- **Edge Location Region (North America is cheaper than Asia & South America)**  

💰 **Free Tier:**  
- **1TB free data transfer** per month for the first **12 months**.  
- **10 million HTTP/HTTPS requests** free per month.  

📌 **Estimate Pricing**: [AWS CloudFront Calculator](https://calculator.aws/)  

---

## **6. AWS CloudFront with AWS CDK**
### **CDK Code to Deploy a CloudFront Distribution with S3**
```typescript
import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class CloudFrontStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 Bucket for Static Files
    const bucket = new s3.Bucket(this, 'MyBucket');

    // Create a CloudFront Distribution
    new cloudfront.Distribution(this, 'MyCloudFrontDist', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }
}
```

---

## **7. CloudFront vs Other CDNs**
| **Feature**           | **AWS CloudFront** | **Cloudflare** | **Akamai** |
|----------------------|-----------------|--------------|------------|
| **Global Coverage**  | ✅ 500+ Locations | ✅ 300+ | ✅ 1300+ |
| **AWS Integration**  | ✅ Seamless | ❌ No | ❌ No |
| **DDoS Protection**  | ✅ AWS Shield | ✅ Built-in | ✅ Built-in |
| **Edge Compute**     | ✅ Lambda@Edge | ✅ Workers | ✅ Edge Compute |
| **Custom Rules**     | ✅ AWS WAF | ✅ Firewall Rules | ✅ Advanced |
| **Free Tier**        | ✅ 1TB Free | ✅ Unlimited Free | ❌ No Free |

---

## **8. Summary**
| **Feature**       | **CloudFront Advantage** |
|------------------|-----------------------|
| **Faster Load Times** | Uses Edge Caching for low latency |
| **Improved Security** | AWS Shield, WAF, and HTTPS |
| **Cost-Effective** | Pay-per-use with a **Free Tier** |
| **Global Reach** | 500+ Edge Locations |
| **Supports Static & Dynamic Content** | Websites, APIs, Video, AI, and more |

---

## **Final Thoughts**
Amazon **CloudFront is the best choice** for AWS users who need a **fast, secure, and scalable CDN**. Whether you're serving a website, an API, or streaming video, CloudFront ensures **low latency and high availability**.  

