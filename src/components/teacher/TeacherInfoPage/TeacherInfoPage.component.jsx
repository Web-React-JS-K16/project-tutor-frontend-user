/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
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
import { STUDENT } from '../../../utils/constant'
import ModalForm from './components/ModalForm/ModalForm.component'

const TeacherInfoPage = ({
  currentUser,
  getInfoObj,
  onClearTeacherState,
  teacherGetInfo,
  createContract,
}) => {
  useEffect(() => {
    onClearTeacherState()
    if (currentUser) {
      teacherGetInfo(currentUser._id)
    }
  }, [currentUser, onClearTeacherState, teacherGetInfo])

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
        teacherId: getInfoObj.teacher._id,
        studentId: currentUser._id,
        startDate: date[0],
        endDate: date[1],
        costPerHour: getInfoObj.teacher.salary,
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

  if (!getInfoObj.isLoading && getInfoObj.isSuccess === false) {
    return (
      <Redirect
        to={{
          pathname: '/error-page',
          state: { message: `${getInfoObj.message}` },
        }}
      />
    )
  }

  return (
    <div className="teacher-info-page">
      {getInfoObj.isLoading && (
        <div className="teacher-info-page__loading">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      )}
      {!getInfoObj.isLoading && getInfoObj.isSuccess === true && (
        <>
          <div className="teacher-info-page__wrapper">
            <div className="teacher-info-page__wrapper__basic-info">
              <div className="teacher-info-page__wrapper__basic-info__left">
                <img src={getInfoObj.teacher.avatar} alt="" />
                <div>
                  <div className="name">{getInfoObj.teacher.displayName}</div>
                  {!getInfoObj.teacher.city && !getInfoObj.teacher.district ? (
                    <div className="address">
                      <Icon type="environment" />
                      <i>&nbsp;Chưa cập nhật địa chỉ</i>
                    </div>
                  ) : (
                    <div className="address">
                      <Icon type="environment" />
                      {getInfoObj.teacher.district && (
                        <span>&nbsp;{getInfoObj.teacher.district.name}</span>
                      )}
                      {getInfoObj.teacher.city && (
                        <span>,&nbsp;{getInfoObj.teacher.city.name}</span>
                      )}
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
                    teacher={getInfoObj.teacher}
                  />
                </div>
              </div>
              <div className="teacher-info-page__wrapper__basic-info__right">
                <div
                  className="job-success"
                  percent-success={`${getInfoObj.teacher.successRate}%`}
                  job-success="Tỉ lệ thành công"
                >
                  <Progress
                    percent={getInfoObj.teacher.successRate}
                    status="active"
                    showInfo={false}
                    size="small"
                  />
                </div>
                <div className="ratings">
                  <Rate disabled defaultValue={getInfoObj.teacher.ratings} />
                  <div>Tỉ lệ đánh giá</div>
                </div>
              </div>
            </div>
            <div className="teacher-info-page__wrapper__description">
              {/* <h4>Lawyer & Freelance Writer</h4> */}
              {!getInfoObj.teacher.about ? (
                <p>
                  <i>Chưa cập nhật giới thiệu</i>
                </p>
              ) : (
                <p>{getInfoObj.teacher.about}</p>
              )}
            </div>
            <div className="teacher-info-page__wrapper__skill-tags">
              {!getInfoObj.teacher.tags || getInfoObj.teacher.tags.length === 0 ? (
                <i>Chưa cập nhật kĩ năng</i>
              ) : (
                getInfoObj.teacher.tags.map(tag => {
                  return (
                    <Tag key={tag._id} color="orange">
                      {tag.name}
                    </Tag>
                  )
                })
              )}
            </div>
            <Divider />
            <div className="teacher-info-page__wrapper__statistics">
              <Row>
                <Col span={4}>
                  <Statistic title="Mức lương (vnđ/h)" value={getInfoObj.teacher.formatSalary} />
                </Col>
                <Col span={4}>
                  <Statistic title="Công việc đã làm" value={getInfoObj.teacher.jobs} />
                </Col>
                <Col span={4}>
                  <Statistic title="Số giờ đã làm" value={getInfoObj.teacher.hoursWorked} />
                </Col>
              </Row>
            </div>
          </div>
          <div className="teacher-info-page__wrapper">
            <div className="teacher-info-page__wrapper__work-history">
              <div className="title">Lịch sử làm việc</div>
              <div className="content">
                {!getInfoObj.teacher.contracts || getInfoObj.teacher.contracts.length === 0 ? (
                  <i>Trống</i>
                ) : (
                  getInfoObj.teacher.contracts.map(contract => {
                    return <WorkHistoryItem key={contract.name} contract={contract} />
                  })
                )}
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
