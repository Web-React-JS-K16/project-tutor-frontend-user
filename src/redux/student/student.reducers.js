import StudentTypes from './student.types'

const INITIAL_STATE = {
  currentStudent: null, // all student's info
  getInfo: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  updateInfo: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const studentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET INFO
    case StudentTypes.STUDENT_GET_INFO:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          isLoading: true,
        },
      }
    case StudentTypes.STUDENT_GET_INFO_SUCCESS:
      return {
        ...state,
        currentStudent: {
          ...state.currentStudent,
          ...action.payload,
        },
        getInfo: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case StudentTypes.STUDENT_GET_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE INFO
    case StudentTypes.STUDENT_UPDATE_INFO:
      return {
        ...state,
        updateInfo: {
          ...state.updateInfo,
          isLoading: true,
        },
      }
    case StudentTypes.STUDENT_UPDATE_INFO_SUCCESS:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case StudentTypes.STUDENT_UPDATE_INFO_FAILURE:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    case StudentTypes.STUDENT_UPDATE_INFO_CLEAR:
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
