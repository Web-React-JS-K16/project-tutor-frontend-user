import React from 'react'
import FacebookLogin from 'react-facebook-login'
import './LoginWithFacebook.style.scss'

export default function LoginWithFacebook() {
  const responseFacebook = response => {
    console.log('on respond')
    if (response.status !== 'unknown') {
      // login success
      // TODO
    }
    console.log(response)
  }

  return (
    <div className="login-with-facebook">
      <i className="fab fa-facebook-f" />
      <FacebookLogin
        appId="1203647879830191"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
        textButton="Facebook"
      />
    </div>
  )
}
