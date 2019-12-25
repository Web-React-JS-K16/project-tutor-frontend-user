/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Divider, Icon, Button, Tag } from 'antd'
import * as moment from 'moment'
import './NotificationItem.style.scss'

const NotificationItem = ({ notification, onDeleteNotification, onReadNotification }) => {
  return (
    <div
      className="notification-item"
      style={{
        border: notification.isRead ? '1px solid #e8e8e8' : '1px solid #ffd666',
      }}
    >
      <div className="notification-item__info">
        <div className="notification-item__info__left">
          <div className="date">
            {moment(notification.createdAt).format('DD/MM/YYYY HH:mm')}&ensp;
            {!notification.isRead ? (
              <Tag color="volcano">Mới</Tag>
            ) : (
              <Tag color="green">Đã xem</Tag>
            )}
          </div>
          <div className="content">{notification.content}</div>
        </div>
        <button
          type="button"
          className="notification-item__info__right"
          onClick={e => onDeleteNotification(e, notification)}
        >
          <Icon type="close" />
        </button>
      </div>
      <Divider />
      <div className="notification-item__detail-btn">
        <Button type="link" onClick={e => onReadNotification(e, notification)}>
          Xem chi tiết
        </Button>
      </div>
    </div>
  )
}

export default NotificationItem
