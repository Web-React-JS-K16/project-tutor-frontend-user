import LocationTypes from './location.types'

export const onClearLocationState = () => ({
  type: LocationTypes.CLEAR_LOCATION_STATE,
})

export const getLocationList = () => ({
  type: LocationTypes.GET_LOCATION_LIST,
})

export const updateLocationList = locations => ({
  type: LocationTypes.UPDATE_LOCATION_LIST,
  payload: locations,
})
