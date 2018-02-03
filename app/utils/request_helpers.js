import axios from 'axios'
import Auth from './Auth'

//!!! change before deployment
const home = 'http://localhost:3000/'

// callback is for purpose of redirection
// request from PollForm component
export function createPoll(data, errorCB, successCB) {
  const url = `${home}api/private/addPoll`

  const config = {
    headers: { Authorization: `bearer ${Auth.getToken()}` }
  }

  axios
    .post(url, data, config)
    .then(function(response) {
      if (!response.data.success) {
        errorCB(response.data)
      } else {
        successCB(response.data)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

// callback is for purpose of redirection
// request from SinglePoll component
export function sendVote(data, callback) {
  const url = `${home}api/public/addVote`

  axios
    .post(url, data)
    .then(function(response) {
      if (callback) {
        callback(response.data)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

// requests from SignupForm and LoginFrom Components
// callback is for purpose of redirection
export function sendAuthData(str, data, errorCB, successCB) {
  const url = home + 'auth/' + str
  axios
    .post(url, data)
    .then(function(response) {
      //@response.data {object {success, token, user, path}}
      //console.log(response)
      if (!response.data.success) {
        errorCB(response.data)
      } else {
        //console.log(response.data)
        successCB(response.data)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

// requests from PasswordForm
export function changePassword(data, errorCB, successCB) {
  const url = `${home}api/private/changePassword`

  const config = {
    headers: { Authorization: `bearer ${Auth.getToken()}` }
  }

  axios
    .post(url, data, config)
    .then(function(response) {
      //@response.data {object {success, message}}
      //console.log(response)
      if (!response.data.success) {
        errorCB(response.data)
      } else {
        //console.log(response.data)
        successCB(response.data)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

export function getPolls(user, callback) {
  const url = user
    ? home + `api/private/${user}/getpolls`
    : home + 'api/public/getpolls'

  const config = user
    ? { headers: { Authorization: `bearer ${Auth.getToken()}` } }
    : {}

  axios
    .get(url, config)
    .then(function(response) {
      //console.log(response.data)
      callback(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

export function getPoll(name, callback) {
  const url = `${home}api/public/getpoll/${name}`

  axios
    .get(url)
    .then(function(response) {
      callback(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

// callback is for purpose of redirection
export function deletePoll(data, callback) {
  const url = `${home}api/private/deletePoll`
  const config = {
    headers: { Authorization: `bearer ${Auth.getToken()}` }
  }

  axios
    .post(url, data, config)
    .then(function(response) {
      if (callback) {
        callback(response.data)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}
