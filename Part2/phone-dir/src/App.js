import React from 'react';
import DirEntry from './components/DirEntry'
import NumberForm from './components/NumberForm'

import axios from 'axios'

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

    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise fulfilled')
        this.setState({
          persons: response.data
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
      const nameObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      const persons = this.state.persons.concat(nameObject)

      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
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
                number={person.number} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App