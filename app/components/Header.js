import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { NavLink, Link, withRouter } from 'react-router-dom'
import Auth from '../utils/Auth'

const styles = {
  icon: {color: '#fff'},
  title: {width: '50%'}
}

const loginItems = {
  items: ["Home", "New User", "LogIn"],
  links: ["/", "/signup", "/login"],
  id: "login"
}

const logoutItems ={
  items: ["Home", "Change Password", "LogOut"],
  links: ["/", "/changepassword"],
  id: "logout"
}

const NavIconMenu = ({ data, redirect, logout }) => {
  const handleItemClick = (e, child) => {
    if (child.props.id === 'logout2'){
      logout()
    } else {
      const index = child.props.id.slice(-1)
      redirect(data.links[index])
    }
  }
  return (
    <IconMenu
        iconButtonElement={
          <IconButton
            iconStyle={styles.icon}
          >
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        className="login-menu"
        onItemTouchTap={handleItemClick}

      >
        {data.items.map((item, index) =>
          <MenuItem key={`${data.id}-${index}`} id={`${data.id}${index}`} primaryText={data.items[index]} />
        )}
    </IconMenu>
  )
}

const Login = props => (
  <div>
    <div className="login-nav-menu">
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

    <NavIconMenu data={loginItems} redirect={props.redirect} />
  </div>
)


// CHANGEPASSWORD => component
// LOGOUT => delete tocken from local storage + redirect
const Logged = props => {
  const handleClick = () => props.logout()

  return (
    <div>
      <div className="login-nav-menu">
        <NavLink exact to="/" activeClassName="active">
          <FlatButton label="Home" className="selected" />
        </NavLink>
        <NavLink to="/changepassword">
          <FlatButton label="Change Password" className="selected" />
        </NavLink>

        <FlatButton label="LogOut" className="selected" onClick={handleClick} />
      </div>

      <NavIconMenu data={logoutItems} redirect={props.redirect} logout={handleClick}/>
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

const MessageUser = () => {
  const user = Auth.getUser()
  return (
    <div className="dashbord-message">
      <h1>Dashboard</h1>
      <h4>
        Welcome <span>{user}</span>
      </h4>
      <Link to={`/user/${user}`}>
        <FlatButton
          backgroundColor="#00BCD4"
          label="your polls"
          className="user-button"
          hoverColor="#EC407A"
        />
      </Link>
    </div>
  )
}

const Dashboard = props => (
  <div className="banner">
    {props.logged ? <MessageUser /> : <MessageInit />}
  </div>
)

const Header = props => {
  const titleClick = () => props.history.push('/')
  const LogOut = () => {
    Auth.deauthenticateUser()
    props.history.push('/')
  }
  const redirectNavItem = route => props.history.push(route)

  return (
    <div>
      <AppBar
        title={
          <span className="header-title" onClick={titleClick}>
            VotingBoom
          </span>
        }
        iconElementRight={
          Auth.isUserAuthenticated()
          ? <Logged logout={LogOut} redirect={redirectNavItem} />
          : <Login redirect={redirectNavItem} />
        }
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
