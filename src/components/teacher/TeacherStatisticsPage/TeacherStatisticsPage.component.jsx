/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts'
import { Row, Spin, Icon, Select, DatePicker, Button } from 'antd'
import * as moment from 'moment'
import './TeacherStatisticsPage.style.scss'
import UserService from 'services/user.service'

const { Option } = Select
const { RangePicker, WeekPicker } = DatePicker

const TeacherStatisticsPage = ({ currentUser, getStatisticalDataObj, getStatisticalData }) => {
  const [currentType, setCurrentType] = useState('date')
  const [format, setFormat] = useState('DD/MM/YYYY')
  const [mode, setMode] = useState(['date', 'date'])
  const [labels, setLabels] = useState(['Ngày bắt đầu', 'Ngày kết thúc'])
  const [valueRangePicker, setValueRangePicker] = useState([])
  const [fromWeek, setFromWeek] = useState({})
  const [toWeek, setToWeek] = useState({})
  const [chartData, setChartData] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser._id
      getStatisticalData({ userId })
    }
  }, [currentUser, getStatisticalData])

  useEffect(() => {
    if (getStatisticalDataObj && getStatisticalDataObj.data.length > 0) {
      const data = []
      if (currentType === 'date') {
        getStatisticalDataObj.data.forEach(element => {
          data.push({
            time: moment(element.date).format('DD/MM/YYYY'),
            value: element.value,
          })
        })
        setChartData(data)
      } else if (currentType === 'week') {
        getStatisticalDataObj.data.forEach(element => {
          data.push({
            time: `Tuần ${element.week} - ${element.year}`,
            value: element.value,
          })
        })
        setChartData(data)
      } else if (currentType === 'month') {
        getStatisticalDataObj.data.forEach(element => {
          data.push({
            time: `${parseInt(element.month) + 1}/${element.year}`,
            value: element.value,
          })
        })
        setChartData(data)
      } else if (currentType === 'year') {
        getStatisticalDataObj.data.forEach(element => {
          data.push({
            time: `${element.year}`,
            value: element.value,
          })
        })
        setChartData(data)
      }
    }
  }, [getStatisticalDataObj])

  const executeFilter = filterConditions => {
    UserService.setPreferences('project-tutor-teacher-statistics', JSON.stringify(filterConditions))
    getStatisticalData(filterConditions)
  }

  const resetStatistics = () => {
    setValueRangePicker([])
    setFromWeek({})
    setToWeek({})
    setChartData([])
    setIsDisabled(true)
  }

  const onChangeStatisticalType = value => {
    setCurrentType(value)
    resetStatistics()

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

  const checkDisabledBtn = (value, type) => {
    // type: "start" / "end"
    const oneDayInMiliSeconds = 86400000
    const tenDaysInMiliSeconds = 864000000
    if (value.length === 0) {
      setIsDisabled(true)
    }
    if (currentType === 'date') {
      const fromDate = value[0]
      const toDate = value[1]
      if (toDate - fromDate + oneDayInMiliSeconds > tenDaysInMiliSeconds) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    } else if (currentType === 'week') {
      if (type === 'start' && toWeek.date) {
        const startWeek = parseInt(value.format('w'))
        const endWeek = parseInt(toWeek.week)
        if (startWeek >= endWeek) {
          setIsDisabled(true)
        } else if (new Date(value).getFullYear() !== parseInt(toWeek.year)) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 > 10) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 <= 10) {
          setIsDisabled(false)
        }
      } else if (type === 'end' && fromWeek.date) {
        const startWeek = parseInt(fromWeek.week)
        const endWeek = parseInt(value.format('w'))
        if (startWeek >= endWeek) {
          setIsDisabled(true)
        } else if (new Date(value).getFullYear() !== parseInt(fromWeek.year)) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 > 10) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 <= 10) {
          setIsDisabled(false)
        }
      }
    } else if (currentType === 'month') {
      const fromDate = new Date(value[0])
      const toDate = new Date(value[1])
      if (toDate.getFullYear() - fromDate.getFullYear() > 1) {
        setIsDisabled(true)
      } else if (toDate.getFullYear() - fromDate.getFullYear() === 1) {
        const count = 12 - fromDate.getMonth() + toDate.getMonth() + 1
        if (count > 12) {
          setIsDisabled(true)
        } else {
          setIsDisabled(false)
        }
      } else {
        setIsDisabled(false)
      }
    } else if (currentType === 'year') {
      const fromDate = new Date(value[0])
      const toDate = new Date(value[1])
      if (toDate.getFullYear() - fromDate.getFullYear() + 1 > 10) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    }
  }

  const onChangeFromWeekData = value => {
    console.log('onChangeFromWeekData = ', value.format('w - YYYY'))
    const fromWeekObj = {
      week: value.format('w'),
      year: value.format('YYYY'),
      date: value,
    }
    setFromWeek(fromWeekObj)
    checkDisabledBtn(value, 'start')
  }

  const onChangeToWeekData = value => {
    console.log('onChangeToWeekData = ', value.format('w - YYYY'))
    const toWeekObj = {
      week: value.format('w'),
      year: value.format('YYYY'),
      date: value,
    }
    setToWeek(toWeekObj)
    checkDisabledBtn(value, 'end')
  }

  const onChangeData = value => {
    setValueRangePicker(value)
    checkDisabledBtn(value)
  }

  const onPanelChangeData = value => {
    setValueRangePicker(value)
    checkDisabledBtn(value)
  }

  const onOkData = () => {
    const filterConditions = {
      userId: currentUser._id,
      currentType,
    }
    if (currentType === 'date') {
      console.log('ok from date ', valueRangePicker[0].format('DD/MM/YYYY'))
      console.log('ok to date ', valueRangePicker[1].format('DD/MM/YYYY'))
      filterConditions.currentFromDate = valueRangePicker[0].valueOf()
      filterConditions.currentToDate = valueRangePicker[1].valueOf()
    } else if (currentType === 'week') {
      console.log('ok from week ', fromWeek)
      console.log('ok to week ', toWeek)
      filterConditions.currentWeekObj = {
        weekObj: {
          start: {
            week: fromWeek.week,
            year: fromWeek.year,
          },
          end: {
            week: toWeek.week,
            year: toWeek.year,
          },
        },
      }
    } else if (currentType === 'month') {
      console.log('ok from month ', valueRangePicker[0].format('MM/YYYY'))
      console.log('ok to month ', valueRangePicker[1].format('MM/YYYY'))
      const fromDate = new Date(valueRangePicker[0])
      const toDate = new Date(valueRangePicker[1])
      filterConditions.currentMonthObj = {
        monthObj: {
          start: {
            month: fromDate.getMonth().toString(),
            year: fromDate.getFullYear(),
          },
          end: {
            month: toDate.getMonth().toString(),
            year: toDate.getFullYear(),
          },
        },
      }
    } else if (currentType === 'year') {
      console.log('ok from year ', valueRangePicker[0].format('YYYY'))
      console.log('ok to year ', valueRangePicker[1].format('YYYY'))
      const fromDate = new Date(valueRangePicker[0])
      const toDate = new Date(valueRangePicker[1])
      filterConditions.currentFromYear = fromDate.getFullYear()
      filterConditions.currentToYear = toDate.getFullYear()
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
    value: { min: 0, alias: 'Doanh thu (vnđ)' },
    time: { alias: 'Thời gian' },
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
              defaultValue={currentType}
              style={{ width: 180 }}
              onChange={onChangeStatisticalType}
            >
              <Option value="date">Theo ngày</Option>
              <Option value="week">Theo tuần</Option>
              <Option value="month">Theo tháng</Option>
              <Option value="year">Theo năm</Option>
            </Select>
            {currentType === 'week' ? (
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
              />
            )}
            <Button onClick={onOkData} disabled={isDisabled} type="primary">
              Thống kê
            </Button>
          </div>
        </Row>
        <Row>
          <div className="teacher-statistics-page__wrapper__chart">
            {chartData.length > 0 && (
              <Chart height={400} data={chartData} scale={cols} forceFit>
                <Axis name="time" />
                <Axis name="value" label={{ formatter: val => `${val}đ` }} />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom type="line" position="time*value" size={2} shape="smooth" />
                <Geom
                  type="point"
                  position="time*value"
                  size={4}
                  shape="circle"
                  style={{ stroke: '#fff', lineWidth: 1 }}
                />
              </Chart>
            )}
          </div>
        </Row>
      </div>
    </div>
  )
}

TeacherStatisticsPage.propTypes = {}

export default TeacherStatisticsPage
