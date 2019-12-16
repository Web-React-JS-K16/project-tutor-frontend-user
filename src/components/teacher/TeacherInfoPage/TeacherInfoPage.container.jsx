import { connect } from 'react-redux'
import TeacherInfoPage from './TeacherInfoPage.component'
import { teacherGetInfo, onClearTeacherState } from '../../../redux/teacher/teacher.actions'
import { createContract } from '../../../redux/contract/contract.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getInfoObj: state.teacher.getInfo,
})

const mapDispatchToProps = dispatch => ({
  onClearTeacherState: () => dispatch(onClearTeacherState()),
  teacherGetInfo: id => dispatch(teacherGetInfo(id)),
  createContract: contract => dispatch(createContract(contract)),
})

const TeacherInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeacherInfoPage)

export default TeacherInfoPageContainer
