import './FeatureTeacher.scss'
import 'react-multi-carousel/lib/styles.css'

import React from 'react'
import Carousel from 'react-multi-carousel'
import { Button, Tag, Icon } from 'antd'
import ava from '../../../assets/images/avatar_mau.jpg'

const data = [
  {
    avatar: ava,
    displayName: 'Hồ Hoàng Yến',
    salary: '220.000',
    qualification: 'Giảng viên đại học',
    tags: ['Toán', 'Lý', 'Hóa'],
    phone: '0129948934',
    ward: 'Quận 12',
    City: 'Hồ Chí Minh',
  },
  {
    avatar: ava,
    displayName: 'Hồ Hoàng Yến',
    salary: '220.000',
    qualification: 'Giảng viên đại học',
    tags: ['Toán', 'Lý', 'Hóa'],
    phone: '0129948934',
    ward: 'Quận 12',
    City: 'Hồ Chí Minh',
  },
  {
    avatar: ava,
    displayName: 'Hồ Hoàng Yến',
    salary: '220.000',
    qualification: 'Giảng viên đại học',
    tags: ['Toán', 'Lý', 'Hóa'],
    phone: '0129948934',
    ward: 'Quận 12',
    City: 'Hồ Chí Minh',
  },
  {
    avatar: ava,
    displayName: 'Hồ Hoàng Yến',
    salary: '220.000',
    qualification: 'Giảng viên đại học',
    tags: ['Toán', 'Lý', 'Hóa'],
    phone: '0129948934',
    ward: 'Quận 12',
    City: 'Hồ Chí Minh',
  },
  {
    avatar: ava,
    displayName: 'Hồ Hoàng Yến',
    salary: '220.000',
    qualification: 'Giảng viên đại học',
    tags: ['Toán', 'Lý', 'Hóa'],
    phone: '0129948934',
    ward: 'Quận 12',
    City: 'Hồ Chí Minh',
  },
  {
    avatar: ava,
    displayName: 'Hồ Hoàng Yến',
    salary: '220.000',
    qualification: 'Giảng viên đại học',
    tags: ['Toán', 'Lý', 'Hóa'],
    phone: '0129948934',
    ward: 'Quận 12',
    City: 'Hồ Chí Minh',
  },
]

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

const FeatureTeacher = () => (
  <div className="feature-teacher">
    <h3 className="heading-primary">Giáo viên nổi bật</h3>
    <Carousel responsive={responsive} className="info-teacher">
      {data.map(item => (
        <div className="gutter-box">
          <figure className="info-teacher__avatar">
            <img src={item.avatar} alt="" />
          </figure>
          <div className="info-teacher__content">
            <h4>{item.displayName}</h4>
            <hr />
            <p>
              {' '}
              <Icon type="tags" />{' '}
              {item.tags.map(tag => (
                <Tag color="orange">{tag}</Tag>
              ))}{' '}
            </p>
            <hr />
            <p>
              <Icon type="pay-circle" /> {item.salary}VND/h
            </p>
            <p>
              <Icon type="phone" /> {item.phone}
            </p>
            <p>
              <Icon type="environment" /> {item.ward}, {item.City}
            </p>
            <hr />

            <Button>Xem chi tiết</Button>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
)

export default FeatureTeacher
