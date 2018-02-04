import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { withRouter } from 'react-router-dom'
import { createPoll } from '../utils/request_helpers'

const style = {
  input: { marginLeft: 10 },
  label: { color: '#fff' },
  floatingLabelStyle: { color: '#00BCD4', fontSize: '1.125em' },
  line: { marginLeft: 10, width: '70%' }
}

const Warning = props => <h4 className="warning">{props.message}</h4>

Warning.propTypes = {
  message: PropTypes.string.isRequired
}

class PollForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num_options: 2,
      hint_text: ['Unicorn', 'Polar Bear', 'Parrot', 'Dragon', 'Turtle'],
      pollname: '',
      question: '',
      answers: ['', ''],
      warning: ''
    }

    this.addOption = this.addOption.bind(this)
    this.submitPoll = this.submitPoll.bind(this)
    this.handlePollName = this.handlePollName.bind(this)
    this.handlePollQuestion = this.handlePollQuestion.bind(this)
    this.handleOption = this.handleOption.bind(this)
    this.deleteOption = this.deleteOption.bind(this)
    this.pollValidator = this.pollValidator.bind(this)
    this.optionsValidator = this.optionsValidator.bind(this)
  }

  addOption() {
    // insert option limit (10)
    if (this.state['num_options'] < 10) {
      const num_options = this.state['num_options'] + 1
      let answers = [...this.state.answers]
      answers.push('')
      this.setState({ num_options, answers })
    } else {
      this.setState({ warning: 'The maximum number of answers is reached' })
    }
  }

  deleteOption(i) {
    const num_options = this.state['num_options'] - 1
    let answers = [...this.state.answers]
    answers.splice(i, 1)

    this.setState({ num_options, answers })
  }

  handlePollName(e, newVal) {
    this.setState({
      pollname: newVal,
      warning: ''
    })
  }

  handlePollQuestion(e, newVal) {
    this.setState({
      question: newVal
    })
  }

  handleOption(newVal, i) {
    let answers = [...this.state.answers]
    answers[i] = newVal
    this.setState({ answers })
  }

  pollValidator(name, question, options) {
    if (!name) {
      this.setState({ warning: 'Please name your poll!' })
    } else if (!question) {
      this.setState({ warning: 'Please ask your question!' })
    } else if (options.length > 0) {
      this.setState({ warning: 'Please check your options!' })
    } else {
      this.setState({ warning: 'Please provide answers!' })
    }
  }

  //return boolean
  // removes duplicates in the array then compare it to the initial array
  optionsValidator(arr) {
    const options = [...arr]
    const result = options.sort().reduce((init, current) => {
      if (
        (init.length === 0 || init[init.length - 1] !== current) &&
        current !== ''
      ) {
        init.push(current)
      }
      return init
    }, [])

    return arr.length === result.length
  }

  submitPoll() {
    const author = this.props.user
    const { pollname, question, answers } = this.state
    const validAnswers = this.optionsValidator(answers)

    if (pollname && question && answers.length > 1 && validAnswers) {
      const data = { pollname, author, question, answers }

      const successCB = result => {
        const location = {
          pathname: `/polls/${result.poll.author}-${result.poll.pollname}`,
          state: { poll: result.poll }
        }
        this.props.history.push(location)
      }

      const errorCB = result => this.setState({ warning: result.message })

      createPoll(data, errorCB, successCB)
    } else {
      this.pollValidator(pollname, question, answers)
    }
  }

  // TextFields (pollname & question) are uncontrolled,
  // answers instead are controlled
  render() {
    const arr = Array(this.state['num_options']).fill(1),
      placeholders = this.state['hint_text'],
      message = this.state.warning,
      options = [...this.state.answers]

    return (
      <Paper zDepth={3} className="poll-form-container">
        <Warning message={message} />
        <Paper zDepth={2} className="poll-form">
          <TextField
            hintText="Favourite pet"
            floatingLabelText="Name of poll"
            underlineShow={false}
            fullWidth={true}
            floatingLabelStyle={style.floatingLabelStyle}
            style={style.input}
            onChange={this.handlePollName}
          />
          <Divider className="poll-divider" />

          <TextField
            hintText="What is your favourite pet?"
            floatingLabelText="Question"
            underlineShow={false}
            fullWidth={true}
            floatingLabelStyle={style.floatingLabelStyle}
            style={style.input}
            onChange={this.handlePollQuestion}
          />
          <Divider className="poll-divider" />
        </Paper>

        <Paper zDepth={2} className="poll-form">
          {arr.map((el, i) => (
            <div key={`opt-${i}`}>
              <TextField
                hintText={placeholders[i] || 'Anything'}
                floatingLabelText={`Answer ${i + 1}`}
                underlineShow={false}
                floatingLabelStyle={style.floatingLabelStyle}
                style={style.line}
                onChange={(e, newVal) => this.handleOption(newVal, i)}
                value={options[i]}
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
      </Paper>
    )
  }
}

PollForm.propTypes = {
  user: PropTypes.string.isRequired,
  history: PropTypes.object
}
export default withRouter(PollForm)
