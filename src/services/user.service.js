import apiUrl from './api-url'

export default class UserService {
  static login = ({ email, password, typeID }) => {
    const api = `${apiUrl}/user/login`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        typeID,
      }),
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
        return result.user
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static authenWithSocial = user => {
    const api = `${apiUrl}/user/authen-with-social`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        ...user,
      }),
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
        return result.user
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static register = ({ email, displayName, phone, birthdate, password }) => {
    const api = `${apiUrl}/user/register`

    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        email,
        displayName,
        phone,
        birthdate,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Xảy ra lỗi')
        }
        return response.json()
      })
      .then(result => {
        if (!result.data) {
          throw new Error(result.message)
        }
        return result.data
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static activeEmail = token => {
    const api = `${apiUrl}/user/active-email`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        token,
      }),
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
        return result
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static sendEmailResetPassword = email => {
    const api = `${apiUrl}/user/send-email-reset-password`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
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
        return result
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static verifyTokenResetPassword = token => {
    const api = `${apiUrl}/user/verify-token-reset-password`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        token,
      }),
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
        return result.userId
      })
      .catch(err => {
        throw err
      })
  }

  static resetPassword = ({ password, userId }) => {
    const api = `${apiUrl}/user/reset-password`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        password,
        userId,
      }),
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
        return result
      })
      .catch(err => {
        throw err
      })
  }
}
