import { connect } from 'react-redux'
import LoginPage from './LoginPage.component'
import {
  loginStart,
  loginGoogleStart,
  loginFacebookStart,
  onClearUserState,
} from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispath => ({
  login: ({ email, password }) => dispath(loginStart({ email, password })),
  loginGoogleStart: ({ email, googleId, displayName, avatar }) =>
    dispath(loginGoogleStart({ email, googleId, displayName, avatar })),
  loginFacebookStart: ({ email, facebookId, displayName, avatar }) =>
    dispath(loginFacebookStart({ email, facebookId, displayName, avatar })),
  onClearUserState: () => dispath(onClearUserState()),
})

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginPageContainer
