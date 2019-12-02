import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserTypes from './user.types'
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  onClearUserState,
  updateCurrentUser,
} from './user.actions'
import UserService from '../../services/user.service'
import { jwtToken } from '../../utils/constant'

export function* login({ payload: { email, password, typeID } }) {
  try {
    const user = yield UserService.login({ email, password, typeID })
    yield put(loginSuccess(user))
  } catch (err) {
    // console.log('ERR')
    yield put(loginFailure(err.message))
  }
}

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

export function* loginStartSagas() {
  yield takeLatest(UserTypes.LOGIN_START, login)
}

export function* register({ payload: { email, displayName, phone, birthdate, password, typeID } }) {
  try {
    const user = yield UserService.register({
      email,
      displayName,
      phone,
      birthdate,
      password,
      typeID,
    })
    yield put(registerSuccess(user))
  } catch (err) {
    console.log('ERR REGISTER')
    yield put(registerFailure(err.message))
  }
}

export function* logout() {
  UserService.removePreferences(jwtToken)
  yield put(onClearUserState())
}

export function* authenticate({ payload: token }) {
  try {
    const user = yield UserService.authenticate(token)
    yield put(updateCurrentUser(user))
  } catch (err) {
    console.log('ERR AUTHENTICATE ', err)
    yield put(updateCurrentUser(null))
  }
}

export function* registerStartSaga() {
  yield takeLatest(UserTypes.REGISTER_START, register)
}

export function* authenWithSocialSaga() {
  yield takeLatest(UserTypes.AUTHEN_WITH_SOCIAL, authenWithSocial)
}

export function* logoutSaga() {
  yield takeLatest(UserTypes.LOGOUT, logout)
}

export function* authenticateSaga() {
  yield takeLatest(UserTypes.AUTHENTICATE, authenticate)
}

export function* userSaga() {
  yield all([
    call(loginStartSagas),
    call(authenWithSocialSaga),
    call(registerStartSaga),
    call(logoutSaga),
    call(authenticateSaga),
  ])
}
