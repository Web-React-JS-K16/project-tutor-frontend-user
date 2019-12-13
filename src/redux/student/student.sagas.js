/* eslint-disable import/prefer-default-export */

import { call, all, takeLatest, put } from 'redux-saga/effects'
import {
  updateInfoSuccess,
  updateInfoFailure,
  studentGetInfoSuccess,
  studentGetInfoFailure,
} from './student.actions'
import { updateUserInfoSuccess } from '../user/user.actions'
import StudentTypes from './student.types'
import StudentService from '../../services/student.service'

/**
 *
 * @param {String} payload: as token
 */
function* studentGetInfo({ payload }) {
  console.log('on student saga')
  try {
    const info = yield StudentService.getInfo(payload)
    yield put(studentGetInfoSuccess(info))
  } catch (err) {
    yield put(studentGetInfoFailure(err.message))
  }
}
function* studentGetInfoSaga() {
  yield takeLatest(StudentTypes.STUDENT_GET_INFO, studentGetInfo)
}
// ===========
function* updateInfo({ payload: { info, token } }) {
  try {
    yield StudentService.updateInfo({ info, token })
    const { displayName, phone, birthdate, gender, city, district } = info
    yield put(updateUserInfoSuccess({ displayName, phone, birthdate, gender, city, district }))
    yield put(updateInfoSuccess(info))
  } catch (err) {
    yield put(updateInfoFailure(err.message))
  }
}
function* updateInfoSaga() {
  yield takeLatest(StudentTypes.STUDENT_UPDATE_INFO, updateInfo)
}

export function* studentSaga() {
  yield all([call(updateInfoSaga), call(studentGetInfoSaga)])
}
