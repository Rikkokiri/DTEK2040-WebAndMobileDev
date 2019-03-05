import React from 'react'

const DirEntry = ({ name, number, deleteEntry }) => {
  return (
    <tr><td>{name}</td><td>{number}</td><td><button onClick={deleteEntry}>Delete</button></td></tr>
  )
}

export default DirEntry