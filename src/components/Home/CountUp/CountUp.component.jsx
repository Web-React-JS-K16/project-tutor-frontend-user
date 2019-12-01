import './CountUp.scss'

import React from 'react'
import { Row, Col } from 'antd'
import CountUp from 'react-countup'

// eslint-disable-next-line react/prefer-stateless-function
const CountUpComponent = () => (
  <div className="count-up">
    <h3 className="heading-primary">Thông số thống kê</h3>
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-webpage-txt" />
          <CountUp className="count" end={500} duration={5} />
          <p className="sub">Lớp học</p>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-globe" />
          <CountUp className="count" end={1000} duration={5} />
          <p className="sub">Giáo viên</p>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-paperplane" />
          <CountUp className="count" end={1500} duration={5} />
          <p className="sub">Lượt truy cập</p>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-spread-bookmark" />
          <CountUp className="count" end={100} duration={5} />
          <p className="sub">Chủ đề</p>
        </div>
      </Col>
    </Row>
  </div>
)

export default CountUpComponent
