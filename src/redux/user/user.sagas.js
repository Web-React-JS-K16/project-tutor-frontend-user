import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserTypes from './user.types'
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from './user.actions'
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

export function* register({ payload: { email, displayName, phone, birthdate, password } }) {
  try {
    const user = yield UserService.register({
      email,
      displayName,
      phone,
      birthdate,
      password,
    })
    yield put(registerSuccess(user))
  } catch (err) {
    console.log('ERR')
    yield put(registerFailure(err.message))
  }
}

export function* registerStart() {
  yield takeLatest(UserTypes.REGISTER_START, register)
}

export function* userSaga() {
  yield all([call(loginStart), call(registerStart)])
}
