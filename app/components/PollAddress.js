import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
//import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
//import ActionFavorite from 'material-ui/svg-icons/action/favorite'
//import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

const styles = {
  label: { color: '#fff', fontSize: '1.125em' }
}

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

export default PollAddress

PollAddress.propTypes = {
  location: PropTypes.object
}
