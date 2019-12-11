import TeacherTypes from './teacher.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearTeacherState = () => ({
  type: TeacherTypes.CLEAR_TEACHER_STATE,
})

export const getTeacherInfo = id => ({
  type: TeacherTypes.GET_TEACHER_INFO,
  payload: id,
})

export const getTeacherList = filterConditions => ({
  type: TeacherTypes.GET_TEACHER_LIST,
  payload: filterConditions,
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

//= == get info teacher
export const teacherGetInfo = id => ({
  type: TeacherTypes.TEACHER_GET_INFO,
  payload: id,
})
export const teacherGetInfoSuccess = info => ({
  type: TeacherTypes.TEACHER_GET_INFO_SUCCESS,
  payload: info,
})
export const teacherGetInfoFailure = message => ({
  type: TeacherTypes.TEACHER_GET_INFO_FAILURE,
  payload: message,
})

//= == update info teacher

export const teacherUpdateInfo = ({ info, token }) => ({
  type: TeacherTypes.TEACHER_UPDATE_INFO,
  payload: { info, token },
})
export const teacherUpdateInfoSuccess = info => ({
  type: TeacherTypes.TEACHER_UPDATE_INFO_SUCCESS,
  payload: info,
})
export const teacherUpdateInfoFailure = message => ({
  type: TeacherTypes.TEACHER_UPDATE_INFO_FAILURE,
  payload: message,
})
export const teacherUpdateInfoClear = () => ({
  type: TeacherTypes.TEACHER_UPDATE_INFO_CLEAR,
})
