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

export function* loginGoogleStartSagas() {
  console.log('on start')
  yield takeLatest(UserTypes.LOGIN_GOOGLE_START, loginGoogle)
}

export function* loginFacebookStartSagas() {
  console.log('on start')
  yield takeLatest(UserTypes.LOGIN_FACEBOOK_START, loginFacebook)
}

export function* userSaga() {
  yield all([call(loginStartSagas), call(loginGoogleStartSagas), call(loginFacebookStartSagas)])
}
