import StudentTypes from './student.types'

export const studentGetInfo = token => ({
  type: StudentTypes.STUDENT_GET_INFO,
  payload: token,
})
export const studentGetInfoSuccess = info => ({
  type: StudentTypes.STUDENT_GET_INFO_SUCCESS,
  payload: info,
})
export const studentGetInfoFailure = message => ({
  type: StudentTypes.STUDENT_GET_INFO_FAILURE,
  payload: message,
})

//= ====

export const updateInfo = ({ info, token }) => ({
  type: StudentTypes.STUDENT_UPDATE_INFO,
  payload: { info, token },
})
export const updateInfoSuccess = info => ({
  type: StudentTypes.STUDENT_UPDATE_INFO_SUCCESS,
  payload: info,
})
export const updateInfoFailure = message => ({
  type: StudentTypes.STUDENT_UPDATE_INFO_FAILURE,
  payload: message,
})
export const clearUpdateInfo = () => ({
  type: StudentTypes.STUDENT_UPDATE_INFO_CLEAR,
})
