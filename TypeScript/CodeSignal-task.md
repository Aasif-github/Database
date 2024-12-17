## CodeSignal - Uber

Let's work through your **Banking System** assignment in TypeScript step by step. Below, I'll lay out a clear plan with a detailed pseudocode structure, followed by the complete TypeScript implementation.

---

### **Assignment Overview**
You need a **banking system** that manages:
1. **Customers** - with basic information like name, account number, and balance.
2. **Accounts** - performing operations such as:
   - Depositing funds
   - Withdrawing funds
   - Checking balance
3. **Transactions** - keeping a record of each transaction.

---

### **Plan**

1. **Customer Class**
   - Fields: `customerId`, `name`, `account`.
   - Constructor initializes a new customer.

2. **BankAccount Class**
   - Fields: `accountNumber`, `balance`.
   - Constructor initializes with account number and optional balance.
   - Methods:
     - `deposit(amount: number)`: Add to balance.
     - `withdraw(amount: number)`: Subtract from balance.
       - Prevent withdrawal if insufficient funds.
     - `getBalance()`: Return the current balance.

3. **Transaction Class**
   - Fields: `transactionId`, `accountNumber`, `type` (deposit/withdrawal), `amount`, and `date`.
   - Constructor initializes a new transaction.

4. **Bank Class**
   - Manages customers, accounts, and transactions.
   - Methods:
     - `addCustomer(name: string)`: Creates a new customer with a unique account.
     - `performDeposit(accountNumber: string, amount: number)`: Deposits money and records the transaction.
     - `performWithdrawal(accountNumber: string, amount: number)`: Withdraws money and records the transaction.
     - `getAccountBalance(accountNumber: string)`: Returns the balance for an account.
     - `getTransactionHistory(accountNumber: string)`: Returns a list of transactions.

---

### **TypeScript Code**

---

### **Key Features**
1. **Encapsulation**: Classes encapsulate properties and behaviors of customers, accounts, and transactions.
2. **Error Handling**: Ensures valid operations (e.g., prevents withdrawals with insufficient balance).
3. **Transaction History**: All transactions are recorded and retrievable.
4. **Random ID Generation**: Account and transaction IDs are unique.

---

### **Output Example**
When executed, the program will:
1. Create a customer account.
2. Deposit and withdraw money.
3. Print balance and transaction history.

---

**a.** Add unit tests to validate functionality.  
**b.** Implement interest calculation for savings accounts.

I've added interfaces for `IBankAccount`, `ITransaction`, and `ICustomer` to your code. Let me know if you need further refinements or additional interfaces!