import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'material-ui/Tabs'

import GridWithButtons from './GridWithButtons'
import PollForm from './PollForm'

const UserTabs = ({ match }) => (
  <Tabs className="user-tabs">
    <Tab label="New Poll">
      <div>
        <PollForm user={match.params.userId} />
      </div>
    </Tab>
    <Tab label="My Polls">
      <GridWithButtons user={match.params.userId} />
    </Tab>
  </Tabs>
)

export default UserTabs

UserTabs.propTypes = {
  match: PropTypes.object
}
