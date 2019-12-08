import TeacherTypes from './teacher.types'

const INITIAL_STATE = {
  currentTeacher: null,
  teacherList: [],
  numberOfTeachers: 0,
}

const teacherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TeacherTypes.CLEAR_TEACHER_STATE:
      return {
        ...INITIAL_STATE,
      }
    case TeacherTypes.UPDATE_CURRENT_TEACHER:
      return {
        ...state,
        currentTeacher: action.payload,
      }
    case TeacherTypes.UPDATE_TEACHER_LIST:
      return {
        ...state,
        teacherList: action.payload,
      }
    case TeacherTypes.UPDATE_NUMBER_OF_TEACHER:
      return {
        ...state,
        numberOfTeachers: action.payload,
      }
    default:
      return state
  }
}

export default teacherReducer
