import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'
import { teacherSaga } from './teacher/teacher.sagas'

export default function* rootSagas() {
  yield all([call(userSaga), call(teacherSaga)])
}
