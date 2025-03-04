



### **AWS CDK Example: Deploy API Gateway + Lambda** 🚀  

This guide will show you how to **create an AWS Lambda function and expose it through API Gateway (HTTP API)** using **AWS CDK (TypeScript)**.

---

## **🚀 Step 1: Install AWS CDK**
1️⃣ Install the AWS CDK CLI globally (if not installed):  
```sh
npm install -g aws-cdk
```

2️⃣ Verify installation:  
```sh
cdk --version
```

---

## **🚀 Step 2: Create a New CDK Project**
1️⃣ Create a new directory for your project:  
```sh
mkdir cdk-api-lambda
cd cdk-api-lambda
```

2️⃣ Initialize a new CDK project with TypeScript:  
```sh
cdk init app --language=typescript
```

---

## **🚀 Step 3: Install Dependencies**
```sh
npm install @aws-cdk/aws-lambda @aws-cdk/aws-apigateway
```

---

## **🚀 Step 4: Define Lambda + API Gateway in `lib/cdk-api-lambda-stack.ts`**
Edit `lib/cdk-api-lambda-stack.ts` and add the following:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkApiLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define Lambda function
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_18_X, // Node.js runtime
      handler: 'index.handler', // Lambda entry point
      code: lambda.Code.fromAsset('lambda'), // Lambda source code
    });

    // Create API Gateway (REST API) and integrate with Lambda
    const api = new apigateway.LambdaRestApi(this, 'HelloApi', {
      handler: helloLambda,
      proxy: false
    });

    // Define API route
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET'); // HTTP GET request
  }
}
```

---

## **🚀 Step 5: Create Lambda Code**
1️⃣ Inside the project, create a `lambda/` folder:  
```sh
mkdir lambda
```

2️⃣ Create a new file `lambda/index.js` with this content:
```js
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from AWS Lambda & API Gateway!" }),
    };
};
```

---

## **🚀 Step 6: Deploy to AWS**
1️⃣ **Synthesize the CloudFormation template:**
```sh
cdk synth
```

2️⃣ **Deploy the stack to AWS:**
```sh
cdk deploy
```

✔ After deployment, you will see an **API Gateway URL** in the output.

---

## **🚀 Step 7: Test the API**
After deployment, test it using **cURL** or a browser:
```sh
curl https://<API-GATEWAY-URL>/hello
```
✔ Expected Response:
```json
{
  "message": "Hello from AWS Lambda & API Gateway!"
}
```

---

## **🔥 Bonus: Remove the Stack**
To delete all AWS resources created:
```sh
cdk destroy
```

---

## **✅ Summary**
| Step | Command |
|------|---------|
| Install AWS CDK | `npm install -g aws-cdk` |
| Create a new CDK app | `cdk init app --language=typescript` |
| Install dependencies | `npm install @aws-cdk/aws-lambda @aws-cdk/aws-apigateway` |
| Deploy API + Lambda | `cdk deploy` |
| Test API | `curl <API_URL>/hello` |
| Destroy resources | `cdk destroy` |

---

📌 **Need CI/CD (GitHub Actions, AWS CodePipeline) for this setup?** 🚀