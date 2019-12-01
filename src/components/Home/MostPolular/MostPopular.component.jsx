import './MostPopular.scss'

import React from 'react'
import { Row, Col } from 'antd'

const MostPopular = () => (
  <div className="popular">
    <h3 className="heading-primary">Ưu điểm nổi bậc</h3>
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-spread-text-bookmark" />
          <h3 className="popular__heading heading-primary">Gia sư</h3>
          <p className="popular__sub sub-content">
            Đội ngũ gia sư được tuyển chọn bài bản, chất lượng chuyên môn tốt
          </p>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-rss" />
          <h3 className="popular__heading heading-primary">Kết nối trực tiếp</h3>
          <p className="popular__sub sub-content">
            Phụ huynh và gia sư kết nối trực tiếp không phải thông qua trung gian môi giới
          </p>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-magnifier-plus" />
          <h3 className="popular__heading heading-primary">Tìm kiếm nhanh chóng</h3>
          <p className="popular__sub sub-content">
            Phụ huynh và gia sư có thể dễ dàng tìm kiếm các lớp học trong phạm vi 20km
          </p>
        </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">
          <i className="icon icon-basic-clockwise" />
          <h3 className="popular__heading heading-primary">Chi phí và thời gian</h3>
          <p className="popular__sub sub-content">
            Phụ huynh và gia sư có thể điều chỉnh thời gian, chi phí lớp học một cách hợp lý
          </p>
        </div>
      </Col>
    </Row>
  </div>
)

export default MostPopular
