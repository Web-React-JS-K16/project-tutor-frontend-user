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

export function* loginGoogle({ payload: { email, googleId, displayName, avatar } }) {
  try {
    const user = yield UserService.loginGoogle({
      email,
      googleId,
      displayName,
      avatar,
    })
    yield put(loginSuccess(user))
  } catch (err) {
    console.log('ERR')
    yield put(loginFailure(err.message))
  }
}

export function* loginFacebook({ payload: { email, facebookId, displayName, avatar } }) {
  try {
    const user = yield UserService.loginFacebook({
      email,
      facebookId,
      displayName,
      avatar,
    })
    yield put(loginSuccess(user))
  } catch (err) {
    console.log('ERR')
    yield put(loginFailure(err.message))
  }
}

export function* loginStartSagas() {
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

export function* loginGoogleStartSagas() {
  console.log('on start')
  yield takeLatest(UserTypes.LOGIN_GOOGLE_START, loginGoogle)
}

export function* loginFacebookStartSagas() {
  console.log('on start')
  yield takeLatest(UserTypes.LOGIN_FACEBOOK_START, loginFacebook)
}

export function* userSaga() {
  yield all([call(loginStartSagas), call(loginGoogleStartSagas), call(loginFacebookStartSagas), call(registerStart)])
}
