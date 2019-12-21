import NotificationTypes from './notification.types'

export const onClearNotificationState = () => ({
  type: NotificationTypes.CLEAR_NOTIFICATION_STATE,
})

//= == get notification list
export const getNotificationList = filterConditions => ({
  type: NotificationTypes.GET_NOTIFICATION_LIST,
  payload: filterConditions,
})
export const updateIsDeleted = (id, filterConditions) => ({
  type: NotificationTypes.UPDATE_IS_DELETED,
  payload: { id, filterConditions },
})
export const getNotificationListSuccess = (
  notificationList,
  numberOfNotifications,
  numberOfUnreadNotifications
) => ({
  type: NotificationTypes.GET_NOTIFICATION_LIST_SUCCESS,
  payload: {
    notificationList,
    numberOfNotifications,
    numberOfUnreadNotifications,
  },
})
export const getNotificationListFailure = message => ({
  type: NotificationTypes.GET_NOTIFICATION_LIST_FAILURE,
  payload: message,
})
