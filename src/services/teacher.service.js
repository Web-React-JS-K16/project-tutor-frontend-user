/* eslint-disable lines-between-class-members */
import { useLocation } from 'react-router-dom'
import apiUrl from './api-url'
import { TEACHER } from '../utils/constant'

export default class TeacherService {
  static useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  static parameterizeObject = (obj, prefix) => {
    if (!obj) return ''
    const str = []
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        const formarKey = prefix ? `${prefix}[${key}]` : key
        const value = obj[key]
        str.push(
          value !== null && typeof value === 'object'
            ? this.parameterizeObject(value, formarKey)
            : `${encodeURIComponent(formarKey)}=${encodeURIComponent(value)}`
        )
      }
    })
    if (str.length === 0) return ''
    return `${str.join('&')}`
  }

  static parameterizeArray = (key, arr) => {
    if (!arr || arr.length === 0) return ''
    const array = arr.map(encodeURIComponent)
    return `&${key}[]=${array.join(`&${key}[]=`)}`
  }

  static getTeacherInfo = id => {
    const api = `${apiUrl}/user/info/${encodeURIComponent(id)}`
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
        return result.user
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  /**
   * @param {String} payload: as id in User collection
   */
  static getInfoToUpdate = id => {
    const api = `${apiUrl}/teacher/get-info/${id}`
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
        const {
          city,
          district,
          ward,
          salary,
          about,
          tags,
          jobs,
          hoursWorked,
          ratings,
          successRate,
        } = result.payload

        return {
          city,
          district,
          ward,
          salary,
          about,
          tags,
          jobs,
          hoursWorked,
          ratings,
          successRate,
          ...result.payload.user,
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static getTeacherList = filterConditions => {
    const page = filterConditions.currentPage
    const limit = filterConditions.currentLimit
    const majors = filterConditions.currentMajors
    const fromSalary = filterConditions.currentFromSalary
    const toSalary = filterConditions.currentToSalary
    const locationObject = filterConditions.currentLocations
    const sort = filterConditions.currentSort

    const query = `&${this.parameterizeObject(sort)}${this.parameterizeArray(
      'majors',
      majors
    )}&${this.parameterizeObject({
      fromSalary,
      toSalary,
    })}&${this.parameterizeObject(locationObject)}`

    const api = `${apiUrl}/user?type=${TEACHER}&page=${page}&limit=${limit}${query}`
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
        return result.user
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  static countTeachers = filterConditions => {
    const majors = filterConditions.currentMajors
    const fromSalary = filterConditions.currentFromSalary
    const toSalary = filterConditions.currentToSalary
    const locationObject = filterConditions.currentLocations

    const query = `&${this.parameterizeArray('majors', majors)}&${this.parameterizeObject({
      fromSalary,
      toSalary,
    })}&${this.parameterizeObject(locationObject)}`

    const api = `${apiUrl}/user/quantity?type=${TEACHER}${query}`
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
        return result.user
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  /**
   * @param {String} payload: as id in User collection
   */
  static updateInfo = ({ token, info }) => {
    const api = `${apiUrl}/teacher/update-info`
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
        throw new Error(err)
      })
  }

  static getStatisticalData = filterConditions => {
    const { userId } = filterConditions
    const type = filterConditions.currentType

    const api = `${apiUrl}/teacher/statistics/${encodeURIComponent(userId)}?type=${type}`
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

  /**
   * @param {String} payload: as keyword
   */
  static search = keyword => {
    const api = `${apiUrl}/teacher/search/${keyword}`
    let status = 400
    // eslint-disable-next-line no-undef
    return fetch(api, {
      method: 'GET',
      // body: JSON.stringify({
      //   ...info,
      // }),
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
}
