import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { NavLink, withRouter } from 'react-router-dom'

const Login = props => (
  <div>
    <NavLink exact to="/" activeClassName="active">
      <FlatButton label="Home" className="selected" />
    </NavLink>

    <NavLink to="/signup">
      <FlatButton label="New User" className="selected" />
    </NavLink>

    <NavLink to="/login">
      <FlatButton label="LogIn" className="selected" />
    </NavLink>
  </div>
)

const Logged = props => (
  <div>
    <FlatButton label="Home" />
    <FlatButton label="Change Password" />
    <FlatButton label="LogOut" />
  </div>
)

const messageInit = (
  <div className="dashbord-message">
    <h1>Welcome to VotingBoom</h1>
    <h4>Every voice is recordered</h4>
    <h3>Create, store, and share your polls</h3>
  </div>
)

const messageUser = (
  <div className="dashbord-message">
    <h1>Dashboard</h1>
    <h4>Every voice is recordered</h4>
    <h3>Create, share, check the results</h3>
  </div>
)

const Dashboard = props => (
  <div className="banner">{props.logged ? messageUser : messageInit}</div>
)

const Header = props => {
  const titleClick = () => props.history.push('/')

  return (
    <div>
      <AppBar
        title={
          <span className="header-title" onClick={titleClick}>
            VotingBoom
          </span>
        }
        iconElementRight={props.logged ? <Logged /> : <Login />}
        showMenuIconButton={false}
      />
      <Dashboard logged={props.logged} />
    </div>
  )
}

Header.defaultProps = {
  logged: false
}

export default withRouter(Header)
