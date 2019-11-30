import { connect } from 'react-redux'
import LoginPage from './LoginPage.component'
import { loginStart, onClearUserState } from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispath => ({
  login: ({ email, password, typeID }) => dispath(loginStart({ email, password, typeID })),
  onClearUserState: () => dispath(onClearUserState()),
})

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginPageContainer
