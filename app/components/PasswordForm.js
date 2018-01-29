import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import { changePassword } from '../utils/request_helpers'

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

class PasswordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      errors: {},
      message: ''
    }
    this.handleOld = this.handleOld.bind(this)
    this.handleNew = this.handleNew.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOld(e, newVal) {
    this.setState({
      oldPassword: newVal
    })
  }

  handleNew(e, newVal) {
    this.setState({
      newPassword: newVal
    })
  }

  handleSubmit() {
    // ??? get username somewhere
    const { oldPassword, newPassword } = this.state
    const data = { oldPassword, newPassword }
    //console.log(data)

    const successResponse = result => {
      //@result {object {success, message}}
      this.setState({
        message: result.message,
        errors: {},
        oldPassword: '',
        newPassword: ''
      })
    }

    const errorResponse = data => {
      this.setState({ message: data.message, errors: data.errors })
    }

    changePassword(data, errorResponse, successResponse)
  }

  render() {
    const errors = this.state.errors
    return (
      <Paper zDepth={2} className="user-form">
        <div className="form-fields">
          <h3>{`${this.state.message}`}</h3>
          <TextField
            floatingLabelText="Old password"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            type="password"
            value={this.state.oldPassword}
            errorText={errors.oldPassword}
            onChange={this.handleOld}
          />
          <TextField
            floatingLabelText="New password"
            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            fullWidth={true}
            type="password"
            value={this.state.newPassword}
            errorText={errors.newPassword}
            onChange={this.handleNew}
          />
        </div>
        <FlatButton
          backgroundColor="#00BCD4"
          style={style.button}
          label="Submit new password"
          hoverColor="#EC407A"
          onClick={this.handleSubmit}
        />
      </Paper>
    )
  }
}

export default PasswordForm
