import ContractTypes from './contract.types'

const INITIAL_STATE = {
  contractList: [],
  newContract: {},
  currentContract: {}
}

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractTypes.CLEAR_CONTRACT_STATE:
      return {
        ...INITIAL_STATE,
      }
    case ContractTypes.UPDATE_CONTRACT_LIST:
      return {
        ...state,
        locationList: action.payload,
      }
    case ContractTypes.UPDATE_CONTRACT:
      return {
        ...state,
        newContract: action.payload,
    }
    default:
      return state
  }
}

export default contractReducer
