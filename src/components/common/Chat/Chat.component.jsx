/* eslint-disable no-undef */
import React, { Component } from 'react'
import io from 'socket.io-client'
import { Tooltip, Button } from 'antd'
import './Chat.style.scss'
import apiUrl from 'services/api-url'
import {
  CLIENT_EMIT_SEND_MESSAGE,
  CLIENT_ON_RECIEVE_MESSAGE,
  CLIENT_EMIT_CREATE_ROOM,
  CLIENT_ON_CREATE_ROOM,
  CLIENT_EMIT_ACCEPT_NEW_ROOM,
  STUDENT,
  CLIENT_ON_ROOMATE_OFF,
  ADMIN,
} from 'utils/constant'
import ChatRoomComponent from './components/ChatRoom/ChatRoom.component'

// let socket;
let socket
class ChatComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
    }
  }

  componentDidMount() {
    socket = io(apiUrl)
    const {
      currentUser: { _id, displayName },
    } = this.props
    socket.emit('join', { userId: _id, displayName }, ({ error, rooms }) => {
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error)
      } else if (rooms) {
        console.log('my rooms: ', rooms)

        const roomChat = rooms.map(item => {
          return {
            room: item.room,
            idRoomate: item.members.filter(user => user !== _id),
            // TODO
            message: [],
          }
        })
        console.log('my exist room: ', roomChat)
        this.setState({ rooms: roomChat })
      }
    })

    socket.on(CLIENT_ON_CREATE_ROOM, payload => {
      console.log('2.3 on listen create room from student')
      const { room, idRoomate } = payload
      socket.emit(CLIENT_EMIT_ACCEPT_NEW_ROOM, { isAccept: true, room }, () => {
        this.createNewRoomOnState({ room, idRoomate })
      })
    })
  }

  // eslint-disable-next-line react/sort-comp
  onReceiveMessage = () => {
    socket.on(CLIENT_ON_RECIEVE_MESSAGE, payload => {
      // console.log("2.1 on listening message from other")
      // console.log('on listen 2.2: ', payload)
      const { message, room, from, time } = payload
      const { rooms } = this.state
      const indexUpdateRoom = rooms.findIndex(item => item.room === room)
      // console.log("2.2 index room: ", indexUpdateRoom)
      // console.log("2.2 update room: ", rooms[indexUpdateRoom])
      if (indexUpdateRoom !== -1) {
        const updateRoom = {
          ...rooms[indexUpdateRoom],
          message: [...rooms[indexUpdateRoom].message, { content: message, time, from }],
        }
        const newRooms = [
          ...rooms.slice(0, indexUpdateRoom),
          updateRoom,
          ...rooms.slice(indexUpdateRoom + 1),
        ]
        this.setState({ rooms: newRooms })
      } else {
        // eslint-disable-next-line no-alert
        alert('Phòng chat không tồn tại')
      }
    })
  }

  createNewRoomOnState({ room, idRoomate }) {
    const { rooms } = this.state
    // add new room to state
    const newRoom = [...rooms, { room, idRoomate, message: [] }]
    this.setState({ rooms: newRoom }, () => {
      // on receive message
      this.onReceiveMessage()
      this.onReceiveMessageRoomateOff()
    })
  }

  onReceiveMessageRoomateOff = () => {
    socket.on(CLIENT_ON_ROOMATE_OFF, payload => {
      const { room } = payload
      const { rooms } = this.state
      const indexUpdateRoom = rooms.findIndex(item => item.room === room)
      if (indexUpdateRoom !== -1) {
        const updateRoom = {
          ...rooms[indexUpdateRoom],
          message: [
            ...rooms[indexUpdateRoom].message,
            { content: 'Bạn chat đã offline', from: ADMIN },
          ],
        }
        const newRooms = [
          ...rooms.slice(0, indexUpdateRoom),
          updateRoom,
          ...rooms.slice(indexUpdateRoom + 1),
        ]
        this.setState({ rooms: newRooms })
      } else {
        alert('Phòng chat không tồn tại')
      }
    })
  }

  componentWillUnmount() {
    //   socket.emit('endChat', { text: 'disconnect', type: 'endGame' });
    socket.off()
  }

  getRoom = room => {
    const { rooms } = this.state
    return rooms.filter(item => item.room === room)
  }

  sendMessage = (value, room) => {
    // TODO: edit room here
    // room = '5def6aee5173c433a4ec4457-5defc8ea486aa9176437b354'
    const roomInfo = this.getRoom(room)
    if (roomInfo) {
      const { idRoomate } = roomInfo
      const {
        currentUser: { _id },
      } = this.props
      // console.log("3.1 on send message to: ", roomInfo);
      // console.log("3.11 on send message to: ", room);
      socket.emit(CLIENT_EMIT_SEND_MESSAGE, {
        message: value,
        from: _id,
        to: idRoomate,
        room,
        time: new Date(),
      })
    } else {
      console.log('cannot get room to send message')
    }
  }

  onCreateRoomChat = idRoomate => {
    console.log('on create new room')
    const {
      currentUser: { _id },
    } = this.props
    // TODO
    // eslint-disable-next-line no-param-reassign
    idRoomate = '5defc8ea486aa9176437b354' // id teacher
    const idRoom = `${_id}-${idRoomate}`
    // const idRoom = 'demo room'
    socket.emit(
      CLIENT_EMIT_CREATE_ROOM,
      {
        room: idRoom,
        to: idRoomate,
        from: _id,
      },
      () => {
        this.createNewRoomOnState({ room: idRoom, idRoomate })
      }
    )
  }

  render() {
    const { rooms } = this.state
    const {
      currentUser: { typeID },
    } = this.props
    console.log('my room: ', rooms)

    return (
      <div className="chat-component">
        {typeID === STUDENT && (
          <Tooltip placement="top" title="Thêm phòng chat">
            <Button shape="circle" icon="add" onClick={() => this.onCreateRoomChat()} />
          </Tooltip>
        )}
        <div>Chat</div>
        <div>
          {rooms.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ChatRoomComponent key={index} roomInfo={item} sendMessage={this.sendMessage} />
          ))}
          {/* <Input.Search
           placeholder="input search loading with enterButton"
            onSearch = {(value) => this.sendMessage(value)}
            enterButton 
            allowClear/> */}
        </div>
      </div>
    )
  }
}

export default ChatComponent
