import React from 'react'
import './ErrorPage.style.scss'

const ErrorPage = props => {
  const { location, message } = props
  const myMessage = location.state.message || message || 'Có lỗi xảy ra'
  console.log('my props: ', props)
  return <div className="error-page">{myMessage}</div>
}

export default ErrorPage
