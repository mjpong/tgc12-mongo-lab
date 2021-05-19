//founded in the year 2006
db.companies.find({
    'founded_year': 2006
}, {
    'name': 1,
    'founded_year': 1
}).pretty()

//founded after 2000
db.companies.find({
    'founded_year': {
        '$gt': 2000
    }
}, {
    'name': 1,
    'founded_year': 1
})

//founded between 1900 to 2010
db.companies.find({
    'founded_year': {
        '$gte': 1900,
        '$lte': 2010
    }
},{
    'name':1,
    'founded_year':1
})

//companies w valuation higher than 100 mil
db.companies.find({
    'ipo.valuation_amount': {
        '$gt': 100000000
    }
},{
    'name':1,
    'ipo.valuation_amount': 1
})

//companies w valuation higher than 100 mil and currency == usd

db.companies.find({
    'ipo.valuation_amount': {
        '$gt': 100000000
    },
    'ipo.valuation_currency_code': {
        '$regex': 'USD', '$options': 'i'
    }
},{
    'name':1,
    'ipo.valuation_amount': 1,
    'ipo.valuation_currency_code': 1
}).pretty()