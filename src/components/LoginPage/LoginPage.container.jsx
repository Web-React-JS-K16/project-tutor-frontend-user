import { connect } from 'react-redux'
import { loginStart, loginGoogleStart, loginFacebookStart } from '../../redux/user/user.actions'
import LoginPage from './LoginPage.component'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispath => ({
  login: ({ email, password }) => dispath(loginStart({ email, password })),
  loginGoogleStart: ({ email, googleId, displayName, avatar }) =>
    dispath(loginGoogleStart({ email, googleId, displayName, avatar })),
  loginFacebookStart: ({ email, facebookId, displayName, avatar }) =>
    dispath(loginFacebookStart({ email, facebookId, displayName, avatar })),
})

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginPageContainer
