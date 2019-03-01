import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'Make not important' : 'Make important'
  return (
    <li><button onClick={toggleImportance}>{label}</button>{note.content} </li>
  )
}

export default Note