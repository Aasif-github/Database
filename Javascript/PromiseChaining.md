# Promise Chaining

Here’s a practical example of **Promise chaining** in Node.js to demonstrate how tasks are executed in a sequence where each step depends on the previous one. We'll simulate a scenario where a user performs the following operations:

1. Fetch user details from a database.
2. Retrieve the user's orders based on their ID.
3. Calculate the total amount of the orders.
4. Send an email confirmation with the calculated total.

---

### Code Example: Promise Chaining in Action
```javascript
// Simulated database of users and orders
const usersDB = [{ id: 1, name: 'Alice' }];
const ordersDB = [
  { userId: 1, amount: 250 },
  { userId: 1, amount: 450 },
];

// Simulated functions to handle the operations
const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    const user = usersDB.find((user) => user.id === userId);
    user ? resolve(user) : reject(new Error('User not found'));
  });
};

const getOrdersByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const orders = ordersDB.filter((order) => order.userId === userId);
    orders.length ? resolve(orders) : reject(new Error('No orders found for this user'));
  });
};

const calculateTotalAmount = (orders) => {
  return new Promise((resolve) => {
    const total = orders.reduce((sum, order) => sum + order.amount, 0);
    resolve(total);
  });
};

const sendEmailConfirmation = (user, totalAmount) => {
  return new Promise((resolve) => {
    console.log(`Email sent to ${user.name}: Your total is $${totalAmount}`);
    resolve('Email sent successfully');
  });
};

// Using promise chaining to perform all operations
const userId = 1; // Example user ID

getUser(userId)
  .then((user) => {
    console.log('User details fetched:', user);
    return getOrdersByUserId(user.id);
  })
  .then((orders) => {
    console.log('Orders retrieved:', orders);
    return calculateTotalAmount(orders);
  })
  .then((totalAmount) => {
    console.log('Total amount calculated:', totalAmount);
    return getUser(userId).then((user) => sendEmailConfirmation(user, totalAmount));
  })
  .then((message) => {
    console.log(message); // Success message
  })
  .catch((error) => {
    console.error('Error:', error.message); // Handle errors in any step
  });
```

---

### Explanation
1. **getUser(userId)**:
   - Fetches user details based on the provided user ID.
   - Resolves with user details or rejects if the user is not found.

2. **getOrdersByUserId(userId)**:
   - Fetches orders associated with the user.
   - Resolves with an array of orders or rejects if no orders are found.

3. **calculateTotalAmount(orders)**:
   - Calculates the total amount from the user's orders.
   - Resolves with the total amount.

4. **sendEmailConfirmation(user, totalAmount)**:
   - Simulates sending an email confirmation to the user.
   - Logs a success message and resolves.

---

### Output
```plaintext
User details fetched: { id: 1, name: 'Alice' }
Orders retrieved: [ { userId: 1, amount: 250 }, { userId: 1, amount: 450 } ]
Total amount calculated: 700
Email sent to Alice: Your total is $700
Email sent successfully
```

This example showcases clean and sequential execution using Promise chaining. It's easy to follow, maintain, and extend, such as adding logging or additional tasks.