import { connect } from 'react-redux'
import TeacherUpdateInfoComponent from './TeacherUpdateInfo.component'
import {
  teacherUpdateInfo,
  teacherUpdateInfoClear,
  teacherGetInfo,
} from '../../../../../redux/teacher/teacher.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentUserUpdate: state.teacher.currentTeacher,
  updateInfo: state.teacher.updateInfo,
  getInfo: state.teacher.getInfo,
})

const mapDispatchToProps = dispatch => ({
  onUpdateInfoClear: () => dispatch(teacherUpdateInfoClear()),
  onUpdateInfo: ({ info, token }) => dispatch(teacherUpdateInfo({ info, token })),
  getInfoInitial: id => dispatch(teacherGetInfo(id)),
})

const TeacherUpdateInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherUpdateInfoComponent)

export default TeacherUpdateInfoContainer
