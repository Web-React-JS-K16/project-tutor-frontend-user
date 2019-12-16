import TeacherTypes from './teacher.types'

const INITIAL_STATE = {
  currentTeacher: null,
  getList: {
    teacherList: [],
    numberOfTeachers: 0,
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getInfo: {
    teacher: {},
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

const teacherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TeacherTypes.CLEAR_TEACHER_STATE:
      return {
        ...INITIAL_STATE,
      }
    // case TeacherTypes.UPDATE_CURRENT_TEACHER:
    //   return {
    //     ...state,
    //     currentTeacher: action.payload,
    //   }
    case TeacherTypes.GET_TEACHER_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case TeacherTypes.GET_TEACHER_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          teacherList: action.payload.teacherList,
          numberOfTeachers: action.payload.numberOfTeachers,
        },
      }
    case TeacherTypes.GET_TEACHER_LIST_FAILURE:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // case TeacherTypes.UPDATE_NUMBER_OF_TEACHERS:
    //   return {
    //     ...state,
    //     numberOfTeachers: action.payload,
    //   }
    // GET INFO
    case TeacherTypes.TEACHER_GET_INFO:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          isLoading: true,
        },
      }
    case TeacherTypes.TEACHER_GET_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          teacher: action.payload,
          isLoading: false,
          isSuccess: true,
        },
      }
    case TeacherTypes.TEACHER_GET_INFO_TO_UPDATE:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          isLoading: true,
        },
      }
    case TeacherTypes.TEACHER_GET_INFO_TO_UPDATE_SUCCESS:
      return {
        ...state,
        currentTeacher: {
          ...state.currentTeacher,
          ...action.payload,
        },
        getInfo: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case TeacherTypes.TEACHER_GET_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE INFO
    case TeacherTypes.TEACHER_UPDATE_INFO:
      return {
        ...state,
        updateInfo: {
          ...state.updateInfo,
          isLoading: true,
        },
      }
    case TeacherTypes.TEACHER_UPDATE_INFO_SUCCESS:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case TeacherTypes.TEACHER_UPDATE_INFO_FAILURE:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    case TeacherTypes.TEACHER_UPDATE_INFO_CLEAR:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: null,
          message: null,
        },
      }
    default:
      return state
  }
}

export default teacherReducer
