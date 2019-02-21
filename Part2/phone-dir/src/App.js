import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addNumber = (event) => {
    event.preventDefault()
    console.log('Button pressed!')

    const nameObject = {
      name: this.state.newName
    }

    const persons = this.state.persons.concat(nameObject)

    this.setState({
      persons: persons,
      newName: ''
    })
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
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
            <button type="submit">Add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App