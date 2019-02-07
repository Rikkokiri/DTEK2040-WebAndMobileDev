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
        <p>Total {props.parts.reduce((a, c) => {return a + c.exercises}, 0)} exercises</p>
    )
}

const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
            {
            name: 'Basics of React',
            exercises: 8
            },
            {
                name: 'Using props',
                exercises: 10
            },
            {
                name: 'Component states',
                exercises: 12
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Contents parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);