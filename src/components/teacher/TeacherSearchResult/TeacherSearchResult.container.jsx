import { connect } from 'react-redux'
import { searchTeacherClear, searchTeacher } from '../../../redux/teacher/teacher.actions'
import TeacherSearchResultComponent from './TeacherSearchResult.component'

const mapStateToProps = state => ({
  searchTeacherReducer: state.teacher.searchTeacher,
})

const mapDispatchToProps = dispatch => ({
  searchTeacher: keyword => dispatch(searchTeacher(keyword)),
  searchTeacherClear: () => dispatch(searchTeacherClear()),
})

const TeacherSearchResultContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherSearchResultComponent)

export default TeacherSearchResultContainer
