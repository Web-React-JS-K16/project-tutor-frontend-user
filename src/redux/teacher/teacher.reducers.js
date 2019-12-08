import TeacherTypes from './teacher.types'

const INITIAL_STATE = {
  currentTeacher: null,
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
    default:
      return state
  }
}

export default teacherReducer
