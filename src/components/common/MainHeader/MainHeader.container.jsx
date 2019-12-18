import { connect } from 'react-redux'
import {
  onClearNotificationState,
  getNotificationList,
} from 'redux/notification/notification.actions'
import MainHeader from './MainHeader.component'
import { logout, authenticate } from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getNotificationListObj: state.notification.getList,
})

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  onAuthenticate: token => dispatch(authenticate(token)),
  getNotificationList: filterConditions => dispatch(getNotificationList(filterConditions)),
  onClearNotificationState: () => dispatch(onClearNotificationState()),
})

const MainHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(MainHeader)

export default MainHeaderContainer
