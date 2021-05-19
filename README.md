To see all databases

```
show databases
```

To set the current active database

```
use sample_airbnb
```

To display all the collections in active database

```
show collections
```

To check the current active database
```
db
```

Show all the documents in a collection

```
db.<name of collection>.find()

// display all documents from the listingsAndReviews collection
db.listingsAndReviews.find()
```
To beautify (that is, to format) the output:
```
db.listingsAndReviews.find().pretty()
```
## Projecting
To extract only certain keys from the document is known as
`projecting`

Show only the name, address and beds key from each document
```
db.listingsAndReviews.find({},{
    'name': 1,
    'address': 1,
    'beds':1
}).pretty()
```

# Limit
Restrict the maximum number of results to the first nth results:

```
db.listingsAndReviews.find({},{
    'name': 1,
    'beds':1,
    'address':1,
    'minimum_nights':1,
    'maximum_nights':1
}).pretty().limit(5)
```

# Project keys of a sub-document (aka embedded document)
```
db.listingsAndReviews.find({},{
    'name':1,
    'beds':1,
    'address.country':1
}).pretty().limit(5)
```
# Querying

## Search by an exact value

Find all the listings where they have exactly **two** beds

```
db.listingsAndReviews.find({
    'beds': 2
}, {
    'name':1,
    'beds':1
})
```
Find all listings where they are in Brazil and the number of beds
is exactly 2

```
db.listingsAndReviews.find({
    'beds':2,
    'address.country':'Brazil'
},{
    'beds':1,
    'name':1,
    'address.country':1
}).pretty()
```
## Find by range of values or inequality

Find all the listings that have more than 3 beds:
```
db.listingsAndReviews.find({
    'beds': {
        '$gt':3
    },
    'address.country':'Brazil'
}, {
    'name':1,
    'beds':1,
    'address.country':1
})
```
Use `$gte` for **greater than or equal** and `$lt` for **lesser than** and
`$lte` for **lesser than or equal** and `$ne` for **not equal**

Find all listings that have more than 3 beds but less than 10 beds
```
db.listingsAndReviews.find({
    'beds': {
        '$gt': 3,
        '$lt': 10
    },
    'address.country':'Brazil'
}, {
    'beds':1,
    'address.country':1
})
```

## Find by elements in an array

Show all the listings with `Kitchen` inside the array of amenities

```
db.listingsAndReviews.find({
    'amenities':'Kitchen'
}, {
    'name':1,
    'amenities':1
}).pretty()
```

Find all listings that  have either **TV** or **Cable TV**

```
db.listingsAndReviews.find({
    'amenities': {
        '$in':['TV', 'Cable TV']
    }
}, {
    'name':1,
    'amenities':1
}).pretty()
```

Find all listings that have ALL of specified amenities. For example, all listings that have **Kitchen** and **Oven**. 

```
db.listingsAndReviews.find({
    'amenities':{
        '$all':['Kitchen', 'Oven']
    }
},{
    'name':1,
    'amenities':1
}).pretty()
```

Find all the listings that have "Internet" and "Cable TV"

```
db.listingsAndReviews.find({
    'amenities':{
        '$all':['Internet', 'Cable TV']
    }
},{
    'name':1,
    'amenities':1
})
```

## Find documents by their ID
```
use sample_mflix;
db.movies.find({
    '_id':ObjectId("573a1390f29313caabcd5b9a")
}).pretty()
```
## Find by Date
To specify a date, we muse the `ISODate` object

```
use sample_airbnb;
db.listingsAndReviews.find({
    'first_review':{
        '$gte': ISODate('2018-01-01')
    }
},{
    'name':1,
    'first_review':1
})
```

## Search by string patterns and to ignore case
Find all listings that the substring `Spacious` inside and ignore case

```
db.listingsAndReviews.find({
    'name':{
        '$regex':'apartment for \[0-9]',
        '$options':'i'
    }
},{
    'name':1
})
```

Find all listings which name includes the pattern "apartment for x" where x is a number


```
db.listingsAndReviews.find({
    'name':{
        '$regex':'apartment for \[0-9]',
        '$options':'i'
    }
},{
    'name':1
})
```

## Logical operators

`and` is basically just putting the criteria in the same object.

Find all the listings from Brazil or Canada with 3 or more beds

```
db.listingsAndReviews.find({
    '$or':[
        {
            'address.country':'Brazil'
        },
        {
            'address.country':'Canada',
            'beds':{
                '$gte':3
            }
        }
    ]
}, {
    'address.country':1,
    'beds':1
})
```

Show all the listings not from Brazil or Canada

```
db.listingsAndReviews.find({
    'address.country': {
        '$not': {
            '$in':['Brazil', 'Canada']
        }
    }
},{
    'name':1,
    'address.country':1
})
```
## Find by nested elements
db.transactions.find({
    'transactions.transaction_code':'buy'
},{
    'transactions': {
        '$elemMatch': {
            'transaction_code':'buy'
        }
    }
}).pretty();

# How to create our own database

When we `use` a non-existent database, Mongo will assume that we want to create a new database

```
use animal_shelter
```

Mongo will assume the database exists. However the new database won't be saved until
we add a new collection to do it.

## How to add a collection to a database

By inserting a new document to a collection, we create it.

```
db.animals.insert({
    "name":"Fluffy",
    "age":3,
    "breed":"Golden Retriever",
    "species":"Dog"
})
```

## Insert many into a document


```
db.animals.insertMany([
    {
        'name':'Muffin',
        'age':10,
        'breed':'Orange Tabby',
        'species':'Cat'
    },
    {
        'name':'Carrots',
        'age': 2.5,
        'breed':'Bunny',
        'species':'Bunny'
    }
])
```


## Update a document: PATCH

Update function will match the document by the first critera, and then the second critera is what to change/add to the matched document
```
db.animals.update({
    '_id':ObjectId('60a4c1cc5baac29f72a7e209')
},{
    '$set':{
        'age':4,
        'house_broken':true
    }
})
```

## The PUT method (aka. the Prestige method)
```
db.animals.update({
    '_id':ObjectId('60a4c2eb5baac29f72a7e20b')
},{
    'name':'Carrots',
    'age':2.5,
    'breed': 'Norwegian Forest Cat',
    'species':'Cat'
})
```

## Update many

Increase the age of all cats by 1. The updateMany function can change ALL the documents that matches
the critera in the first parameter.

```
db.animals.updateMany({
    'species':'Cat'
},{
    '$inc': {
        'age': 1
    }
})
```