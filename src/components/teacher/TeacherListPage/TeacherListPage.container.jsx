import { connect } from 'react-redux'
import TeacherListPage from './TeacherListPage.component'
import { onClearTeacherState, getTeacherList } from '../../../redux/teacher/teacher.actions'
import { getMajorList } from '../../../redux/major/major.actions'
import { getLocationList } from '../../../redux/location/location.actions'

const mapStateToProps = state => ({
  getListObj: state.teacher.getList,
  majorList: state.major.majorList,
  locationList: state.location.locationList,
})

const mapDispatchToProps = dispatch => ({
  onClearTeacherState: () => dispatch(onClearTeacherState()),
  getTeacherList: filterConditions => dispatch(getTeacherList(filterConditions)),
  getMajorList: () => dispatch(getMajorList()),
  getLocationList: () => dispatch(getLocationList()),
})

const TeacherListPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeacherListPage)

export default TeacherListPageContainer
