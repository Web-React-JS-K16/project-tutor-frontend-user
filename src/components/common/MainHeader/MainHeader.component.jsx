/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Input, Button, Badge, Icon } from 'antd'
import Swal from 'sweetalert2'
import * as moment from 'moment'
import UserService from 'services/user.service'
import NotificationService from 'services/notification.service'
import { JWT_TOKEN, TEACHER, ITEMS_PER_PAGE } from 'utils/constant'
import { withRouter } from 'react-router'
import './MainHeader.style.scss'

const { Header } = Layout
const { SubMenu } = Menu
const { Search } = Input

const MainHeader = ({
  history,
  currentUser,
  getNotificationListObj,
  handleLogout,
  onAuthenticate,
  onClearNotificationState,
  getNotificationList,
}) => {
  useEffect(() => {
    const token = UserService.getPreferences(JWT_TOKEN)
    if (!currentUser && token) onAuthenticate(token)
  }, [currentUser, onAuthenticate])

  useEffect(() => {
    let interval
    onClearNotificationState()

    if (currentUser) {
      const userId = currentUser._id
      getNotificationList({
        userId,
        currentPage: 1,
        currentLimit: ITEMS_PER_PAGE,
      })
      interval = setInterval(
        () =>
          getNotificationList({
            userId,
            currentPage: 1,
            currentLimit: ITEMS_PER_PAGE,
          }),
        30000
      )
    }

    // returned function will be called on component unmount
    return () => {
      clearTimeout(interval)
    }
  }, [currentUser, onClearNotificationState, getNotificationList])

  const userOptions = {
    viSignin: 'đăng nhập',
    viSignup: 'đăng ký',
    viStudent: 'Học sinh',
    viTeacher: 'Giáo viên',
    enSignin: 'login',
    enSignup: 'register',
    enStudent: 'student',
    enTeacher: 'teacher',
  }

  /* inputOptions can be an object or Promise */
  const inputOptions = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        0: userOptions.viStudent,
        1: userOptions.viTeacher,
      })
    }, 1000)
  })

  const showConfirm = confirmAction => {
    Swal.fire({
      title: `Bạn muốn ${confirmAction} với tư cách là`,
      icon: 'info',
      input: 'radio',
      inputOptions,
      inputValue: 0,
      confirmButtonText: 'OK',
      inputValidator: value => {
        if (!value) {
          return 'Bạn chưa chọn vai trò!'
        }
        let userType = userOptions.enStudent
        let action = userOptions.enSignin
        if (confirmAction === userOptions.viSignup) {
          action = userOptions.enSignup
        }
        if (value === '1') {
          userType = userOptions.enTeacher
        }
        // eslint-disable-next-line no-undef
        window.location.href = `/${userType}/${action}`
        return null
      },
    })
  }

  const onSearch = value => {
    // const {history} = props;
    // console.log('on search push: ', value)
    history.push({
      pathname: `/teacher/search/${value}`,
    })
  }

  const onReadNotification = (e, notification) => {
    NotificationService.updateIsReadNotification(notification._id)
      .then(history.push(notification.link))
      .catch(err => console.log('ERROR UPDATE IS-READ NOTIFICATION ', err.message))
  }

  const NotificationMenu = (
    <Menu style={{ width: '300px' }}>
      {getNotificationListObj && getNotificationListObj.notificationList.length > 0 ? (
        getNotificationListObj.notificationList.map(notification => {
          return (
            <Menu.Item
              key={notification._id}
              style={{
                borderBottom: '1px solid #e8e8e8',
                whiteSpace: 'normal',
                backgroundColor: !notification.isRead ? '#fffbe6' : 'transparent',
              }}
            >
              {/* <Link to={notification.link}> */}
              <div
                onClick={e => onReadNotification(e, notification)}
                style={{ fontSize: '13px', color: '#656565' }}
              >
                {moment(notification.createdAt).format('DD/MM/YYYY HH:mm')}
              </div>
              <div
                style={{
                  color: !notification.isRead ? '#faad14' : '#001529',
                }}
                onClick={e => onReadNotification(e, notification)}
              >
                {notification.content.length > 68
                  ? `${notification.content.substr(0, 68)}...`
                  : notification.content}
              </div>
              {/* </Link> */}
            </Menu.Item>
          )
        })
      ) : (
        <Menu.Item>
          <div>Bạn không có thông báo mới nào!</div>
        </Menu.Item>
      )}
      {currentUser && getNotificationListObj && getNotificationListObj.notificationList.length > 0 && (
        <Menu.Item>
          <Link to="/notification-list">
            <div>Xem tất cả</div>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  )

  const UserMenu = (
    <Menu>
      <Menu.Item style={{ cursor: 'default' }}>
        Xin chào, {currentUser && currentUser.displayName}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        {currentUser &&
          (currentUser.typeID === TEACHER ? (
            <Link to={`/teacher/info/${currentUser._id}`}>Trang cá nhân</Link>
          ) : (
            <Link to="/student/update-info">Chỉnh sửa thông tin</Link>
          ))}
      </Menu.Item>
      <Menu.Item>
        <Link to="/chat">Tin nhắn</Link>
      </Menu.Item>
      <Menu.Item>{currentUser && <Link to="/contract-list">Hợp đồng</Link>}</Menu.Item>
      {currentUser && currentUser.typeID === TEACHER && (
        <Menu.Item>
          <Link to="/teacher/statistics">Thống kê</Link>
        </Menu.Item>
      )}
      <Menu.Item>
        <Link to="/change-password">Đổi mật khẩu</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/">
          <div onClick={handleLogout}>Đăng xuất</div>
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="main-header">
      <div className="main-header__logo">
        <Link to="/">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJhcnR3b3JrX291dGxpbmVkXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTAyLjQgMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZT4uc3Qwe2ZpbGw6IzQ5NDk0OX08L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02NS40IDYuOWMtNC41IDAtOC4xIDMuNi04LjEgOC4xczMuNiA4LjEgOC4xIDguMSA4LjEtMy42IDguMS04LjEtMy42LTguMS04LjEtOC4xem0wIDEyLjljLTIuNiAwLTQuOC0yLjEtNC44LTQuOHMyLjEtNC44IDQuOC00LjhjMi42IDAgNC44IDIuMSA0LjggNC43IDAgMi43LTIuMSA0LjktNC44IDQuOXpNODMuNCAxMC44Yy0yLjMgMC00LjIgMS45LTQuMiA0LjJ2Ny43aC0zLjVWNy40aDMuNXYyLjRjMS0xLjUgMi43LTIuNCA0LjUtMi40aDEuMXYzLjRoLTEuNHpNNDguMiA3LjRMNTAuOCAxOGwyLjktMTAuNmgzLjRsLTQuNCAxNS4zaC0zLjVMNDYuNSAxMmwtMi43IDEwLjdoLTMuNUwzNS45IDcuNGgzLjRMNDIuMiAxOGwyLjctMTAuNnpNOTUgMTQuNGMyLjYtMS40IDQuMS00LjEgNC4xLTcuMWgtMy40YzAgMi42LTIuMSA0LjYtNC42IDQuNmgtLjVWMGgtMy41djIyLjdoMy41di03LjJoLjRjLjQgMCAuOC4yIDEgLjVsNC45IDYuN2g0LjJMOTUgMTQuNHoiLz48cGF0aCBkPSJNMjcuNiA2LjljLTMuOCAwLTYuNyAyLjUtNy45IDYuNS0xLjgtMi43LTMuMS01LjctNC04LjhoLTQuMXYxMC42YzAgMi4xLTEuNyAzLjgtMy44IDMuOFM0IDE3LjMgNCAxNS4yVjQuN0gwdjEwLjZjMCA0LjMgMy41IDcuOSA3LjkgNy45czcuOS0zLjUgNy45LTcuOXYtMS44Yy44IDEuNyAxLjggMy4zIDIuOSA0LjhMMTYuMiAzMGg0LjJsMS44LTguNWMxLjYgMS4xIDMuNSAxLjcgNS41IDEuNyA0LjUgMCA4LjEtMy42IDguMS04LjEtLjEtNC41LTMuNy04LjItOC4yLTguMnptMCAxMi4yYy0xLjctLjEtMy4zLS43LTQuNi0xLjhsLjMtMS42di0uMWMuMy0xLjcgMS4zLTQuNiA0LjItNC42IDIuMi0uMSA0IDEuNyA0LjEgMy45LjEgMi4yLTEuNyA0LTMuOSA0LjFsLS4xLjF6IiBmaWxsPSIjNmZkYTQ0Ii8+PC9zdmc+"
            alt=""
          />
        </Link>
      </div>
      {currentUser && getNotificationListObj && (
        <div className="main-header__notifications">
          <Badge count={getNotificationListObj.numberOfUnreadNotifications}>
            <Dropdown
              overlay={NotificationMenu}
              placement="bottomRight"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Icon
                type="bell"
                style={{
                  color:
                    getNotificationListObj.numberOfUnreadNotifications > 0
                      ? '#faad14'
                      : 'rgba(0, 0, 0, 0.45)',
                }}
                theme="filled"
              />
            </Dropdown>
          </Badge>
        </div>
      )}
      <div className="main-header__user">
        {currentUser ? (
          <Dropdown
            overlay={currentUser ? UserMenu : null}
            placement="bottomRight"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Avatar size="large" src={currentUser.avatar} />
          </Dropdown>
        ) : (
          <>
            <Button type="link" onClick={() => showConfirm(userOptions.viSignin)}>
              Đăng nhập
            </Button>
            <Button type="link" onClick={() => showConfirm(userOptions.viSignup)}>
              Đăng ký
            </Button>
          </>
        )}
      </div>
      <div className="main-header__search">
        <Search
          placeholder="Tìm kiếm"
          onSearch={value => onSearch(value)}
          style={{ width: 200 }}
          enterButton
        />
      </div>
      <Menu
        getPopupContainer={node => node.parentNode}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/teacher">Gia sư</Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>Chuyên ngành</span>
            </span>
          }
        >
          <SubMenu key="sub1-1" title="CNTT">
            <Menu.Item key="3">Hệ điều hành</Menu.Item>
            <Menu.Item key="4">Cấu trúc dữ liệu và giải thuật</Menu.Item>
          </SubMenu>
          <Menu.Item key="5">Vật lý</Menu.Item>
          <SubMenu key="sub1-2" title="Toán">
            <Menu.Item key="6">Toán tổ hợp</Menu.Item>
            <Menu.Item key="7">Vi tích phân</Menu.Item>
          </SubMenu>
          <Menu.Item key="8">Hóa học</Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  )
}

// MainHeader.propTypes = {}

export default withRouter(MainHeader)
