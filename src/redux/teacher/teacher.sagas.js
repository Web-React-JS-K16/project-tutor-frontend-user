/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import TeacherTypes from './teacher.types'
import { updateCurrentTeacher, updateTeacherList, updateNumerOfTeachers } from './teacher.actions'
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

export function* getList({ payload: { page, limit } }) {
  try {
    const teachers = yield TeacherService.getTeacherList(page, limit)
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

// =================================

export function* teacherSaga() {
  yield all([call(getTeacherInfoSaga), call(getTeacherListSaga), call(countTeachersSaga)])
}
