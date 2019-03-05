import React from 'react'

const NumberForm = ({ newName, newNumber, addNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        Name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        Number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default NumberForm