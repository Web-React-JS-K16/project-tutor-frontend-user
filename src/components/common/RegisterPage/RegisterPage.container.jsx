import { connect } from 'react-redux'
import { registerStart, onClearUserState } from '../../../redux/user/user.actions'
import RegisterPage from './RegisterPage.component'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispath => ({
  register: (email, displayName, phone, birthdate, password, typeID) =>
    dispath(registerStart(email, displayName, phone, birthdate, password, typeID)),
  onClearUserState: () => dispath(onClearUserState()),
})

const RegisterPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterPage)

export default RegisterPageContainer
