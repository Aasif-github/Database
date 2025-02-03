Handling network requests using **Promises** in JavaScript allows you to manage asynchronous operations in a clean and structured way. Here's a step-by-step guide:

---

### 1. **Basic GET Request with `fetch`**
The `fetch()` API is promise-based and widely used for network requests.

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse JSON data
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Request failed:', error);
  });
```

- **How it works**:
  1. `fetch` sends a GET request and returns a promise.
  2. The first `.then()` checks if the response is valid (`response.ok`).
  3. `response.json()` parses the response body as JSON (also a promise).
  4. The second `.then()` handles the parsed data.
  5. `.catch()` catches any errors (network issues or thrown errors).

---

### 2. **POST Request with Options**
Send a POST request with headers and a JSON body.

```javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),
})
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

---

### 3. **Error Handling**
`fetch` doesn’t reject promises for HTTP errors (e.g., 404 or 500), so manually check `response.ok`:

```javascript
fetch('https://api.example.com/404')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => console.error('Request failed:', error));
```

---

### 4. **Using `async/await` (Syntactic Sugar for Promises)**
Simplify promise chains with `async/await`:

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```

---

### 5. **Handling Multiple Requests**
Use `Promise.all` to handle multiple requests in parallel:

```javascript
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2'
];

Promise.all(urls.map(url => fetch(url).then(res => res.json())))
  .then(dataArray => {
    console.log('All data:', dataArray);
  })
  .catch(error => {
    console.error('One or more requests failed:', error);
  });
```

---

### Key Takeaways:
- **Promises** avoid callback hell and improve readability.
- **`fetch`** is promise-based and replaces older `XMLHttpRequest`.
- Always check `response.ok` to handle HTTP errors.
- Use `async/await` for cleaner code when working with promises.
- `Promise.all` simplifies handling multiple parallel requests.

For older browsers, include a polyfill for `fetch` (e.g., `whatwg-fetch`).