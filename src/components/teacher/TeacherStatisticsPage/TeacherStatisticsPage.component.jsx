/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  // G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  // Coord,
  // Label,
  // Legend,
  // View,
  // Guide,
  // Shape,
  // Facet,
  // Util,
} from 'bizcharts'
import { Row, Col, Spin, Icon, Select } from 'antd'
import './TeacherStatisticsPage.style.scss'
import UserService from 'services/user.service'

const { Option } = Select

const TeacherStatisticsPage = ({ currentUser, getStatisticalDataObj, getStatisticalData }) => {
  // eslint-disable-next-line no-unused-vars
  const [currentStatisticalType, setCurrentStatisticalType] = useState({})

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser._id
      getStatisticalData({ userId })
    }
  }, [currentUser, getStatisticalData])

  const executeFilter = filterConditions => {
    UserService.setPreferences('project-tutor-teacher-statistics', JSON.stringify(filterConditions))
    getStatisticalData(filterConditions)
  }

  const handleChangeStatisticalType = value => {
    console.log('handleChangeStatisticalType = ', value)
    setCurrentStatisticalType(value)
    const filterConditions = {
      userId: currentUser._id,
      currentType: value,
    }
    executeFilter(filterConditions)
  }

  if (!getStatisticalDataObj.isLoading && getStatisticalDataObj.isSuccess === false) {
    return (
      <Redirect
        to={{
          pathname: '/error-page',
          state: { message: `${getStatisticalDataObj.message}` },
        }}
      />
    )
  }

  const cols = {
    value: { min: 0 },
    month: { range: [0, 1] },
  }

  return (
    <div className="teacher-statistics-page">
      {getStatisticalDataObj.isLoading && (
        <div className="teacher-statistics-page__loading">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      )}

      <div className="teacher-statistics-page__wrapper">
        <Row>
          <Col span={24}>
            <div className="teacher-list-page__wrapper__right">
              <Row>
                <div className="sort-select">
                  <Select
                    defaultValue="month"
                    style={{ width: 180 }}
                    onChange={handleChangeStatisticalType}
                  >
                    <Option value="week">Theo tuần</Option>
                    <Option value="month">Theo tháng</Option>
                    <Option value="year">Theo năm</Option>
                  </Select>
                </div>
              </Row>
              <Chart
                height={400}
                data={getStatisticalDataObj ? getStatisticalDataObj.data : []}
                scale={cols}
                forceFit
              >
                <Axis name="month" />
                <Axis name="value" />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom type="line" position="month*value" size={2} />
                <Geom
                  type="point"
                  position="month*value"
                  size={4}
                  shape="circle"
                  style={{ stroke: '#fff', lineWidth: 1 }}
                />
              </Chart>
              <Row />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

TeacherStatisticsPage.propTypes = {}

export default TeacherStatisticsPage
