import { connect } from 'react-redux'
import MainFooter from './MainFooter.component'

const mapStateToProps = state => ({
  user: state.user,
})

// const mapDispatchToProps = dispath => ({})

const MainFooterContainer = connect(
  mapStateToProps
  //   mapDispatchToProps
)(MainFooter)

export default MainFooterContainer
