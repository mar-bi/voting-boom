import axios from 'axios'

const home = 'http://localhost:3000/'

// callback is for purpose of redirection
export function sendPollData(str, data, callback) {
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

export function getPolls(user) {
  const url = user ? home + `api/${user}/getpolls` : home + 'api/getpolls'
  console.log(url)
  axios
    .get(url)
    .then(function(response) {
      //console.log(response);
      return response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}
