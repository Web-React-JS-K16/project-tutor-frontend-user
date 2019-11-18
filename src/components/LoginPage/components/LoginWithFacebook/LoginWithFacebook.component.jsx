/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import './LoginWithFacebook.style.scss'

export default function LoginWithFacebook() {
  const fbLibrary = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1203647879830191',
        cookie: true,
        xfbml: true,
        version: 'v3.1',
      })
      window.FB.AppEvents.logPageView()
    }
    ;(function(d, s, id) {
      // eslint-disable-next-line one-var
      let js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      // eslint-disable-next-line prefer-const
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }
  useEffect(() => {
    fbLibrary()
  }, [])
  const login = () => {
    window.FB.login(
      response => {
        console.log('login response', response)
        if (response.authResponse) {
          window.FB.api(
            '/me',
            {
              fields: 'last_name, first_name, email, picture',
            },
            userInfo => {
              console.log('user information')
              console.log(userInfo)
            }
          )
        } else {
          console.log('User login failed')
        }
      },
      { scope: 'email' }
    )
  }
  return (
    <div className="login-with-facebook">
      <button type="button" onClick={login}>
        <i className="fab fa-facebook-f" />
      </button>
    </div>
  )
}
