/* eslint-disable import/prefer-default-export */

import { call, all, takeLatest, put } from 'redux-saga/effects'
import { updateInfoSuccess, updateInfoFailure } from './student.actions'
import StudentTypes from './student.types'
import StudentService from '../../services/student.service'

// ===========
function* updateInfo({ payload: { info, token } }) {
  try {
    yield StudentService.updateInfo({ info, token })
    yield put(updateInfoSuccess())
  } catch (err) {
    yield put(updateInfoFailure(err.message))
  }
}
function* updateInfoSaga() {
  yield takeLatest(StudentTypes.UPDATE_INFO, updateInfo)
}

export function* studentSaga() {
  yield all([call(updateInfoSaga)])
}
