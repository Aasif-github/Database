# If we are using aws lambda with serverless3 framework then how to deploy it.

### **Deploying AWS Lambda with Serverless Framework v3**  

To deploy an **AWS Lambda function** using the **Serverless Framework (v3)**, follow these steps:

---

## **🚀 Step 1: Install Serverless Framework**
1️⃣ **Install Serverless Framework globally (if not installed)**  
```sh
npm install -g serverless
```

2️⃣ **Verify installation**  
```sh
serverless -v
```
✔ You should see a version like `Framework Core: 3.x.x`

---

## **🚀 Step 2: Create a New Serverless Project**
```sh
serverless create --template aws-nodejs --path my-service
cd my-service
npm init -y
```
✔ This creates a basic **AWS Lambda function** setup.

---

## **🚀 Step 3: Configure `serverless.yml`**
Edit the `serverless.yml` file to define the Lambda function:

```yaml
service: my-lambda-service  # Service Name

provider:
  name: aws
  runtime: nodejs18.x  # Lambda runtime
  region: ap-south-1   # AWS Region (Change as needed)
  environment:
    STAGE: ${opt:stage, 'dev'}  # Dynamic stage selection

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get  # Exposes Lambda as an API Gateway endpoint

plugins:
  - serverless-offline  # Optional: Run locally for testing
```

---

## **🚀 Step 4: Create Lambda Function Code**
Edit `handler.js`:
```js
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Serverless!" }),
  };
};
```

---

## **🚀 Step 5: Deploy to AWS**
1️⃣ **Configure AWS credentials (if not done before)**  
```sh
serverless config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY
```

2️⃣ **Deploy the function**  
```sh
serverless deploy --stage dev
```

✔ After deployment, you will see an **API Gateway endpoint URL** in the output.

---

## **🚀 Step 6: Test the Deployed Lambda**
After deployment, test it with **cURL** or Postman:
```sh
curl https://xyz.execute-api.ap-south-1.amazonaws.com/dev/hello
```
✔ Expected response:
```json
{
  "message": "Hello from Serverless!"
}
```

---

## **🔥 Bonus: Deploy a Specific Function**
If you want to deploy only a single function, use:
```sh
serverless deploy function --function hello
```

---

## **🔥 Bonus: Remove Deployment**
To remove the Lambda function and all associated AWS resources:
```sh
serverless remove
```

---

### ✅ **Final Summary**
| Step | Command |
|------|---------|
| Install Serverless Framework | `npm install -g serverless` |
| Create a new service | `serverless create --template aws-nodejs --path my-service` |
| Deploy to AWS | `serverless deploy --stage dev` |
| Test API | `curl <API_URL>` |
| Remove deployment | `serverless remove` |

---

📌 **Need help with CI/CD setup (GitHub Actions, GitLab, AWS CodePipeline)?** 🚀

