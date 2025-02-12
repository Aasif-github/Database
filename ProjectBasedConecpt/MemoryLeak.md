### 🔍 **How to Handle Memory Leaks in a Node.js App**
A **memory leak** occurs when allocated memory is not properly released, leading to increased memory consumption over time. In a **Node.js** app, memory leaks can cause **performance issues, crashes, and high server costs**.

---

## 1️⃣ **Common Causes of Memory Leaks**
Here are some common reasons for memory leaks in Node.js:

| Cause | Explanation | Example |
|-------|------------|---------|
| **Global variables** | Unintentional global variables persist and never get garbage collected. | `global.leak = new Array(1000000).fill("leak");` |
| **Unclosed Event Listeners** | Excess event listeners keep accumulating. | `emitter.on("event", handler);` without `removeListener` |
| **Memory-intensive Caching** | Keeping too many objects in memory indefinitely. | `const cache = {}; cache[key] = largeObject;` |
| **Timers & Intervals** | `setInterval()` running indefinitely without `clearInterval()`. | `setInterval(() => console.log("Running"), 1000);` |
| **Database Connections Not Closed** | Open DB connections that are never released. | `mongoose.connect()` without proper disconnect. |
| **Large Buffers/Streams** | Holding large chunks of data in memory. | `const data = fs.readFileSync("largefile.txt");` |

---

## 2️⃣ **Detecting Memory Leaks**
### ✅ **1. Use Process Metrics (`process.memoryUsage()`)**
You can monitor memory usage with:
```js
setInterval(() => {
    const memory = process.memoryUsage();
    console.log(`Heap: ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}, 5000);
```
👉 Run the app and observe if memory keeps increasing indefinitely.

---

### ✅ **2. Use Node.js Inspector (`–inspect`)**
Run your app with:
```sh
node --inspect index.js
```
Then, open **Chrome DevTools** at `chrome://inspect` and check the memory usage under the **Memory** tab.

---

### ✅ **3. Use Heap Snapshots**
1. Add this code:
   ```js
   const v8 = require("v8");
   const fs = require("fs");

   function takeHeapSnapshot() {
       const snapshot = v8.getHeapSnapshot();
       snapshot.pipe(fs.createWriteStream("heapdump.heapsnapshot"));
   }

   setInterval(takeHeapSnapshot, 60000); // Every 1 min
   ```
2. Open Chrome DevTools → **Memory Tab** → Load `heapdump.heapsnapshot` file.

---

### ✅ **4. Use `heapdump` for Analysis**
Install **heapdump**:
```sh
npm install heapdump
```
Modify your app:
```js
const heapdump = require("heapdump");

process.on("SIGUSR2", () => {
    heapdump.writeSnapshot("./" + Date.now() + ".heapsnapshot");
    console.log("Heap snapshot saved.");
});
```
Then, trigger a dump:
```sh
kill -USR2 <pid>
```
👉 Open the snapshot in **Chrome DevTools**.

---

### ✅ **5. Use `clinic.js` (Powerful Profiler)**
Install `clinic`:
```sh
npm install -g clinic
```
Run:
```sh
clinic doctor -- node index.js
```
👉 This will analyze your app and suggest fixes.

---

## 3️⃣ **Fixing Memory Leaks**
### 🛠 **1. Avoid Unintentional Global Variables**
❌ Bad:
```js
function leakMemory() {
    leak = []; // Unintentional global variable
    leak.push("data");
}
```
✅ Fix:
```js
function leakMemory() {
    const leak = []; // Now it's scoped correctly
    leak.push("data");
}
```

---

### 🛠 **2. Remove Unused Event Listeners**
If you add event listeners, **remove them when no longer needed**.

❌ Bad:
```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("data", (data) => {
    console.log(data);
});
```
✅ Fix:
```js
const listener = (data) => console.log(data);
emitter.on("data", listener);

// Remove listener when not needed
emitter.removeListener("data", listener);
```

---

### 🛠 **3. Clear Unused Intervals & Timeouts**
❌ Bad:
```js
setInterval(() => console.log("Running..."), 1000); // Never stops
```
✅ Fix:
```js
const interval = setInterval(() => console.log("Running..."), 1000);
setTimeout(() => clearInterval(interval), 10000); // Stop after 10s
```

---

### 🛠 **4. Optimize Caching Strategies**
❌ Bad:
```js
const cache = {};
cache["key"] = new Array(1000000).fill("bigData");
```
✅ Fix (Use `lru-cache`):
```js
const LRU = require("lru-cache");
const cache = new LRU({ max: 500 });

cache.set("key", "someValue");
```
🔹 This **limits** memory usage.

---

### 🛠 **5. Close Database Connections**
❌ Bad:
```js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");
```
✅ Fix:
```js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});
```

---

### 🛠 **6. Stream Large Data Instead of Reading It All**
❌ Bad:
```js
const fs = require("fs");
const data = fs.readFileSync("largefile.txt"); // Loads entire file into memory
```
✅ Fix:
```js
const fs = require("fs");
fs.createReadStream("largefile.txt").pipe(process.stdout); // Streams data
```

---

## 4️⃣ **Monitor and Auto-Restart on Memory Leaks**
### ✅ **1. Use PM2 for Auto-Restart on High Memory**
Install **PM2**:
```sh
npm install -g pm2
```
Start your app with memory limits:
```sh
pm2 start index.js --max-memory-restart 200M
```
👉 This restarts your app if memory exceeds **200 MB**.

---

## 5️⃣ **Conclusion**
✅ **Best Practices to Prevent Memory Leaks:**
1. **Use `process.memoryUsage()`** to monitor memory.
2. **Use `heapdump` & `clinic.js`** to analyze leaks.
3. **Avoid global variables** (use `const` & `let`).
4. **Remove event listeners** after use.
5. **Clear intervals & timeouts** when not needed.
6. **Use caching wisely** (use `lru-cache`).
7. **Close database connections** properly.
8. **Stream large files** instead of loading them into memory.
9. **Use PM2** to restart the app on high memory usage.

Would you like me to help analyze a memory leak in your app? 🚀