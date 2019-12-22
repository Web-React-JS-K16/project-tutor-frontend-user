import apiUrl from './api-url'

export default class NotificationService {
  static getNotificationList = filterConditions => {
    const { userId } = filterConditions
    const page = filterConditions.currentPage
    const limit = filterConditions.currentLimit

    const api = `${apiUrl}/notification/${userId}?page=${page}&limit=${limit}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message)
        }
        return result.payload
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static countNotifications = userId => {
    const api = `${apiUrl}/notification/quantity/${encodeURIComponent(userId)}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message)
        }
        return result.payload
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static updateIsDeletedNotification = id => {
    const api = `${apiUrl}/notification/update-is-deleted/${encodeURIComponent(id)}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message)
        }
        return result.message
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static updateIsReadNotification = id => {
    const api = `${apiUrl}/notification/update-is-read/${encodeURIComponent(id)}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(result => {
        if (status !== 200) {
          throw new Error(result.message)
        }
        return result.message
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
