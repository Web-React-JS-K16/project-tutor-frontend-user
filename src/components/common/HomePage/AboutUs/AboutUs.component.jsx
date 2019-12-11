import './AboutUs.scss'
import React from 'react'
import { Button } from 'antd'

// eslint-disable-next-line import/prefer-default-export
const AboutUs = () => (
  <div className="about-us-home">
    <h3 className="heading-primary">Giải pháp tìm kiếm gia sư</h3>
    <p className="sub-content">
      Tìm kiếm gia sư, lớp học thêm khiến bạn trở nên quá mệt mỏi, hay bạn muốn trở thành gia sư
      kiếm thêm thu nhập. Hãy để chúng tôi giải quyết giúp bạn.
    </p>
    <Button className="button-more">Xem thêm</Button>
  </div>
)

export default AboutUs
