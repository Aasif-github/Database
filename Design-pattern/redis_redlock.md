Great! I'll guide you through implementing a **Redis-based booking system** using **Redlock** for distributed locking in **Node.js**. 🚀  

---

## **Step 1: Install Dependencies**
First, install **Redis** and **Redlock** in your project.

```sh
npm install redis redlock
```

---

## **Step 2: Setup Redis Connection**
Create a file **`redisClient.ts`** to configure Redis.

```typescript
import { createClient } from "redis";

const redisClient = createClient({
    socket: { host: "127.0.0.1", port: 6379 }, // Change host & port if needed
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
    await redisClient.connect();
    console.log("Connected to Redis!");
})();

export default redisClient;
```

---

## **Step 3: Setup Redlock for Distributed Locking**
Create a file **`redlock.ts`** to configure Redlock.

```typescript
import Redlock from "redlock";
import redisClient from "./redisClient";

const redlock = new Redlock([redisClient], {
    driftFactor: 0.01, // Compensation for clock drift
    retryCount: 3, // Number of times to retry acquiring lock
    retryDelay: 200, // Time in ms before retrying
    retryJitter: 50, // Random delay to avoid contention
});

export default redlock;
```

---

## **Step 4: Implement Booking System**
Create **`bookingService.ts`** for booking logic.

```typescript
import redisClient from "./redisClient";
import redlock from "./redlock";

class BookingService {
    private lockTTL = 5000; // Lock expires in 5 seconds

    async bookSlot(slotId: string, userId: string): Promise<boolean> {
        const lockKey = `locks:slot:${slotId}`;

        try {
            // Acquire the lock
            const lock = await redlock.lock(lockKey, this.lockTTL);

            // Check if slot is already booked
            const existingBooking = await redisClient.get(`slot:${slotId}`);
            if (existingBooking) {
                console.log(`Slot ${slotId} is already booked!`);
                await lock.unlock();
                return false;
            }

            // Book the slot
            await redisClient.set(`slot:${slotId}`, userId, { EX: 3600 }); // Set expiry for 1 hour
            console.log(`Slot ${slotId} booked successfully by ${userId}`);

            // Release the lock
            await lock.unlock();
            return true;
        } catch (err) {
            console.error("Error acquiring lock or booking slot:", err);
            return false;
        }
    }
}

export default new BookingService();
```

---

## **Step 5: Setup Express API for Booking**
Create **`server.ts`** to expose an API.

```typescript
import express from "express";
import BookingService from "./bookingService";

const app = express();
app.use(express.json());

app.post("/book", async (req, res) => {
    const { slotId, userId } = req.body;
    if (!slotId || !userId) {
        return res.status(400).json({ error: "slotId and userId are required!" });
    }

    const success = await BookingService.bookSlot(slotId, userId);
    if (success) {
        return res.json({ message: `Slot ${slotId} booked successfully!` });
    } else {
        return res.status(409).json({ error: "Slot is already taken!" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## **Step 6: Test the API**
Run the server:

```sh
node server.js
```

Make a **POST request** to test booking:

```sh
curl -X POST http://localhost:3000/book -H "Content-Type: application/json" -d '{"slotId":"123", "userId":"user1"}'
```

---

## **How This Works**
1. **Locking Mechanism (`redlock.lock`)**:
   - Ensures that only **one user at a time** can book the slot.
   - Prevents **double booking** even in distributed environments.

2. **Atomic Booking with Redis (`set`)**:
   - If **already booked**, it returns an error.
   - If **available**, it books the slot and **expires it after 1 hour**.

3. **Unlocking (`lock.unlock()`)**:
   - Ensures the lock is **released** after booking.

---

## **Conclusion**
✅ **Prevent race conditions** when booking the same slot.  
✅ **Works in distributed environments** (multiple servers).  
✅ **Ensures atomicity** via Redis + Redlock.  

Would you like me to add **cancellation & slot availability checks**? 🚀