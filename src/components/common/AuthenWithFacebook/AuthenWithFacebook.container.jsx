import { connect } from 'react-redux'
import AuthenWithFacebookComponent from './AuthenWithFacebook.component'
import { authenWithSocial } from '../../../redux/user/user.actions'

const mapDispatchToProps = dispath => ({
  authenWithSocial: user => dispath(authenWithSocial(user)),
})

const AuthenWithFacebookContainer = connect(null, mapDispatchToProps)(AuthenWithFacebookComponent)

export default AuthenWithFacebookContainer
