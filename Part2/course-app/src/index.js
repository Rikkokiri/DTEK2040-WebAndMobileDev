import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
            {
                name: 'Basics of React',
                exercises: 8,
                id: 1
            },
            {
                name: 'Using props',
                exercises: 10,
                id: 2
            },
            {
                name: 'Component states',
                exercises: 12,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);