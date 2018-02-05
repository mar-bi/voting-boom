import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import { getPoll } from '../utils/request_helpers'

const styles = {
  label: { color: '#fff', fontSize: '1.125em' }
}

class PollAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {}
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
      <div className="single-poll-container">
        <Paper className="single-poll">
          <div>
            <h3>{poll.pollname}</h3>
            <h4 className="author">
              <span>Author: </span>
              {poll.author}
            </h4>
          </div>
          <div>
            <h4>Poll address:</h4>
            <a href={`${poll.link}`} target="_blank" className="poll-link">{`${
              poll.link
            }`}</a>
          </div>

          <Link to="/" className="home-button">
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

export default PollAddress

PollAddress.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}
