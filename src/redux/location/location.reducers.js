import LocationTypes from './location.types'

const INITIAL_STATE = {
  locationList: [],
}

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocationTypes.CLEAR_LOCATION_STATE:
      return {
        ...INITIAL_STATE,
      }
    case LocationTypes.UPDATE_LOCATION_LIST:
      return {
        ...state,
        locationList: action.payload,
      }
    default:
      return state
  }
}

export default locationReducer
