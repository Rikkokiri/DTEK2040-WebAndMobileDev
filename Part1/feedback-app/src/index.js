import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, clickHandler}) => (
    <button onClick={clickHandler}>
        {text}
    </button>
)

const Statistics = ({data}) => {
    // Calculate percentage of positives
    const positive = (positiveCount, totalCount) => {
        return Math.round((positiveCount / totalCount)*1000 ) / 10
    }

    // Calculate average
    const average = (valueSum, totalCount) => {
        return Math.round( (valueSum / totalCount) * 100 ) / 100
    }

    if(data.voteCount === 0) {
        return (
            <div>No statistics available</div>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic name="Good" value={data.good}/> {/* Number of 'good' reviews */}
                <Statistic name="Neutral" value={data.neutral}/> {/* Number of 'neutral' reviews */}
                <Statistic name="Bad" value={data.bad}/> {/* Number of 'bad' reviews */}
                <Statistic name="Average" value={average(data.sum, data.voteCount)}/> {/* Average */}
                <Statistic name="Positive" value={positive(data.good, data.voteCount).toString() + " %"} /> {/* Percentage of positive reviews */}
            </tbody>
        </table>
    )
}

const Statistic = ({name, value}) => {
    return (
        <tr>
        <td>{name}</td>
        <td>{value}</td>
        </tr>
    )
}

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
    
    /*
    voteHandler = (name, value) => {
        this.setState({
            [name]: +1,
            sum: this.state.sum + [value]
        })
    }*/

    render() {
        return (
            <div>
                <h2>Give Feedback</h2>
                <Button text = "Good" clickHandler={this.clickGood} />
                <Button text = "Neutral" clickHandler={this.clickNeutral} />
                <Button text = "Bad" clickHandler={this.clickBad} />
                
                <h2>Statistics</h2>
                <Statistics data={this.state}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));