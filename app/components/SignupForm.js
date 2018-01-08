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

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      user_name: '',
      password: ''
    }

    this.handleName = this.handleName.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleName(e, newVal) {
    this.setState({
      name: newVal
    })
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
    const { name, user_name, password } = this.state
    const data = { name, user_name, password }
    console.log(data)
    sendAuthData('signup', data)
    //add redirection to user/username
  }

  render() {
    return (
      <div>
        <Paper zDepth={2} className="user-form">
          <TextField
            floatingLabelText="Name"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handleName}
          />
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
          label="signup"
          hoverColor="#EC407A"
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SignupForm
