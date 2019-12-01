import './FeatureTeacher.scss'

import React from 'react'
import { Row, Col } from 'antd'
import ava from '../../../assets/images/avatar_mau.jpg'

const FeatureTeacher = () => (
  <div className="feature-teacher">
    <h3 className="heading-primary">Giáo viên nổi bậc</h3>
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} className="info-teacher">
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <figure className="info-teacher__avatar">
            <img src={ava} alt="" />
          </figure>
          <div className="info-teacher__content">
            <h4>Hồ Hoàng Yến</h4>
            <p>Trình độ: Giảng viên Đại Học Sài Gòn</p>
            <p>Chuyên môn: Toán, Lý, Hóa</p>
            <p>Số điện thoại: 0123435959</p>
          </div>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <figure className="info-teacher__avatar">
            <img src={ava} alt="" />
          </figure>
          <div className="info-teacher__content">
            <h4>Hồ Hoàng Yến</h4>
            <p>Trình độ: Giảng viên Đại Học Sài Gòn</p>
            <p>Chuyên môn: Toán, Lý, Hóa</p>
            <p>Số điện thoại: 0123435959</p>
          </div>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <figure className="info-teacher__avatar">
            <img src={ava} alt="" />
          </figure>
          <div className="info-teacher__content">
            <h4>Hồ Hoàng Yến</h4>
            <p>Trình độ: Giảng viên Đại Học Sài Gòn</p>
            <p>Chuyên môn: Toán, Lý, Hóa</p>
            <p>Số điện thoại: 0123435959</p>
          </div>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <figure className="info-teacher__avatar">
            <img src={ava} alt="" />
          </figure>
          <div className="info-teacher__content">
            <h4> Hồ Hoàng Yến</h4>
            <p>Trình độ: Giảng viên Đại Học Sài Gòn</p>
            <p>Chuyên môn: Toán, Lý, Hóa</p>
            <p>Số điện thoại: 0123435959</p>
          </div>
        </div>
      </Col>
    </Row>
  </div>
)

export default FeatureTeacher
