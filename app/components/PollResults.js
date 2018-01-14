import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

// get access to the data (votes) for particular poll and build the results
// using D3 library (simple barchart) 
const PollResults = props => (
  <div className="poll-results-container">
    <Paper zDepth={2}>
      <h3>{props.match.params.pollId} <br/> <span>Poll Results</span></h3>
      <div>
        Here is the place for a graph.
      </div>
    </Paper>
  </div>
)

export default PollResults
