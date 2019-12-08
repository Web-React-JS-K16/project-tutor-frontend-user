const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://tutor-back-end-user.herokuapp.com'
    : 'http://localhost:4500'

// const apiUrl = 'http://localhost:4500'

export default apiUrl
