const fs = require('fs');
 
console.log('start');

setImmediate(() => {
    console.log('setImmediate');
});

setTimeout(() => {
    console.log('setTimeout');
}, 0);  

Promise.resolve('promise').then(console.log);

fs.readFile("./main.md",'utf-8', () => {
    // console.log('fs.readFile');
    setTimeout(() => {
        console.log('inside fs - setTimeout');
    }, 0);

    process.nextTick(() => {
        console.log('inside - nextTick');
    });

    setImmediate(() => {
        console.log('inside fs - setImmediate');
    });

    console.log('file read complete');
}, 1000);

process.nextTick(() => {
    console.log('nextTick');
});

console.log('end');

/*
start
end
nextTick
promise
setTimeout
setImmediate
file read complete
inside - nextTick
inside fs - setImmediate
inside fs - setTimeout
*/ 