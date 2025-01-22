## Promise APIs - Use Cases

Here are real-world use cases for the Promise combinators: `Promise.all()`, `Promise.any()`, `Promise.race()`, and `Promise.allSettled()`. These utilities are helpful for managing multiple asynchronous operations efficiently.

---

### 1. **`Promise.all()`**
`Promise.all()` waits for all promises in an array to resolve. If any promise is rejected, it rejects with that reason.

#### Real-World Use Case: Fetching Data from Multiple APIs
```javascript
const fetchUserDetails = fetch('https://api.example.com/user/123');
const fetchUserPosts = fetch('https://api.example.com/user/123/posts');
const fetchUserComments = fetch('https://api.example.com/user/123/comments');

Promise.all([fetchUserDetails, fetchUserPosts, fetchUserComments])
  .then(async ([detailsResponse, postsResponse, commentsResponse]) => {
    const userDetails = await detailsResponse.json();
    const userPosts = await postsResponse.json();
    const userComments = await commentsResponse.json();

    console.log('User Details:', userDetails);
    console.log('User Posts:', userPosts);
    console.log('User Comments:', userComments);
  })
  .catch((err) => {
    console.error('Error fetching user data:', err);
  });
```

**Use Case Summary**: 
Ideal when all tasks need to be completed before proceeding, such as combining API results.

---

### 2. **`Promise.any()`**
`Promise.any()` waits for the **first fulfilled promise** and ignores rejections. If all promises are rejected, it rejects with an `AggregateError`.

#### Real-World Use Case: Loading the Fastest Content Delivery Network (CDN)
```javascript
const loadScriptFromCDN1 = fetch('https://cdn1.example.com/script.js');
const loadScriptFromCDN2 = fetch('https://cdn2.example.com/script.js');
const loadScriptFromCDN3 = fetch('https://cdn3.example.com/script.js');

Promise.any([loadScriptFromCDN1, loadScriptFromCDN2, loadScriptFromCDN3])
  .then((response) => {
    console.log('Script loaded from:', response.url);
  })
  .catch((err) => {
    console.error('All CDNs failed:', err);
  });
```

**Use Case Summary**: 
Useful when you want the first successfully completed operation and can ignore failures (e.g., fetching from the fastest available server).

---

### 3. **`Promise.race()`**
`Promise.race()` resolves or rejects as soon as the first promise in the array settles (fulfills or rejects).

#### Real-World Use Case: Setting a Timeout for an API Request
```javascript
const apiCall = fetch('https://api.example.com/data');

const timeout = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('Request timed out')), 5000);
});

Promise.race([apiCall, timeout])
  .then((response) => {
    console.log('API Response:', response);
  })
  .catch((err) => {
    console.error('Error or timeout:', err);
  });
```

**Use Case Summary**: 
Great for scenarios where you need to enforce a timeout or handle the fastest result.

---

### 4. **`Promise.allSettled()`**
`Promise.allSettled()` waits for all promises to settle (either resolve or reject) and returns their results as an array of objects.

#### Real-World Use Case: Tracking Multiple Task Outcomes
```javascript
const task1 = fetch('https://api.example.com/data1'); // May succeed
const task2 = fetch('https://api.example.com/data2'); // May fail
const task3 = fetch('https://api.example.com/data3'); // May succeed

Promise.allSettled([task1, task2, task3])
  .then((results) => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Task ${index + 1} succeeded with value:`, result.value);
      } else {
        console.error(`Task ${index + 1} failed with reason:`, result.reason);
      }
    });
  });
```

**Use Case Summary**: 
Useful when you want to know the result of all operations, regardless of whether they succeeded or failed (e.g., processing batch uploads).

---

### Comparison of Use Cases
| **Method**       | **When to Use**                                                                 |
|-------------------|--------------------------------------------------------------------------------|
| `Promise.all()`   | When all tasks need to succeed; failure of one means failure of all.           |
| `Promise.any()`   | When the first successful result is sufficient, and failures can be ignored.   |
| `Promise.race()`  | When you care about the first settled promise, whether it resolves or rejects. |
| `Promise.allSettled()` | When you need to know the outcome of all promises, regardless of success or failure. |

Each of these methods caters to a specific scenario, helping to simplify and optimize asynchronous workflows in JavaScript.