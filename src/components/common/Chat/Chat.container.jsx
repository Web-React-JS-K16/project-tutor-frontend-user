import { connect } from 'react-redux'
import ChatComponent from './Chat.component'
import {
  onCreateRoomChat,
  onSetUpRoom,
  onSetUpRoomSuccess,
  onSetCurrentRoom,
  onAddRoomChat,
  onReceiveNewMessage,
} from '../../../redux/chat/chat.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentRoomId: state.chat.currentRoomId,
  rooms: state.chat.rooms,
})

const mapDispatchToProps = dispatch => ({
  onCreateRoomChat: ({ token, roomInfo, onCreateRoomChatFinish }) =>
    dispatch(onCreateRoomChat({ token, roomInfo, onCreateRoomChatFinish })),
  onAddRoomChat: roomInfo => dispatch(onAddRoomChat(roomInfo)),
  onSetUpRoom: (token, onGetAllRoomComplete) => dispatch(onSetUpRoom(token, onGetAllRoomComplete)),
  onSetUpRoomSuccess: rooms => dispatch(onSetUpRoomSuccess(rooms)),
  onSetCurrentRoom: currentRoomId => dispatch(onSetCurrentRoom(currentRoomId)),
  onReceiveNewMessage: ({ room, newMessage }) =>
    dispatch(onReceiveNewMessage({ room, newMessage })),
})

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(ChatComponent)

export default ChatContainer
