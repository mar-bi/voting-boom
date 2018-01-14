import React from 'react'
import Grid from './Grid'

import { getPolls } from '../utils/request_helpers'

class AllPolls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPolls: []
    }
  }

  componentDidMount() {
    const changeState = arr => this.setState({ allPolls: arr })
    const loadPolls = () => getPolls(undefined, changeState)
    loadPolls()
  }

  render() {
    return (
      <div className="user-tabs">
        <h3>Available Polls</h3>
        <Grid polls={this.state.allPolls} />
      </div>
    )
  }
}

export default AllPolls
