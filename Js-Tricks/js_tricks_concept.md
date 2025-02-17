### Guess output of the following code?

```javascript
greetings()

var greetings = function(){
    console.log('first greets')
}

greetings();

function greetings(){
    console.log('second greets');
}
```
output: 
```
second greets
first greets
```

### Based On Hoisting, variable shadowing, TDZ.

```js
let rate = 10;

function getRate() {
  console.log('rate', rate);
  
  if (rate === undefined) {
    let rate = 6;
    return rate;
  } else {
    return 11;
  }
}

console.log('fun call', getRate());
```
output:

```lua
rate 10
fun call 11
```

### What is the output of the following code?

```js
function sum(num1, num2){

  'use strict'
  // we want to pass value of sum(2,3)  
  
  num1 = 4; // By using use strict num1 & num2 value will ignore
  num2 = 5;
  
  return arguments[0]+arguments[1];
}

console.log(sum(2,3)) // 5
```