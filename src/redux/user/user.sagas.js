import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserTypes from './user.types'
import { loginSuccess, loginFailure } from './user.actions'
import UserService from '../../services/user.service'

export function* login({ payload: { email, password } }) {
  try {
    const user = yield UserService.login({ email, password })
    yield put(loginSuccess(user))
  } catch (err) {
    console.log('ERR')
    yield put(loginFailure(err.message))
  }
}

export function* loginStart() {
  yield takeLatest(UserTypes.LOGIN_START, login)
}

export function* userSaga() {
  yield all([call(loginStart)])
}
