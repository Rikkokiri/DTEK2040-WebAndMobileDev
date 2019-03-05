import React from 'react';
import DirEntry from './components/DirEntry'
import NumberForm from './components/NumberForm'
import NumbersService from './services/numbers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
  }

  componentDidMount() {
    console.log('Did mount')

    NumbersService
      .getAll()
      .then(response => {
        console.log('Promise fulfilled')
        this.setState({
          persons: response
        })
      })
  }

  addNumber = (event) => {
    event.preventDefault()

    // If the directory already includes the name that user tries to add, prevent adding it.
    if (this.state.persons.map(person => person.name).indexOf(this.state.newName) !== -1) {
      alert("Name '" + this.state.newName + "' already exists in the phone directory and can't be added.")

      this.setState({
        newName: ''
      })
    }
    else {
      const entryObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      NumbersService
        .create(entryObject)
        .then(newEntry => {
          this.setState({
            persons: this.state.persons.concat(newEntry),
            newName: '',
            newNumber: ''
          })
        })
    }
  }

  /* This method deleteNumber is not an event handler itself.
  Instead, it is a factory that creates an event handler for each number entry. */
  deleteEntry = (name) => {
    return () => {
      console.log(`Entry ${name} needs to be deleted`)

      if (window.confirm(`Do you want to delete entry for ${name}?`)) {
        const entryToDelete = this.state.persons.find(p => p.name === name)

        NumbersService
          .remove(entryToDelete.id)
          .then(response => {
            const persons = this.state.persons.filter(p => p.id !== entryToDelete.id)
            this.setState({
              persons: persons
            })
          })
      }
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Phone Directory</h2>
        <NumberForm
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          addNumber={this.addNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
        />
        <h2>Numbers</h2>
        <table>
          <tbody>
            {this.state.persons.map(person =>
              <DirEntry
                key={person.name}
                name={person.name}
                number={person.number}
                deleteEntry={this.deleteEntry(person.name)} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App