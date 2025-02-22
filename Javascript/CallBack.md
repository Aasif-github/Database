As we know that, Js is synchronous ie code execute line by line, for long runing task like fetching api, reading file we need something that does not stop our execution of code and did not block our application. 
So, we need to write our code in Asynchronous fashion so that it doen't block our code and run our application smoothly.

This is why we need Callback, Promise, async & await.

# What is callback?

A callback is a function passed as an argument to another function and executed later.

Callbacks are a way to handle asynchronous operations like network requests, file reading, or user interactions in JavaScript.

```js
function doInterview(taskCallback, status){
    
    if(status){
      return taskCallback;
    }
    
    return false;
}

function taskCallback(msg){
  
  return msg;
}

let msg = 'cb is a function that passes as an arg.\nto other function and excute later'
let result = doInterview(taskCallback(msg), true);

!result ? console.log('failed') : console.log(result);
```
```lua
Output:

cb is a function that passes as an arg.
to other function and excute later
```
### Error Handling in Callbacks

Error handling in callbacks often uses the "error-first" pattern. The first argument in the callback is reserved for an error object (if any), followed by the result.

example:
```js
function fetchData(callback) {
  const success = false; // Simulate an error condition
  
  setTimeout(() => {
    if (success) {
      callback(null, { id: 1, name: "Alice" }); // No error
    } else {
      callback("Failed to fetch data!", null); // Pass an error
    }
  }, 2000);
}

fetchData((error, data) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Data:", data);
  }
});

```

# Callback Hell

### Example of Callback Hell Using `setTimeout`

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Task 1");
    setTimeout(() => {
        console.log("Task 2");
        setTimeout(() => {
            console.log("Task 3");
            setTimeout(() => {
                console.log("Task 4");
                console.log("All tasks completed");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);
```

### Explanation:

1. **Nested Callbacks**: Each `setTimeout` is nested inside the previous one, forming a pyramid-like structure.
2. **Difficult to Read and Maintain**: As the number of tasks grows, the nesting increases, making the code harder to manage.

### Output:
```
Start
Task 1 (after 1 second)
Task 2 (after 2 seconds)
Task 3 (after 3 seconds)
Task 4 (after 4 seconds)
All tasks completed
```

### Solution to Avoid Callback Hell:
- Use **Promises** or **async/await** to flatten the structure and improve readability.  

```js
function bookFlight(flightId, callback) {
  checkFlightAvailability(flightId, (err, flightAvailable) => {
    if (err) return callback(`Error checking flight availability: ${err}`);

    reserveSeat(flightId, (err, seat) => {
      if (err) return callback(`Error reserving seat: ${err}`);

      processPayment(flightId, (err, paymentStatus) => {
        if (err) return callback(`Error processing payment: ${err}`);

        sendConfirmation(flightId, (err, confirmation) => {
          if (err) return callback(`Error sending confirmation: ${err}`);

          callback(null, `Flight ${flightId} successfully booked!`);
        });
      });
    });
  });
}

// Simulated asynchronous functions:
function checkFlightAvailability(flightId, callback) { /* ... */ }
function reserveSeat(flightId, callback) { /* ... */ }
function processPayment(flightId, callback) { /* ... */ }
function sendConfirmation(flightId, callback) { /* ... */ }
```


In some cases callback it good approch like for error handling,If we have multiple asychronous function then we should avoid writing callback as it lead to callback hell.
To handle this situation(callback hell) we need Promise, Async & await.


This is example of ***callback hell***, as it involves deeply nested callbacks for a sequence of asynchronous operations (checking flight availability, reserving a seat, processing payment, and sending confirmation). Refactoring this code using ***Promises*** or ***async/await*** will improve its readability and maintainability.


### **Refactoring Using Promises**

Each asynchronous function is rewritten to return a Promise, enabling us to chain the operations cleanly.

```javascript
function checkFlightAvailability(flightId) {
  return new Promise((resolve, reject) => {
    // Simulate async operation
    setTimeout(() => {
      console.log(`Checking availability for flight ${flightId}...`);
      resolve(true); // Simulate success
    }, 1000);
  });
}

function reserveSeat(flightId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reserving seat for flight ${flightId}...`);
      resolve("Seat reserved"); // Simulate success
    }, 1000);
  });
}

function processPayment(flightId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processing payment for flight ${flightId}...`);
      resolve("Payment successful"); // Simulate success
    }, 1000);
  });
}

function sendConfirmation(flightId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Sending confirmation for flight ${flightId}...`);
      resolve("Confirmation sent"); // Simulate success
    }, 1000);
  });
}

// Refactored function
function bookFlight(flightId) {
  checkFlightAvailability(flightId)
    .then(() => reserveSeat(flightId))
    .then(() => processPayment(flightId))
    .then(() => sendConfirmation(flightId))
    .then(() => {
      console.log(`Flight ${flightId} successfully booked!`);
    })
    .catch((error) => {
      console.error(`Booking failed: ${error}`);
    });
}

// Call the function
bookFlight(123);
```

---

### **Refactoring Using Async/Await**

Using `async/await` makes the code more sequential and eliminates the need for explicit chaining.

```javascript
async function bookFlight(flightId) {
  try {
    console.log(`Checking availability for flight ${flightId}...`);
    await checkFlightAvailability(flightId);

    console.log(`Reserving seat for flight ${flightId}...`);
    await reserveSeat(flightId);

    console.log(`Processing payment for flight ${flightId}...`);
    await processPayment(flightId);

    console.log(`Sending confirmation for flight ${flightId}...`);
    await sendConfirmation(flightId);

    console.log(`Flight ${flightId} successfully booked!`);
  } catch (error) {
    console.error(`Booking failed: ${error}`);
  }
}

// Call the function
bookFlight(123);
```

---

### **Key Differences Between Promises and Async/Await**
1. **Readability**: Async/await eliminates chaining and makes the code appear synchronous.
2. **Error Handling**: Both use `.catch()` or `try...catch` for error handling.
3. **Preference**: Async/await is generally preferred for more readable and concise code.

---

### **Simulated Asynchronous Functions**
Here's how the mocked asynchronous functions might look:

```javascript
function checkFlightAvailability(flightId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const flightAvailable = true; // Simulated condition
      flightAvailable ? resolve() : reject("Flight not available");
    }, 1000);
  });
}

function reserveSeat(flightId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const seatReserved = true; // Simulated condition
      seatReserved ? resolve() : reject("No seats available");
    }, 1000);
  });
}

function processPayment(flightId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const paymentSuccess = true; // Simulated condition
      paymentSuccess ? resolve() : reject("Payment failed");
    }, 1000);
  });
}

function sendConfirmation(flightId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const confirmationSent = true; // Simulated condition
      confirmationSent ? resolve() : reject("Confirmation failed");
    }, 1000);
  });
}
```

---

### **Conclusion**

By using Promises or `async/await`, the code becomes:

1. Easier to read and maintain.
2. Scalable for adding more steps.
3. Better at handling errors using a single `catch` block or `try...catch`.

This eliminates the **callback hell** problem effectively.