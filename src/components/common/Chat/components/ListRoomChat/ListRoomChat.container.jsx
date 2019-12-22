import { connect } from 'react-redux'
import { onSetCurrentRoom } from '../../../../../redux/chat/chat.actions'
import ListRoomChatComponent from './ListRoomChat.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentRoomId: state.chat.currentRoomId,
  rooms: state.chat.rooms,
})

const mapDispatchToProps = dispatch => ({
  onSetCurrentRoom: currentRoomId => dispatch(onSetCurrentRoom(currentRoomId)),
})

const ListRoomChatContainer = connect(mapStateToProps, mapDispatchToProps)(ListRoomChatComponent)

export default ListRoomChatContainer
