
### Scenario 1: Employee Management System
Scenario: You are tasked with designing a system to manage employees in a company. Each employee can be a permanent employee, a contract employee, or an intern. The system should allow creating, updating, and retrieving employee details.

1. Design Question:

- Design a TypeScript class structure to represent the different types of employees. Use inheritance and interfaces to model common and specific behaviors for each type of employee.

2. Implementation Question:

- Implement a method in the base class to calculate the salary. Permanent employees have a fixed salary, contract employees are paid hourly, and interns receive a stipend.

3. Extensibility Question:

- How would you modify your design if the company wants to add a new type of employee, such as freelancers?


Here’s how we can design and implement **Scenario 1: Employee Management System** in TypeScript:

---

### Step 1: Design the Class Structure

We will use **inheritance** for common behaviors and an **interface** for reusable properties or methods across classes.

- A base class `Employee` contains common properties like `id`, `name`, and methods like `calculateSalary()`.
- Subclasses (`PermanentEmployee`, `ContractEmployee`, `Intern`) inherit from the base class and implement specific behaviors.

---

### Step 2: Implementation in TypeScript

Here’s the TypeScript code:

```typescript
// Base Employee Class
abstract class Employee {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    // Abstract method to calculate salary
    abstract calculateSalary(): number;
}

// Subclass for Permanent Employees
class PermanentEmployee extends Employee {
    private fixedSalary: number;

    constructor(id: number, name: string, fixedSalary: number) {
        super(id, name);
        this.fixedSalary = fixedSalary;
    }

    calculateSalary(): number {
        return this.fixedSalary;
    }
}

// Subclass for Contract Employees
class ContractEmployee extends Employee {
    private hourlyRate: number;
    private hoursWorked: number;

    constructor(id: number, name: string, hourlyRate: number, hoursWorked: number) {
        super(id, name);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    calculateSalary(): number {
        return this.hourlyRate * this.hoursWorked;
    }
}

// Subclass for Interns
class Intern extends Employee {
    private stipend: number;

    constructor(id: number, name: string, stipend: number) {
        super(id, name);
        this.stipend = stipend;
    }

    calculateSalary(): number {
        return this.stipend;
    }
}

// Example Usage
const permanentEmployee = new PermanentEmployee(1, "Alice", 50000);
console.log(`${permanentEmployee.name}'s Salary: ₹${permanentEmployee.calculateSalary()}`);

const contractEmployee = new ContractEmployee(2, "Bob", 500, 160); // ₹500 per hour, 160 hours
console.log(`${contractEmployee.name}'s Salary: ₹${contractEmployee.calculateSalary()}`);

const intern = new Intern(3, "Charlie", 10000);
console.log(`${intern.name}'s Salary: ₹${intern.calculateSalary()}`);
```

---

### Step 3: Extensibility for Freelancers

If the company introduces freelancers with a **project-based payment**, we can extend the design as follows:

1. Create a new class `Freelancer` that extends `Employee`.
2. Add specific properties for project-based payment, such as `projectFee`.

```typescript
class Freelancer extends Employee {
    private projectFee: number;

    constructor(id: number, name: string, projectFee: number) {
        super(id, name);
        this.projectFee = projectFee;
    }

    calculateSalary(): number {
        return this.projectFee;
    }
}

// Example for Freelancer
const freelancer = new Freelancer(4, "Dave", 75000); // ₹75,000 for a project
console.log(`${freelancer.name}'s Salary: ₹${freelancer.calculateSalary()}`);
```

---

### Explanation of Design Choices

1. **Abstract Class**: The base `Employee` class enforces that every employee type must implement the `calculateSalary()` method.
2. **Polymorphism**: Different salary calculations are handled by overriding `calculateSalary()` in each subclass.
3. **Encapsulation**: Private properties like `fixedSalary`, `hourlyRate`, etc., are accessible only through their respective classes.
4. **Extensibility**: Adding a new type of employee is straightforward—just create a new subclass and implement `calculateSalary()`.

This design ensures code reusability, maintainability, and scalability. Let me know if you'd like further enhancements or explanations!