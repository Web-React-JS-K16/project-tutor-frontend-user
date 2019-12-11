import { connect } from 'react-redux'
import { getContractList, countContracts } from 'redux/contract/contract.actions'
import ContractListPage from './ContractListPage.component'

const mapStateToProps = state => ({
  contractList: state.contract.contractList,
  numberOfContracts: state.contract.numberOfContracts,
})

const mapDispatchToProps = dispatch => ({
  getContractList: filterConditions => dispatch(getContractList(filterConditions)),
  countContracts: userId => dispatch(countContracts(userId)),
})

const ContractListPageContainer = connect(mapStateToProps, mapDispatchToProps)(ContractListPage)

export default ContractListPageContainer
