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

  static register = ({ email, displayName, phone, birthdate, password, typeID }) => {
    const api = `${apiUrl}/user/register`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        email,
        displayName,
        phone,
        birthdate,
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
}
