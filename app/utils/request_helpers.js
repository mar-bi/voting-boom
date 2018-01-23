import axios from 'axios'

const home = 'http://localhost:3000/'

// callback is for purpose of redirection
export function sendPollData(str, data, callback) {
  const url = home + str
  axios
    .post(url, data)
    .then(function(response) {
      console.log(response.data)
      if (callback) {
        callback(response.data)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

// callback is for purpose of redirection
export function sendAuthData(str, data, callback) {
  const url = home + str
  axios
    .post(url, data)
    .then(function(response) {
      //console.log(response)
      if (callback) {
        callback()
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

export function getPolls(user, callback) {
  const url = user ? home + `api/${user}/getpolls` : home + 'api/getpolls'
  axios
    .get(url)
    .then(function(response) {
      //console.log(response.data)
      callback(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
}

export function getPoll(name, callback) {
  const url = `${home}api/getpoll/${name}`
  console.log(url)
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
  const url = `${home}api/deletePoll`
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
