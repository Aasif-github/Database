## Rate-Limiting vs Throttling

The terms **rate-limiting** and **throttling** are closely related and often used interchangeably, but they have **subtle differences** in how they're applied in APIs or systems.

---

### 🔄 Summary Table:

| Feature          | **Rate-Limiting**                                | **Throttling**                                          |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------- |
| **Definition**   | Limits the number of requests over a time window | Slows down or restricts request speed dynamically       |
| **Goal**         | Prevent abuse/spam by enforcing hard limits      | Prevent overload by smoothing traffic                   |
| **Behavior**     | Rejects requests that exceed the set limit       | May delay requests instead of rejecting immediately     |
| **Example**      | Max 100 requests per minute                      | Gradually allow bursts but reduce speed if too frequent |
| **Common Usage** | API usage control (e.g., 60 calls/min)           | Auto-scaling systems, traffic shaping                   |

---

### ✅ Example Use Cases

* **Rate-Limit**:
  An API allows **60 requests per user per minute**. The 61st request is rejected with a `429 Too Many Requests` error.

* **Throttling**:
  A user sends too many requests quickly. Instead of rejecting, the server **intentionally delays** responses to slow them down, avoiding overload.

---

### 💡 In Laravel

Laravel uses `throttle:` middleware (e.g., `api` middleware group) which applies **rate-limiting** using **throttling techniques** under the hood.

```php
Route::middleware('throttle:60,1')->group(function () {
    Route::post('/api/resource', 'Controller@method');
});
```

This means:

* 60 requests are allowed per **1 minute**.
* After that, you get a `429` response.

---

Would you like to see how to customize rate limits per user role in Laravel?
