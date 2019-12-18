import NotificationTypes from './notification.types'

export const onClearNotificationState = () => ({
  type: NotificationTypes.CLEAR_NOTIFICATION_STATE,
})

//= == get notification list
export const getNotificationList = userId => ({
  type: NotificationTypes.GET_NOTIFICATION_LIST,
  payload: userId,
})
export const getNotificationListSuccess = (notificationList, numberOfNotifications) => ({
  type: NotificationTypes.GET_NOTIFICATION_LIST_SUCCESS,
  payload: { notificationList, numberOfNotifications },
})
export const getNotificationListFailure = message => ({
  type: NotificationTypes.GET_NOTIFICATION_LIST_FAILURE,
  payload: message,
})
