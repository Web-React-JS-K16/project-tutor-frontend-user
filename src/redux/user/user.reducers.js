import UserTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null,
  registerUser: null,
  isLoading: false,
  activeEmail: {
    isSuccess: null,
    isLoading: null,
    message: null,
  },
  // reducer for send email reset password + check token in email + reset password
  resetPassword: {
    isSuccess: null,
    isLoading: null,
    message: null,
    isTokenTrue: null,
    userId: null,
  },
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.CLEAR_USER_STATE:
      return {
        ...INITIAL_STATE,
      }
    case UserTypes.LOGIN_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        currentUser: action.payload,
      }
    case UserTypes.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        currentUser: null,
      }
    case UserTypes.REGISTER_START:
      return {
        ...state,
        isLoading: true,
      }
    case UserTypes.REGISTER_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        registerUser: action.payload,
        isLoading: false,
      }
    case UserTypes.REGISTER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        registerUser: null,
        isLoading: false,
      }
    // ACTIVE EMAIL
    case UserTypes.ACTIVE_EMAIL:
      return {
        ...state,
        activeEmail: {
          ...state.activeEmail,
          isLoading: true,
        },
      }
    case UserTypes.ACTIVE_EMAIL_SUCCESS:
      return {
        ...state,
        activeEmail: {
          ...state.activeEmail,
          isLoading: false,
          isSuccess: true,
          message: null,
        },
      }
    case UserTypes.ACTIVE_EMAIL_FAILURE:
      return {
        ...state,
        activeEmail: {
          ...state.activeEmail,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // reset password
    case UserTypes.SEND_EMAIL_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: {
          isLoading: true,
          isSuccess: false,
          message: action.payload,
        },
      }
    case UserTypes.SEND_EMAIL_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.SEND_EMAIL_RESET_PASSWORD_FAILUE:
      return {
        ...state,
        resetPassword: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // Verify token reset password
    case UserTypes.VERIFY_TOKEN_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: {
          isLoading: true,
          isSuccess: null,
          message: null,
          isTokenTrue: null,
        },
      }
    case UserTypes.VERIFY_TOKEN_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: false,
          isTokenTrue: true,
          userId: action.payload,
        },
      }
    case UserTypes.VERIFY_TOKEN_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: false,
          isTokenTrue: false,
        },
      }
    // reset password
    case UserTypes.RESET_PASSWORD:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: true,
        },
      }
    case UserTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: false,
          isSuccess: true,
        },
      }
    case UserTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }

    default:
      return state
  }
}

export default userReducer
