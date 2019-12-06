import './CountUp.scss'

import React from 'react'
import CountUp from 'react-countup'

// eslint-disable-next-line react/prefer-stateless-function
const CountUpComponent = () => (
  <div className="count-up">
    <h3 className="heading-primary">Thông số thống kê</h3>
    <div className="content">
      <div className="content__box">
        <i className="icon icon-basic-webpage-txt" />
        <CountUp className="count" end={500} duration={5} />
        <p className="sub">Lớp học</p>
      </div>
      <div className="content__box">
        <i className="icon icon-basic-globe" />
        <CountUp className="count" end={1000} duration={5} />
        <p className="sub">Giáo viên</p>
      </div>
      <div className="content__box">
        <i className="icon icon-basic-paperplane" />
        <CountUp className="count" end={1500} duration={5} />
        <p className="sub">Lượt truy cập</p>
      </div>
      <div className="content__box">
        <i className="icon icon-basic-spread-bookmark" />
        <CountUp className="count" end={100} duration={5} />
        <p className="sub">Chủ đề</p>
      </div>
    </div>
  </div>
)

export default CountUpComponent
