import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import BarChart from './BarChart'

// styles for barchart
const chartStyles = {
  width: 420,
  height: 280,
  padding: 25
}

const chartStylesMobile = {
  width: 260,
  height: 196,
  padding: 20
}

const styles = {
  label: { color: '#fff', fontSize: '1.125em' }
}

// get access to the data (votes) for particular poll and build the results
// using D3 library (simple barchart)

const PollResults = props => {
  const poll = props.location.state.poll
  return (
    <div className="poll-results-container">
      <Paper zDepth={2}>
        <h3>
          {props.match.params.pollId} <br /> <span>Poll Results</span>
        </h3>
        <div>
          <div className="chart-std">
            <BarChart data={poll.votes} style={chartStyles} />
          </div>
          <div className="chart-mob">
            <BarChart data={poll.votes} style={chartStylesMobile} />
          </div>
        </div>
        <Link to="/" className="home-button chart">
          <FlatButton
            backgroundColor="#EC407A"
            label="home"
            labelStyle={styles.label}
            hoverColor="#00BCD4"
          />
        </Link>
      </Paper>
    </div>
  )
}

export default PollResults
