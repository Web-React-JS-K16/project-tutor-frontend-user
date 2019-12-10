import apiUrl from './api-url'

/**
 * input: token as String, info as Object
 */
export default class StudentService {
  static updateInfo = ({ token, info }) => {
    const api = `${apiUrl}/student/update-info`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        ...info,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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

  static getInfo = token => {
    if (!token) {
      throw new Error('Có lỗi xảy ra.')
    }
    const api = `${apiUrl}/student/get-info`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      body: undefined,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
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
        const { city, district, ward } = result.payload
        console.log('result: ', result)
        return { city, district, ward, ...result.payload.user }
      })
      .catch(err => {
        throw err
      })
  }
}
