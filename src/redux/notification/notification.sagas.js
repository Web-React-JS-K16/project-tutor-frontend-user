/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import NotificationTypes from './notification.types'
import { getNotificationListSuccess, getNotificationListFailure } from './notification.actions'
import NotificationService from '../../services/notification.service'

// get notification list
function* getList({ payload: filterConditions }) {
  try {
    const notificationList = yield NotificationService.getNotificationList(filterConditions)
    const numberOfNotifications = yield NotificationService.countNotifications(
      filterConditions.userId
    )
    let numberOfUnreadNotifications = 0
    if (notificationList) {
      numberOfUnreadNotifications = notificationList.filter(
        notification => notification.isRead === false
      ).length
    } else {
      yield put(getNotificationListFailure('Không thể lấy được thông báo'))
    }
    if (!isNaN(numberOfNotifications)) {
      yield put(
        getNotificationListSuccess(
          notificationList,
          numberOfNotifications,
          numberOfUnreadNotifications
        )
      )
    } else {
      yield put(getNotificationListFailure('Không thể lấy được số lượng thông báo'))
    }
  } catch (err) {
    yield put(getNotificationListFailure(err.message))
  }
}
export function* getNotificationListSaga() {
  yield takeLatest(NotificationTypes.GET_NOTIFICATION_LIST, getList)
}

// update is deleted of notification
function* updateIsDeletedNotification({ payload: id }) {
  try {
    yield NotificationService.updateIsDeletedNotification(id)
  } catch (err) {
    yield put(getNotificationListFailure(err.message))
  }
}
export function* deleteNotificationSaga() {
  yield takeLatest(NotificationTypes.DELETE_NOTIFICATION, updateIsDeletedNotification)
}

// =================================

export function* notificationSaga() {
  yield all([call(getNotificationListSaga), call(deleteNotificationSaga)])
}
