[Practice - Restaurants Database](https://www.w3resource.com/mongodb-exercises/#MongoDB_restaurants)


#### Sample
```js
{
  "address": {
     "building": "1007",
     "coord": [ -73.856077, 40.848447 ],
     "street": "Morris Park Ave",
     "zipcode": "10462"
  },
  "borough": "Bronx",
  "cuisine": "Bakery",
  "grades": [
     { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
     { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
     { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
     { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
     { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
  ],
  "name": "Morris Park Bake Shop",
  "restaurant_id": "30075445"
}
```

1. Write a MongoDB query to display all the documents in the collection restaurants.
 ```js
 db.restaurants.find();
 ```

2. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant.
 ```js
 db.restaurants.find({},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1});
 ```
Explanation:

The said MongoDB shell command that retrieves data from the 'restaurants' collection in the current database.
An empty object {} as the first argument, which acts as a filter to retrieve all documents in the collection.
A second object as the second argument that specifies the fields "restaurant_id", "name", "borough", and "cuisine" to include in the results.
The command would return a cursor to the documents that match the filter, including only the specified fields.

3. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine, but exclude the field _id for all the documents in the collection restaurant.
```js
 db.restaurants.find({},{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1,"_id":0});
```

4. Write a MongoDB query to display the fields restaurant_id, name, borough and zip code, but exclude the field _id for all the documents in the collection restaurant.
 ```js
 db.restaurants.find({},{"restaurant_id" : 1,"name":1,"borough":1,"address.zipcode" :1,"_id":0});
```

5. Write a MongoDB query to display all the restaurant which is in the borough Bronx.
 ```js
 db.restaurants.find({"borough":"Bronx"})
 ```

6. Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
 ```js
 db.restaurants.find({"borough":"Bronx"}).limit(5)
 ```

7. Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
```js
 db.restaurants.find({"borough":"Bronx"}).skip(5).limit(5)
 ```

8. Write a MongoDB query to find the restaurants who achieved a score more than 90.
```js
db.restaurants.find({ grades: { $elemMatch: { "score": { $gt: 90 }}}})
 ```
Explanation:

The given query in MongoDB retrieves data from the 'restaurants' collection in the current  database, where at least one element in the "grades" array has a "score" field with a value greater than 90.
A listing of all restaurants that have received a score of at least 90 in any of their inspections on the basis of this query can be obtained.


9. Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
```js
db.restaurants.find({ grades: { $elemMatch: { "score": { $gt: 80 ,$lt:100 }}}})
```
Explanation:

The given query in MongoDB return all documents in the 'restaurants' collection where at least one element in the "grades" array has a "score" field value greater than 80 and less than 100.
The $elemMatch operator is used to search for documents with an array field that contains at least one element that matches the "score" field must be greater than 80 and less than 100.


10. Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
```js
db.restaurants.find({"address.coord": {"lt":-95.754168}});
```

11. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and their grade score more than 70 and latitude less than -65.754168.
```js
db.restaurants.find({ $and:[
   { "cuisine":{ $ne:"American" } },
   { "grade.score": {$gt: 70} },
   { "address.coord" {$lt: -65.754168} }

]})
```

12. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168.
Note : Do this query without using $and operator.

```js
db.restaurants.find({
    "cuisine": { $ne: "American" },
    "grades.score": { $gt: 70 },
    "address.coord.1": { $lt: -65.754168 }
});
```

13. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order.
```js
db.restaurants.find({
   "cuisine": { $ne: "American" },
   "grade.point":"A",
   "borough":{$ne:"Brooklyn"}
}).sort({"cuisine: -1"});
```

14. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.
```js
db.restaurants.find(
   { name: "/^Wil/"}
   {
      "restaurant_id":1,
      "name":1,
      "borough":1,
      "cuisine":1
   }
```

15. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name.
```js
db.restaurants.find(
   { name: "/ces$/"}
   {
      "restaurant_id":1,
      "name":1,
      "borough":1,
      "cuisine":1
   }
```

16. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
```js
db.restaurants.find(
   { "name": "/.*Reg*./" }
   {
      "restaurant_id":1,
      "name":1,
      "borough":1,
      "cuisine":1
   }
```

17. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
```js
db.restaurants.find(
   {
      "borough":"Bronx"
   }  
   {
      $or: [  
         {"cuisine":"American"}, 
         {"cuisine":"Chinese"} 
      ]
   })

```
- Using $in
```js
db.restaurants.find({
    borough: "Bronx",
    cuisine: { $in: ["American", "Chinese"] }
});
```
- Using an Aggregation Pipeline

An aggregation pipeline allows more complex transformations and filtering, which can be helpful for additional processing or future extensions.

```js
db.restaurants.aggregate([
    {
        $match: {
            borough: "Bronx",
            $or: [
                { cuisine: "American" },
                { cuisine: "Chinese" }
            ]
        }
    }
]);
```
18.  
```js
db.restaurants.find(
   {"borough":
      { $in: ["Staten Island","Queens","Bronxor Brooklyn"] },      
   },
   {
      "restaurant_id":1,
      "name":1,
      "borough":1,
      "cuisine":1
})
```

19. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.
```js
db.restaurants.find(
   {"borough":
      { $nin: ["Staten Island","Queens","Bronxor Brooklyn"] },      
   },
   {
      "restaurant_id":1,
      "name":1,
      "borough":1,
      "cuisine":1
})
```

20. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
```js
db.restaurants.find(
{"grades.score" : { $not:{$gt :10 } } },
{
   "restaurant_id" : 1,
   "name":1,
   "borough":1,
   "cuisine" :1
});
```

21. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.

```js
db.restaurants.find(
{
   "cuisine": {$nin: ['American','Chinees']},
   "name":{$regex:/^Wil/}
},
{
   "restaurant_id" : 1,
   "name":1,
   "borough":1,
   "cuisine" :1
})
```

22. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..

Note: Match atleast one

```js
db.restaurants.find({
   "grades.date": ISODate("2014-08-11T00:00:00Z"),
   "grades.grade": "A",
   "grades.score": 11   
},{
   "restaurant_id" : 1,
   "name":1,
   "grades":1
})
```

ISODate is a helper function in MongoDB used to create a date object in the ISO 8601 format. The ISO 8601 format is an international standard for representing date and time.

Usage of ISODate
MongoDB stores date and time information using the Date type, which internally represents the date in milliseconds since the Unix epoch (January 1, 1970). ISODate is used to create a Date object in the ISO 8601 format, which looks like:

```ruby
YYYY-MM-DDTHH:mm:ss.sssZ
```

Where:

- YYYY is the four-digit year,
- MM is the two-digit month,
- DD is the two-digit day,
- T separates the date and time parts,
- HH is the two-digit hour (in 24-hour format),
- mm is the two-digit minute,
- ss.sss is the seconds with optional milliseconds,
- Z represents the UTC (Coordinated Universal Time) timezone.


23. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".

```js
db.restaurants.find({
   "grades.1.date": ISODate("2014-08-11T00:00:00Z"),
   "grades.1.grade": "A",
   "grades.1.score": 9   
},{
   "restaurant_id" : 1,
   "name":1,
   "grades":1
});
```

24. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..
```js
db.restaurants.find({   
    "address.coord.1": {$gt:42, $lt:52}
},{
   "restaurant_id" : 1,
   "name":1,
   "address":1,
   "coord":1
});
```

25. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.
```js
db.restaurants.find().sort({"name":1});
```

26. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.
```js
db.restaurants.find().sort({"name":-1});
```

27. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
```js
db.restaurants.find().sort({"cuisine":1,"borough":-1});
```

28. Write a MongoDB query to know whether all the addresses contains the street or not.
```js
db.restaurants.find({
   "address.street": { $exists: true }
});
```

29. Write a MongoDB query which will select all documents in the restaurants collection where the coord field value is Double.

To select all documents in the `restaurants` collection where the `coord` field contains values of the `Double` type, you can use MongoDB's `$type` operator. The `$type` operator allows you to filter documents based on the BSON data type of a field.

In MongoDB, the type code for `Double` is `1`. Here’s the query to find all documents where `coord` has a `Double` type value:

```javascript
db.restaurants.find({
    "coord": { $type: "double" }
});
```

### Explanation

- **`"coord": { $type: "double" }`**: The `$type` operator checks the type of the `coord` field. By specifying `"double"`, MongoDB will only return documents where `coord` is a `Double` type.

### Alternative Using Type Code

If you prefer using the numeric type code, you can write the query like this:

```javascript
db.restaurants.find({
    "coord": { $type: 1 }
});
```

Here, `1` is the numeric code for `Double` in MongoDB's BSON type system. 

> **Note**: Make sure the `coord` field is directly of `Double` type. If `coord` is an array or object containing `Double` values, you would need a more complex query structure to match specific elements inside the array or object.

30. Write a MongoDB query which will select the restaurant Id, name and grades for those restaurants which returns 0 as a remainder after dividing the score by 7.
```js
db.restaurants.find(
      {"grades.score" :
         {$mod : [7,0]}
      },
         {"restaurant_id" : 1,"name":1,"grades":1}
);
```

31. Write a MongoDB query to find the restaurant name, borough, longitude and attitude and cuisine for those restaurants which contains 'mon' as three letters somewhere in its name.
```js

```

32. Write a MongoDB query to find the restaurant name, borough, longitude and latitude and cuisine for those restaurants which contain 'Mad' as first three letters of its name.
```js

```

33. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5.
```js

```

34. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan.
```js

```

35. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn.
```js

```

36. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
```js

```

37. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
```js

```

38. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
```js

```

39. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan.
```js

```

40. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
```js

```

41. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
```js

```

42. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
```js

```

43. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6.

44. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan.
```js

```

45. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
```js

```

46. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
```js

```

47. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
```js

```

48. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5.
```js

```

49. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan.
```js

```

50. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan or Brooklyn.
```js

```

51. Write a MongoDB query to find the average score for each restaurant.
```js

```

52. Write a MongoDB query to find the highest score for each restaurant.
```js

```

53. Write a MongoDB query to find the lowest score for each restaurant.
```js

```

54. Write a MongoDB query to find the count of restaurants in each borough.
```js

```

55. Write a MongoDB query to find the count of restaurants for each cuisine.
```js

```

56. Write a MongoDB query to find the count of restaurants for each cuisine and borough.
```js

```

57. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine.
```js

```

58. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each borough.
```js

```

59. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine and borough.
```js

```

60. Write a MongoDB query to find the number of restaurants that have been graded in each month of the year.
```js

```

61. Write a MongoDB query to find the average score for each cuisine.
```js

```

62. Write a MongoDB query to find the highest score for each cuisine.
```js

```

63. Write a MongoDB query to find the lowest score for each cuisine.
```js

```

64. Write a MongoDB query to find the average score for each borough.
```js

```

65. Write a MongoDB query to find the highest score for each borough.
```js

```

66. Write a MongoDB query to find the lowest score for each borough.
```js

```

67. Write a MongoDB query to find the name and address of the restaurants that received a grade of 'A' on a specific date.
```js

```

68. Write a MongoDB query to find the name and address of the restaurants that received a grade of 'B' or 'C' on a specific date.
```js

```

69. Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and one 'B' grade.
```js

```

70. Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and no 'B' grades.
```js

```

71. Write a MongoDB query to find the name ,address and grades of the restaurants that have at least one 'A' grade and no 'C' grades.
```js

```

72. Write a MongoDB query to find the name, address, and grades of the restaurants that have at least one 'A' grade, no 'B' grades, and no 'C' grades.
```js

```

73. Write a MongoDB query to find the name and address of the restaurants that have the word 'coffee' in their name.
```js

```

74. Write a MongoDB query to find the name and address of the restaurants that have a zipcode that starts with '10'.
```js

```

75. Write a MongoDB query to find the name and address of the restaurants that have a cuisine that starts with the letter 'B'.
```js

```

76. Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that ends with the letter 'y'.
```js

```

77. Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that contains the word 'Pizza'.
```js

```

78. Write a MongoDB query to find the restaurants achieved highest average score.
```js

```

79. Write a MongoDB query to find all the restaurants with the highest number of "A" grades.
```js

```

80. Write a MongoDB query to find the cuisine type that is most likely to receive a "C" grade.
```js

```

81. Write a MongoDB query to find the restaurant that has the highest average score for thecuisine "Turkish".
```js

```

82. Write a MongoDB query to find the restaurants that achieved the highest total score.
```js

```

83. Write a MongoDB query to find all the Chinese restaurants in Brooklyn.
```js

```

84. Write a MongoDB query to find the restaurant with the most recent grade date.
```js

```

85. Write a MongoDB query to find the top 5 restaurants with the highest average score for each cuisine type, along with their average scores.
```js

```

86. Write a MongoDB query to find the top 5 restaurants in each borough with the highest number of "A" grades.
```js

```

87. Write a MongoDB query to find the borough with the highest number of restaurants that have a grade of "A" and a score greater than or equal to 90.