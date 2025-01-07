## Pure Function

A **pure function** is a function that has the following characteristics:

1. **Deterministic**: Given the same inputs, a pure function will always return the same output. It doesn't rely on any external state or variables that could change.
2. **No Side Effects**: A pure function does not modify any external state (such as changing global variables, altering arguments, or interacting with external systems like the DOM, database, or files). It only operates on the provided inputs and returns a result.

### Characteristics of a Pure Function:
- **No side effects**: It does not alter the state outside the function, nor does it interact with external systems.
- **Same input produces the same output**: For any given set of inputs, the function will always return the same output. There are no hidden or unexpected behaviors.

### Example of a Pure Function:

```javascript
// A simple pure function
function add(a, b) {
    return a + b;  // Always returns the same output for the same inputs
}

console.log(add(2, 3)); // Output: 5
console.log(add(2, 3)); // Output: 5 (consistent output)
```

In this example:
- The `add` function is deterministic because for any given pair of inputs (`a` and `b`), it will always return the same sum.
- It has no side effects, meaning it does not modify any variables, external state, or produce any observable effect outside the function.

### Example of an Impure Function:

```javascript
let count = 0;

function increment() {
    count += 1;  // Modifies external state (impure)
    return count;
}

console.log(increment()); // Output: 1
console.log(increment()); // Output: 2
```

In this example:
- The `increment` function is impure because it modifies the `count` variable, which is outside the function. The output depends not just on the input but on the current state of `count`, so it is not deterministic.

### Benefits of Pure Functions:
1. **Easier to test**: Since pure functions always return the same result for the same inputs and do not depend on or modify external state, they are easier to reason about and test.
2. **Referential transparency**: Pure functions support referential transparency, which means that they can be replaced with their result without changing the behavior of the program.
3. **Parallelization**: Since pure functions don't modify shared state, they are safe to use in parallel or concurrent programming scenarios.
4. **Composability**: Pure functions can be easily composed to build more complex behavior, and they make code easier to understand and maintain.

### Example in the Context of Functional Programming:

```javascript
// Pure function
const double = x => x * 2;

// Higher-order function that takes a pure function
const map = (arr, func) => arr.map(func);

const numbers = [1, 2, 3, 4];
const doubledNumbers = map(numbers, double);

console.log(doubledNumbers); // Output: [2, 4, 6, 8]
```

Here:
- The `double` function is pure because it takes an input `x` and returns the result `x * 2` without modifying any external state.
- The `map` function is a higher-order function that works with pure functions like `double` to transform an array.