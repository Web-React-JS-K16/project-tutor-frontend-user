import apiUrl from './api-url'

export default class UserService {
  static login = ({ email, password }) => {
    const api = `${apiUrl}/user/login`

    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        email,
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
        if (!result.user) {
          throw new Error(result.message)
        }
        return result.user
      })
      .catch(err => {
        throw new Error(err)
      })

    // switch (type.toLowercase()) {
    //   case 'google':
    //     console.log('google')
    //     break
    //   case 'facebook':
    //     console.log('fb')
    //     break
    //   default: {

    //   }
    // }
  }

  static loginGoogle = () => {
    const api = `${apiUrl}/user/login-google`

    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
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
        if (!result.user) {
          throw new Error(result.message)
        }
        return result.user
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
