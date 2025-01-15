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