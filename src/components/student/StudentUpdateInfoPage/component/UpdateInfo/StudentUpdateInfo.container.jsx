import { connect } from 'react-redux'
import StudentUpdateInfoComponent from './StudentUpdateInfo.component'
import { updateInfo, clearUpdateInfo } from '../../../../../redux/student/student.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  updateInfo: state.student.updateInfo,
})

const mapDispatchToProps = dispatch => ({
  clearUpdateInfo: () => dispatch(clearUpdateInfo()),
  updateInfoAction: ({ info, token }) => dispatch(updateInfo({ info, token })),
})

const StudentUpdateInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentUpdateInfoComponent)

export default StudentUpdateInfoContainer
