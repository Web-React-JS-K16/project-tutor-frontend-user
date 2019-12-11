import { connect } from 'react-redux'
import StudentUpdateInfoComponent from './StudentUpdateInfo.component'
import {
  updateInfo,
  clearUpdateInfo,
  studentGetInfo,
} from '../../../../../redux/student/student.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentStudent: state.student.currentStudent,
  updateInfo: state.student.updateInfo,
  getInfo: state.student.getInfo,
})

const mapDispatchToProps = dispatch => ({
  clearUpdateInfo: () => dispatch(clearUpdateInfo()),
  updateInfoAction: ({ info, token }) => dispatch(updateInfo({ info, token })),
  studentGetInfo: token => dispatch(studentGetInfo(token)),
})

const StudentUpdateInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentUpdateInfoComponent)

export default StudentUpdateInfoContainer
