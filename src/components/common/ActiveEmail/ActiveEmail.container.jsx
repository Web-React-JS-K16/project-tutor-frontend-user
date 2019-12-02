import { connect } from 'react-redux'
import { activeEmail } from '../../../redux/user/user.actions'
import ActiveEmailComponent from './ActiveEmail.component'

// const mapDispatchToProps = dispath => ({
//     authenWithSocial: user => dispath(authenWithSocial(user)),
// })

const mapDispatchToProps = dispath => ({
  activeEmail: token => dispath(activeEmail(token)),
})

const ActiveEmailContainer = connect(null, mapDispatchToProps)(ActiveEmailComponent)

export default ActiveEmailContainer
