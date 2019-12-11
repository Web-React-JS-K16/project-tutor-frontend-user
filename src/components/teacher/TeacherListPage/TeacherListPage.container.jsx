import { connect } from 'react-redux'
import TeacherListPage from './TeacherListPage.component'
import { getTeacherList, countTeachers } from '../../../redux/teacher/teacher.actions'
import { getMajorList } from '../../../redux/major/major.actions'
import { getLocationList } from '../../../redux/location/location.actions'

const mapStateToProps = state => ({
  teacherList: state.teacher.teacherList,
  numberOfTeachers: state.teacher.numberOfTeachers,
  majorList: state.major.majorList,
  locationList: state.location.locationList,
})

const mapDispatchToProps = dispatch => ({
  getTeacherList: filterConditions => dispatch(getTeacherList(filterConditions)),
  countTeachers: () => dispatch(countTeachers()),
  getMajorList: () => dispatch(getMajorList()),
  getLocationList: () => dispatch(getLocationList()),
})

const TeacherListPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeacherListPage)

export default TeacherListPageContainer
