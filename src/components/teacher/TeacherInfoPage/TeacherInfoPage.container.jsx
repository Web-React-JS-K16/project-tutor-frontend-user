import { connect } from 'react-redux'
import { teacherGetInfo, onClearTeacherState } from 'redux/teacher/teacher.actions'
import {
  onClearContractState,
  createContract,
  getContractListForTeacher,
} from 'redux/contract/contract.actions'
import TeacherInfoPage from './TeacherInfoPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getInfoObj: state.teacher.getInfo,
  getContractListObj: state.contract.getListForTeacher,
})

const mapDispatchToProps = dispatch => ({
  onClearTeacherState: () => dispatch(onClearTeacherState()),
  teacherGetInfo: id => dispatch(teacherGetInfo(id)),
  getContractListForTeacher: filterConditions =>
    dispatch(getContractListForTeacher(filterConditions)),
  createContract: contract => dispatch(createContract(contract)),
  onClearContractState: () => dispatch(onClearContractState()),
})

const TeacherInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeacherInfoPage)

export default TeacherInfoPageContainer
