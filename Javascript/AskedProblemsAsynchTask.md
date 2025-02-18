### Create a function that returns a promise and handles it with async/await    

```js
let task1 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-1 Done')
            }else{
                reject('Task-1 Failed')
            }    
        }, 1000);
    })
}

const taskHandler = async() => {
    let taskOneStatus = await task1();
    console.log(taskOneStatus);
}

taskHandler()
```

### Promsie.all() - The Promise.all() method returns a Promise that resolves if all of the input Promises resolve, or rejects if any of the input Promises reject.

```js
let task1 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-1 Done')
            }else{
                reject('Task-1 Failed')
            }    
        }, 1000)
    })
}

let task2 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-2 Done')
            }else{
                reject('Task-2 Failed') 
            }    
        }, 1000)
    })
}

let task3 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-3 Done')
            }else{
                reject('Task-3 Failed')
            }    
        }, 1000)
    })
}

let taskStatus = Promise.all([task1(),task2(),task3()])

taskStatus
    .then((value)=>{console.log(value)})
    .catch((err)=> console.log('Err:',err));
``` 
output:
```js
Output:[ 'Task-1 Done', 'Task-2 Done', 'Task-3 Done' ]; 
```
- case 1: if task-2 failed, 
- output: Err: Task-2 Failed (catch block will be executed)

### Promsie.any() - The Promise.any() method returns a Promise that resolves or rejects as soon as one of the input Promises resolves or rejects.

```js
let task1 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-1 Done')
            }else{
                reject('Task-1 Failed')
            }    
        }, 4000)
    })
}

let task2 = () => {
    return new Promise((resolve, reject)=>{
        let status = false;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-2 Done')
            }else{
                reject('Task-2 Failed')
            }    
        }, 2000)
    })
}

let task3 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-3 Done')
            }else{
                reject('Task-3 Failed')
            }    
        }, 3000)
    })
}

let taskStatus = Promise.any([task1(),task2(),task3()]);

taskStatus
        .then((value)=>{console.log(value)})
        .catch((err)=> console.log("Err",err));
```
```js        
output: Task-3 Done
```

### Promsie.race() - The Promise.race() method returns a Promise that resolves or rejects as soon as one of the input Promises resolves or rejects

```js
let task1 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-1 Done')
            }else{
                reject('Task-1 Failed')
            }    
        }, 4000)
    })
}

let task2 = () => {
    return new Promise((resolve, reject)=>{
        let status = false;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-2 Done')
            }else{
                reject('Task-2 Failed')
            }    
        }, 2000)
    })
}

let task3 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-3 Done')
            }else{
                reject('Task-3 Failed')
            }    
        }, 1000)
    })
}

let taskStatus = Promise.race([task1(),task2(),task3()]);

taskStatus
        .then((value)=>{console.log(value)})
        .catch((err)=> console.log("Err",err));
```
Output:
```js
Task-3 Done
```
### Promsie.allSettled() - The Promise.allSettled() method returns a Promise that resolves with an array of results when all of the input Promises have settled (either resolved or rejected).

```js
let task1 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-1 Done')
            }else{
                reject('Task-1 Failed')
            }    
        }, 4000)
    })
}

let task2 = () => {
    return new Promise((resolve, reject)=>{
        let status = false;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-2 Done')
            }else{
                reject('Task-2 Failed')
            }    
        }, 2000)
    })
}

let task3 = () => {
    return new Promise((resolve, reject)=>{
        let status = true;
        
        setTimeout(()=>{
            if(status){
                resolve('Task-3 Done')
            }else{
                reject('Task-3 Failed')
            }    
        }, 1000)
    })
}

let taskStatus = Promise.allSettled([task1(),task2(),task3()])

taskStatus
    .then((value)=>{console.log(value)})
    .catch((err)=> console.log("Err",err));
```
output:
```js   
[
  { status: 'fulfilled', value: 'Task-1 Done' },
  { status: 'rejected', reason: 'Task-2 Failed' },
  { status: 'fulfilled', value: 'Task-3 Done' }
]
```    