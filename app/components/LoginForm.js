import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { sendAuthData } from '../utils/request_helpers'

const style = {
  button: {
    display: 'block',
    margin: '20px auto'
  },
  floatingLabelFocusStyle: {
    color: '#00BCD4'
  },
  floatingLabelStyle: {
    color: '#EC407A'
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLogin(e, newVal) {
    this.setState({
      user_name: newVal
    })
  }

  handlePassword(e, newVal) {
    this.setState({
      password: newVal
    })
  }

  handleSubmit() {
    const { user_name, password } = this.state
    const data = { user_name, password }
    console.log(data)
    //sendAuthData('login', data)
    //add redirection to user/username
  }

  render() {
    return (
      <div>
        <Paper zDepth={2} className="user-form">
          <TextField
            floatingLabelText="User Name"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handleLogin}
          />
          <TextField
            floatingLabelText="Password"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handlePassword}
          />
        </Paper>
        <FlatButton
          backgroundColor="#00BCD4"
          style={style.button}
          label="login"
          hoverColor="#EC407A"
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default LoginForm
