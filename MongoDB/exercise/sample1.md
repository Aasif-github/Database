```json
[
  { "name": "Alice", "age": 22, "scores": { "math": 85, "science": 90, "english": 78 }, "passed": true },
  { "name": "Bob", "age": 25, "scores": { "math": 56, "science": 65, "english": 60 }, "passed": false },
  { "name": "Charlie", "age": 23, "scores": { "math": 95, "science": 80, "english": 88 }, "passed": true },
  { "name": "David", "age": 21, "scores": { "math": 40, "science": 50, "english": 45 }, "passed": false },
  { "name": "Eva", "age": 24, "scores": { "math": 78, "science": 88, "english": 72 }, "passed": true }
]
```

Here’s a MongoDB query challenge for you to solve:

Challenge:
You have a collection named students with the following sample documents:

json
Copy
Edit
[
  { "name": "Alice", "age": 22, "scores": { "math": 85, "science": 90, "english": 78 }, "passed": true },
  { "name": "Bob", "age": 25, "scores": { "math": 56, "science": 65, "english": 60 }, "passed": false },
  { "name": "Charlie", "age": 23, "scores": { "math": 95, "science": 80, "english": 88 }, "passed": true },
  { "name": "David", "age": 21, "scores": { "math": 40, "science": 50, "english": 45 }, "passed": false },
  { "name": "Eva", "age": 24, "scores": { "math": 78, "science": 88, "english": 72 }, "passed": true }
]

Tasks:

- Find all students who passed and have a math score greater than 80.
```lua
db.students.find({'passed':true, 'scores.math':{$gt:80}});

```

- Update the passed field to true for all students who have a science score greater than 85.
```lua
db.students.updateMany({ scores.science:{$gt:85}, $set:{passed:true}})
```

Retrieve only the names and ages of students who scored more than 70 in English.

```lua
    db.students.find({score.English: {$gt:70}, {name:1,age:1,_id:0}});
```

Delete all students whose total score (math + science + English) is less than 150.

```lua
   db.students.deleteMany({
  $expr: {
    $lt: [
      { $add: ["$scores.math", "$scores.science", "$scores.english"] },
      150
    ]
  }
})
```

Sort the students by their age in descending order and retrieve the first 3 documents.
```lua
db.students.find()
  .sort({ age: -1 })
  .limit(3)
```