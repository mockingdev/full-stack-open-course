const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
    console.log('Please invalid argument: node mongo.js <password> [<personName> <personNumber>]')
    process.exit(1)
}

const password = process.argv[2]
var savePerson = false

if (process.argv[3] && process.argv[4]) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    savePerson = true
}

const url = `mongodb+srv://fullstack:${password}@cluster0.hzrpt.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (savePerson) {
    const person = new Person({
        name: newName,
        number: newNumber,
    })

    person.save().then(result => {
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('PhoneBook:')
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
}