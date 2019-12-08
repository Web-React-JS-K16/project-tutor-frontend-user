/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Icon, Rate, Progress, Divider, Tag, Statistic, Row, Col, Pagination } from 'antd'
import './TeacherInfoPage.style.scss'
import WorkHistoryItem from 'components/common/WorkHistoryItem/WorkHistoryItem.component'
import TeacherService from '../../../services/teacher.service'

const TeacherInfoPage = ({ teacher, getTeacherInfo }) => {
  const query = TeacherService.useQuery()
  const userId = query.get('id')

  useEffect(() => {
    if (userId) {
      getTeacherInfo(userId)
    }
  }, [userId, getTeacherInfo])

  return (
    <div className="teacher-info-page">
      {teacher && (
        <>
          <div className="teacher-info-page__wrapper">
            <div className="teacher-info-page__wrapper__basic-info">
              <div className="teacher-info-page__wrapper__basic-info__left">
                <img src={teacher.avatar} alt="" />
                <div>
                  <div className="name">{teacher.displayName}</div>
                  {(teacher.city || teacher.district || teacher.ward) && (
                    <div className="address">
                      <Icon type="environment" />
                      {teacher.city && <span>&ensp;{teacher.city}</span>}
                      {teacher.district && <span>,&nbsp;{teacher.district}</span>}
                      {teacher.ward && <span>,&nbsp;{teacher.ward}</span>}
                    </div>
                  )}
                </div>
              </div>
              <div className="teacher-info-page__wrapper__basic-info__right">
                <div
                  className="job-success"
                  percent-success={`${teacher.successRate}%`}
                  job-success="Tỉ lệ thành công"
                >
                  <Progress
                    percent={teacher.successRate}
                    status="active"
                    showInfo={false}
                    size="small"
                  />
                </div>
                <div className="ratings">
                  <Rate disabled defaultValue={teacher.ratings} />
                  <div>Tỉ lệ đánh giá</div>
                </div>
              </div>
            </div>
            <div className="teacher-info-page__wrapper__description">
              {/* <h4>Lawyer & Freelance Writer</h4> */}
              <p>{teacher.about}</p>
            </div>
            <div className="teacher-info-page__wrapper__skill-tags">
              {teacher.tags.map(tag => {
                return (
                  <Tag key={tag._id} color="#faad14">
                    {tag.name}
                  </Tag>
                )
              })}
            </div>
            <Divider />
            <div className="teacher-info-page__wrapper__statistics">
              <Row gutter={16}>
                <Col span={4}>
                  <Statistic title="Mức lương (vnđ/h)" value={teacher.salary} />
                </Col>
                <Col span={4}>
                  <Statistic title="Công việc đã làm" value={teacher.jobs} />
                </Col>
                <Col span={4}>
                  <Statistic title="Số giờ đã làm" value={teacher.hoursWorked} />
                </Col>
              </Row>
            </div>
          </div>
          <div className="teacher-info-page__wrapper">
            <div className="teacher-info-page__wrapper__work-history">
              <div className="title">Lịch sử làm việc</div>
              <div className="content">
                {teacher.contracts.map(contract => {
                  const startDate = new Date(contract.startDate)
                  const endDate = new Date(contract.endDate)
                  const formatStartDate = `${startDate.getMonth()} ${startDate.getFullYear()}`
                  const formatEndDate = `${endDate.getMonth()} ${endDate.getFullYear()}`
                  return (
                    <WorkHistoryItem
                      key={contract.name}
                      name={contract.name}
                      startDate={formatStartDate}
                      endDate={formatEndDate}
                      ratings={contract.comment.ratings}
                      cost={contract.cost}
                      workingHour={contract.workingHour}
                      comment={contract.comment.content}
                    />
                  )
                })}
              </div>
              <Pagination simple defaultCurrent={1} total={50} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

TeacherInfoPage.propTypes = {}

export default TeacherInfoPage
