/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import ContractTypes from './contract.types'
import { updateContractList, updateContract } from './contract.actions'
import ContractService from '../../services/contract.service'

export function* getList() {
  try {
    const contracts = yield ContractService.getContractList()
    yield put(updateContractList(contracts))
  } catch (err) {
    console.log('ERR GET CONTRACT LIST ', err)
    yield put(updateContractList(null))
  }
}

export function* getContractListSaga() {
  yield takeLatest(ContractTypes.GET_CONTRACT_LIST, getList)
}

export function* create({payload: contract}) {
    try {
      const newContract = yield ContractService.createContract(contract)
      yield put(updateContract(newContract))
    } catch (err) {
      console.log('ERR CREATE CONTRACT ', err)
      yield put(updateContract(null))
    }
  }
  
  export function* createContractSaga() {
    yield takeLatest(ContractTypes.CREATE_CONTRACT, create)
  }

// =================================

export function* contractSaga() {
  yield all([call(getContractListSaga), call(createContractSaga)])
}
