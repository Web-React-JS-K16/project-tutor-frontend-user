/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './LoginWithFacebook.style.scss'

const LoginWithFacebook = ({ loginFacebookStart }) => {
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
  const login = async () => {
    await window.FB.login(
      response => {
        // const token = response.authResponse.accessToken
        // console.log('token', token)

        if (response.authResponse) {
          window.FB.api(
            '/me',
            {
              fields: 'last_name, first_name, email, picture',
            },
            userInfo => {
              console.log('user information')
              console.log(userInfo)
              const { email } = userInfo
              const facebookID = userInfo.id
              const displayName = userInfo.firstName + userInfo.lastName
              const avatar = userInfo.picture.data.url
              loginFacebookStart({ email, facebookID, displayName, avatar })
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

LoginWithFacebook.propTypes = {
  loginFacebookStart: PropTypes.func.isRequired,
}

export default LoginWithFacebook
