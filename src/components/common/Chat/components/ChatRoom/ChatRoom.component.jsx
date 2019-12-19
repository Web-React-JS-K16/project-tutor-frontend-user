/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { Input, Icon } from 'antd'
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

  const handleSendMessage = value => {
    setNewMessage('')
    sendMessage(value, room)
  }
  const onMessageChange = e => {
    const { value } = e.target
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
          <Input.Search
            value={newMessage}
            onChange={e => onMessageChange(e)}
            placeholder="Nhập tin nhắn ..."
            onSearch={handleSendMessage}
            enterButton
            allowClear
            // onKeyPress={event =>
            //   event.key === 'Enter' ? handleSendMessage(event) : null
            // }
            suffix={
              <Icon
                onClick={handleSendMessage}
                type="info-circle"
                style={{ color: 'rgba(0,0,0,.45)' }}
              />
            }
          />
        </div>
      </div>
    )
  }
  return <div>Không có dữ liệu</div>
}

export default ChatRoomComponent
