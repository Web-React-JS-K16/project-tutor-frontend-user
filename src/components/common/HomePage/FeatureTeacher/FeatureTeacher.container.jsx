import { connect } from 'react-redux'
import FeatureTeacher from './FeatureTeacher.component'
import { getStatisticalDataHome } from '../../../../redux/teacher/teacher.actions'

export default connect(null, { getStatisticalDataHome })(FeatureTeacher)
