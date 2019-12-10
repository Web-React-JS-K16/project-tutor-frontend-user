/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Row, Col, Pagination, Collapse, Spin, Icon, Checkbox, Slider, Tree } from 'antd'
import './TeacherListPage.style.scss'
import TeacherItem from '../../common/TeacherItem/TeacherItem.component'
import TeacherService from '../../../services/teacher.service'
import UserService from '../../../services/user.service'

const { Panel } = Collapse
const { TreeNode } = Tree

const TeacherListPage = ({
  numberOfTeachers,
  teacherList,
  getTeacherList,
  countTeachers,
  majorList,
  getMajorList,
  locationList,
  getLocationList,
}) => {
  const query = TeacherService.useQuery()
  const page = query.get('page')
  const limit = query.get('limit')

  useEffect(() => {
    if (page && limit) {
      getTeacherList({ currentPage: page, currentLimit: limit })
      getMajorList()
      getLocationList()
      countTeachers()
    }
  }, [page, limit, getTeacherList, getMajorList, getLocationList, countTeachers])

  const [currentPage, setCurrentPage] = useState(0)
  const [currentMajors, setCurrentMajors] = useState(0)
  const [currentFromSalary, setCurrentFromSalary] = useState(0)
  const [currentToSalary, setCurrentToSalary] = useState(0)
  const [currentLocations, setCurrentLocations] = useState(0)

  const executeFilter = filterConditions => {
    UserService.setPreferences('project-tutor-teacher-list', JSON.stringify(filterConditions))
    getTeacherList(filterConditions)
  }

  const handleChangePage = pageNumber => {
    console.log('handleChangePage = ', pageNumber)
    setCurrentPage(pageNumber)
    const filterConditions = {
      currentPage: pageNumber,
      currentLimit: limit,
      currentMajors,
      currentFromSalary,
      currentToSalary,
      currentLocations,
    }
    executeFilter(filterConditions)
  }

  const handleChangeMajor = checkedValues => {
    console.log('handleChangeMajor = ', checkedValues)
    setCurrentMajors(checkedValues)
    const filterConditions = {
      currentPage,
      currentLimit: limit,
      currentMajors: checkedValues,
      currentFromSalary,
      currentToSalary,
      currentLocations,
    }
    executeFilter(filterConditions)
  }

  const handleAfterChangeSalary = value => {
    console.log('handleAfterChangeSalary = ', value)
    setCurrentFromSalary(value[0])
    setCurrentToSalary(value[1])
    const filterConditions = {
      currentPage,
      currentLimit: limit,
      currentMajors,
      currentFromSalary: value[0],
      currentToSalary: value[1],
      currentLocations,
    }
    executeFilter(filterConditions)
  }

  const handleOnCheckLocation = checkedKeys => {
    console.log('handleOnCheckLocation = ', checkedKeys)
    const tempList = {}
    checkedKeys.forEach(checkedKey => {
      const values = checkedKey.split('-')
      if (!locationList[values[0]]) {
        tempList[values[0]] = {}
        tempList[values[0]].districtList = []
      }
    })
    checkedKeys.forEach(checkedKey => {
      const values = checkedKey.split('-')
      tempList[values[0].toString()].districtList.push(values[1])
    })
    setCurrentLocations({ location: tempList })
    const filterConditions = {
      currentPage,
      currentLimit: limit,
      currentMajors,
      currentFromSalary,
      currentToSalary,
      currentLocations: { location: tempList },
    }
    executeFilter(filterConditions)
  }

  return (
    <div className="teacher-list-page">
      {teacherList && majorList && locationList ? (
        <div className="teacher-list-page__wrapper">
          <Row>
            <Col span={4} style={{ paddingRight: 30 }}>
              <div className="teacher-list-page__wrapper__left">
                <Collapse bordered={false} defaultActiveKey={[]}>
                  <Panel header="Giá trên giờ" key="1">
                    <Slider
                      range
                      step={10}
                      defaultValue={[20, 1000]}
                      onAfterChange={handleAfterChangeSalary}
                    />
                  </Panel>
                  <Panel header="Môn học" key="2">
                    <Checkbox.Group style={{ width: '100%' }} onChange={handleChangeMajor}>
                      <Row>
                        {majorList.map(major => {
                          return (
                            <Col span={24} key={major._id}>
                              <Checkbox value={major._id} style={{ textTransform: 'capitalize' }}>
                                {major.name}
                              </Checkbox>
                            </Col>
                          )
                        })}
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Địa điểm" key="3">
                    <Tree
                      checkable
                      switcherIcon={<Icon type="down" />}
                      defaultExpandedKeys={[]}
                      onCheck={handleOnCheckLocation}
                    >
                      {locationList.map(location => {
                        return (
                          <TreeNode title={location.name} key={location._id}>
                            {location.districtList.map(district => {
                              return (
                                <TreeNode
                                  title={district.name}
                                  key={`${location._id}-${district._id}`}
                                />
                              )
                            })}
                          </TreeNode>
                        )
                      })}
                    </Tree>
                  </Panel>
                </Collapse>
              </div>
            </Col>
            <Col span={20}>
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
                  <Row>
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
            </Col>
          </Row>
        </div>
      ) : (
        <div className="teacher-list-page__loading">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      )}
    </div>
  )
}

TeacherListPage.propTypes = {}

export default TeacherListPage
