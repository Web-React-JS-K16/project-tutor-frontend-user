import apiUrl from './api-url'

export default class ContractService {
  static getContractList = filterConditions => {
    const { userId } = filterConditions
    const page = filterConditions.currentPage
    const limit = filterConditions.currentLimit

    const api = `${apiUrl}/contract?userId=${userId}&page=${page}&limit=${limit}`
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

  static countContracts = userId => {
    const api = `${apiUrl}/contract/quantity?userId=${encodeURIComponent(userId)}`
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

  /**
   * get contract detail
   * input: {id contract, token}
   */
  static getContract = ({ id, token }) => {
    const api = `${apiUrl}/contract/${id}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
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
        return result.payload
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static createContract = contract => {
    const api = `${apiUrl}/contract/create`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify(contract),
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

  /**
   * Student report contract
   */
  static reportContract = ({ contractId, content, token }) => {
    const api = `${apiUrl}/contract/report`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        contractId,
        content,
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
        throw new Error(err.message)
      })
  }
}
