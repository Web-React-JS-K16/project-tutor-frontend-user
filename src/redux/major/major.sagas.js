/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import MajorTypes from './major.types'
import { updateMajorList } from './major.actions'
import MajorService from '../../services/major.service'

export function* getList() {
  try {
    const majors = yield MajorService.getMajorList()
    yield put(updateMajorList(majors))
  } catch (err) {
    console.log('ERR GET MAJOR LIST ', err)
    yield put(updateMajorList(null))
  }
}

export function* getMajorListSaga() {
  yield takeLatest(MajorTypes.GET_MAJOR_LIST, getList)
}

// =================================

export function* majorSaga() {
  yield all([call(getMajorListSaga)])
}
