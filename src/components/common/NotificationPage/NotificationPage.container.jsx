import { connect } from 'react-redux'
import {
  onClearNotificationState,
  getNotificationList,
} from 'redux/notification/notification.actions'
import NotificationPage from './NotificationPage.component'

const mapStateToProps = state => ({
  getListObj: state.notification.getList,
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  getNotificationList: filterConditions => dispatch(getNotificationList(filterConditions)),
  onClearNotificationState: () => dispatch(onClearNotificationState()),
})

const NotificationPageContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationPage)

export default NotificationPageContainer
