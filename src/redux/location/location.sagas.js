/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import LocationTypes from './location.types'
import { updateLocationList } from './location.actions'
import LocationService from '../../services/location.service'

export function* getList() {
  try {
    const locations = yield LocationService.getLocationList()
    yield put(updateLocationList(locations))
  } catch (err) {
    console.log('ERR GET LOCATION LIST ', err)
    yield put(updateLocationList(null))
  }
}

export function* getLocationListSaga() {
  yield takeLatest(LocationTypes.GET_LOCATION_LIST, getList)
}

// =================================

export function* locationSaga() {
  yield all([call(getLocationListSaga)])
}
