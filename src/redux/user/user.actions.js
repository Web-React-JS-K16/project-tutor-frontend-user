import UserTypes from './user.types'

export const loginStart = (email, password) => ({
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
