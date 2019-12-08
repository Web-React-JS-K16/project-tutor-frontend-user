import { connect } from 'react-redux'
import TeacherListPage from './TeacherListPage.component'
import { getTeacherList, countTeachers } from '../../../redux/teacher/teacher.actions'

const mapStateToProps = state => ({
  teacherList: state.teacher.teacherList,
  numberOfTeachers: state.teacher.numberOfTeachers,
})

const mapDispatchToProps = dispatch => ({
  getTeacherList: (page, limit) => dispatch(getTeacherList(page, limit)),
  countTeachers: () => dispatch(countTeachers()),
})

const TeacherListPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeacherListPage)

export default TeacherListPageContainer
