import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '040-123456'
        }
      ],
      newName: '',
      newNumber: ''
    }
  }

  addNumber = (event) => {
    event.preventDefault()
    console.log('Button pressed!')
    console.log(event.target)

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
        <form onSubmit={this.addNumber}>
          <div>
            Name: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            Number: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <table>
          <tbody>
            {this.state.persons.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App