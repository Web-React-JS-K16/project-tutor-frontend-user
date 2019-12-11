import { connect } from 'react-redux'
import TeacherUpdateInfoComponent from './TeacherUpdateInfo.component'
import {
  teacherUpdateInfo,
  teacherUpdateInfoClear,
  teacherGetInfo,
} from '../../../../../redux/teacher/teacher.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentTeacher: state.teacher.currentTeacher,
  updateInfo: state.teacher.updateInfo,
  getInfo: state.teacher.getInfo,
})

const mapDispatchToProps = dispatch => ({
  teacherUpdateInfoClear: () => dispatch(teacherUpdateInfoClear()),
  teacherUpdateInfo: ({ info, token }) => dispatch(teacherUpdateInfo({ info, token })),
  teacherGetInfo: id => dispatch(teacherGetInfo(id)),
})

const TeacherUpdateInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherUpdateInfoComponent)

export default TeacherUpdateInfoContainer
