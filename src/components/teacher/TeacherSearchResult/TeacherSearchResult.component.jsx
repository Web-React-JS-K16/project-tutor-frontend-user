/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { Pagination } from 'antd'
import TeacherItem from '../TeacherListPage/components/TeacherItem/TeacherItem.component'
import './TeacherSearchResult.style.scss'
import LoadingComponent from '../../common/LoadingComponent/Loading.component'

const defaultPageSize = 5
const TeacherSearchResultComponent = ({
  searchTeacherReducer: { isLoading, isSuccess, data, message },
  searchTeacher,
  searchTeacherClear,
  match,
}) => {
  //   const {params: {keyword}} = match;
  // console.log("match: ", keyword)
  useEffect(() => {
    searchTeacherClear()
    const {
      params: { key },
    } = match
    console.log('match: ', key)

    searchTeacher(key)
  }, [searchTeacherClear, searchTeacher, match])

  // const [currentPage, setCurrentPage] = useState(1);
  const [minValue, setMinValue] = useState(0)
  const handleChangePage = page => {
    setMinValue(defaultPageSize * (page - 1))
  }

  if (isLoading) {
    return (
      <div className="teacher-search-result">
        <LoadingComponent />
      </div>
    )
  }
  if (!isSuccess) {
    return (
      <div className="teacher-search-result">
        Có lỗi
        {message}
      </div>
    )
  }
  // const {count, payload} = data;
  return (
    <div className="teacher-search-result">
      <div className="teacher-search-result__count-result">
        <div className="key-word">
          Kết quả cho từ khóa <span> {match.params.key} </span>
        </div>
        <div className="count">
          Tổng cộng <span>{data.count} </span>kết quả
        </div>
      </div>
      <div className="teacher-search-result__data grid-container">
        {data.payload.slice(minValue, minValue + defaultPageSize).map(item => {
          const { userId, ...teacherInfo } = item
          const tags = teacherInfo.tags.map(tag => tag._id)
          const teacher = {
            ...userId,
            ...teacherInfo,
            salary: `${teacherInfo.salary.$numberDecimal},000 `,
            tags,
          }
          console.log('item teacher: ', teacher)
          return (
            <div className="teacher-search-result__data--item grid-item">
              <TeacherItem teacher={teacher} />
            </div>
          )
        })}
      </div>
      {data.payload.length === 0 && (
        <div className="teacher-search-result__empty">(Không có kết quả)</div>
      )}
      {data.payload.length > 0 && (
        <div className="teacher-search-result__pagination">
          <Pagination
            simple
            defaultCurrent={parseInt(1)}
            defaultPageSize={parseInt(defaultPageSize)}
            total={data.count}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  )
}

export default withRouter(TeacherSearchResultComponent)
