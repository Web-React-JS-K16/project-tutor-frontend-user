import TeacherTypes from './teacher.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearTeacherState = () => ({
  type: TeacherTypes.CLEAR_TEACHER_STATE,
})

export const getTeacherInfo = id => ({
  type: TeacherTypes.GET_TEACHER_INFO,
  payload: id,
})

export const updateCurrentTeacher = teacher => ({
  type: TeacherTypes.UPDATE_CURRENT_TEACHER,
  payload: teacher,
})
