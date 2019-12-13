import { connect } from 'react-redux'
import TeacherInfoPage from './TeacherInfoPage.component'
import { getTeacherInfo } from '../../../redux/teacher/teacher.actions'
import { createContract } from '../../../redux/contract/contract.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  teacher: state.teacher.currentTeacher,
})

const mapDispatchToProps = dispatch => ({
  getTeacherInfo: id => dispatch(getTeacherInfo(id)),
  createContract: contract => dispatch(createContract(contract)),
})

const TeacherInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeacherInfoPage)

export default TeacherInfoPageContainer
