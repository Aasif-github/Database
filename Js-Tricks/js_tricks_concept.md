Guess output of the following code?

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