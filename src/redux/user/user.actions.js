import UserTypes from './user.types'

export const loginStart = ({ email, password }) => ({
  type: UserTypes.LOGIN_START,
  payload: { email, password },
})

export const loginSuccess = user => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: user,
})

export const loginFailure = error => ({
  type: UserTypes.LOGIN_FAILURE,
  payload: error,
})

export const loginGoogleStart = ({ email, googleId, displayName, avatar }) => ({
  type: UserTypes.LOGIN_GOOGLE_START,
  payload: { email, googleId, displayName, avatar },
})

export const loginFacebookStart = ({ email, facebookId, displayName, avatar }) => ({
  type: UserTypes.LOGIN_FACEBOOK_START,
  payload: { email, facebookId, displayName, avatar },
})
