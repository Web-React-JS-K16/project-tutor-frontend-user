import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'
import { teacherSaga } from './teacher/teacher.sagas'
import { studentSaga } from './student/student.sagas'

export default function* rootSagas() {
  yield all([call(userSaga), call(teacherSaga), call(studentSaga)])
}
