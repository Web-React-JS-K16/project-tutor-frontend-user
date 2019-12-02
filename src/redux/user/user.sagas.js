import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserTypes from './user.types'
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  activeEmailSuccess,
  activeEmailFailure,
} from './user.actions'
import UserService from '../../services/user.service'

// ==== login
export function* login({ payload: { email, password, typeID } }) {
  try {
    const user = yield UserService.login({ email, password, typeID })
    yield put(loginSuccess(user))
  } catch (err) {
    // console.log('ERR')
    yield put(loginFailure(err.message))
  }
}

export function* loginStartSagas() {
  yield takeLatest(UserTypes.LOGIN_START, login)
}

// ===authen with social
/**
 *
 * @param {Object} payload is user
 */
export function* authenWithSocial({ payload }) {
  try {
    const user = yield UserService.authenWithSocial(payload)
    yield put(loginSuccess(user))
  } catch (err) {
    yield put(loginFailure(err.message))
  }
}

export function* authenWithSocialSaga() {
  yield takeLatest(UserTypes.AUTHEN_WITH_SOCIAL, authenWithSocial)
}
// === register
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

// === active account by email
function* activeEmail({ payload }) {
  try {
    yield UserService.activeEmail(payload)
    yield put(activeEmailSuccess())
  } catch (err) {
    yield put(activeEmailFailure(err.message))
  }
}

function* activeEmailSaga() {
  yield takeLatest(UserTypes.ACTIVE_EMAIL, activeEmail)
}

export function* userSaga() {
  yield all([
    call(loginStartSagas),
    call(authenWithSocialSaga),
    call(registerStart),
    call(activeEmailSaga),
  ])
}
