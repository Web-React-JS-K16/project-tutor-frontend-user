import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserTypes from './user.types'
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  activeEmailSuccess,
  activeEmailFailure,
  sendEmailResetPasswordSuccess,
  sendEmailResetPasswordFailure,
  verifyTokenResetPasswordSuccess,
  verifyTokenResetPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  onClearUserState,
  updateCurrentUser,
} from './user.actions'
import UserService from '../../services/user.service'
import { jwtToken } from '../../utils/constant'

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

// send email reset password
// payload is email
function* sendEmailResetPassword({ payload }) {
  try {
    yield UserService.sendEmailResetPassword(payload)
    yield put(sendEmailResetPasswordSuccess())
  } catch (err) {
    yield put(sendEmailResetPasswordFailure(err.message))
  }
}

function* sendEmailResetPasswordSaga() {
  yield takeLatest(UserTypes.SEND_EMAIL_RESET_PASSWORD, sendEmailResetPassword)
}

// verifyTokenResetPassword
// payload is token
function* verifyTokenResetPassword({ payload }) {
  try {
    const result = yield UserService.verifyTokenResetPassword(payload)
    yield put(verifyTokenResetPasswordSuccess(result))
  } catch (err) {
    yield put(verifyTokenResetPasswordFailure(err.message))
  }
}

function* verifyTokenResetPasswordSaga() {
  yield takeLatest(UserTypes.VERIFY_TOKEN_RESET_PASSWORD, verifyTokenResetPassword)
}

/**
 * Reset password
 * payload: {token, userId}
 */
function* resetPassword({ payload }) {
  try {
    yield UserService.resetPassword(payload)
    yield put(resetPasswordSuccess())
  } catch (err) {
    yield put(resetPasswordFailure(err.message))
  }
}

function* resetPasswordSaga() {
  yield takeLatest(UserTypes.RESET_PASSWORD, resetPassword)
}

// =================================

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
    call(activeEmailSaga),
    call(sendEmailResetPasswordSaga),
    call(verifyTokenResetPasswordSaga),
    call(resetPasswordSaga),
    call(registerStartSaga),
    call(logoutSaga),
    call(authenticateSaga),
  ])
}
