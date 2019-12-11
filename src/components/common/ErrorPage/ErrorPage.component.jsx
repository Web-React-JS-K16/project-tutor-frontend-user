import React from 'react'
import './ErrorPage.style.scss'

const ErrorPage = props => {
  // console.log("my props: ", props);
  const { location, message } = props
  let myMessage = message
  if (!myMessage) {
    if (location.state.message) {
      myMessage = location.state.message
    } else {
      myMessage = 'Có lỗi xảy ra'
    }
  }
  // console.log('my props: ', props)
  return <div className="error-page">{myMessage}</div>
}

export default ErrorPage
