import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// get props with array of polls and dymanically generates grid of polls
const Grid = props => {
  const polls = props.polls,
    last = polls.length - 1,
    match = props.match

  return (
    <div>
      <Paper className="poll-grid" zDepth={2}>
        <List>
          {polls.map((item, index) => {
            if (index !== last) {
              return (
                <div key={index}>
                  <Link
                    to={{
                      pathname: `/polls/${item.pollname}-${index}`,
                      state: { poll: item }
                    }}
                  >
                    <ListItem
                      primaryText={<h4>{item.pollname}</h4>}
                      secondaryText={`Author: ${item.author}`}
                    />
                    <Divider />
                  </Link>
                </div>
              )
            } else {
              return (
                <div key={index}>
                  <Link
                    to={{
                      pathname: `/polls/${item.pollname}-${index}`,
                      state: { poll: item }
                    }}
                  >
                    <ListItem
                      primaryText={<h4>{item.pollname}</h4>}
                      secondaryText={<h5>{`Author: ${item.author}`}</h5>}
                    />
                  </Link>
                </div>
              )
            }
          })}
        </List>
      </Paper>
    </div>
  )
}

Grid.propTypes = {
  polls: PropTypes.array.isRequired
}

export default Grid
