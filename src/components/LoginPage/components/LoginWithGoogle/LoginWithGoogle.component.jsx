import React from 'react'
import GoogleLogin from 'react-google-login'

const LoginWithGoogle = () => {
  const responseGoogle = response => {
    console.log(response)
  }

  return (
    <div className="App">
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
