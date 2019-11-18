import UserTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null,
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
    default:
      return state
  }
}

export default userReducer
