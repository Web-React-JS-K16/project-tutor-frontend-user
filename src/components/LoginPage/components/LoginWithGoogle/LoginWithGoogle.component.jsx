import React from 'react'
import GoogleLogin from 'react-google-login'
import './LoginWithGoogle.style.scss'

const LoginWithGoogle = () => {
  const responseGoogle = response => {
    console.log(response)
  }

  return (
    <div className="login-with-google">
      <i className="fab fa-google" />
      <GoogleLogin
        clientId="203406458071-5eisvf8of7rfhjjopg22ntripft926fq.apps.googleusercontent.com"
        buttonText="Google"
        icon=""
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  )
}

export default LoginWithGoogle
