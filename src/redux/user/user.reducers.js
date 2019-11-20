import UserTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null,
  registerUser: null,
  isLoading: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}

export default userReducer
