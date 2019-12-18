import { connect } from 'react-redux'
import { onClearContractState, getContractList } from 'redux/contract/contract.actions'
import ContractListPage from './ContractListPage.component'

const mapStateToProps = state => ({
  getListObj: state.contract.getList,
})

const mapDispatchToProps = dispatch => ({
  getContractList: filterConditions => dispatch(getContractList(filterConditions)),
  onClearContractState: () => dispatch(onClearContractState()),
})

const ContractListPageContainer = connect(mapStateToProps, mapDispatchToProps)(ContractListPage)

export default ContractListPageContainer
