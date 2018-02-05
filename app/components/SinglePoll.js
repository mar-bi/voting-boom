import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import FlatButton from 'material-ui/FlatButton'

import { sendVote, getPoll } from '../utils/request_helpers'
import { withRouter } from 'react-router-dom'

const styles = {
  radioButton: {
    marginBottom: 16,
    marginLeft: 16
  },
  label: { color: '#fff' }
}

class SinglePoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {
        _id: '',
        pollname: '',
        author: '',
        question: '',
        answers: [],
        link: '',
        votes: []
      },
      vote: ''
    }
    this.handleVote = this.handleVote.bind(this)
    this.sendVote = this.sendVote.bind(this)
    this.returnBack = this.returnBack.bind(this)
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

  handleVote(e, val) {
    this.setState({
      vote: val
    })
  }

  sendVote() {
    const poll = this.state.poll
    const vote = {
      _id: poll._id,
      option: this.state.vote
    }
    
    const redirect = result => {
      const location = {
        pathname: `/polls/results/${poll.author}-${poll.pollname}`,
        state: { poll: result }
      }
      this.props.history.push(location)
    }
    sendVote(vote, redirect)
  }

  returnBack() {
    this.props.history.goBack()
  }

  render() {
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
            <h4>{poll.question}</h4>
            <div>
              <RadioButtonGroup name="answer" onChange={this.handleVote}>
                {poll.answers.map((item, index) => (
                  <RadioButton
                    key={`ans-${index}`}
                    value={item}
                    label={item}
                    checkedIcon={
                      <ActionFavorite style={{ color: '#F44336' }} />
                    }
                    uncheckedIcon={<ActionFavoriteBorder />}
                    style={styles.radioButton}
                  />
                ))}
              </RadioButtonGroup>
            </div>
          </div>
          <div className="vote-buttons-container">
            <FlatButton
              backgroundColor="#00BCD4"
              label="vote"
              className="vote-button"
              labelStyle={styles.label}
              hoverColor="#EC407A"
              onClick={this.sendVote}
            />
            <FlatButton
              backgroundColor="#757575"
              label="back"
              className="vote-button"
              labelStyle={styles.label}
              hoverColor="#EC407A"
              onClick={this.returnBack}
            />
          </div>
        </Paper>
      </div>
    )
  }
}

export default withRouter(SinglePoll)

SinglePoll.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
}
