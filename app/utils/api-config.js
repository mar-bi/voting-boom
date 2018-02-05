let host
const hostname = window && window.location && window.location.hostname
console.log(hostname)

if(hostname === 'herokuapp.com') {
  host = 'https://voting-boom.herokuapp.com/'
} else {
  host = 'http://localhost:5000/'
}
console.log(host)
export const API_ROOT = host
