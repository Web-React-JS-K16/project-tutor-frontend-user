/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Input, Button } from 'antd'
import Swal from 'sweetalert2'
import UserService from 'services/user.service'
import { jwtToken } from 'utils/constant'
import './MainHeader.style.scss'
// import PropTypes from 'prop-types'

const { Header } = Layout
const { SubMenu } = Menu
const { Search } = Input

const MainHeader = ({ currentUser, handleLogout, onAuthenticate }) => {
  // const [userType, setUserType] = useState(STUDENT)

  useEffect(() => {
    const token = UserService.getPreferences(jwtToken)
    if (!currentUser && token) onAuthenticate(token)
  }, [currentUser, onAuthenticate])

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

  // const radioStyle = {
  //   display: 'block',
  //   height: '30px',
  //   lineHeight: '30px',
  // }

  // const handleOnChange = e => {
  //   setUserType(e.target.value)
  // }

  // const showConfirm = confirmAction => {
  //   Modal.confirm({
  //     centered: true,
  //     title: `Bạn muốn ${confirmAction} với tư cách là`,
  //     content: (
  //       <Radio.Group onChange={handleOnChange} defaultValue={STUDENT}>
  //         <Radio style={radioStyle} value={STUDENT}>
  //           Học sinh
  //         </Radio>
  //         <Radio style={radioStyle} value={TEACHER}>
  //           Giáo viên
  //         </Radio>
  //       </Radio.Group>
  //     ),
  //     okText: 'Đồng ý',
  //     cancelText: 'Hủy bỏ',
  //     onOk() {
  //       if (confirmAction === 'đăng nhập') {
  //         return userType == 0
  //           ? (window.location.href = 'student/login')
  //           : (window.location.href = 'teacher/login')
  //       } else {
  //         return userType == 0
  //           ? (window.location.href = 'student/register')
  //           : (window.location.href = 'teacher/register')
  //       }
  //     },
  //     onCancel() {
  //       console.log('Cancel')
  //     },
  //   })
  // }

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

  const UserMenu = (
    <Menu>
      <Menu.Item>Xin chào, {currentUser && currentUser.displayName}</Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to="/">Trang cá nhân</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/">Đổi mật khẩu</Link>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:;" onClick={handleLogout}>
          Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="main-header" style={{}}>
      <div className="main-header__logo">
        <Link to="/">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJhcnR3b3JrX291dGxpbmVkXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTAyLjQgMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZT4uc3Qwe2ZpbGw6IzQ5NDk0OX08L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02NS40IDYuOWMtNC41IDAtOC4xIDMuNi04LjEgOC4xczMuNiA4LjEgOC4xIDguMSA4LjEtMy42IDguMS04LjEtMy42LTguMS04LjEtOC4xem0wIDEyLjljLTIuNiAwLTQuOC0yLjEtNC44LTQuOHMyLjEtNC44IDQuOC00LjhjMi42IDAgNC44IDIuMSA0LjggNC43IDAgMi43LTIuMSA0LjktNC44IDQuOXpNODMuNCAxMC44Yy0yLjMgMC00LjIgMS45LTQuMiA0LjJ2Ny43aC0zLjVWNy40aDMuNXYyLjRjMS0xLjUgMi43LTIuNCA0LjUtMi40aDEuMXYzLjRoLTEuNHpNNDguMiA3LjRMNTAuOCAxOGwyLjktMTAuNmgzLjRsLTQuNCAxNS4zaC0zLjVMNDYuNSAxMmwtMi43IDEwLjdoLTMuNUwzNS45IDcuNGgzLjRMNDIuMiAxOGwyLjctMTAuNnpNOTUgMTQuNGMyLjYtMS40IDQuMS00LjEgNC4xLTcuMWgtMy40YzAgMi42LTIuMSA0LjYtNC42IDQuNmgtLjVWMGgtMy41djIyLjdoMy41di03LjJoLjRjLjQgMCAuOC4yIDEgLjVsNC45IDYuN2g0LjJMOTUgMTQuNHoiLz48cGF0aCBkPSJNMjcuNiA2LjljLTMuOCAwLTYuNyAyLjUtNy45IDYuNS0xLjgtMi43LTMuMS01LjctNC04LjhoLTQuMXYxMC42YzAgMi4xLTEuNyAzLjgtMy44IDMuOFM0IDE3LjMgNCAxNS4yVjQuN0gwdjEwLjZjMCA0LjMgMy41IDcuOSA3LjkgNy45czcuOS0zLjUgNy45LTcuOXYtMS44Yy44IDEuNyAxLjggMy4zIDIuOSA0LjhMMTYuMiAzMGg0LjJsMS44LTguNWMxLjYgMS4xIDMuNSAxLjcgNS41IDEuNyA0LjUgMCA4LjEtMy42IDguMS04LjEtLjEtNC41LTMuNy04LjItOC4yLTguMnptMCAxMi4yYy0xLjctLjEtMy4zLS43LTQuNi0xLjhsLjMtMS42di0uMWMuMy0xLjcgMS4zLTQuNiA0LjItNC42IDIuMi0uMSA0IDEuNyA0LjEgMy45LjEgMi4yLTEuNyA0LTMuOSA0LjFsLS4xLjF6IiBmaWxsPSIjNmZkYTQ0Ii8+PC9zdmc+"
            alt=""
          />
        </Link>
      </div>
      <div className="main-header__user">
        {currentUser ? (
          <Dropdown
            overlay={UserMenu}
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
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
      </div>

      <Menu
        getPopupContainer={node => node.parentNode}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Trang chủ</Menu.Item>
        <Menu.Item key="2">Giáo viên</Menu.Item>
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

MainHeader.propTypes = {}

export default MainHeader
