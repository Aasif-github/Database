## **What is HTTP API in AWS Lambda?**  

**HTTP API** is a feature of **Amazon API Gateway** that provides a **faster, cheaper, and simpler** way to expose AWS Lambda functions as RESTful APIs compared to the traditional **REST API** in API Gateway.

---

## **1️⃣ HTTP API vs. REST API in API Gateway**  

| Feature | **HTTP API** | **REST API (Traditional API Gateway)** |
|---------|------------|---------------------------------|
| **Performance** | ⚡ Faster (low latency) | Slower (more overhead) |
| **Cost** | 💰 70% cheaper than REST API | More expensive |
| **Payload Size** | ✅ Supports up to 6MB | ✅ Supports up to 6MB |
| **WebSockets** | ❌ Not Supported | ✅ Supported |
| **IAM, JWT Auth** | ✅ Supports IAM & JWT | ✅ Supports IAM, JWT, Custom Authorizers |
| **Rate Limiting** | ❌ Not supported | ✅ Supported |
| **CORS** | ✅ Built-in | ✅ Configurable |

🔹 **Use HTTP API** when you need **fast, lightweight, and cost-effective APIs**.  
🔹 **Use REST API** if you need **API Keys, request validation, and WebSocket support**.

---

## **2️⃣ How to Create an HTTP API in AWS Lambda**
### ✅ **Step 1: Create a Lambda Function**
Here’s a simple **Lambda function** to handle an API request.

📄 **`lambda.js`**
```js
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from HTTP API!" }),
  };
};
```

---

### ✅ **Step 2: Create an HTTP API Gateway (AWS CDK)**
You can use **AWS CDK** to deploy an HTTP API that connects to the Lambda function.

📄 **`httpApi.ts`**
```ts
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class HttpApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const httpLambda = new lambda.Function(this, 'HttpLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset('src'),
    });

    // Create HTTP API Gateway
    const httpApi = new apigatewayv2.HttpApi(this, 'HttpApi');

    // Add a route to the HTTP API
    httpApi.addRoutes({
      path: '/hello',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new integrations.LambdaProxyIntegration({ handler: httpLambda }),
    });

    // Output API URL
    new cdk.CfnOutput(this, 'HttpApiUrl', {
      value: httpApi.url ?? 'Something went wrong',
    });
  }
}
```

---

### ✅ **Step 3: Deploy API**
Run the following commands:

```sh
cdk bootstrap
cdk synth
cdk deploy
```

After deployment, you will get an API URL like:

```
https://abc123.execute-api.us-east-1.amazonaws.com/hello
```

---

## **3️⃣ When to Use HTTP API?**
✅ **For simple CRUD APIs** (Create, Read, Update, Delete)  
✅ **For microservices** using AWS Lambda  
✅ **For mobile and web applications needing cost-effective APIs**  

Would you like a **Terraform version** of this setup? 🚀