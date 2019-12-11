/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Rate, Divider } from 'antd'
import './WorkHistoryItem.style.scss'
import * as moment from 'moment'

const WorkHistoryItem = ({ contract }) => {
  return (
    <div className="work-history-item">
      <div className="work-history-item__title">
        <div className="work-history-item__title__left">
          <div className="job-title">{contract.name}</div>
          <span className="work-date">
            {moment(contract.startDate).format('DD/MM/YYYY')}&nbsp;-&nbsp;
            {moment(contract.endDate).format('DD/MM/YYYY')}
          </span>
          <span className="ratings">
            <Rate disabled defaultValue={contract.comment ? contract.comment.ratings : 0} />
          </span>
        </div>
        <div className="work-history-item__title__right">
          <div className="cost">{contract.cost} vnđ</div>
          <div className="work-hour">{contract.workingHour} giờ</div>
        </div>
      </div>
      <div className="work-history-item__content">
        <p>{contract.comment || 'Chưa có phản hồi'}</p>
      </div>
      <Divider />
    </div>
  )
}

export default WorkHistoryItem
