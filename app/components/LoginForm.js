import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
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
      email: '',
      password: '',
      errors: {}
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    const { email, password } = this.state
    const data = { email, password }
    //console.log(data)
    const redirect = result => {
      //console.log(result.path)
      const location = {
        pathname: result.path
      }
      this.props.history.push(location)
    }

    const errorResponse = data => {
      this.setState({ errors: data.errors })
    }
    sendAuthData('login', data, errorResponse, redirect)
  }

  render() {
    const errors = this.state.errors
    return (
      <Paper zDepth={2} className="user-form">
        <div className="form-fields">
          <TextField
            floatingLabelText="Email"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            errorText={errors.email}
            onChange={this.handleEmail}
          />
          <TextField
            floatingLabelText="Password"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            type="password"
            errorText={errors.password}
            onChange={this.handlePassword}
          />
        </div>
        <FlatButton
          backgroundColor="#00BCD4"
          style={style.button}
          label="login"
          hoverColor="#EC407A"
          onClick={this.handleSubmit}
        />
        <p>Do not have an account? <Link to="/signup">Sign up</Link></p>
      </Paper>
    )
  }
}

export default LoginForm
