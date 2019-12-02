import React from 'react'
import { Layout, Row, Col, Divider, Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './MainFooter.style.scss'

const { Footer } = Layout

const MainFooter = () => {
  return (
    <Footer className="main-footer">
      <div className="main-footer__top">
        <Row>
          <Col span={9}>
            <div className="main-footer__top__logo">
              <Link to="/">
                <img
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJhcnR3b3JrX291dGxpbmVkXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTAyLjQgMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZT4uc3Qwe2ZpbGw6IzQ5NDk0OX08L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02NS40IDYuOWMtNC41IDAtOC4xIDMuNi04LjEgOC4xczMuNiA4LjEgOC4xIDguMSA4LjEtMy42IDguMS04LjEtMy42LTguMS04LjEtOC4xem0wIDEyLjljLTIuNiAwLTQuOC0yLjEtNC44LTQuOHMyLjEtNC44IDQuOC00LjhjMi42IDAgNC44IDIuMSA0LjggNC43IDAgMi43LTIuMSA0LjktNC44IDQuOXpNODMuNCAxMC44Yy0yLjMgMC00LjIgMS45LTQuMiA0LjJ2Ny43aC0zLjVWNy40aDMuNXYyLjRjMS0xLjUgMi43LTIuNCA0LjUtMi40aDEuMXYzLjRoLTEuNHpNNDguMiA3LjRMNTAuOCAxOGwyLjktMTAuNmgzLjRsLTQuNCAxNS4zaC0zLjVMNDYuNSAxMmwtMi43IDEwLjdoLTMuNUwzNS45IDcuNGgzLjRMNDIuMiAxOGwyLjctMTAuNnpNOTUgMTQuNGMyLjYtMS40IDQuMS00LjEgNC4xLTcuMWgtMy40YzAgMi42LTIuMSA0LjYtNC42IDQuNmgtLjVWMGgtMy41djIyLjdoMy41di03LjJoLjRjLjQgMCAuOC4yIDEgLjVsNC45IDYuN2g0LjJMOTUgMTQuNHoiLz48cGF0aCBkPSJNMjcuNiA2LjljLTMuOCAwLTYuNyAyLjUtNy45IDYuNS0xLjgtMi43LTMuMS01LjctNC04LjhoLTQuMXYxMC42YzAgMi4xLTEuNyAzLjgtMy44IDMuOFM0IDE3LjMgNCAxNS4yVjQuN0gwdjEwLjZjMCA0LjMgMy41IDcuOSA3LjkgNy45czcuOS0zLjUgNy45LTcuOXYtMS44Yy44IDEuNyAxLjggMy4zIDIuOSA0LjhMMTYuMiAzMGg0LjJsMS44LTguNWMxLjYgMS4xIDMuNSAxLjcgNS41IDEuNyA0LjUgMCA4LjEtMy42IDguMS04LjEtLjEtNC41LTMuNy04LjItOC4yLTguMnptMCAxMi4yYy0xLjctLjEtMy4zLS43LTQuNi0xLjhsLjMtMS42di0uMWMuMy0xLjcgMS4zLTQuNiA0LjItNC42IDIuMi0uMSA0IDEuNyA0LjEgMy45LjEgMi4yLTEuNyA0LTMuOSA0LjFsLS4xLjF6IiBmaWxsPSIjNmZkYTQ0Ii8+PC9zdmc+"
                />
              </Link>
            </div>
            <div className="main-footer__top__icon-info">
              <Avatar icon={<Icon type="environment" />} />
              30 Phạm Văn Đồng Cầu Giấy, Hà Nội
            </div>
            <div className="main-footer__top__icon-info">
              <Avatar icon={<Icon type="phone" />} />
              0359329688
            </div>
            <div className="main-footer__top__icon-info">
              <Avatar icon={<Icon type="mail" />} />
              cooltheme205@gmail.com
            </div>
          </Col>
          <Col span={5}>
            <div className="main-footer__top__info-title">Cẩm nang sử dụng</div>
            <div className="main-footer__top__info-item">
              <Link to="/">Trang chủ</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Giới thiệu</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Giáo viên</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Chuyên ngành</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Liên hệ</Link>
            </div>
          </Col>
          <Col span={5}>
            <div className="main-footer__top__info-title">Chính sách</div>
            <div className="main-footer__top__info-item">
              <Link to="/">Trang chủ</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Giới thiệu</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Giáo viên</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Chuyên ngành</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Liên hệ</Link>
            </div>
          </Col>
          <Col span={5}>
            <div className="main-footer__top__info-title">Dịch vụ</div>
            <div className="main-footer__top__info-item">
              <Link to="/">Trang chủ</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Giới thiệu</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Giáo viên</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Chuyên ngành</Link>
            </div>
            <div className="main-footer__top__info-item">
              <Link to="/">Liên hệ</Link>
            </div>
          </Col>
        </Row>
      </div>

      <Divider />
      <div className="main-footer__bottom">Ant Design ©2018 Created by Ant UED</div>
    </Footer>
  )
}

export default MainFooter
