// const http = require('http')

/*
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
*/

// ------------- Easier way with Express -------------

const express = require('express')
const app = express() /* By calling the function express, we assign an object
                         representing an Express application to the variable app */

const Note = require('./models/note')

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

app.use(express.static('build'))

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

// Format data retrieved from the database
const formatNote = (note) => {
  return {
    content: note.content,
    date: note.date,
    important: note.important,
    id: note._id
  }
}

// -------------- Routes --------------

app.get('/api/', (request, response) => {
  response.send('<h1>Note app backend</h1>')
})

app.get('/api/notes', (request, response) => {
  Note
    .find({}, { __v: 0 })
    .then(notes.map(formatNote))
    .then(formattedNotes => {
      response.json(formattedNotes)
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note
    .findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(formatNote(note))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: "malformatted id" })
    })
})

app.delete('/api/notes/:id', (request, response) => {
  Note
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: "malformatted id" })
    })
})

const generateId = () => {
  const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a, b) => a - b).reverse()[0] : 1
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    /* Note that the command return is important here. Otherwise the execution would continue until the end of the method
    and an erroneous note would be saved in the database! */
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note
    .save()
    .then(formatNote)
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
})

app.put('/api/notes/:id', (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note
    .findByIdAndUpdate(request.params.id, note, { new: true })
    .then(formatNote)
    .then(updatedAndFormattedNote => {
      response.json(updatedAndFormattedNote)
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
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