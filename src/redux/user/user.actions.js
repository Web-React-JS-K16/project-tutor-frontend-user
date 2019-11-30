import UserTypes from './user.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearUserState = () => ({
  type: UserTypes.CLEAR_USER_STATE,
})

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

export const registerStart = (email, displayName, phone, birthdate, password) => ({
  type: UserTypes.REGISTER_START,
  payload: { email, displayName, phone, birthdate, password },
})

export const registerSuccess = user => ({
  type: UserTypes.REGISTER_SUCCESS,
  payload: user,
})

export const registerFailure = error => ({
  type: UserTypes.REGISTER_FAILURE,
  payload: error,
})

export const loginGoogleStart = ({ email, googleID, displayName, avatar }) => ({
  type: UserTypes.LOGIN_GOOGLE_START,
  payload: { email, googleID, displayName, avatar },
})

export const loginFacebookStart = ({ email, facebookID, displayName, avatar }) => ({
  type: UserTypes.LOGIN_FACEBOOK_START,
  payload: { email, facebookID, displayName, avatar },
})
