import React from 'react'
import Grid from './Grid'

import { getPolls } from '../utils/request_helpers'
import { appData } from '../utils/data'

class AllPolls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPolls: []
    }
  }

  componentDidMount() {
    // getPolls().then(
    //   function(res) {
    //     this.setState({
    //       allPolls: res
    //     })
    //   }.bind(this)
    // )

    // !!!FOR TESTING - remove later
    this.setState({
      allPolls: appData.polls
    });
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
