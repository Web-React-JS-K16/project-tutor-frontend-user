/* eslint-disable lines-between-class-members */
import { useLocation } from 'react-router-dom'
import apiUrl from './api-url'
import { TEACHER } from '../utils/constant'

export default class TeacherService {
  static useQuery = () => {
    return new URLSearchParams(useLocation().search)
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

  static getTeacherList = (page, limit) => {
    const api = `${apiUrl}/user?type=${TEACHER}&page=${page}&limit=${limit}`
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
}
