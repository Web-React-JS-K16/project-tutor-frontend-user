import MajorTypes from './major.types'

const INITIAL_STATE = {
  majorList: [],
}

const majorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MajorTypes.CLEAR_MAJOR_STATE:
      return {
        ...INITIAL_STATE,
      }
    case MajorTypes.UPDATE_MAJOR_LIST:
      return {
        ...state,
        majorList: action.payload,
      }
    default:
      return state
  }
}

export default majorReducer
