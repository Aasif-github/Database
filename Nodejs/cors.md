## CORS

CORS (Cross-Origin Resource Sharing) is a way to allow a website or app running on one domain (like `myapp.com`) to talk to a server on another domain (like `api.myapp.com`). Normally, browsers block these requests for security reasons (this is called the "same-origin policy"). CORS helps bypass that block in a controlled and safe way.

### Example
Let’s say:
- Your front-end app is running on `http://myfrontend.com`.
- Your back-end API is running on `http://mybackend.com`.

If your front-end tries to get data from your back-end, the browser will block it unless the back-end says, "It's okay to share my data with `http://myfrontend.com`."

---

### How Does CORS Work?
When the browser sends a request to a different domain, the server can respond with special headers like:
- **`Access-Control-Allow-Origin`**: This tells the browser which websites are allowed to access its data (e.g., `http://myfrontend.com` or `*` to allow everyone).

---

### How to Enable CORS in Node.js
If you’re using Express.js, you can use the `cors` package to make it easy.

1. **Install CORS:**
   ```bash
   npm install cors
   ```

2. **Enable CORS in Your App:**
   ```javascript
   const express = require('express');
   const cors = require('cors');

   const app = express();

   // Allow all origins
   app.use(cors());

   app.get('/data', (req, res) => {
     res.json({ message: 'CORS is enabled!' });
   });

   app.listen(3000, () => {
     console.log('Server running on http://localhost:3000');
   });
   ```

Now your API will allow requests from any website.

---

### In Simple Terms:
- **Without CORS**: The browser blocks your app from talking to other servers.
- **With CORS**: You tell the browser, "It's okay to allow this app to talk to my server." The server responds with permission.

This keeps your app secure while allowing trusted websites to communicate with your back-end.