import { connect } from 'react-redux'
import MainHeader from './MainHeader.component'
import { logout, authenticate } from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  onAuthenticate: token => dispatch(authenticate(token)),
})

const MainHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(MainHeader)

export default MainHeaderContainer
