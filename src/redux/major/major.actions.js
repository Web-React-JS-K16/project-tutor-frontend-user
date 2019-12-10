import MajorTypes from './major.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearMajorState = () => ({
  type: MajorTypes.CLEAR_MAJOR_STATE,
})

export const getMajorList = () => ({
  type: MajorTypes.GET_MAJOR_LIST,
})

export const updateMajorList = majors => ({
  type: MajorTypes.UPDATE_MAJOR_LIST,
  payload: majors,
})
