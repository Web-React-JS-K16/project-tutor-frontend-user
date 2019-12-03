/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Icon, Rate, Progress, Divider, Tag, Statistic, Row, Col, Pagination } from 'antd'
import './TeacherInfoPage.style.scss'
import WorkHistoryItem from '../common/WorkHistoryItem/WorkHistoryItem.component'

const TeacherInfoPage = () => {
  return (
    <div className="teacher-info-page">
      <div className="teacher-info-page__wrapper">
        <div className="teacher-info-page__wrapper__basic-info">
          <div className="teacher-info-page__wrapper__basic-info__left">
            <img
              src="https://png.pngtree.com/png-clipart/20190906/original/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-png-image_4561296.jpg"
              alt=""
            />
            <div>
              <div className="name">Trần Khánh Linh</div>
              <div className="address">
                <Icon type="environment" />
                &ensp;Hồ Chí Minh, Việt Nam
              </div>
            </div>
          </div>
          <div className="teacher-info-page__wrapper__basic-info__right">
            <div className="job-success" percent-success="90%" job-success="Tỉ lệ thành công">
              <Progress percent={90} status="active" showInfo={false} size="small" />
            </div>
            <div className="ratings">
              <Rate disabled defaultValue={2} />
              <div>Tỉ lệ đánh giá</div>
            </div>
          </div>
        </div>
        <div className="teacher-info-page__wrapper__description">
          <h4>Lawyer & Freelance Writer</h4>
          <p>
            I am a licensed Utah attorney with a background in business law and contract law. I
            strive to provide quality work in a timely manner, and set clear expectations as to
            costs and deliverables. I have plenty of experience with various legal documents,
            contracts, business formation and general counsel work. In general, I offer flat rate
            fees for many services. However, I am available on an hourly rate for legal research and
            advice as well.
          </p>
        </div>
        <div className="teacher-info-page__wrapper__skill-tags">
          <Tag color="#faad14">Dịch tiếng Anh</Tag>
          <Tag color="#faad14">Viết tài liệu</Tag>
          <Tag color="#faad14">Toán cao cấp</Tag>
          <Tag color="#faad14">Toán tổ hợp</Tag>
        </div>
        <Divider />
        <div className="teacher-info-page__wrapper__statistics">
          <Row gutter={16}>
            <Col span={4}>
              <Statistic title="Mức lương (vnđ/h)" value={200000} />
            </Col>
            <Col span={4}>
              <Statistic title="Công việc đã làm" value={156} />
            </Col>
            <Col span={4}>
              <Statistic title="Số giờ đã làm" value={721} />
            </Col>
          </Row>
        </div>
      </div>
      <div className="teacher-info-page__wrapper">
        <div className="teacher-info-page__wrapper__work-history">
          <div className="title">Lịch sử làm việc</div>
          <div className="content">
            <WorkHistoryItem />
            <WorkHistoryItem />
            <WorkHistoryItem />
            <WorkHistoryItem />
          </div>
          <Pagination simple defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  )
}

TeacherInfoPage.propTypes = {}

export default TeacherInfoPage
