Js Fundamentels – playground;

1. Basic callback function

A callback is a function passed as an argument to another function.

function doTask()
{
    console.log("Start");    
    let total_time = 5;
    task(total_time);
	
}

function task(total_time){
     console.log("Task 1 done " + total_time + " sec");  
}

doTask(task)
-------------------
Start
Task 1 done 5 sec

Note: in calling the  function doTask(task) – we dont need  task(total_time) with argument

5’dec’23
-------------------------------------------------
 
To understand how those two statements are equivalent, you really need to look inside of the function and also to reflect on why we use callbacks in the first place. It's also important to understand the difference between function declarations (function getFullName), invocations (getFullName()) and references (getFullName).
We use callbacks to react to something that might happen later, usually the result of whatever has happened is of interest to us. So we create callbacks that receive that result.
Imagine you have a function getFullName, if it was synchronous you would just call it like this:
const fullName = getFullName('John', 'Doe');
And inside the function might simply be:
function getFullName(firstName, lastName) {
    return firstName + ' ' + lastName;
}
To understand how those two statements are equivalent, you really need to look inside of the function and also to reflect on why we use callbacks in the first place. It's also important to understand the difference between function declarations (function getFullName), invocations (getFullName()) and references (getFullName).
We use callbacks to react to something that might happen later, usually the result of whatever has happened is of interest to us. So we create callbacks that receive that result.
Imagine you have a function getFullName, if it was synchronous you would just call it like this:
const fullName = getFullName('John', 'Doe');
And inside the function might simply be:
function getFullName(firstName, lastName) {
    return firstName + ' ' + lastName;
}
But for some reason, this function is asynchronous, so you don't get the result directly, so we use a callback to get notified when the name is ready to use:
function getFullName(firstName, lastName, callback) {
    // Do something that takes time, then with the result of that
    callback(firstName + ' ' + lastName);
}
Now when we call this function, it looks like this:
getFullName('John', 'Doe', function (fullName) {
    console.log(fullName);
});
So the getFullName function, will invoke our callback and pass it the value it created. Since your function takes 1 argument, the fullName will be in that argument, no matter what we name that argument. So we can replace our callback (that we've created as an anonymous function) with any other function that takes one argument, such as console.log, like this:
getFullName('John', 'Doe', console.log)
In both these cases, we're sending in a function reference to getFullName, in the first case it's a reference from a function we've just created, in the second it's a reference to a function in the global scope.
You could equally do this:
const myCallback = function(fullName) {
   console.log(fullName);
}

getFullName('John', 'Doe', myCallback);

Reference:
https://stackoverflow.com/questions/62959564/passing-function-as-callback-without-argument-need-help-to-understand-it

https://www.pulumi.com/pricing/
