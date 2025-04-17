Garbage collection in JavaScript is an automatic memory management process where the JavaScript engine identifies and frees up memory that is no longer in use by a program. It prevents memory leaks by reclaiming memory allocated to objects, variables, or data that are no longer referenced or accessible.

### How It Works:
1. **Mark-and-Sweep Algorithm**: The primary mechanism used in most JavaScript engines (like V8 in Chrome and Node.js):
   - **Marking**: The garbage collector identifies all objects that are still reachable from the "root" (e.g., global objects, local variables in the current scope, or objects referenced by active functions).
   - **Sweeping**: Unmarked objects (those not reachable) are considered garbage and their memory is freed.
2. **Reference Counting** (less common in modern engines): Tracks the number of references to an object. If an object has zero references, its memory is reclaimed. However, this method struggles with circular references, which is why mark-and-sweep is preferred.

### Key Points:
- **Automatic**: Developers don’t manually allocate or deallocate memory (unlike languages like C).
- **Objects Are Retained**: As long as an object is referenced (e.g., stored in a variable, array, or closure), it remains in memory.
- **Circular References**: Modern garbage collectors handle circular references effectively using mark-and-sweep.
- **Performance**: Garbage collection runs periodically, which can cause brief pauses (stop-the-world events), but modern engines optimize this with incremental and concurrent collection.

### Example:
```javascript
let obj = { data: "Hello" }; // Memory allocated for obj
obj = null; // No references to the object remain
// The garbage collector will eventually free the memory
```

### Limitations:
- **Unpredictable Timing**: You can’t control when garbage collection runs.
- **Memory Leaks**: Can still occur if references are unintentionally retained (e.g., in event listeners, closures, or global variables).
- **Pauses**: Large heaps or frequent collections may impact performance in real-time applications.

Modern JavaScript engines like V8 use advanced techniques (e.g., generational collection) to make garbage collection efficient, but developers should still be mindful of reference management to avoid leaks.