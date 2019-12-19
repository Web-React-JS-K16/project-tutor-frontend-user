/* eslint-disable no-underscore-dangle */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
import React, { Component } from 'react'
import io from 'socket.io-client'
import './Chat.style.scss'
import apiUrl from 'services/api-url'
import {
  CLIENT_EMIT_SEND_MESSAGE,
  CLIENT_ON_RECIEVE_MESSAGE,
  CLIENT_EMIT_OPEN_ROOM,
  CLIENT_ON_OPEN_ROOM,
  CLIENT_EMIT_ACCEPT_NEW_ROOM,
  STUDENT,
  CLIENT_ON_ROOMATE_OFF,
  TYPE_MESSAGE,
} from 'utils/constant'
import ChatService from 'services/chat.service'
import ChatRoomComponent from './components/ChatRoom/ChatRoom.component'

// let socket;
let socket
class ChatComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      errorMessage: null,
    }
  }

  onCreateRoomChatFinish = (isSuccess, roomInfo, errorMessage) => {
    if (isSuccess) {
      console.log('create room finish: ', roomInfo)
      const { onAddRoomChat } = this.props
      // update room in redux
      onAddRoomChat(roomInfo)
      // emit to roomate
      const { student, teacher, room } = roomInfo
      socket.emit(CLIENT_EMIT_OPEN_ROOM, {
        room,
        student: student._id,
        teacher: teacher._id,
      })
      // set loading to false
      this.setState({ isLoading: false, errorMessage: null })
    } else {
      this.setState({ isLoading: false, errorMessage })
    }
  }

  // eslint-disable-next-line react/sort-comp
  onReceiveMessage = () => {
    console.log('on regis listen message')
    socket.on(CLIENT_ON_RECIEVE_MESSAGE, payload => {
      console.log('on listen 2.2: ', payload)
      const { message, room, from, time } = payload
      const { onReceiveNewMessage } = this.props
      onReceiveNewMessage({ room, newMessage: { content: message, time, from } })
    })
  }

  // teacher listen new room
  onlistenNewRoom = () => {
    socket.on(CLIENT_ON_OPEN_ROOM, async payload => {
      console.log('2.3 on listen create room from student')
      const { room } = payload
      // get room info
      const {
        currentUser: { token },
        onAddRoomChat,
      } = this.props
      try {
        const roomInfo = await ChatService.getDetail({ token, room })
        onAddRoomChat(roomInfo)
        socket.emit(CLIENT_EMIT_ACCEPT_NEW_ROOM, { isAccept: true, room })
      } catch (err) {
        alert(err.message)
      }
    })
  }

  onlistenRoomateOff = () => {
    socket.on(CLIENT_ON_ROOMATE_OFF, payload => {
      const { room, userLeft } = payload
      const {
        onReceiveNewMessage,
        currentUser: { typeID, _id },
      } = this.props
      if (_id !== userLeft) {
        onReceiveNewMessage({
          room,
          newMessage: { type: TYPE_MESSAGE.ROOMATE_OFF, typeIDCurrentUser: typeID },
        })
      }
    })
  }

  setupListenFromSocket = () => {
    console.log('on setup listent')
    this.onlistenNewRoom()
    this.onlistenRoomateOff()
    this.onReceiveMessage()
  }

  getIdRoomFromParam = () => {
    const { match } = this.props
    return match.params.roomId
  }

  onGetAllRoomComplete = (isSuccess, rooms, message) => {
    // console.log("on get room complete")
    const { currentUser, onSetUpRoomSuccess, onSetCurrentRoom } = this.props
    if (isSuccess) {
      onSetUpRoomSuccess(rooms)
      /* Get id room on params */
      const currentRoomChat = this.getIdRoomFromParam()
      // console.log("1.1 curr room: ", currentRoomChat)
      if (!currentRoomChat) {
        onSetCurrentRoom(rooms[0].room || null)
      } else {
        // Find room to show detail
        const index = rooms.findIndex(item => item.room === currentRoomChat)
        if (index === -1) {
          // room not exist
          // If (room is not exit  && typeID === STUDENT) then create a new chat room
          if (currentUser.typeID === STUDENT) {
            const { onCreateRoomChat } = this.props
            // Note: idCurrentRoomChat = <idStudent><idTeacher>
            const teacher = currentRoomChat.replace(currentUser._id, '')
            const newRoomInfo = {
              room: currentRoomChat,
              teacher,
              student: currentUser._id,
              message: [],
            }
            // create a new room chat and set it to current room if success
            onCreateRoomChat({
              token: currentUser.token,
              roomInfo: newRoomInfo,
              onCreateRoomChatFinish: this.onCreateRoomChatFinish,
            })
          } else {
            // current user is TEACHER and room is not exist => return rooms[0]
            onSetCurrentRoom(rooms[0].room || null)
            this.setState({ isLoading: false, errorMessage: null })
          }
        } else {
          // room exist
          onSetCurrentRoom(currentRoomChat)
          this.setState({ isLoading: false, errorMessage: null })
        }
      }
      // set up to listen from socket
      this.setupListenFromSocket()
    } else {
      // get all rooms error
      this.setState({ isLoading: false, errorMessage: message })
    }
  }

  componentDidMount() {
    const {
      onSetUpRoom,
      currentUser: { token },
    } = this.props
    // get data all room chat
    console.log('2.1 did mount setup')
    onSetUpRoom(token, this.onGetAllRoomComplete)

    socket = io(apiUrl)
    const {
      currentUser: { _id, typeID },
    } = this.props
    socket.emit('join', { userId: _id, typeID }, ({ error, rooms }) => {
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error)
      } else if (rooms) {
        // console.log('my rooms: ', rooms)
      }
    })
  }

  componentWillUnmount() {
    socket.off()
  }

  getRoom = room => {
    const { rooms } = this.props
    return rooms.filter(item => item.room === room)
  }

  sendMessage = (value, room) => {
    const {
      currentUser: { _id },
    } = this.props
    console.log('3.11 on send message to: ', room)
    socket.emit(CLIENT_EMIT_SEND_MESSAGE, {
      message: value,
      from: _id,
      room,
      time: new Date(),
    })
  }

  getCurrentRoomChat = () => {
    const { currentRoomId, rooms } = this.props
    // console.log("1.3 rooms in state: ", rooms)
    if (rooms.length > 0) {
      const index = rooms.findIndex(item => item.room === currentRoomId)
      if (index !== -1) {
        // console.log("1.4 ", rooms[index])
        return <ChatRoomComponent roomInfo={rooms[index]} sendMessage={this.sendMessage} />
      }
      return <div>Trống</div>
    }
    return <div>Đang tải</div>
  }

  render() {
    const { rooms } = this.props
    const { isLoading, errorMessage } = this.state
    // console.log('my room: ', rooms)

    return (
      <div className="chat-component">
        <div>Chat</div>
        {!isLoading && !errorMessage && (
          <div>
            {rooms.map(item => (
              // eslint-disable-next-line react/no-array-index-key
              <div>{item.room}</div>
            ))}

            <div>Phòng chat hiện tại</div>
            {this.getCurrentRoomChat()}
          </div>
        )}
      </div>
    )
  }
}

export default ChatComponent
