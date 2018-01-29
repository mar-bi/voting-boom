import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { NavLink, Link, withRouter } from 'react-router-dom'
import Auth from '../utils/Auth'

const styles = {
  label: { color: '#fff', fontSize: '1.25em' }
}

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

// add events to CHANGE PASSWORD and LOGOUT
// CHANGEPASSWORD => component
// LOGOUT => delete tocken from local storage + redirect
const Logged = props => {
  const handleClick = () => props.logout()

  return (
    <div>
      <NavLink exact to="/" activeClassName="active">
        <FlatButton label="Home" className="selected" />
      </NavLink>
      <NavLink to="/changepassword">
        <FlatButton label="Change Password" className="selected"/>
      </NavLink>

      <FlatButton
        label="LogOut"
        className="selected"
        onClick={handleClick}
      />
    </div>
  )
}

const MessageInit = () => (
  <div className="dashbord-message">
    <h1>Welcome to VotingBoom</h1>
    <h4>Every voice is recordered</h4>
    <h3>Create, store, and share your polls</h3>
  </div>
)

// !!! check if it has an access to {match} => username,
// then you don't need to pass state with location

const MessageUser = () => {
  const user = Auth.getUser()
  return (
    <div className="dashbord-message">
      <h1>Dashboard</h1>
      <h4>Welcome <span>{user}</span></h4>
      <Link to={`/user/${user}`}>
        <FlatButton
          backgroundColor="#00BCD4"
          label="your polls"
          className="user-button"
          labelStyle={styles.label}
          hoverColor="#EC407A"
        />
      </Link>
    </div>
  )
}

const Dashboard = props => (
  <div className="banner">
    {props.logged
      ? <MessageUser />
      : <MessageInit />
    }
  </div>
)

const Header = props => {
  const titleClick = () => props.history.push('/')
  const LogOut = () => {
    Auth.deauthenticateUser()
    props.history.push('/')
  }

  return (
    <div>
      <AppBar
        title={
          <span className="header-title" onClick={titleClick}>
            VotingBoom
          </span>
        }
        iconElementRight={Auth.isUserAuthenticated()
          ? <Logged logout={LogOut} />
          : <Login />}
        showMenuIconButton={false}
      />
      <Dashboard logged={Auth.isUserAuthenticated()} />
    </div>
  )
}

// Header.defaultProps = {
//   logged: false
// }

export default withRouter(Header)
