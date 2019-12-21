import NotificationTypes from './notification.types'

const INITIAL_STATE = {
  getList: {
    notificationList: [],
    numberOfNotifications: 0,
    numberOfUnreadNotifications: 0,
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationTypes.CLEAR_NOTIFICATION_STATE:
      return {
        ...INITIAL_STATE,
      }
    case NotificationTypes.GET_NOTIFICATION_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case NotificationTypes.UPDATE_IS_DELETED:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case NotificationTypes.GET_NOTIFICATION_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          notificationList: action.payload.notificationList,
          numberOfNotifications: action.payload.numberOfNotifications,
          numberOfUnreadNotifications: action.payload.numberOfUnreadNotifications,
        },
      }
    case NotificationTypes.GET_NOTIFICATION_LIST_FAILURE:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default notificationReducer
