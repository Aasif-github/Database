# 

### **Deploying an AWS Lambda Function Using AWS SAM (Serverless Application Model)**
AWS SAM (Serverless Application Model) is a framework that simplifies the deployment of **serverless applications**, including **Lambda, API Gateway, and DynamoDB**.

---

## **Step-by-Step Guide to Deploy a Lambda Function with AWS SAM**

### **1️⃣ Install AWS SAM CLI**
Ensure you have AWS SAM CLI installed:  

🔹 **macOS** (using Homebrew):  
```sh
brew install aws-sam-cli
```

🔹 **Windows** (using Chocolatey):  
```sh
choco install aws-sam-cli
```

🔹 **Linux** (Amazon Linux, Ubuntu):  
```sh
curl -L https://raw.githubusercontent.com/aws/aws-sam-cli/main/installers/install.sh | bash
```

Verify installation:  
```sh
sam --version
```

---

### **2️⃣ Initialize a New AWS SAM Project**
Run the following command to create a new SAM project:  
```sh
sam init
```
You'll be prompted with options:  
- **Choose a template** → Select `AWS Quick Start Templates`.  
- **Choose a runtime** → Select `Node.js 18.x`.  
- **Enter project name** → Example: `sam-lambda-project`.  

After initialization, navigate to the project directory:  
```sh
cd sam-lambda-project
```

---

### **3️⃣ Modify the Lambda Function**
Inside the project folder, open `hello-world/app.js` and update the function:

```javascript
exports.lambdaHandler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from AWS Lambda with SAM!" }),
    };
};
```

---

### **4️⃣ Define the SAM Template**
Modify `template.yaml` to define the Lambda function:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: hello-world/
      Handler: app.lambdaHandler
      Runtime: nodejs18.x
      MemorySize: 128
      Timeout: 5
      Policies:
        - AWSLambdaBasicExecutionRole
```

---

### **5️⃣ Build the SAM Project**
Run the following command to package the function:
```sh
sam build
```

---

### **6️⃣ Deploy the Lambda Function**
Deploy using the guided mode:
```sh
sam deploy --guided
```
You'll be prompted to enter deployment details:
- **Stack Name** (e.g., `sam-lambda-stack`)  
- **AWS Region** (e.g., `us-east-1`)  
- **Confirm changes before deployment** → `No`  
- **Allow SAM CLI to create IAM roles** → `Yes`  
- **Save configuration** → `Yes`  

This will deploy your Lambda function to AWS.

---

### **7️⃣ Invoke the Deployed Lambda Function**
Once deployed, you can test it using:
```sh
sam invoke MyLambdaFunction
```

Or, if deployed in AWS:
```sh
aws lambda invoke --function-name MyLambdaFunction output.json
cat output.json
```

---

### **8️⃣ Clean Up (Optional)**
To remove all resources:
```sh
sam delete
```

---

### **Summary**
| Step | Command |
|------|---------|
| **Initialize SAM Project** | `sam init` |
| **Build Project** | `sam build` |
| **Deploy Lambda** | `sam deploy --guided` |
| **Invoke Lambda** | `sam invoke MyLambdaFunction` |
| **Delete Resources** | `sam delete` |

Would you like to extend this example with **API Gateway or DynamoDB integration**? 🚀