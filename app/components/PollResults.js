import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import BarChart from './BarChart'
import { getPoll } from '../utils/request_helpers'

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

class PollResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {
        votes: []
      }
    }
  }

  componentDidMount() {
    const poll = this.props.location.state || false

    if (poll) {
      // from location
      this.setState({ poll: this.props.location.state.poll })
    } else {
      // from DB
      console.log('get poll from DB')

      const pollName = this.props.match.params.pollId,
        index = pollName.indexOf('-'),
        author = pollName.slice(0, index),
        poll = pollName.slice(index + 1)

      const changeState = poll => this.setState({ poll: poll })
      const loadPoll = () => getPoll(author, poll, changeState)
      loadPoll()
    }
  }

  render(){
    const poll = this.state.poll
    return (
      <div className="poll-results-container">
        <Paper zDepth={2}>
          <h3>{poll.pollname}</h3>
          <h5>Author: {poll.author}</h5>
          <h4>Poll Results</h4>
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
}

export default PollResults

PollResults.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
