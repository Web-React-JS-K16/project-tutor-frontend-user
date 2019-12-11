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
  user: { displayName, avatar, phone, birthdate, email, address, about },
  isStudent,
}) => {
  return (
    <div className="card-info">
      <Card
        style={{ width: 300 }}
        cover={
          <Card title={`${isStudent ? 'Học sinh' : 'Giáo viên'}`} style={{ width: 300 }}>
            <Timeline>
              <CustomTimeLine label="Tên" content={displayName}>
                {displayName}
              </CustomTimeLine>
              <CustomTimeLine label="Số điện thoại" content={phone}>
                {displayName}
              </CustomTimeLine>
              <CustomTimeLine label="Ngày sinh" content={moment(birthdate).format('L')}>
                {displayName}
              </CustomTimeLine>
              <CustomTimeLine label="Email" content={email}>
                {displayName}
              </CustomTimeLine>
              <CustomTimeLine label="Địa chỉ" content={address}>
                {displayName}
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
          title={displayName}
          description={about ? `${about.concat(0, 20)}...` : ''}
        />
      </Card>
    </div>
  )
}

export default CardInfoComponent
