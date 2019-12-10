import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'
import { teacherSaga } from './teacher/teacher.sagas'
import { studentSaga } from './student/student.sagas'
import { majorSaga } from './major/major.sagas'
import { locationSaga } from './location/location.sagas'

export default function* rootSagas() {
  yield all([call(userSaga), call(teacherSaga), call(studentSaga), call(majorSaga), call(locationSaga)])
}
