//fake_school
use fake_school

db.students.insertMany([
    {
        'name': 'Jane Doe',
        'age': 13,
        'subjects': [
            'Defensive Against the Dark Arts',
            'Charms',
            'History of Magic'
        ],
        'date_enrolled': ISODate('2016-05-13')
    },
    {
        'name': 'James Verses',
        'age': 14,
        'subjects': [
            'Transfiguration',
            'Alchemy'
        ],
        'date_enrolled': ISODate('2015-06-15')
    },
    {
        'name': 'Jonathan Goh',
        'age': 12,
        'subjects': [
            'Divination',
            'Study of Ancient Runes'
        ],
        'date_enrolled': ISODate('2017-04-16')
    }
])

// increase all age by 1
db.students.updateMany({},{
    '$inc': {
        'age':1
    }
})

// change date enrolled of jonathan goh to 2018 13th may
db.students.update({
    '_id':ObjectId('60a4c607d2265c6cb7574a77')
},{
    '$set': {
        'date_enrolled': ISODate('2018-05-13')
    }
})

// change age of James Verses to 13
db.students.update({
    '_id':ObjectId('60a4c607d2265c6cb7574a76')
},{
    'name': 'James Verses',
    'age': 13,
    'subjects': [
        'Transfiguration',
        'Alchemy'
    ],
    'date_enrolled': ISODate('2015-06-15')
},)

// change name of jane doe to jane doe jr
db.students.update({
    '_id':ObjectId('60a4c607d2265c6cb7574a75')
},{
    'name': 'Jane Doe Jr',
        'age': 11,
        'subjects': [
            'Defensive Against the Dark Arts',
            'Charms',
            'History of Magic'
        ],
        'date_enrolled': ISODate('2016-05-13')
},)