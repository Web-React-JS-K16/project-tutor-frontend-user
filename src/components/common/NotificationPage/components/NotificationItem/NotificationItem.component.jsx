/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Divider, Icon, Button } from 'antd'
import * as moment from 'moment'
import './NotificationItem.style.scss'

const NotificationItem = ({ notification, onDeleteNotification }) => {
  const onClickNotification = (e, link) => {
    return <Redirect to={link} />
  }
  return (
    <div className="notification-item" onClick={e => onClickNotification(e, notification.Link)}>
      <div className="notification-item__info">
        <div className="notification-item__info__left">
          <div className="date">{moment(notification.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
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
      <Link to={notification.link}>
        <Button type="primary">Xem chi tiết</Button>
      </Link>
    </div>
  )
}

export default NotificationItem
