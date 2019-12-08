import { call, all, takeLatest, put } from 'redux-saga/effects'
import TeacherTypes from './teacher.types'
import { updateCurrentTeacher } from './teacher.actions'
import TeacherService from '../../services/teacher.service'

export function* getInfo({ payload: id }) {
  try {
    const teacher = yield TeacherService.getTeacherInfo(id)
    yield put(updateCurrentTeacher(teacher))
  } catch (err) {
    console.log('ERR GET TEACHER INFO ', err)
  }
}

export function* getTeacherInfoStartSagas() {
  yield takeLatest(TeacherTypes.GET_TEACHER_INFO, getInfo)
}

// =================================

export function* teacherSaga() {
  yield all([call(getTeacherInfoStartSagas)])
}
