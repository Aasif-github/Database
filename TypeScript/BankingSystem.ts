// File: bankingSystem.ts

// Interface for Bank Account
interface IBankAccount {
    deposit(amount: number): void;
    withdraw(amount: number): void;
    getBalance(): number;
  }
  
  // Interface for Transaction
  interface ITransaction {
    transactionId: string;
    accountNumber: string;
    type: 'Deposit' | 'Withdrawal';
    amount: number;
    date: Date;
  }
  
  // Interface for Customer
  interface ICustomer {
    customerId: string;
    name: string;
    account: IBankAccount;
  }
  
  // Class for Bank Account
  class BankAccount implements IBankAccount {
    private balance: number;
    public accountNumber: string;
  
    constructor(accountNumber: string, initialBalance: number = 0) {
      this.accountNumber = accountNumber;
      this.balance = initialBalance;
    }
  
    // Deposit funds into account
    deposit(amount: number): void {
      if (amount <= 0) throw new Error("Deposit amount must be greater than zero.");
      this.balance += amount;
    }
  
    // Withdraw funds from account
    withdraw(amount: number): void {
      if (amount <= 0) throw new Error("Withdrawal amount must be greater than zero.");
      if (this.balance < amount) throw new Error("Insufficient balance.");
      this.balance -= amount;
    }
  
    // Get current balance
    getBalance(): number {
      return this.balance;
    }
  }
  
  // Class for Transaction Records
  class Transaction implements ITransaction {
    public transactionId: string;
    public accountNumber: string;
    public type: 'Deposit' | 'Withdrawal';
    public amount: number;
    public date: Date;
  
    constructor(accountNumber: string, type: 'Deposit' | 'Withdrawal', amount: number) {
      this.transactionId = this.generateTransactionId();
      this.accountNumber = accountNumber;
      this.type = type;
      this.amount = amount;
      this.date = new Date();
    }
  
    // Generate unique transaction ID
    private generateTransactionId(): string {
      return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
  }
  
  // Class for Customers
  class Customer implements ICustomer {
    public customerId: string;
    public name: string;
    public account: IBankAccount;
  
    constructor(customerId: string, name: string, accountNumber: string) {
      this.customerId = customerId;
      this.name = name;
      this.account = new BankAccount(accountNumber);
    }
  }
  
  // Main Bank Class
  class Bank {
    private customers: Map<string, ICustomer> = new Map();
    private transactions: ITransaction[] = [];
  
    // Add a new customer
    addCustomer(name: string): string {
      const customerId = this.generateCustomerId();
      const accountNumber = this.generateAccountNumber();
      const newCustomer = new Customer(customerId, name, accountNumber);
      this.customers.set(accountNumber, newCustomer);
      return accountNumber;
    }
  
    // Deposit money into an account
    performDeposit(accountNumber: string, amount: number): void {
      const customer = this.customers.get(accountNumber);
      if (!customer) throw new Error("Account not found.");
      customer.account.deposit(amount);
      const transaction = new Transaction(accountNumber, 'Deposit', amount);
      this.transactions.push(transaction);
    }
  
    // Withdraw money from an account
    performWithdrawal(accountNumber: string, amount: number): void {
      const customer = this.customers.get(accountNumber);
      if (!customer) throw new Error("Account not found.");
      customer.account.withdraw(amount);
      const transaction = new Transaction(accountNumber, 'Withdrawal', amount);
      this.transactions.push(transaction);
    }
  
    // Get account balance
    getAccountBalance(accountNumber: string): number {
      const customer = this.customers.get(accountNumber);
      if (!customer) throw new Error("Account not found.");
      return customer.account.getBalance();
    }
  
    // Get transaction history for an account
    getTransactionHistory(accountNumber: string): ITransaction[] {
      return this.transactions.filter((t) => t.accountNumber === accountNumber);
    }
  
    // Private utility functions
    private generateCustomerId(): string {
      return 'CUST-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
  
    private generateAccountNumber(): string {
      return 'ACC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
  }
  
  // Example Usage
  const bank = new Bank();
  const accountNumber = bank.addCustomer("John Doe");
  console.log("Account Created. Account Number:", accountNumber);
  
  bank.performDeposit(accountNumber, 1000);
  console.log("Balance after deposit:", bank.getAccountBalance(accountNumber));
  
  bank.performWithdrawal(accountNumber, 500);
  console.log("Balance after withdrawal:", bank.getAccountBalance(accountNumber));
  
  console.log("Transaction History:", bank.getTransactionHistory(accountNumber));
  