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
    const api = `${apiUrl}/user/info?id=${id}`
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

  static getTeacherList = filterConditions => {
    const page = filterConditions.currentPage
    const limit = filterConditions.currentLimit
    const majors = filterConditions.currentMajors
    const fromSalary = filterConditions.currentFromSalary
    const toSalary = filterConditions.currentToSalary
    const locationObject = filterConditions.currentLocations

    const query = `${this.parameterizeArray('majors', majors)}${this.parameterizeObject({
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

  static countTeachers = () => {
    const api = `${apiUrl}/user/quantity?type=${TEACHER}`
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
}
