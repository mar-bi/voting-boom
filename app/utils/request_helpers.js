import axios from 'axios'
import Auth from './Auth'


const API_ROOT = 'https://voting-boom.herokuapp.com/'

// request from PollForm component
export function createPoll(data, errorCB, successCB) {
  const url = `${API_ROOT}api/private/addPoll`

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

// callback is for redirection
// request from SinglePoll component
export function sendVote(data, callback) {
  const url = `${API_ROOT}api/public/addVote`

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
export function sendAuthData(str, data, errorCB, successCB) {
  const url = API_ROOT + 'auth/' + str
  axios
    .post(url, data)
    .then(function(response) {
      //@response.data {object {success, token, user, path}}
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

// requests from PasswordForm
export function changePassword(data, errorCB, successCB) {
  const url = `${API_ROOT}api/private/changePassword`

  const config = {
    headers: { Authorization: `bearer ${Auth.getToken()}` }
  }

  axios
    .post(url, data, config)
    .then(function(response) {
      //@response.data {object {success, message}}
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

// callback is for redirection
export function getPolls(user, callback) {
  const url = user
    ? API_ROOT + `api/private/${user}/getpolls`
    : API_ROOT + 'api/public/getpolls'

  const config = user
    ? { headers: { Authorization: `bearer ${Auth.getToken()}` } }
    : {}

  axios
    .get(url, config)
    .then(function(response) {
      callback(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

// callback is for redirection
export function getPoll(author, name, callback) {
  const url = `${API_ROOT}api/public/getpoll/${author}-${name}`

  axios
    .get(url)
    .then(function(response) {
      callback(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

// callback is for redirection
export function deletePoll(data, callback) {
  const url = `${API_ROOT}api/private/deletePoll`
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
