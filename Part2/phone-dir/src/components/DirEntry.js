import React from 'react'

const DirEntry = ({ name, number }) => {
  return (
    <tr><td>{name}</td><td>{number}</td></tr>
  )
}

export default DirEntry