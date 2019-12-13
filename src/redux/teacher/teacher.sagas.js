/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { updateUserInfoSuccess } from 'redux/user/user.actions'
import TeacherTypes from './teacher.types'
import {
  updateCurrentTeacher,
  updateTeacherList,
  updateNumerOfTeachers,
  teacherGetInfoSuccess,
  teacherGetInfoFailure,
  teacherUpdateInfoSuccess,
  teacherUpdateInfoFailure,
} from './teacher.actions'
import TeacherService from '../../services/teacher.service'

export function* getInfo({ payload: id }) {
  try {
    const teacher = yield TeacherService.getTeacherInfo(id)
    yield put(updateCurrentTeacher(teacher))
  } catch (err) {
    console.log('ERR GET TEACHER INFO ', err)
    yield put(updateCurrentTeacher(null))
  }
}

export function* getList({ payload: filterConditions }) {
  try {
    const teachers = yield TeacherService.getTeacherList(filterConditions)
    yield put(updateTeacherList(teachers))
  } catch (err) {
    console.log('ERR GET TEACHER LIST ', err)
    yield put(updateTeacherList(null))
  }
}

export function* countTeachers() {
  try {
    const numberOfTeachers = yield TeacherService.countTeachers()
    if (!isNaN(numberOfTeachers)) {
      yield put(updateNumerOfTeachers(numberOfTeachers))
    } else {
      yield put(updateNumerOfTeachers(0))
    }
  } catch (err) {
    console.log('ERR COUNT TEACHERS ', err)
    yield put(updateNumerOfTeachers(0))
  }
}

export function* getTeacherInfoSaga() {
  yield put(updateTeacherList(null))
  yield takeLatest(TeacherTypes.GET_TEACHER_INFO, getInfo)
}

export function* getTeacherListSaga() {
  yield takeLatest(TeacherTypes.GET_TEACHER_LIST, getList)
}

export function* countTeachersSaga() {
  yield takeLatest(TeacherTypes.COUNT_TEACHERS, countTeachers)
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
    yield put(teacherGetInfoSuccess(info))
  } catch (err) {
    yield put(teacherGetInfoFailure(err.message))
  }
}
function* teacherGetInfoToUpdateSaga() {
  yield takeLatest(TeacherTypes.TEACHER_GET_INFO, teacherGetInfoToUpdate)
}
// ===========
function* teacherUpdateInfo({ payload: { info, token } }) {
  try {
    yield TeacherService.updateInfo({ info, token })
    const { displayName, phone, birthdate, gender, city, district } = info
    yield put(updateUserInfoSuccess({ displayName, phone, birthdate, gender, city, district }))
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
    call(countTeachersSaga),
    call(teacherUpdateInfoSaga),
    call(teacherGetInfoToUpdateSaga),
  ])
}
