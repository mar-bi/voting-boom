import React from 'react'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'

import { sendPollData } from '../utils/request_helpers'

const style = {
  input: { marginLeft: 20 },
  label: { color: '#fff' }
}

const Warning = props => <h4 className="warning">{props.message}</h4>

class PollForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num_options: 2,
      hint_text: ['Unicorn', 'Polar Bear', 'Parrot', 'Dragon', 'Turtle'],
      poll_name: '',
      poll_question: '',
      poll_options: [],
      warning: ''
    }

    this.addOption = this.addOption.bind(this)
    this.submitPoll = this.submitPoll.bind(this)
    this.handlePollName = this.handlePollName.bind(this)
    this.handlePollQuestion = this.handlePollQuestion.bind(this)
    this.handleOption = this.handleOption.bind(this)
    this.deleteOption = this.deleteOption.bind(this)
    this.pollValidator = this.pollValidator.bind(this)
  }

  addOption() {
    const num_options = this.state['num_options'] + 1
    this.setState({
      num_options: num_options
    })
  }

  deleteOption(i) {
    const num_options = this.state['num_options'] - 1
    let arr = this.state['poll_options'].slice()
    arr.splice(i, 1)

    console.log(arr)

    this.setState({
      num_options: num_options,
      poll_options: arr
    })
  }

  handlePollName(e, newVal) {
    this.setState({
      poll_name: newVal
    })
  }

  handlePollQuestion(e, newVal) {
    this.setState({
      poll_question: newVal
    })
  }

  handleOption(newVal, i) {
    let arr = this.state['poll_options'].slice()
    arr[i] = newVal

    this.setState({
      poll_options: arr
    })
  }

  pollValidator(name, question, options) {
    if (!name) {
      this.setState({ warning: 'Please name your poll!' })
    } else if (!question) {
      this.setState({ warning: 'Please ask your question!' })
    } else if (options.length > 0) {
      this.setState({ warning: 'Please give one more option!' })
    } else {
      this.setState({ warning: 'Please provide answers!' })
    }
  }

  submitPoll() {
    const { poll_name, poll_question, poll_options } = this.state
    if (poll_name && poll_question && poll_options.length > 1) {
      const data = { poll_name, poll_question, poll_options }
      console.log(data)
      sendPollData('addPoll', data)
    } else {
      this.pollValidator(poll_name, poll_question, poll_options)
    }
  }

  render() {
    const arr = Array(this.state['num_options']).fill(1),
      placeholders = this.state['hint_text'],
      message = this.state.warning

    return (
      <div>
        <Warning message={message} />
        <Paper zDepth={2} className="poll-form">
          <span className="poll-label">Name of poll:</span>
          <TextField
            hintText="Favourite pet"
            underlineShow={false}
            style={style.input}
            onChange={this.handlePollName}
          />
          <Divider className="poll-divider" />
          <span className="poll-label">Question:</span>
          <TextField
            hintText="What is your favourite pet?"
            underlineShow={false}
            style={style.input}
            onChange={this.handlePollQuestion}
          />
          <Divider className="poll-divider" />
        </Paper>

        <Paper zDepth={2} className="poll-form">
          {arr.map((el, i) => (
            <div key={`opt-${i}`}>
              <span className="poll-label">{`Answer ${i + 1}`}:</span>
              <TextField
                hintText={placeholders[i] || 'Anything'}
                underlineShow={false}
                style={style.input}
                onChange={(e, newVal) => this.handleOption(newVal, i)}
              />
              <IconButton
                tooltip="Delete"
                className="del-button"
                onClick={e => this.deleteOption(i)}
              >
                <ContentClear color="#EC407A" />
              </IconButton>
              <Divider className="poll-divider" />
            </div>
          ))}
        </Paper>

        <div className="poll-form-buttons">
          <FlatButton
            backgroundColor="#00BCD4"
            label="add option"
            labelStyle={style.label}
            className="poll-button"
            onClick={this.addOption}
          />
          <FlatButton
            backgroundColor="#EC407A"
            label="create"
            className="poll-button"
            labelStyle={style.label}
            onClick={this.submitPoll}
          />
        </div>
      </div>
    )
  }
}
export default PollForm
