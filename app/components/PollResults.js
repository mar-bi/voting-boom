import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import BarChart from './BarChart'

// styles for barchart
const styles = {
  width: 500,
  height: 300,
  padding: 30,
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
          <BarChart data={poll.votes} style={styles} />
        </div>
        <Link to="/">
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
