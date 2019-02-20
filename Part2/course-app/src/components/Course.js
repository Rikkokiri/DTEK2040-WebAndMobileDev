import React from 'react';

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Contents parts={course.parts} />
      <Total parts={course.parts} />
    </div >
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Contents = ({ parts }) => {
  const listparts = () => parts.map(part => <Part key={part.id} part={part} />)

  return (
    <div>
      {listparts()}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name}: {part.exercises} exercises</p>
  )
}

const Total = ({ parts }) => {
  return (
    <p>Total {parts.reduce((a, c) => { return a + c.exercises }, 0)} exercises</p>
  )
}

export default Course