import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import FlatButton from 'material-ui/FlatButton'

import { sendPollData } from '../utils/request_helpers'
import { withRouter } from 'react-router-dom'

const styles = {
  radioButton: {
    marginBottom: 16,
    marginLeft: 16
  },
  label: { color: '#fff' }
}

// receive props from My Polls or AllPolls
class SinglePoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vote: ''
    }
    this.handleVote = this.handleVote.bind(this)
    this.sendVote = this.sendVote.bind(this)
  }

  handleVote(e, val) {
    this.setState({
      vote: val
    })
  }

  sendVote(e) {
    const poll = this.props.location.state.poll
    const vote = {
      pollname: poll.pollname,
      author: poll.author,
      question: poll.question,
      option: this.state.vote,
      value: 1
    }
    sendPollData('addVote', vote, this.props.history.push('/'))
  }

  render() {
    //console.log(this.props.location)
    const poll = this.props.location.state.poll
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
        </Paper>

        <FlatButton
          backgroundColor="#00BCD4"
          label="vote"
          className="vote-button"
          labelStyle={styles.label}
          hoverColor="#EC407A"
          onClick={this.sendVote}
        />
      </div>
    )
  }
}

export default withRouter(SinglePoll)
