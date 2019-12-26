/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
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
  message,
} from 'antd'
import './TeacherInfoPage.style.scss'

import WorkHistoryItem from './components/WorkHistoryItem/WorkHistoryItem.component'
import { STUDENT } from '../../../utils/constant'
import ModalForm from './components/ModalForm/ModalForm.component'

const TeacherInfoPage = ({
  currentUser,
  getInfoObj,
  getContractListObj,
  onClearTeacherState,
  teacherGetInfo,
  getContractListForTeacher,
  createContract,
  onClearContractState,
  match,
}) => {
  const page = 1
  const limit = 4

  const [currentPage, setCurrentPage] = useState(1)
  const [teacherId, setTeacherId] = useState('')

  useEffect(() => {
    onClearTeacherState()
    const { idTeacher } = match.params
    if (idTeacher) {
      teacherGetInfo(idTeacher)
      setTeacherId(idTeacher)
    }
  }, [onClearTeacherState, teacherGetInfo, match])

  useEffect(() => {
    onClearContractState()
    const { idTeacher } = match.params
    if (idTeacher) {
      getContractListForTeacher({
        userId: idTeacher,
        currentPage: page,
        currentLimit: limit,
      })
    }
  }, [onClearContractState, getContractListForTeacher, match, limit])

  const [visible, setVisible] = useState(false)
  const [formRef, setFormRef] = useState(null)

  const handleCreate = () => {
    formRef.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      const { name, content, workingHour, tags } = values
      const contract = {
        name,
        content,
        teacherId: getInfoObj.teacher.userId,
        studentId: currentUser._id,
        workingHour,
        costPerHour: +getInfoObj.teacher.salary.replace(',000', ''),
        tags,
      }
      console.log('contract: ', contract)

      createContract(contract)
      message.success('Tạo hợp đồng thành công')
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

  const handleChangePage = pageNumber => {
    console.log('handleChangePage = ', pageNumber)
    setCurrentPage(pageNumber)
    const filterConditions = {
      userId: teacherId,
      currentPage: pageNumber,
      currentLimit: limit,
    }
    getContractListForTeacher(filterConditions)
  }

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
  if (!getContractListObj.isLoading && getContractListObj.isSuccess === false) {
    return (
      <Redirect
        to={{
          pathname: '/error-page',
          state: { message: `${getContractListObj.message}` },
        }}
      />
    )
  }

  return (
    <div className="teacher-info-page">
      <div className="teacher-info-page__wrapper">
        {getInfoObj.isLoading && (
          <div className="teacher-info-page__wrapper__loading">
            <Spin indicator={<Icon type="loading" spin />} />
          </div>
        )}
        {!getInfoObj.isLoading && getInfoObj.isSuccess === true && (
          <>
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
                  {currentUser
                    ? currentUser.typeID === STUDENT && (
                        <div className="info-left__btn">
                          <Button
                            style={{ marginTop: 15 }}
                            size="small"
                            type="primary"
                            onClick={() => setVisible(true)}
                          >
                            Đăng kí học
                          </Button>
                          <Link to={`/chat/${currentUser._id}${teacherId}`}>
                            <Button
                              style={{ marginTop: 15 }}
                              size="small"
                              type="primary"
                              typeHtml="button"
                            >
                              Nhắn tin
                            </Button>
                          </Link>
                        </div>
                      )
                    : null}
                  {currentUser
                    ? currentUser._id === teacherId && (
                        <div className="info-left__btn">
                          <Link to="/teacher/update-info">
                            <Button
                              style={{ marginTop: 15 }}
                              size="small"
                              type="primary"
                              typeHtml="button"
                            >
                              Chỉnh sửa thông tin
                            </Button>
                          </Link>
                        </div>
                      )
                    : null}
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
                  <Rate disabled allowHalf defaultValue={getInfoObj.teacher.ratings} />
                  <div>Tỉ lệ đánh giá</div>
                </div>
              </div>
            </div>
            <div className="teacher-info-page__wrapper__description">
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
                  <Statistic title="Mức lương (vnđ/h)" value={getInfoObj.teacher.salary} />
                </Col>
                <Col span={4}>
                  <Statistic title="Công việc đã làm" value={getInfoObj.teacher.jobs} />
                </Col>
                <Col span={4}>
                  <Statistic title="Số giờ đã làm" value={getInfoObj.teacher.hoursWorked} />
                </Col>
              </Row>
            </div>
          </>
        )}
      </div>
      <div className="teacher-info-page__wrapper">
        <div className="teacher-info-page__wrapper__work-history">
          <div className="title">Lịch sử làm việc</div>
          <div className="content">
            {getContractListObj.isLoading && (
              <div className="loading">
                <Spin indicator={<Icon type="loading" spin />} />
              </div>
            )}
            {!getContractListObj.isLoading && getContractListObj.isSuccess === true && (
              <>
                {!getContractListObj.contractList ||
                getContractListObj.contractList.length === 0 ? (
                  <i>Trống</i>
                ) : (
                  getContractListObj.contractList.map(contract => {
                    return <WorkHistoryItem key={contract._id} contract={contract} />
                  })
                )}
                <Pagination
                  simple
                  defaultCurrent={parseInt(currentPage)}
                  defaultPageSize={parseInt(limit)}
                  total={getContractListObj.numberOfContracts}
                  onChange={handleChangePage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

TeacherInfoPage.propTypes = {}

export default withRouter(TeacherInfoPage)
