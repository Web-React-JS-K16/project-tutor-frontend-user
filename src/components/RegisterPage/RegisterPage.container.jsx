import { connect } from 'react-redux'
import { registerStart } from '../../redux/user/user.actions'
import RegisterPage from './RegisterPage.component'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispath => ({
  register: (email, displayName, phone, birthdate, password) =>
    dispath(registerStart(email, displayName, phone, birthdate, password)),
})

const RegisterPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterPage)

export default RegisterPageContainer
