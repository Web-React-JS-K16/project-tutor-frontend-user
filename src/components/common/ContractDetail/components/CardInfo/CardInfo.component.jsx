/* eslint-disable react/prop-types */
import React from 'react'
import { Timeline, Card, Icon, Avatar } from 'antd'
import * as moment from 'moment'
import './CardInfo.style.scss'

const CustomTimeLine = ({ label, content }) => (
  <div className="my-custome-timeline">
    <Timeline.Item label=" Tên">
      <span className="my-custome-timeline__label">{label}:</span> {content}
    </Timeline.Item>
  </div>
)

const CardInfoComponent = ({
  user: { displayName, avatar, phone, birthdate, email, city, district, about },
  isStudent,
}) => {
  return (
    <div className="card-info">
      <Card
        style={{ width: 300 }}
        cover={
          <Card title={`${isStudent ? 'Học sinh' : 'Giáo viên'}`} style={{ width: 300 }}>
            <Timeline>
              <CustomTimeLine label="Tên" content={displayName || <i>(Chưa cập nhật)</i>}>
                {displayName || <i>(Chưa cập nhật)</i>}
              </CustomTimeLine>
              <CustomTimeLine label="Số điện thoại" content={phone || <i>(Chưa cập nhật)</i>}>
                {displayName}
              </CustomTimeLine>
              <CustomTimeLine
                label="Ngày sinh"
                content={
                  birthdate ? moment(birthdate).format('DD/MM/YYYY') : <i>(Chưa cập nhật)</i>
                }
              >
                {displayName || <i>(Chưa cập nhật)</i>}
              </CustomTimeLine>
              <CustomTimeLine label="Email" content={email || <i>(Chưa cập nhật)</i>}>
                {displayName || <i>(Chưa cập nhật)</i>}
              </CustomTimeLine>
              <CustomTimeLine
                label="Địa chỉ"
                content={
                  !district && !city ? (
                    <i>(Chưa cập nhật)</i>
                  ) : (
                    `${district ? district.name : <i>(Chưa cập nhật quận/ huyện)</i>}, ${
                      city ? city.name : <i>(Chưa cập nhật tỉnh/ thành phố)</i>
                    }`
                  )
                }
              >
                {displayName || <i>(Chưa cập nhật)</i>}
              </CustomTimeLine>
            </Timeline>
          </Card>
        }
        actions={[
          <Icon type="setting" key="setting" />,
          <Icon type="edit" key="edit" />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src={avatar} />}
          title={displayName || <i>(Chưa cập nhật)</i>}
          description={about ? `${about.concat(0, 20)}...` : <i>(Chưa cập nhật)</i>}
        />
      </Card>
    </div>
  )
}

export default CardInfoComponent
