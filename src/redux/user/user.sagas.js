import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserTypes from './user.types'
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from './user.actions'
import UserService from '../../services/user.service'

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

export function* registerStartSaga() {
  yield takeLatest(UserTypes.REGISTER_START, register)
}

export function* authenWithSocialSaga() {
  yield takeLatest(UserTypes.AUTHEN_WITH_SOCIAL, authenWithSocial)
}

export function* userSaga() {
  yield all([call(loginStartSagas), call(authenWithSocialSaga), call(registerStartSaga)])
}
