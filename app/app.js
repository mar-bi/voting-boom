import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

require('./static/index.scss')

//import components
import Header from './components/Header'
import AllPolls from './components/AllPolls'
import UserTabs from './components/UserTabs'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import PasswordForm from './components/PasswordForm'
import SinglePoll from './components/SinglePoll'
import PollResults from './components/PollResults'
import NotFoundPage from './components/NotFoundPage'
import PollAddress from './components/PollAddress'

import Auth from './utils/Auth'

// import react router deps
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={AllPolls} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/changepassword" component={PasswordForm} />
          <PrivateRoute path="/user/:userId" component={UserTabs} />
          <Route path="/polls/results/:pollId" component={PollResults} />
          <Route exact path="/polls/link/:pollId" component={PollAddress} />
          <Route exact path="/polls/:pollId" component={SinglePoll} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
