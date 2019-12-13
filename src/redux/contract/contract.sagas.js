/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import ContractTypes from './contract.types'
import { updateContractList, updateContract, updateNumerOfContracts } from './contract.actions'
import ContractService from '../../services/contract.service'

export function* getList({ payload: filterConditions }) {
  try {
    const contracts = yield ContractService.getContractList(filterConditions)
    console.log('contract', contracts)
    yield put(updateContractList(contracts))
  } catch (err) {
    console.log('ERR GET CONTRACT LIST ', err)
    yield put(updateContractList(null))
  }
}

export function* countContracts({ payload: userId }) {
  try {
    const numberOfContracts = yield ContractService.countContracts(userId)
    if (!isNaN(numberOfContracts)) {
      yield put(updateNumerOfContracts(numberOfContracts))
    } else {
      yield put(updateNumerOfContracts(0))
    }
  } catch (err) {
    console.log('ERR COUNT CONTRACTS ', err)
    yield put(updateNumerOfContracts(0))
  }
}

export function* create({ payload: contract }) {
  try {
    const newContract = yield ContractService.createContract(contract)
    yield put(updateContract(newContract))
  } catch (err) {
    console.log('ERR CREATE CONTRACT ', err)
    yield put(updateContract(null))
  }
}

export function* getContractListSaga() {
  yield takeLatest(ContractTypes.GET_CONTRACT_LIST, getList)
}

export function* createContractSaga() {
  yield takeLatest(ContractTypes.CREATE_CONTRACT, create)
}

export function* countContractsSaga() {
  yield takeLatest(ContractTypes.COUNT_CONTRACTS, countContracts)
}

// =================================

export function* contractSaga() {
  yield all([call(getContractListSaga), call(countContractsSaga), call(createContractSaga)])
}
