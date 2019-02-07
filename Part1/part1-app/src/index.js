import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.part}: {props.exercises} exercises</p>
    )
}

const Contents = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} exercises={props.exercises[0]}/>
            <Part part={props.parts[1]} exercises={props.exercises[1]} />
            <Part part={props.parts[2]} exercises={props.exercises[2]} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Total {props.total} exercises</p>
    )
}

const App = () => {
    const course = 'Superadvanced web and mobile programming'
    const part1 = 'Basics of React'
    const exercises1 = 8
    const part2 = 'Using props'
    const exercises2 = 10
    const part3 = 'Component states'
    const exercises3 = 12

    return (
        <div>
            <Header course={course} />
            <Contents parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
            <Total total = {exercises1 + exercises2 + exercises3} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);