import { connect } from 'react-redux'
import TeacherStatisticsPage from './TeacherStatisticsPage.component'
import { onClearTeacherState, getStatisticalData } from '../../../redux/teacher/teacher.actions'

const mapStateToProps = state => ({
  getStatisticalDataObj: state.teacher.getStatisticalData,
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  onClearTeacherState: () => dispatch(onClearTeacherState()),
  getStatisticalData: filterConditions => dispatch(getStatisticalData(filterConditions)),
})

const TeacherStatisticsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherStatisticsPage)

export default TeacherStatisticsPageContainer
