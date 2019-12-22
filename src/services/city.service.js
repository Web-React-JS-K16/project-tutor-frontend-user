/* eslint-disable lines-between-class-members */
import apiUrl from './api-url'

export default class CityService {
  static getAll = () => {
    const api = `${apiUrl}/city/get-all`
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
}
