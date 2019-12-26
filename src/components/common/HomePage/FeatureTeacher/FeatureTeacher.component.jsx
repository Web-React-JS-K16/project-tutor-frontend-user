/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import './FeatureTeacher.scss'
import 'react-multi-carousel/lib/styles.css'

import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { Button, Tag, Icon, Rate, message } from 'antd'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const FeatureTeacher = ({ getStatisticalDataHome }) => {
  const [teacher, setTeacher] = useState(null)
  const getStatisticalDataHomeSuccess = ({ data }) => {
    console.log(data)
    console.log('data get teacher: ', data)
    setTeacher(data)
  }
  const getStatisticalDataHomeFailure = _message => {
    message.error(_message)
  }

  const handleClick = id => {
    window.location.href = `/teacher/info/${id}`
  }
  useEffect(() => {
    getStatisticalDataHome({
      getStatisticalDataHomeSuccess,
      getStatisticalDataHomeFailure,
    })
  }, [getStatisticalDataHome])
  return (
    <div className="feature-teacher">
      <h3 className="heading-primary">Giáo viên nổi bật</h3>
      {teacher ? (
        <Carousel responsive={responsive} className="info-teacher">
          {teacher.map(item => (
            <div className="gutter-box">
              <figure className="info-teacher__avatar">
                <img src={item.user[0].avatar} alt="" />
              </figure>
              <div className="info-teacher__content">
                <h4>{item.user[0].displayName}</h4>
                <span className="rate">
                  <Rate disabled defaultValue={item.teacher[0].ratings} />
                </span>
                <hr />
                <p>
                  {' '}
                  <Icon type="tags" />{' '}
                  {item.tag.length > 0 ? (
                    item.tag.slice(0, 2).map(tag => <Tag color="orange">{tag.name}</Tag>)
                  ) : (
                    <Tag color="red">Chưa cập nhât</Tag>
                  )}
                </p>
                <hr />
                <p>
                  <Icon type="pay-circle" />{' '}
                  {item.teacher[0].salary.$numberDecimal || item.teacher[0].salary}
                  ,000 vnđ/h
                </p>
                <p>
                  <Icon type="phone" /> {item.user[0].phone}
                </p>
                <p>
                  <Icon type="environment" />
                  {item.district[0] ? `${item.district[0].name}, ` : ''}
                  {item.city[0] ? `${item.city[0].name}` : ''}
                  {!item.district[0] && !item.city[0] ? ' Chưa cập nhật địa chỉ' : ''}
                </p>
                <hr />

                <Button onClick={() => handleClick(item._id)}>Xem chi tiết</Button>
              </div>
            </div>
          ))}
        </Carousel>
      ) : null}
    </div>
  )
}

export default FeatureTeacher
