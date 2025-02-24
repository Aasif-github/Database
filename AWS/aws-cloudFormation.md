## AWS CloudFormation.

AWS CloudFormation is an **Infrastructure as Code (IaC)** service that allows you to define and provision AWS infrastructure using a **declarative template** written in **JSON or YAML**. It automates the deployment and management of AWS resources like EC2 instances, S3 buckets, Lambda functions, VPCs, and more.

### **Key Features of AWS CloudFormation**
1. **Infrastructure as Code (IaC)** – Define infrastructure using a template.
2. **Automated Deployment** – Deploy and manage AWS resources automatically.
3. **Stack Management** – Group related resources into **stacks** and manage them together.
4. **Version Control & Rollback** – Supports stack updates and rollback in case of failures.
5. **Cross-Region & Cross-Account Deployment** – Deploy infrastructure in multiple AWS accounts and regions.
6. **Drift Detection** – Detects changes made outside CloudFormation.

### **How AWS CloudFormation Works**
1. **Write a CloudFormation Template** – Define AWS resources in YAML/JSON.
2. **Create a Stack** – Use the template to launch a stack in AWS.
3. **CloudFormation Provisions Resources** – AWS automatically provisions the defined resources.
4. **Manage & Update the Stack** – Modify the stack using an updated template.
5. **Delete Stack** – Deletes all associated resources.

### **Example CloudFormation Template (YAML)**
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyS3Bucket:
    Type: "AWS::S3::Bucket"
    Properties:
      BucketName: my-cloudformation-bucket
```
This template creates an S3 bucket named **my-cloudformation-bucket**.

### **Use Cases**
- **Automate Infrastructure Deployment**
- **CI/CD Pipelines**
- **Disaster Recovery & Replication**
- **Multi-Region Deployments**
- **Compliance & Governance**

### **Alternatives to AWS CloudFormation**
- **Terraform** – A multi-cloud IaC tool.
- **AWS CDK (Cloud Development Kit)** – Define infrastructure using TypeScript, Python, Java, etc.

Would you like a **hands-on guide** for setting up CloudFormation stacks with your booking app? 🚀