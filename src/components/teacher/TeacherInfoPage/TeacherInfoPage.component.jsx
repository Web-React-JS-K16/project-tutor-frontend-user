/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import {
  Icon,
  Rate,
  Progress,
  Divider,
  Tag,
  Statistic,
  Row,
  Col,
  Pagination,
  Spin,
  Button,
} from 'antd'
import './TeacherInfoPage.style.scss'
import WorkHistoryItem from './components/WorkHistoryItem/WorkHistoryItem.component'
import TeacherService from '../../../services/teacher.service'
import { STUDENT } from '../../../utils/constant'
import ModalForm from './components/ModalForm/ModalForm.component'

const TeacherInfoPage = ({ currentUser, teacher, getTeacherInfo, createContract }) => {
  const query = TeacherService.useQuery()
  const userId = query.get('id')

  useEffect(() => {
    if (userId) {
      getTeacherInfo(userId)
    }
  }, [userId, getTeacherInfo])

  const [visible, setVisible] = useState(false)
  const [formRef, setFormRef] = useState(null)

  const handleCreate = () => {
    formRef.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      const { name, content, date } = values
      const contract = {
        name,
        content,
        teacherId: teacher._id,
        studentId: currentUser._id,
        startDate: date[0],
        endDate: date[1],
        costPerHour: teacher.salary,
      }
      createContract(contract)
      formRef.resetFields()
      setVisible(false)
    })
  }

  const saveFormRef = useCallback(node => {
    if (node !== null) {
      setFormRef(node)
    }
  }, [])

  return (
    <div className="teacher-info-page">
      {teacher ? (
        <>
          <div className="teacher-info-page__wrapper">
            <div className="teacher-info-page__wrapper__basic-info">
              <div className="teacher-info-page__wrapper__basic-info__left">
                <img src={teacher.avatar} alt="" />
                <div>
                  <div className="name">{teacher.displayName}</div>
                  {!teacher.city && !teacher.district && (
                    <div className="address">
                      <Icon type="environment" />
                      <i>&nbsp;Chưa cập nhật địa chỉ</i>
                    </div>
                  )}
                  {(teacher.city || teacher.district) && (
                    <div className="address">
                      <Icon type="environment" />
                      {teacher.district && <span>&nbsp;{teacher.district.name}</span>}
                      {teacher.city && <span>,&nbsp;{teacher.city.name}</span>}
                    </div>
                  )}
                  {currentUser.typeID === STUDENT && (
                    <Button
                      style={{ marginTop: 15 }}
                      size="small"
                      type="primary"
                      onClick={() => setVisible(true)}
                    >
                      Đăng kí học
                    </Button>
                  )}
                  <ModalForm
                    ref={saveFormRef}
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    onCreate={() => handleCreate()}
                    teacher={teacher}
                  />
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
              {!teacher.about && (
                <p>
                  <i>Chưa cập nhật giới thiệu</i>
                </p>
              )}
              <p>{teacher.about}</p>
            </div>
            <div className="teacher-info-page__wrapper__skill-tags">
              {(!teacher.tags || teacher.tags.length === 0) && <i>Chưa cập nhật kĩ năng</i>}
              {teacher.tags.map(tag => {
                return (
                  <Tag key={tag._id} color="orange">
                    {tag.name}
                  </Tag>
                )
              })}
            </div>
            <Divider />
            <div className="teacher-info-page__wrapper__statistics">
              <Row>
                <Col span={4}>
                  <Statistic title="Mức lương (vnđ/h)" value={teacher.formatSalary} />
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
                {(!teacher.contracts || teacher.contracts.length === 0) && <i>Trống</i>}
                {teacher.contracts.map(contract => {
                  return <WorkHistoryItem key={contract.name} contract={contract} />
                })}
              </div>
              <Pagination simple defaultCurrent={1} total={50} />
            </div>
          </div>
        </>
      ) : (
        <div className="teacher-info-page__loading">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      )}
    </div>
  )
}

TeacherInfoPage.propTypes = {}

export default TeacherInfoPage
