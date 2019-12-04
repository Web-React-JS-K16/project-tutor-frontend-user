let hostURL
if (process.env.NODE_ENV === 'production') {
  hostURL = 'https://tutor-back-end-user.herokuapp.com'
} else {
  hostURL = 'http://localhost:4500'
}

const apiUrl = hostURL

export default apiUrl
