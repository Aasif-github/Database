# Object-Oriented Programming

**OOPS** stands for **Object-Oriented Programming System**. It is a programming paradigm that organizes and structures code by modeling real-world entities as objects. OOPS is based on the principles of **objects** and **classes**, which allow for modular, reusable, and scalable code.

---

### Core Concepts of OOPS

#### 1. **Class**
- A blueprint or template for creating objects.
- Defines properties (attributes) and behaviors (methods) that the objects will have.
  
**Example in JavaScript**:
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

#### 2. **Object**
- An instance of a class.
- Represents a real-world entity with specific data and behaviors.

**Example**:
```javascript
const person1 = new Person('Alice', 25);
person1.greet(); // Output: Hello, my name is Alice
```

#### 3. **Encapsulation**
- Bundling of data (attributes) and methods (functions) together within a class.
- Access to the data is controlled using access modifiers (like `public`, `private`, `protected`).

**Example**:
```javascript
class BankAccount {
  constructor(balance) {
    let _balance = balance; // Private variable

    this.getBalance = () => _balance; // Public method
    this.deposit = (amount) => {
      if (amount > 0) _balance += amount;
    };
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // Output: 1500
```

#### 4. **Inheritance**
- Mechanism where one class can derive or inherit the properties and methods of another class.
- Promotes code reuse and establishes relationships between classes.

**Example**:
```javascript
class Animal {
  speak() {
    console.log('Animal makes a sound');
  }
}

class Dog extends Animal {
  speak() {
    console.log('Dog barks');
  }
}

const myDog = new Dog();
myDog.speak(); // Output: Dog barks
```

#### 5. **Polymorphism**
- Ability to use the same method name in different contexts, often achieved via method overriding or method overloading.

**Example**:
```javascript
class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}

const myCircle = new Circle(5);
console.log(myCircle.area()); // Output: 78.53981633974483
```

#### 6. **Abstraction**
- Hiding implementation details and showing only the necessary functionality to the user.
- Achieved through abstract classes or interfaces.

**Example**:
```javascript
class Vehicle {
  startEngine() {
    throw new Error('startEngine() must be implemented');
  }
}

class Car extends Vehicle {
  startEngine() {
    console.log('Engine started');
  }
}

const myCar = new Car();
myCar.startEngine(); // Output: Engine started
```

---

### Benefits of OOPS
1. **Modularity**: Code can be divided into independent modules.
2. **Reusability**: Inheritance allows code reuse.
3. **Scalability**: Easier to scale and maintain large applications.
4. **Abstraction**: Hides complexity from the user.
5. **Encapsulation**: Protects the internal state of objects.

---

### Real-Life Example of OOPS
Imagine a **Vehicle** system:
- **Class:** `Vehicle` (Blueprint for all vehicles)
- **Object:** `Car`, `Bike`, `Truck` (Instances of `Vehicle`)
- **Inheritance:** `Car` and `Bike` inherit common properties like `speed` from `Vehicle`.
- **Polymorphism:** Each type of `Vehicle` can implement a `move()` method differently.

Let me know if you'd like a deeper dive into any of these principles!