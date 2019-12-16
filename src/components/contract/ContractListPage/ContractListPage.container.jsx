import { connect } from 'react-redux'
import { getContractList } from 'redux/contract/contract.actions'
import ContractListPage from './ContractListPage.component'

const mapStateToProps = state => ({
  getListObj: state.contract.getList,
})

const mapDispatchToProps = dispatch => ({
  getContractList: filterConditions => dispatch(getContractList(filterConditions)),
})

const ContractListPageContainer = connect(mapStateToProps, mapDispatchToProps)(ContractListPage)

export default ContractListPageContainer
