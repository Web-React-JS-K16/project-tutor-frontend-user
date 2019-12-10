import StudentTypes from './student.types'

export const updateInfo = ({ info, token }) => ({
  type: StudentTypes.UPDATE_INFO,
  payload: { info, token },
})
export const updateInfoSuccess = () => ({
  type: StudentTypes.UPDATE_INFO_SUCCESS,
})
export const updateInfoFailure = message => ({
  type: StudentTypes.UPDATE_INFO_FAILURE,
  payload: message,
})
export const clearUpdateInfo = () => ({
  type: StudentTypes.UPDATE_INFO_CLEAR,
})
