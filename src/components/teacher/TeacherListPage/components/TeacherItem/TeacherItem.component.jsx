/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Divider, Tag, Rate, Button, Row, Col } from 'antd'
import './TeacherItem.style.scss'

const TeacherItem = ({ teacher }) => {
  return (
    <div className="teacher-item">
      <div className="teacher-item__basic-info">
        <div className="teacher-item__basic-info__left">
          <Link to={`/teacher/info/${teacher._id}`}>
            <img src={teacher.avatar} alt="" />
          </Link>
        </div>
        <div className="teacher-item__basic-info__right">
          <Link to={`/teacher/info/${teacher._id}`}>
            <div className="name">{teacher.displayName}</div>
          </Link>

          {!teacher.city && !teacher.district ? (
            <div className="address">
              <Icon type="environment" />
              <i>&nbsp;Chưa cập nhật địa chỉ</i>
            </div>
          ) : (
            <div className="address">
              <Icon type="environment" />
              <span>
                &nbsp;{teacher.district && teacher.district.name},&nbsp;
                {teacher.city && teacher.city.name}
              </span>
            </div>
          )}
          <div className="ratings">
            <Rate disabled defaultValue={teacher.ratings} />
          </div>
        </div>
      </div>

      <div className="teacher-item__sub-info">
        <Row>
          <Col span={14}>
            <div className="cost">
              <b>{teacher.salary}</b> vnđ/h
            </div>
          </Col>
          <Col span={10}>
            <div className="jobs">
              <b>{teacher.jobs}</b> hợp đồng
            </div>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="teacher-item__tags">
        {!teacher.tags || teacher.tags.length === 0 ? (
          <i>Chưa cập nhật kĩ năng</i>
        ) : (
          teacher.tags.slice(0, 5).map(tag => {
            return (
              <Tag key={tag._id} color="orange">
                {tag.name}
              </Tag>
            )
          })
        )}
        {/* <Tag color="orange">Toán lớp 1</Tag>
        <Tag color="orange">Toán đại số 10</Tag>
        <Tag color="orange">Toán cao cấp</Tag> */}
      </div>
      <Link to={`/teacher/info?id=${teacher._id}`}>
        <Button type="primary">Xem chi tiết</Button>
      </Link>
    </div>
  )
}

export default TeacherItem
