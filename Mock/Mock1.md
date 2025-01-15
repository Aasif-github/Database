


- Closure


  ```js
function counter(){
  let count = 0;
  
  
  return {
    inc: function(){
      return count++;
    },
    
      dec:function(){
        return count--;
    }
   
  }
}

let makeCount = counter()
 
console.log(makeCount.inc())
console.log(makeCount.inc())
console.log(makeCount.inc())
  ```


Demostrate Promise and Async-await
  ```js
let task1 = () => {
    
    let status = true;
    
    return new Promise((resolve, reject)=>{
      
      setTimeout(function() {
        
        if(status){
          resolve('Task 1 - Done!!');
        }else{
          reject('Task 1 - Not Done!!');
        }
      }, 3000);
    })
}

task1().then((value)=>{
  console.log('Output',value);
}).catch((err)=>{
  console.log('Error:',err);
})

async function handleTask(){

  try {
    let taskStatus = await task1(); // it pause the exetion
    
    console.log('taskStatus', taskStatus)
    console.log('start-');
  } catch (e) {
    console.log('Err', e)
  }
}

handleTask()
  ```

  output
  ```
Output Task 1 - Done!!
taskStatus Task 1 - Done!!
start-

  ```

  # MongoDB

## write a query to group them according to dept:Sales
```json
[
  { empId: 1, name: 'Clark', dept: 'Sales' },
  { empId: 2, name: 'Dave', dept: 'Accounting' },
  { empId: 3, name: 'Ava', dept: 'Sales' }
]
```

```json
  db.employees.aggregate([
  { $match: { dept: "Sales" } },  // Filter to include only documents where dept is 'Sales'
  { 
    $group: { 
      _id: "$dept",               // Group by the 'dept' field
      employees: { $push: "$name" }, // Collect the names of employees in 'Sales'
      totalEmployees: { $sum: 1 }  // Count the number of employees in 'Sales'
    }
  }
]);
```

```json

[
  {
    _id: "Sales",
    employees: ["Clark", "Ava"],
    totalEmployees: 2
  }
]

```

## diff bwt `ref` and `$lookup`;

collection:books - authors

db.books.aggregate([

    $lookup:{
        from:'authors' // collection to join
        localField:'book_id', // Field in 'Books'
        forigenField:'author_id', // Field in 'Author'
        as:'BookDetails' // Result will store in BookDetails
    }
])

## What is indexing.
**Indexing** in MongoDB is the process of creating a special data structure that improves the speed of data retrieval operations at the cost of additional space and slower write operations. 

Indexes are used to quickly locate and access the data without having to scan every document in a collection, making queries more efficient.