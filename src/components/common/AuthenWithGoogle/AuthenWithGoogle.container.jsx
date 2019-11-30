import { connect } from 'react-redux'
import AuthenWithGoogleComponent from './AuthenWithGoogle.component'
import { authenWithSocial } from '../../../redux/user/user.actions'

const mapDispatchToProps = dispath => ({
  authenWithSocial: user => dispath(authenWithSocial(user)),
})

const AuthenWithGoogleContainer = connect(null, mapDispatchToProps)(AuthenWithGoogleComponent)

export default AuthenWithGoogleContainer
