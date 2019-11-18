import { connect } from 'react-redux'
import { loginStart } from '../../redux/user/user.actions'
import LoginPage from './LoginPage.component'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispath => ({
  login: (email, password) => dispath(loginStart(email, password)),
})

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default LoginPageContainer
