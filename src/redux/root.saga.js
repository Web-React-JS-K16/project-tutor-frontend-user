import { call, all } from 'redux-saga/effects'
import { userSaga } from './user/user.sagas'

export default function* rootSagas() {
  yield all([call(userSaga)])
}
