const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan');

const app = express()

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));

let persons = [{
        id: 1,
        name: "Pepe",
        number: "954 123 466"
    },
    {
        id: 2,
        name: "Juan",
        number: "955 456 987"
    },
    {
        id: 3,
        name: "Manuel",
        number: "600 123 487"
    },
    {
        id: 4,
        name: "Maria",
        number: "654 999 888"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Exercises 37 to 38</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    var fecha = Date();
    response.send(`<p>PhoneBook has info for ${persons.length} persons</p><p>${fecha}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const min = 1
    const max = 100
    const newId = Math.random() * (max - min) + min
    return Math.floor(newId);
}

const duplicateName = (name) => {
    var exist = false
    const person = persons.find(person => person.name === name)
    if (person) {
        exist = true
    }
    return exist;
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if (duplicateName(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})