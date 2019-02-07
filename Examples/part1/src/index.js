import React from 'react';
import ReactDOM from 'react-dom';

const Hello = () => {
    return (
        <div>
            <p>Hello World</p>
        </div>
    )
}

const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;

    return (
    <div>
        <p>Hello world, it is now {now.toString()}</p>
        <p>{a} plus {b} is {a + b}</p>
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));