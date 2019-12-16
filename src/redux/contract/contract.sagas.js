/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import ContractTypes from './contract.types'
import { getContractListSuccess, getContractListFailure, updateContract } from './contract.actions'
import ContractService from '../../services/contract.service'

// get contract list
function* getList({ payload: filterConditions }) {
  try {
    const contractList = yield ContractService.getContractList(filterConditions)
    const numberOfContracts = yield ContractService.countContracts(filterConditions.userId)
    if (!isNaN(numberOfContracts)) {
      yield put(getContractListSuccess(contractList, numberOfContracts))
    } else {
      yield put(getContractListFailure('Không thể lấy được số lượng hợp đồng'))
    }
  } catch (err) {
    yield put(getContractListFailure(err.message))
  }
}
export function* getContractListSaga() {
  yield takeLatest(ContractTypes.GET_CONTRACT_LIST, getList)
}

// create new contract
function* create({ payload: contract }) {
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
