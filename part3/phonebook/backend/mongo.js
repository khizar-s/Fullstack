const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.ean2q.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {

  const generateId = () => {
    return Math.floor(Math.random()*100000)
  }

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: generateId()
  })

  person.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })

} else {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}