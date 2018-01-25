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

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
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
    sendAuthData('signup', data, errorResponse, redirect)
  }

  render() {
    const errors = this.state.errors
    return (
      <Paper zDepth={2} className="user-form">
        <div className="form-fields">
          <TextField
            floatingLabelText="Name"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handleName}
            errorText={errors.name}
          />
          <TextField
            floatingLabelText="Email"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            onChange={this.handleEmail}
            errorText={errors.email}
          />
          <TextField
            floatingLabelText="Password"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            type="password"
            onChange={this.handlePassword}
            errorText={errors.password}
          />
        </div>
        <FlatButton
          backgroundColor="#00BCD4"
          style={style.button}
          label="signup"
          hoverColor="#EC407A"
          onClick={this.handleSubmit}
        />

        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </Paper>


    )
  }
}

export default SignupForm
