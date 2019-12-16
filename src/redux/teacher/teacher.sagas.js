/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { updateUserInfoSuccess } from 'redux/user/user.actions'
import TeacherTypes from './teacher.types'
import {
  getTeacherListSuccess,
  getTeacherListFailure,
  teacherGetInfoSuccess,
  teacherGetInfoToUpdateSuccess,
  teacherGetInfoFailure,
  teacherUpdateInfoSuccess,
  teacherUpdateInfoFailure,
} from './teacher.actions'
import TeacherService from '../../services/teacher.service'

// get all teacher info
function* getInfo({ payload: id }) {
  try {
    const teacher = yield TeacherService.getTeacherInfo(id)
    yield put(teacherGetInfoSuccess(teacher))
  } catch (err) {
    yield put(teacherGetInfoFailure(err.message))
  }
}
export function* getTeacherInfoSaga() {
  yield takeLatest(TeacherTypes.TEACHER_GET_INFO, getInfo)
}

// get teacher list
function* getList({ payload: filterConditions }) {
  try {
    const teacherList = yield TeacherService.getTeacherList(filterConditions)
    const numberOfTeachers = yield TeacherService.countTeachers(filterConditions)
    if (!isNaN(numberOfTeachers)) {
      yield put(getTeacherListSuccess(teacherList, numberOfTeachers))
    } else {
      yield put(getTeacherListFailure('Không thể lấy được số lượng gia sư'))
    }
  } catch (err) {
    yield put(getTeacherListFailure(err.message))
  }
}
export function* getTeacherListSaga() {
  yield takeLatest(TeacherTypes.GET_TEACHER_LIST, getList)
}

// === get teacher info to update
/**
 *
 * @param {String} payload: as id in User collection
 */
function* teacherGetInfoToUpdate({ payload }) {
  console.log('on teacher saga')
  try {
    const info = yield TeacherService.getInfoToUpdate(payload)
    yield put(teacherGetInfoToUpdateSuccess(info))
  } catch (err) {
    yield put(teacherGetInfoFailure(err.message))
  }
}
function* teacherGetInfoToUpdateSaga() {
  yield takeLatest(TeacherTypes.TEACHER_GET_INFO_TO_UPDATE, teacherGetInfoToUpdate)
}
// ===========
function* teacherUpdateInfo({ payload: { info, token } }) {
  try {
    yield TeacherService.updateInfo({ info, token })
    const { displayName, phone, birthdate, gender } = info
    yield put(updateUserInfoSuccess({ displayName, phone, birthdate, gender }))
    yield put(teacherUpdateInfoSuccess(info))
  } catch (err) {
    yield put(teacherUpdateInfoFailure(err.message))
  }
}
function* teacherUpdateInfoSaga() {
  yield takeLatest(TeacherTypes.TEACHER_UPDATE_INFO, teacherUpdateInfo)
}

// =================================

export function* teacherSaga() {
  yield all([
    call(getTeacherInfoSaga),
    call(getTeacherListSaga),
    call(teacherUpdateInfoSaga),
    call(teacherGetInfoToUpdateSaga),
  ])
}
