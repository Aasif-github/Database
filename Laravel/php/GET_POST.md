In PHP (and web development in general), **GET** and **POST** are two of the most commonly used **HTTP request methods**. They are used to send data between the client (usually a browser) and the server.

---

## ✅ Key Differences Between `GET` and `POST`

| Feature           | `GET`                              | `POST`                                  |
| ----------------- | ---------------------------------- | --------------------------------------- |
| Data visibility   | Appended in the URL (visible)      | Sent in the request body (hidden)       |
| Max data length   | Limited (\~2048 characters in URL) | Virtually unlimited (depends on server) |
| Use case          | Retrieve data                      | Submit or send data (e.g., forms)       |
| Security          | Less secure (data in URL)          | More secure (data not visible in URL)   |
| Bookmarkable      | ✅ Yes                              | ❌ No                                    |
| Browser cacheable | ✅ Yes                              | ❌ No                                    |

---

## ✅ Example: `GET` Request

### 🔹 HTML:

```html
<form method="GET" action="search.php">
  <input type="text" name="query">
  <button type="submit">Search</button>
</form>
```

### 🔹 Resulting URL:

```
search.php?query=books
```

### 🔹 PHP (search.php):

```php
echo $_GET['query'];  // Output: books
```

---

## ✅ Example: `POST` Request

### 🔹 HTML:

```html
<form method="POST" action="submit.php">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
```

### 🔹 PHP (submit.php):

```php
echo $_POST['username'];
```

> The `username` value will **not** appear in the URL.

---

## ✅ When to Use What?

| Task                      | Method |
| ------------------------- | ------ |
| Search forms              | `GET`  |
| Login forms               | `POST` |
| Sensitive data submission | `POST` |
| Bookmarkable filter pages | `GET`  |
| File uploads              | `POST` |

---