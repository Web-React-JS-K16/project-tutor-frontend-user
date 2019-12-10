import StudentTypes from './student.types'

const INITIAL_STATE = {
  updateInfo: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const studentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StudentTypes.UPDATE_INFO:
      return {
        ...state,
        updateInfo: {
          ...state.UPDATE_INFO,
          isLoading: true,
        },
      }
    case StudentTypes.UPDATE_INFO_SUCCESS:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case StudentTypes.UPDATE_INFO_FAILURE:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    case StudentTypes.UPDATE_INFO_CLEAR:
      return {
        ...state,
        UserTypes: {
          isLoading: false,
          isSuccess: null,
          message: null,
        },
      }
    default:
      return state
  }
}

export default studentReducer
