/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Pagination, Spin, Icon } from 'antd'
import './NotificationPage.style.scss'
import UserService from 'services/user.service'
import { ITEMS_PER_PAGE } from 'utils/constant'
import NotificationService from 'services/notification.service'
import NotificationItem from './components/NotificationItem/NotificationItem.component'

const NotificationPage = ({
  history,
  currentUser,
  getListObj,
  onClearNotificationState,
  getNotificationList,
}) => {
  // const query = TeacherService.useQuery()
  // const page = query.get('page') || 1
  // const limit = query.get('limit') || ITEMS_PER_PAGE
  const page = 1
  const limit = ITEMS_PER_PAGE

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    onClearNotificationState()
    if (currentUser && page && limit) {
      const userId = currentUser._id
      setCurrentPage(page)
      getNotificationList({ userId, currentPage: page, currentLimit: limit })
    }
  }, [currentUser, page, limit, onClearNotificationState, getNotificationList])

  const executeFilter = filterConditions => {
    UserService.setPreferences('project-tutor-notification-list', JSON.stringify(filterConditions))
    getNotificationList(filterConditions)
  }

  const handleChangePage = pageNumber => {
    console.log('handleChangePage = ', pageNumber)
    setCurrentPage(pageNumber)
    const filterConditions = {
      userId: currentUser._id,
      currentPage: pageNumber,
      currentLimit: limit,
    }
    executeFilter(filterConditions)
  }

  const onDeleteNotification = (e, notification) => {
    const filterConditions = {
      userId: currentUser._id,
      currentPage,
      currentLimit: limit,
    }
    NotificationService.updateIsDeletedNotification(notification._id)
      .then(executeFilter(filterConditions))
      .catch(err => console.log('ERROR UPDATE IS-DELETED NOTIFICATION ', err.message))
  }

  const onReadNotification = (e, notification) => {
    NotificationService.updateIsReadNotification(notification._id)
      .then(history.push(notification.link))
      .catch(err => console.log('ERROR UPDATE IS-DELETED NOTIFICATION ', err.message))
  }

  if (!getListObj.isLoading && getListObj.isSuccess === false) {
    return (
      <Redirect
        to={{
          pathname: '/error-page',
          state: { message: `${getListObj.message}` },
        }}
      />
    )
  }

  return (
    <div className="notification-list-page">
      {getListObj.isLoading && (
        <div className="notification-list-page__loading">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      )}

      <div className="notification-list-page__wrapper">
        {!getListObj.isLoading && getListObj.isSuccess === true && (
          <>
            <Row gutter={16}>
              {getListObj.notificationList.map(notification => {
                return (
                  <Col key={notification._id} span={24}>
                    <NotificationItem
                      notification={notification}
                      onDeleteNotification={onDeleteNotification}
                      onReadNotification={onReadNotification}
                    />
                  </Col>
                )
              })}
            </Row>
            <Row>
              <Pagination
                simple
                defaultCurrent={parseInt(currentPage)}
                defaultPageSize={parseInt(limit)}
                total={getListObj.numberOfNotifications}
                onChange={handleChangePage}
              />
            </Row>
          </>
        )}
      </div>
    </div>
  )
}

NotificationPage.propTypes = {}

export default NotificationPage
