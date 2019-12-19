/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Tag } from 'antd'
import { STUDENT } from '../../../../../utils/constant'
import './RoomateChatCardItem.style.scss'

const RoomateChatCardItemComponent = ({
  room,
  displayName,
  avatar,
  typeID,
  onSetCurrentRoom,
  isActive,
  isEnable,
}) => {
  return (
    <div
      className={`roomate-chat-card-item ${isEnable ? 'enable' : ''} ${isActive ? 'active' : ''}`}
      onClick={() => onSetCurrentRoom(room)}
    >
      <div className="roomate-chat-card-item__avatar">
        <img src={avatar} alt={displayName} />
      </div>
      <div className="roomate-chat-card-item__right">
        <div className="roomate-chat-card-item__right--name">{displayName}</div>
        <div className="roomate-chat-card-item__right--typeID">
          {typeID === STUDENT ? (
            <Tag color="cyan">Học sinh</Tag>
          ) : (
            <Tag color="gold">Giáo viên</Tag>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoomateChatCardItemComponent
