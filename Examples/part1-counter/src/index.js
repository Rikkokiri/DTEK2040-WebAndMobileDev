import React from 'react';
import ReactDOM from 'react-dom';

const Display = ({counter}) => <div>{counter}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }

    /* The reason why this of an arrow function works in a way similar to e.g. the this keyword in Java
     * is that the arrow functions have a so called lexical this.
     * In other words, this is determined according to the context where the method is defined in.
     * When a method is defined as a class property, the definition context is the App component. */
    incrementCounterByOne = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }));
    }

    resetCounter = () => {
        this.setState({counter: 0 })
    }

    render() {
        return (
            <div>
                <Display counter = {this.state.counter} />
                <Button handleClick={this.incrementCounterByOne} text="Plus" />
                <Button handleClick={this.resetCounter} text="Reset Counter" />
            </div>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById('root')
)