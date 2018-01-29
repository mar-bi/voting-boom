import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import FlatButton from 'material-ui/FlatButton'

const PollAddress = props => {
  const poll = props.location.state.poll
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
          <a href={`${poll.link}`} target="_blank">{`${poll.link}`}</a>
        </div>
      </Paper>
    </div>
  )
}

export default PollAddress
