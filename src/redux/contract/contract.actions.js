import ContractTypes from './contract.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearContractState = () => ({
  type: ContractTypes.CLEAR_CONTRACT_STATE,
})

export const getContractList = filterConditions => ({
  type: ContractTypes.GET_CONTRACT_LIST,
  payload: filterConditions,
})

export const getContractListSuccess = (contractList, numberOfContracts) => ({
  type: ContractTypes.GET_CONTRACT_LIST_SUCCESS,
  payload: { contractList, numberOfContracts },
})

export const getContractListFailure = message => ({
  type: ContractTypes.GET_CONTRACT_LIST_FAILURE,
  payload: message,
})

export const createContract = contract => ({
  type: ContractTypes.CREATE_CONTRACT,
  payload: contract,
})

export const updateContract = contract => ({
  type: ContractTypes.UPDATE_CONTRACT,
  payload: contract,
})
