
### which execute first
```js

setImmediate(() => {
  console.log("setImmediate");
});
  console.log('start');
setTimeout(() => {
  console.log("setTimeout");
}, 0);
```

The order of execution is as follows:

1. **`console.log('start')`** runs first because it's synchronous.
2. The asynchronous **`setTimeout`** and **`setImmediate`** callbacks are scheduled.
3. The event loop processes these callbacks in subsequent phases:
   - **`setTimeout`** is handled in the **timers phase**.
   - **`setImmediate`** is handled in the **check phase**.

The key points:
- **Output starts with `start`**.
- The order between `setTimeout` and `setImmediate` **is non-deterministic** when both are scheduled in the main module. However, typical observed behavior often results in:

```
start
setTimeout
setImmediate
```

This happens because the timers phase (for `setTimeout`) comes before the check phase (for `setImmediate`) in the event loop. If the `setTimeout` timer (adjusted to 1ms) expires before the event loop reaches the timers phase, it executes first. Otherwise, `setImmediate` runs first.

**Final Answer**:
```
start
setTimeout
setImmediate
```

But note that in practice, due to the event loop's non-deterministic nature in this context, the order might occasionally be:
```
start
setImmediate
setTimeout
```
