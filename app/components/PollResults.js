import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

// get access to the data (votes) for particular poll and build the results
// using D3 library (simple barchart)

const PollResults = props => {
  const poll = props.location.state.poll
  const arr = [...poll.votes]
  return (
    <div className="poll-results-container">
      <Paper zDepth={2}>
        <h3>{props.match.params.pollId} <br/> <span>Poll Results</span></h3>
        <div>
          <h4>Results</h4>
          {arr.map((elem, index) => (
            <p key={index}>{`${elem.option}: ${elem.num}`}</p>
          ))}
        </div>
      </Paper>
    </div>
  )
}

export default PollResults
