import { connect } from 'react-redux'
import TeacherInfoPage from './TeacherInfoPage.component'
import { getTeacherInfo } from '../../../redux/teacher/teacher.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  teacher: state.teacher.currentTeacher,
})

const mapDispatchToProps = dispatch => ({
  getTeacherInfo: id => dispatch(getTeacherInfo(id)),
})

const TeacherInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeacherInfoPage)

export default TeacherInfoPageContainer
