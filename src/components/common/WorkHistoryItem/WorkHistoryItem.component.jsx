/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Rate, Divider } from 'antd'
import './WorkHistoryItem.style.scss'

const WorkHistoryItem = ({ name, startDate, endDate, ratings, cost, workingHour, comment }) => {
  return (
    <div className="work-history-item">
      <div className="work-history-item__title">
        <div className="work-history-item__title__left">
          <div className="job-title">{name}</div>
          <span className="work-date">
            {startDate} - {endDate}
          </span>
          <span className="ratings">
            <Rate disabled defaultValue={ratings} />
          </span>
        </div>
        <div className="work-history-item__title__right">
          <div className="cost">{cost} vnđ</div>
          <div className="work-hour">{workingHour} giờ</div>
        </div>
      </div>
      <div className="work-history-item__content">
        <p>{comment}</p>
      </div>
      <Divider />
    </div>
  )
}

export default WorkHistoryItem
