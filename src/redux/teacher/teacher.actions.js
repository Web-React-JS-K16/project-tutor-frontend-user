import TeacherTypes from './teacher.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearTeacherState = () => ({
  type: TeacherTypes.CLEAR_TEACHER_STATE,
})

// export const getTeacherInfo = id => ({
//   type: TeacherTypes.GET_TEACHER_INFO,
//   payload: id,
// })

export const getTeacherList = filterConditions => ({
  type: TeacherTypes.GET_TEACHER_LIST,
  payload: filterConditions,
})

// export const countTeachers = () => ({
//   type: TeacherTypes.COUNT_TEACHERS,
// })

export const getTeacherListSuccess = (teacherList, numberOfTeachers) => ({
  type: TeacherTypes.GET_TEACHER_LIST_SUCCESS,
  payload: { teacherList, numberOfTeachers },
})

export const getTeacherListFailure = message => ({
  type: TeacherTypes.GET_TEACHER_LIST_FAILURE,
  payload: message,
})

// export const updateCurrentTeacher = teacher => ({
//   type: TeacherTypes.UPDATE_CURRENT_TEACHER,
//   payload: teacher,
// })

// export const updateNumerOfTeachers = number => ({
//   type: TeacherTypes.UPDATE_NUMBER_OF_TEACHERS,
//   payload: number,
// })

//= == get info teacher
export const teacherGetInfo = id => ({
  type: TeacherTypes.TEACHER_GET_INFO,
  payload: id,
})
export const teacherGetInfoSuccess = info => ({
  type: TeacherTypes.TEACHER_GET_INFO_SUCCESS,
  payload: info,
})
export const teacherGetInfoToUpdate = id => ({
  type: TeacherTypes.TEACHER_GET_INFO_TO_UPDATE,
  payload: id,
})
export const teacherGetInfoToUpdateSuccess = info => ({
  type: TeacherTypes.TEACHER_GET_INFO_TO_UPDATE_SUCCESS,
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
