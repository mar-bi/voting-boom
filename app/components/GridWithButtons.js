import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ContentLink from 'material-ui/svg-icons/content/link'
import { getPolls, deletePoll } from '../utils/request_helpers'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = {
  label: { color: '#fff' }
}

class GridWithButtons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: []
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    const changeState = arr => this.setState({ polls: arr })
    const loadUserPolls = () => getPolls(user, changeState)
    loadUserPolls()
  }

  handleDelete(index) {
    let arr = [...this.state.polls]
    const poll = arr[index]
    const changeState = result => this.setState({ polls: result })
    const updatePolls = () =>
      deletePoll(
        {
          _id: poll._id,
          author: poll.author
        },
        changeState
      )
    updatePolls()
  }

  handleClick(route, item) {
    const location = {
      pathname: `/polls/${route}`,
      state: { poll: item }
    }
    this.props.history.push(location)
  }

  render() {
    const polls = this.state.polls,
      last = polls.length - 1
    return (
      <Paper className="poll-grid" zDepth={2}>
        <List>
          {polls.map((item, index) => {
            if (index !== last) {
              return (
                <div key={index}>
                  <ListItem
                    primaryText={<h4>{item.pollname}</h4>}
                    secondaryText={<h5>{`Author: ${item.author}`}</h5>}
                    rightIconButton={
                      <IconButton
                        tooltip="link to poll"
                        onClick={this.handleClick.bind(
                          null,
                          `link/${item.author}-${item.pollname}`,
                          item
                        )}
                      >
                        <ContentLink />
                      </IconButton>
                    }
                    onClick={this.handleClick.bind(
                      null,
                      `${item.author}-${item.pollname}`,
                      item
                    )}
                  />

                  <div className="user-poll-buttons">
                    <FlatButton
                      backgroundColor="#00BCD4"
                      label="results"
                      labelStyle={styles.label}
                      onClick={this.handleClick.bind(
                        null,
                        `results/${item.author}-${item.pollname}`,
                        item
                      )}
                    />

                    <FlatButton
                      backgroundColor="#EC407A"
                      label="Delete"
                      labelStyle={styles.label}
                      onClick={e => this.handleDelete(index)}
                    />
                  </div>
                  <Divider />
                </div>
              )
            } else {
              return (
                <div key={index}>
                  <ListItem
                    primaryText={<h4>{item.pollname}</h4>}
                    secondaryText={<h5>{`Author: ${item.author}`}</h5>}
                    rightIconButton={
                      <IconButton
                        tooltip="link to poll"
                        onClick={this.handleClick.bind(
                          null,
                          `link/${item.author}-${item.pollname}`,
                          item
                        )}
                      >
                        <ContentLink />
                      </IconButton>
                    }
                    onClick={this.handleClick.bind(
                      null,
                      `${item.author}-${item.pollname}`,
                      item
                    )}
                  />

                  <div className="user-poll-buttons">
                    <FlatButton
                      backgroundColor="#00BCD4"
                      label="results"
                      labelStyle={styles.label}
                      onClick={this.handleClick.bind(
                        null,
                        `results/${item.author}-${item.pollname}`,
                        item
                      )}
                    />

                    <FlatButton
                      backgroundColor="#EC407A"
                      label="Delete"
                      labelStyle={styles.label}
                      onClick={e => this.handleDelete(index)}
                    />
                  </div>
                </div>
              )
            }
          })}
        </List>
      </Paper>
    )
  }
}

GridWithButtons.propTypes = {
  user: PropTypes.string.isRequired,
  history: PropTypes.object
}

export default withRouter(GridWithButtons)
