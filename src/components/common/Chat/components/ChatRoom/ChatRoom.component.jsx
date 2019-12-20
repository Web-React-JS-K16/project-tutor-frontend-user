/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { STUDENT } from 'utils/constant'
import * as moment from 'moment'
import RoomateChatCardItemComponent from '../RoomateChatCardItem/RoomateChatCardItem.component'
import './ChatRoom.style.scss'

const ChatRoomComponent = ({ roomInfo, currentUser, sendMessage }) => {
  console.log('4.1 room info: ', roomInfo)
  const { room, message } = roomInfo
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

  const handleSendMessage = e => {
    const { value } = e.target
    console.log('messge send: ', value)
    setNewMessage('')
    sendMessage(value, room)
  }
  const onMessageChange = value => {
    setNewMessage(value)
  }

  const getRoomateInfo = () => {
    return currentUser.typeID === STUDENT ? roomInfo.teacher : roomInfo.student
  }

  if (roomInfo) {
    const roomateInfo = getRoomateInfo()
    // console.log('3.1 chat room: ', roomInfo)
    return (
      <div className="chat-room">
        <div className="chat-room__title">
          <RoomateChatCardItemComponent {...roomateInfo} onSetCurrentRoom={() => null} />
        </div>
        <div className="chat-room__message">
          {message.map(item => (
            <div
              key={item.time}
              className={`chat-room__message--item ${
                item.from === roomateInfo._id ? 'from-roomate' : 'from-me'
              }`}
            >
              <div className="content">{item.content}</div>
              <div className="time">{moment(item.time).format('DD/MM/YYYY HH:MM')}</div>
            </div>
          ))}
        </div>
        <div className="chat-room__input">
          <input
            type="text"
            value={newMessage}
            onChange={({ target: { value } }) => onMessageChange(value)}
            onKeyPress={event => (event.key === 'Enter' ? handleSendMessage(event) : null)}
          />
          <button type="submit" onClick={e => handleSendMessage(e)}>
            Gửi
          </button>
        </div>
      </div>
    )
  }
  return <div>Không có dữ liệu</div>
}

export default ChatRoomComponent
