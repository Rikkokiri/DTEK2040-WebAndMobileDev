import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1
        }

        /* The state of React components in the variable this.state should not be updated directly.
         * Instead, you must always use function setState for this purpose.
         * Calling the function updates the state and causes the component to be re-rendered
         * (assuming this has not been prevented, as we will discuss later). */
        /*setInterval(() => {
            this.setState({counter: this.state.counter + 1 })
        }, 1000)
        */
    }

    render() {
        return (
            <div>
                <div>{this.state.counter}</div>
                <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>
                    Plus
                </button>
                <button onClick={() => this.setState({ counter: 0 })}>
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