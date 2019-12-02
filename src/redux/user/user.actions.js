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

// Active email
export const activeEmail = token => ({
  type: UserTypes.ACTIVE_EMAIL,
  payload: token,
})

export const activeEmailSuccess = () => ({
  type: UserTypes.ACTIVE_EMAIL_SUCCESS,
})

export const activeEmailFailure = message => ({
  type: UserTypes.ACTIVE_EMAIL_FAILURE,
  payload: message,
})
// Send email reset password
export const sendEmailResetPassword = email => ({
  type: UserTypes.SEND_EMAIL_RESET_PASSWORD,
  payload: email,
})
export const sendEmailResetPasswordSuccess = () => ({
  type: UserTypes.SEND_EMAIL_RESET_PASSWORD_SUCCESS,
})
export const sendEmailResetPasswordFailure = message => ({
  type: UserTypes.SEND_EMAIL_RESET_PASSWORD_FAILUE,
  payload: message,
})

// Verify token reset password
export const verifyTokenResetPassword = token => ({
  type: UserTypes.VERIFY_TOKEN_RESET_PASSWORD,
  payload: token,
})
export const verifyTokenResetPasswordSuccess = userId => ({
  type: UserTypes.VERIFY_TOKEN_RESET_PASSWORD_SUCCESS,
  payload: userId,
})
export const verifyTokenResetPasswordFailure = message => ({
  type: UserTypes.VERIFY_TOKEN_RESET_PASSWORD_FAILURE,
  payload: message,
})

// Reset password
export const resetPasswordStart = (password, userId) => ({
  type: UserTypes.RESET_PASSWORD,
  payload: { password, userId },
})
export const resetPasswordSuccess = () => ({
  type: UserTypes.RESET_PASSWORD_SUCCESS,
})
export const resetPasswordFailure = message => ({
  type: UserTypes.RESET_PASSWORD_FAILURE,
  payload: message,
})
