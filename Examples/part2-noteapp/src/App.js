import React from 'react';
import Note from './components/Note'

class App extends React.Component {
  constructor(props) {
    super(props)

    /* NOTE: initializing the state of a component with values delivered as props is not necessarily a good practice,
    many developers even consider it an antipattern. However, if we delve into this topic more deeply,
    we can see that this problem will usually arise if the value of the props can change.
    This is not the case in our application, so we can initialize the state using props. */
    this.state = {
      notes: props.notes,
      newNote: ''
    }
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: this.state.notes.length + 1
    }

    /* The method concat does not change the original array this.state.notes.
    Instead, it creates a new array, which includes the new element along with the old ones.
    This is important, because the state should never be mutated directly in React! */
    const notes = this.state.notes.concat(noteObject)

    this.setState({
      notes: notes,
      newNote: ''
    })
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {this.state.notes.map(note => <Note key={note.id} note={note} />)}
        </ul>
        <form onSubmit={this.addNote}>
          <input
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type="submit">Save note</button>
        </form>
      </div >
    )
  }
}

export default App;
