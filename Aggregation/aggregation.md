# MongoDB aggregation pipeline

***Q1. How many users are active ?***
```js
db.collection_name.aggregate([
  {
    $match: {
      isActive:true
    }
  }
]);
```

***Q2. What is the average age of all users ?***
```js
[
  {
    $group: {
      _id: null, 
      "avgAge":{
        $avg:"$age"
      }
    }
  }
]
```
***Q3. What is the average age of all users based on gender ?***
```js
[
  {
    _id: "$gender",
    avgAge: {
      $avg: "$age"
    }
  }
]
```
***Q4. List all fruits ?***
```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      count: { $count: { } }
    }
  }
]
```
***Q5. Sort in ascending order ?***
```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      fav_fruit_count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      fav_fruit_count: -1(descending) // 1(ascending)
    }
  }
]
```
***Q6. Which Country has the highest number of registered users ?***

```json
{
  "_id": {
    "$oid": "666deb5701fc29b3e65d30b0"
  },
  "index": 0,
  "name": "Aurelia Gonzales",
  "isActive": false,
  "registered": {
    "$date": "2015-02-11T04:22:39.000Z"
  },
  "age": 20,
  "gender": "female",
  "eyeColor": "green",
  "favoriteFruit": "banana",
  "company": {
    "title": "YURTURE",
    "email": "aureliagonzales@yurture.com",
    "phone": "+1 (940) 501-3963",
    "location": {
      "country": "USA",
      "address": "694 Hewes Street"
    }
  },
  "tags": [
    "enim",
    "id",
    "velit",
    "ad",
    "consequat"
  ]
}
```
Solution:
```js
[
  {
  $group: {
    _id: "$company.location.country",    
    userCount:{
      $sum:1
    }
  },
  
},
  {
    $sort: {
      userCount: -1
    }
  },
  
{
    $limit: 2
}
]
```
***Q7. List all unique eye colors present in the collection ?***
```js
[
  {
    $group: {
      _id: "$eyeColor",      
    }
  }
]
```

***Q8. What is the average number of tags per user ?***
```js
[
  {
    $unwind: {
      path: "$tags"      
    }
  },
  {
    $group: {
      _id: "$_id",
      numOfTags: {
        $sum:1
      }
    }  
  },
    {
      $group: {
        _id: null,
        avgNumOfTags: {
          $avg: "$numOfTags"
        }
      }
    }
]
```
## ***OR***
```js
[
  {
    $addFields: {
      numOfTags: {
        $size:{
          $ifNull: [ "$tags", []]
        }
      }
    }
  },
  {
    $group: {
      _id: null,
      avgNumberOfTags: {
        $avg: "$numOfTags"
      }
    }
  }
]
```
***Q9. How many users have `enim` as a one of their tags ?***
```js
[
  {
 		$match: {
 		  tags:"id"
 		} 
	},
  {
    $count: 'userWithEnimTags'
  }
]

op:{
  "userWithEnimTags": 46
}
```
***10. What are the names and age of users who are inactive  and have `velit` as a tag ?***
```js
[
  {
  $match: {
    isActive:true,    
    tags:'velit'
  	}
	},
  {
    $project: {
      name:1,
      age:1
    }
  }
]
```
***11. How many users have a phone number starting with `+1 (940)` ?***
```js
[
  {
    $match: {
      "company.phone": /^\+1 \(940\)/
    }
  },
  {
    $count: 'userWithSpecialPhoneNum'
}
]
```
***12. Who has registered them most recently (top five).***
```js
[
  {
    $sort: {
      registered: -1
    }
  },
  {
    $limit: 5
  },
  {
    $project: {
      name:1,
      age:1,
      registered:1,
      favoriteFruit:1
    }
  }
]
```
***13. categorized uses by their favorite fruits.***
```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      user: {
        $push: "$name"
      }
    }
  }
]
```
***14. How many users have `ad` as a second tag in their list of tags.***

```js
[
  {
    $match: {
      "tags.1":'ad'
    }
  },
  {
    $count: 'SecondTagAd'
  }
]
```
***15. Find users who had both “enim” and “id” in their tags?.***
```js
[
  {
    $match: {
      tags:{
        $all:['enim', 'id']
      }      
    }
  }
]
```
***16. List all the companies located in the USA with their corresponding user count.***
```js
[
  {
    $match: {
      "company.location.country":"USA" 
    }
  },
  {
    $group: {
      _id: "$company.title",
      userCount: {
        $sum: 1
      }
    }
  }
]
```
Op:
```json
{
  "_id": "PROXSOFT",
  "userCount": 1
}
{
  "_id": "AUTOGRATE",
  "userCount": 1
}
```

***17. List all authors and their books.***

Step1: Go to Books.db and write below pipeline(stage) 
INNER JOIN  - Books and Authors
```js
[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0]
      }
    }
  }
]
```

Op:

```json
{
  "_id": 1,
  "title": "The Great Gatsby",
  "author_id": 100,
  "genre": "Classic",
  "author_details": {
    "_id": 100,
    "name": "F. Scott Fitzgerald",
    "birth_year": 1896
  }
}
```