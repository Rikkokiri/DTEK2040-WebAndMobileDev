import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name}: {props.part.exercises} exercises</p>
    )
}

const Contents = (props) => {
    return (
        <div>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
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
    const part1 = {
        name: 'Basics of React',
        exercises: 8
    }
    const part2 = {
        name: 'Using props',
        exercises: 10
    }
    const part3 = {
        name: 'Component states',
        exercises: 12
    }

    return (
        <div>
            <Header course={course} />
            <Contents parts={[part1, part2, part3]}/>
            <Total total = {[part1, part2, part3].reduce((a, c) => {return a + c.exercises}, 0)} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);