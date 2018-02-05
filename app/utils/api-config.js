let host
const hostname = window && window.location && window.location.hostname

if(hostname === 'herokuapp.com') {
  host = 'https://voting-boom.herokuapp.com/'
} else {
  host = 'http://localhost:3000/'
}
//console.log(host)
export const API_ROOT = host
