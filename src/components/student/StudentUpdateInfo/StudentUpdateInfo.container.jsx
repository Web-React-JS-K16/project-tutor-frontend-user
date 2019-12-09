import { connect } from 'react-redux'
import StudentUpdateInfoComponent from './StudentUpdateInfo.component'
import { clearUpdateInfo, updateInfo } from '../../../redux/student/student.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  updateInfo: state.student.updateInfo,
})

const mapDispatchToProps = dispath => ({
  clearUpdateInfo: () => dispath(clearUpdateInfo()),
  updateInfoAction: ({ info, token }) => dispath(updateInfo({ info, token })),
})

const StudentUpdateInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentUpdateInfoComponent)

export default StudentUpdateInfoContainer
