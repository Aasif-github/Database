## AWS Lambda can be triggered by API Gateway for CRUD.

Yes! **AWS Lambda** can be triggered by **API Gateway** to handle **CRUD (Create, Read, Update, Delete) operations** in a **serverless REST API**. Here’s how it works:  

---

## **🔹 How AWS Lambda Works with API Gateway for CRUD?**  
1️⃣ **API Gateway receives an HTTP request** (e.g., GET, POST, PUT, DELETE).  
2️⃣ **API Gateway triggers an AWS Lambda function.**  
3️⃣ **Lambda processes the request** (reads/writes data to a database like DynamoDB or MySQL).  
4️⃣ **Lambda returns a response** to API Gateway.  
5️⃣ **API Gateway sends the response back** to the client (e.g., web app, mobile app).  

---

## **🔹 Example: CRUD API using API Gateway & Lambda with DynamoDB**  
### **🟢 1. Create a New Record (POST)**
**Request:**  
```http
POST /users
Content-Type: application/json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```
**Lambda Code (Node.js)**:  
```javascript
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const params = {
        TableName: "Users",
        Item: {
            id: body.id,
            name: body.name,
            email: body.email
        }
    };

    await dynamoDB.put(params).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({ message: "User created successfully!" })
    };
};
```

---

### **🔵 2. Read a User (GET)**
**Request:**  
```http
GET /users/123
```
**Lambda Code:**  
```javascript
exports.handler = async (event) => {
    const userId = event.pathParameters.id;

    const params = {
        TableName: "Users",
        Key: { id: userId }
    };

    const result = await dynamoDB.get(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
};
```

---

### **🟡 3. Update a User (PUT)**
**Request:**  
```http
PUT /users/123
Content-Type: application/json
{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```
**Lambda Code:**  
```javascript
exports.handler = async (event) => {
    const userId = event.pathParameters.id;
    const body = JSON.parse(event.body);

    const params = {
        TableName: "Users",
        Key: { id: userId },
        UpdateExpression: "set name = :n, email = :e",
        ExpressionAttributeValues: {
            ":n": body.name,
            ":e": body.email
        }
    };

    await dynamoDB.update(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "User updated successfully!" })
    };
};
```

---

### **🔴 4. Delete a User (DELETE)**
**Request:**  
```http
DELETE /users/123
```
**Lambda Code:**  
```javascript
exports.handler = async (event) => {
    const userId = event.pathParameters.id;

    const params = {
        TableName: "Users",
        Key: { id: userId }
    };

    await dynamoDB.delete(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "User deleted successfully!" })
    };
};
```

---

## **🔹 Deploying the API using AWS CDK**
If you're using **AWS CDK**, you can define an API Gateway with Lambda like this:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CrudApiStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create Lambda function
        const userLambda = new lambda.Function(this, 'UserLambda', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('lambda')
        });

        // Create API Gateway
        const api = new apigateway.LambdaRestApi(this, 'UserApi', {
            handler: userLambda
        });

        new cdk.CfnOutput(this, 'ApiUrl', { value: api.url });
    }
}
```

---

## **🔹 Why Use API Gateway with Lambda?**
✅ **Serverless API** (No need to manage EC2 instances)  
✅ **Auto-scaling** (Handles any traffic load)  
✅ **Pay-as-you-go pricing** (No idle costs)  
✅ **Secure API** (Can enable IAM, JWT, or API keys)  

---

💡 **Would you like help deploying this API in AWS using CDK, Terraform, or SAM?** 🚀