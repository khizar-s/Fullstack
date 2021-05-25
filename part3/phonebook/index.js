const { response, request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ')
}))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Default Page</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br/> <br/> ${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(400).end()
})

const generateId = () => {
    return Math.floor(Math.random()*100000)
}

const nameExists = (name) => {
    const arr = persons.filter(person => person.name === name)
    return (arr.length > 0)
}

app.post('/api/persons', (request, response) => {
    const id = generateId()
    const body = request.body

    if (nameExists(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else if (!body.name) {
        return response.status(400).json({
            error: 'please enter a name'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'please enter a number'
        })
    }

    const person = {
        "name": body.name,
        "number": body.number,
        "id": id
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)