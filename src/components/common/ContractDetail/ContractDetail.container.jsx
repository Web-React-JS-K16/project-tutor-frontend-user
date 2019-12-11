import { connect } from 'react-redux'
import { changePassword, clearChangePassword } from '../../../redux/user/user.actions'
import ContractDetailComponent from './ContractDetail.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  changePassword: state.user.changePassword,
})

const mapDispatchToProps = dispath => ({
  onChangePassword: ({ password, oldPassword, token }) =>
    dispath(changePassword({ password, oldPassword, token })),
  clearChangePassword: () => dispath(clearChangePassword()),
})

const ContractDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDetailComponent)

export default ContractDetailContainer
