import React from 'react';
import Note from './components/Note'
import Notication from './components/Notification'
import noteService from './services/notes'

class App extends React.Component {
  constructor(props) {
    super(props)

    /* NOTE: initializing the state of a component with values delivered as props is not necessarily a good practice,
    many developers even consider it an antipattern. However, if we delve into this topic more deeply,
    we can see that this problem will usually arise if the value of the props can change.
    This is not the case in our application, so we can initialize the state using props. */
    this.state = {
      notes: [],
      newNote: '',
      showAll: true,
      error: null
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('Did mount')
    noteService
      .getAll()
      .then(response => {

        console.log('Promise fulfilled')
        this.setState({
          notes: response
        })
      })
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
      // The task of generating an id is left to the server
      // id: this.state.notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(newNote => {
        this.setState({
          notes: this.state.notes.concat(newNote),
          newNote: ''
        })
      })

    /* The method concat does not change the original array this.state.notes.
    Instead, it creates a new array, which includes the new element along with the old ones.
    This is important, because the state should never be mutated directly in React! */
  }

  /* This method toggleImportanceOf is not an event handler itself.
  Instead, it is a factory that creates an event handler for each note. */
  toggleImportanceOf = (id) => {
    return () => {
      // Use ES6's template string feature to write the string:
      console.log(`importance of ${id} needs to be toggled`)

      // The array method find is used to find the note that will be changed
      // and a reference to the note is stored in the variable note.
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = {
        ...note,
        important: !note.important
      } // Applying the object spread operation

      // We could have created the new object using an older command Object.assign
      // const changedNote = Object.assign({}, note, {important: !note.important} }

      // A new note is sent to the server using a PUT request and thus it replaces the earlier note
      noteService
        .update(id, changedNote)
        .then(changedNote => {
          const notes = this.state.notes.filter(n => n.id !== id)
          this.setState({
            notes: notes.concat(changedNote)
          })
          /* In the callback function, all other notes except the modified one are stored in the App component's state.
          The modified note returned by the server is then added to the state. */
        })
        .catch(error => {
          // alert(`Unfortunately note '${note.content}' has  already been removed from the server.`)
          this.setState({
            error: `Unfortunately note '${note.content}' has  already been removed from the server.`,
            notes: this.state.notes.filter(n => n.id !== id)
          })
          setTimeout(() => {
            this.setState({
              error: null
            })
          }, 5000)
        })
    }
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({
      newNote: event.target.value
    })
  }

  toggleVisible = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  render() {
    console.log('render')
    const notesToShow =
      this.state.showAll ?
      this.state.notes :
      this.state.notes.filter(note => note.important === true)

    const label = this.state.showAll ? 'only important' : 'all'

    return ( <
      div >
      <
      h1 > Notes < /h1>

      <
      Notication message = {
        this.state.error
      }
      /> <
      div >
      <
      button onClick = {
        this.toggleVisible
      } > Show {
        label
      } < /button> <
      /div> <
      ul > {
        notesToShow.map(note =>
          <
          Note key = {
            note.id
          }
          note = {
            note
          }
          toggleImportance = {
            this.toggleImportanceOf(note.id)
          }
          />
        )
      } <
      /ul> <
      form onSubmit = {
        this.addNote
      } >
      <
      input value = {
        this.state.newNote
      }
      onChange = {
        this.handleNoteChange
      }
      /> <
      button type = "submit" > Save note < /button> <
      /form> <
      /div >
    )
  }
}

export default App;