import { connect } from 'react-redux'
import ChatComponent from './Chat.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = () => ({
  // login: ({ email, password, typeID }) => dispath(loginStart({ email, password, typeID })),
  // onClearUserState: () => dispath(onClearUserState()),
})

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(ChatComponent)

export default ChatContainer
