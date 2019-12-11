import apiUrl from './api-url'

export default class ContractService {
  static getContractList = () => {
    const api = `${apiUrl}/contract`
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
        return result.contract
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static createContract = () => {
    const api = `${apiUrl}/contract/create`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
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
        return result.contract
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
