import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import './ChatRoom.style.scss'

const ChatRoomComponent = ({ roomInfo, sendMessage }) => {
  console.log('4.1 room info: ', roomInfo)
  const { room, idRoomate, message } = roomInfo
  const [newMessage, setNewMessage] = useState('')

  const scrollChatMessages = () => {
    console.log('on scroll')
    // eslint-disable-next-line no-undef
    const element = document.getElementsByClassName('chat-room__message')
    if (element.length === 1) {
      element[0].scrollTop = element[0].scrollHeight
    }
  }

  useEffect(() => {
    scrollChatMessages()
  }, [message])

  const handleSendMessage = value => {
    setNewMessage('')
    sendMessage(value, room)
  }
  const onMessageChange = e => {
    const { value } = e.target
    setNewMessage(value)
  }

  if (roomInfo) {
    console.log('3.1 chat room: ', roomInfo)
    return (
      <div className="chat-room">
        <div className="chat-room__title">{room}</div>
        <div className="chat-room__message">
          {message.map(item => (
            <div
              key={item.time}
              className={`chat-room__message--${
                item.from === idRoomate ? 'from-roomate' : 'from-me'
              }`}
            >
              <div className="content">{item.content}</div>
              <div className="time">{item.time}</div>
            </div>
          ))}
        </div>
        <div className="chat-room__input">
          <Input.Search
            value={newMessage}
            onChange={e => onMessageChange(e)}
            placeholder="input search loading with enterButton"
            onSearch={handleSendMessage}
            enterButton
            allowClear
          />
        </div>
      </div>
    )
  }
  return <div>Không có dữ liệu</div>
}

export default ChatRoomComponent
