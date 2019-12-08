/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Row, Col, Pagination } from 'antd'
import './TeacherListPage.style.scss'
import TeacherItem from '../../common/TeacherItem/TeacherItem.component'
import TeacherService from '../../../services/teacher.service'

const TeacherListPage = ({ numberOfTeachers, teacherList, getTeacherList, countTeachers }) => {
  const query = TeacherService.useQuery()
  const page = query.get('page')
  const limit = query.get('limit')

  useEffect(() => {
    if (page && limit) {
      getTeacherList(page, limit)
      countTeachers()
    }
  }, [page, limit, getTeacherList, countTeachers])

  const handleChangePage = (pageNumber, pageSize) => {
    getTeacherList(pageNumber, pageSize)
  }

  return (
    <div className="teacher-list-page">
      {teacherList && (
        <div className="teacher-list-page__wrapper">
          <div className="teacher-list-page__wrapper__left" />
          <div className="teacher-list-page__wrapper__right">
            <Row gutter={16}>
              {teacherList.map(teacher => {
                return (
                  <Col key={teacher._id} span={8}>
                    <TeacherItem teacher={teacher} />
                  </Col>
                )
              })}
            </Row>
            {teacherList && (
              <Row gutter="16">
                <Pagination
                  simple
                  defaultCurrent={1}
                  defaultPageSize={parseInt(limit)}
                  total={numberOfTeachers}
                  onChange={handleChangePage}
                />
              </Row>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

TeacherListPage.propTypes = {}

export default TeacherListPage
