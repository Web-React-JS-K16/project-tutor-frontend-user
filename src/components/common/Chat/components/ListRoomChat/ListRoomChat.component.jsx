/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Icon } from 'antd'
import { STUDENT, TEACHER } from '../../../../../utils/constant'
import RoomateChatCardItemComponent from '../RoomateChatCardItem/RoomateChatCardItem.component'
import './ListRoomChat.style.scss'

const ListRoomChatComponent = ({
  rooms,
  currentRoomId,
  onSetCurrentRoom,
  currentUser: { typeID },
}) => {
  let roomsInfo = []
  if (typeID === STUDENT) {
    roomsInfo = rooms.map(item => {
      const { avatar, displayName } = item.teacher
      return { room: item.room, avatar, displayName, typeID: TEACHER }
    })
  } else {
    roomsInfo = rooms.map(item => {
      const { avatar, displayName } = item.student
      return { room: item.room, avatar, displayName, typeID: STUDENT }
    })
  }

  return (
    <div className="list-room-chat">
      <div className="list-room-chat__title">
        <Icon type="message" />
        <span>Tin nhắn</span>
      </div>
      <div className="list-room-chat__list">
        {roomsInfo.map(item => (
          <RoomateChatCardItemComponent
            {...item}
            key={item.room}
            isActive={item.room === currentRoomId}
            onSetCurrentRoom={onSetCurrentRoom}
            isEnable
          />
        ))}
      </div>
    </div>
  )
}

export default ListRoomChatComponent
