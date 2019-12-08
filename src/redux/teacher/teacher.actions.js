import TeacherTypes from './teacher.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearTeacherState = () => ({
  type: TeacherTypes.CLEAR_TEACHER_STATE,
})

export const getTeacherInfo = id => ({
  type: TeacherTypes.GET_TEACHER_INFO,
  payload: id,
})

export const getTeacherList = (page, limit) => ({
  type: TeacherTypes.GET_TEACHER_LIST,
  payload: { page, limit },
})

export const countTeachers = () => ({
  type: TeacherTypes.COUNT_TEACHERS,
})

export const updateTeacherList = teachers => ({
  type: TeacherTypes.UPDATE_TEACHER_LIST,
  payload: teachers,
})

export const updateCurrentTeacher = teacher => ({
  type: TeacherTypes.UPDATE_CURRENT_TEACHER,
  payload: teacher,
})

export const updateNumerOfTeachers = number => ({
  type: TeacherTypes.UPDATE_NUMBER_OF_TEACHER,
  payload: number,
})
