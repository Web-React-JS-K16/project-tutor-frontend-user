import UserTypes from './user.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearUserState = () => ({
  type: UserTypes.CLEAR_USER_STATE,
})

export const loginStart = ({ email, password, typeID }) => ({
  type: UserTypes.LOGIN_START,
  payload: { email, password, typeID },
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

// LOGIN or REGISTER using fb/gg account
export const authenWithSocial = user => ({
  type: UserTypes.AUTHEN_WITH_SOCIAL,
  payload: user,
})
