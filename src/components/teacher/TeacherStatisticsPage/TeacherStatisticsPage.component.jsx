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
import { Row, Spin, Icon, Select, DatePicker } from 'antd'
import './TeacherStatisticsPage.style.scss'
// import UserService from 'services/user.service'

const { Option } = Select
const { RangePicker, WeekPicker } = DatePicker

const TeacherStatisticsPage = ({ currentUser, getStatisticalDataObj, getStatisticalData }) => {
  const [currentStatisticalType, setCurrentStatisticalType] = useState('date')
  const [format, setFormat] = useState('DD/MM/YYYY')
  const [mode, setMode] = useState(['date', 'date'])
  const [labels, setLabels] = useState(['Ngày bắt đầu', 'Ngày kết thúc'])
  const [valueRangePicker, setValueRangePicker] = useState([])

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser._id
      getStatisticalData({ userId })
    }
  }, [currentUser, getStatisticalData])

  // const executeFilter = filterConditions => {
  //   UserService.setPreferences('project-tutor-teacher-statistics', JSON.stringify(filterConditions))
  //   getStatisticalData(filterConditions)
  // }

  const onChangeStatisticalType = value => {
    console.log('onChangeStatisticalType = ', value)
    setCurrentStatisticalType(value)
    let selectedFormat = 'DD/MM/YYYY'
    let selectedMode = ['date', 'date']
    let selectedLabels = ['Ngày bắt đầu', 'Ngày kết thúc']
    if (value === 'year') {
      selectedFormat = 'YYYY'
      selectedMode = ['year', 'year']
      selectedLabels = ['Năm bắt đầu', 'Năm kết thúc']
    } else if (value === 'month') {
      selectedFormat = 'MM/YYYY'
      selectedMode = ['month', 'month']
      selectedLabels = ['Tháng bắt đầu', 'Tháng kết thúc']
    }
    setFormat(selectedFormat)
    setMode(selectedMode)
    setLabels(selectedLabels)
  }

  const onChangeFromWeekData = value => {
    console.log('onChangeFromWeekData = ', value)
  }

  const onChangeToWeekData = value => {
    console.log('onChangeToWeekData = ', value)
  }

  const onChangeData = value => {
    setValueRangePicker(value)
    console.log('onChangeData ', value)
  }

  const onPanelChangeData = value => {
    setValueRangePicker(value)
    console.log('onPanelChangeData ', value)
  }

  const onOkData = value => {
    console.log('ok ', value)
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
          <div className="teacher-statistics-page__wrapper__select-type">
            <Select
              defaultValue={currentStatisticalType}
              style={{ width: 180 }}
              onChange={onChangeStatisticalType}
            >
              <Option value="date">Theo ngày</Option>
              <Option value="week">Theo tuần</Option>
              <Option value="month">Theo tháng</Option>
              <Option value="year">Theo năm</Option>
            </Select>
            {currentStatisticalType === 'week' ? (
              <>
                <WeekPicker
                  format="Tuần w YYYY"
                  onChange={onChangeFromWeekData}
                  placeholder="Tuần bắt đầu"
                />
                <div>&ensp;đến&ensp;</div>
                <WeekPicker
                  format="Tuần w YYYY"
                  onChange={onChangeToWeekData}
                  placeholder="Tuần kết thúc"
                />
              </>
            ) : (
              <RangePicker
                placeholder={labels}
                format={format}
                mode={mode}
                separator="-"
                value={valueRangePicker}
                onChange={onChangeData}
                onPanelChange={onPanelChangeData}
                onOk={onOkData}
              />
            )}
          </div>
        </Row>
        <Row>
          <div className="teacher-statistics-page__wrapper__chart">
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
          </div>
        </Row>
      </div>
    </div>
  )
}

TeacherStatisticsPage.propTypes = {}

export default TeacherStatisticsPage
