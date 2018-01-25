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
      email: '',
      password: ''
    }

    this.handleName = this.handleName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleName(e, newVal) {
    this.setState({
      name: newVal
    })
  }

  handleEmail(e, newVal) {
    this.setState({
      email: newVal
    })
  }

  handlePassword(e, newVal) {
    this.setState({
      password: newVal
    })
  }

  handleSubmit() {
    const { name, email, password } = this.state
    const data = { name, email, password }
    //console.log(data)

    const redirect = result => {
      console.log(result.path)
      const location = {
        pathname: result.path
      }
      this.props.history.push(location)
    }

    sendAuthData('signup', data, redirect)
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
            floatingLabelText="Email"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handleEmail}
          />
          <TextField
            floatingLabelText="Password"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            type="password"
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
