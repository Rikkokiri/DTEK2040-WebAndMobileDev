import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const {counter} = props
    
    return (
        <div>
            <h1>Counter</h1>
            <div>{counter.value}</div>
        </div>
    )
}

const counter = {
    value: 1
}

const rendering = () => {
    ReactDOM.render(
        <App counter={counter}/>,
        document.getElementById('root')
    )
}

setInterval(() => {
    rendering()
    counter.value += 1;
}, 1000)