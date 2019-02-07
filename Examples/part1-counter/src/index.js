import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1
        }
    }

    /* The reason why this of an arrow function works in a way similar to e.g. the this keyword in Java
     * is that the arrow functions have a so called lexical this.
     * In other words, this is determined according to the context where the method is defined in.
     * When a method is defined as a class property, the definition context is the App component. */
    incrementCounterByOne = () => {
        this.setState({ counter: this.state.counter + 1 })
    }

    resetCounter = () => {
        this.setState({counter: 0 })
    }

    render() {
        return (
            <div>
                <div>{this.state.counter}</div>
                <button onClick={this.incrementCounterByOne}>
                    Plus
                </button>
                <button onClick={this.resetCounter}>
                    Reset Counter
                </button>
            </div>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById('root')
)

/*
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
*/