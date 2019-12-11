import ContractTypes from './contract.types'

const INITIAL_STATE = {
  contractList: [],
  numberOfContracts: 0,
  newContract: {},
  currentContract: {},
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
        contractList: action.payload,
      }
    case ContractTypes.UPDATE_NUMBER_OF_CONTRACTS:
      return {
        ...state,
        numberOfContracts: action.payload,
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
