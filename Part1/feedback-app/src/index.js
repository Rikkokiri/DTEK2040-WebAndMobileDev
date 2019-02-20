import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CustomButton = ({ text, clickHandler }) => (
    <button onClick={clickHandler} className="CustomButton">
        {text}
    </button>
)

const Statistics = ({ data }) => {
    // Calculate percentage of positives
    const positive = (positiveCount, totalCount) => {
        return Math.round((positiveCount / totalCount) * 1000) / 10;
    }

    // Calculate average
    const average = (valueSum, totalCount) => {
        return Math.round((valueSum / totalCount) * 100) / 100;
    }

    if (data.voteCount === 0) {
        return (
            <div>No statistics available</div>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic name="Good" value={data.good} />
                <Statistic name="Neutral" value={data.neutral} />
                <Statistic name="Bad" value={data.bad} />
                <Statistic name="Average" value={average(data.sum, data.voteCount)} />
                <Statistic name="Positive" value={positive(data.good, data.voteCount).toString() + " %"} />
            </tbody>
        </table>
    )
}

const Statistic = ({ name, value }) => (
    <tr><td>{name}</td><td>{value}</td></tr>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
            sum: 0,
            voteCount: 0
        }
    }

    clickGood = () => {
        this.setState({
            good: this.state.good + 1,
            sum: this.state.sum + 1,
            voteCount: this.state.voteCount + 1
        })
    }

    clickNeutral = () => {
        this.setState({
            neutral: this.state.neutral + 1,
            voteCount: this.state.voteCount + 1
        })
    }

    clickBad = () => {
        this.setState({
            bad: this.state.bad + 1,
            sum: this.state.sum - 1,
            voteCount: this.state.voteCount + 1
        })
    }

    render() {
        return (
            <div className="AppContainer">
                <h1>Give Feedback</h1>
                <CustomButton text="Good" clickHandler={this.clickGood} />
                <CustomButton text="Neutral" clickHandler={this.clickNeutral} />
                <CustomButton text="Bad" clickHandler={this.clickBad} />

                <div className="StatisticsContainer">
                    <h2>Statistics</h2>
                    <Statistics data={this.state} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));