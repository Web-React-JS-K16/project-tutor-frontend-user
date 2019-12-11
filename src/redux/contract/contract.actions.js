import ContractTypes from './contract.types'

// clear isLoading, error msg, user when user start login/ register
export const onClearContractState = () => ({
  type: ContractTypes.CLEAR_CONTRACT_STATE,
})

export const getContractList = filterConditions => ({
  type: ContractTypes.GET_CONTRACT_LIST,
  payload: filterConditions,
})

export const updateContractList = contracts => ({
  type: ContractTypes.UPDATE_CONTRACT_LIST,
  payload: contracts,
})

export const createContract = contract => ({
  type: ContractTypes.CREATE_CONTRACT,
  payload: contract,
})

export const updateContract = contract => ({
  type: ContractTypes.UPDATE_CONTRACT,
  payload: contract,
})

export const countContracts = userId => ({
  type: ContractTypes.COUNT_CONTRACTS,
  payload: userId,
})

export const updateNumerOfContracts = number => ({
  type: ContractTypes.UPDATE_NUMBER_OF_CONTRACTS,
  payload: number,
})
