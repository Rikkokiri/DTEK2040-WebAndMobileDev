// const http = require('http')

/*
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(notes))
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
*/

// ------------- Easier way with Express -------------

const express = require('express')
const app = express() /* By calling the function express, we assign an object
                         representing an Express application to the variable app */

// --------------- Middleware -----------------
/*
- In Express, middleware functions are functions that have access to request and response objects.
- body-parser, for example, takes the raw data from a request object, parses it into a JavaScript object
  and places the object into the body property of request
- An app can use several pieces of middleware, in which case they are executed successively in the order
  they have been taken into use in the code.
*/

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

/* Let us implement a simple middleware function
that prints some basic information about the arriving requests to the console. */
const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')

  // At the end, middleware calls the function next received as a parameter.
  // This function is used to transfer the control to the next middleware function.
  next()
}

// Middleware can be taken into use as follows:
app.use(logger)

// ------ Data -------------

let notes = [
  {
    id: 1,
    content: 'HTML on helppoa',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true
  }
]

// -------------- Routes --------------

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res
  res.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a, b) => a - b).reverse()[0] : 1
  return maxId + 1
}

app.post('/notes', (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    /* Note that the command return is important here. Otherwise the execution would continue until the end of the method
    and an erroneous note would be saved in the database! */
    return res.status(400).json({ error: 'content missing' })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    data: new Date(), // Timestamp should be created on the server side because client's computer cannot be trusted
    id: generateId()
  }

  notes = notes.concat(note)

  res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// ------- More middleware --------

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)