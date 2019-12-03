/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Rate, Divider } from 'antd'
import './WorkHistoryItem.style.scss'

const WorkHistoryItem = () => {
  return (
    <div className="work-history-item">
      <div className="work-history-item__title">
        <div className="work-history-item__title__left">
          <div className="job-title">Review contract for freelance work in software</div>
          <span className="work-date">07 2019 - 08 2019</span>
          <span className="ratings">
            <Rate disabled defaultValue={4.5} />
          </span>
        </div>
        <div className="work-history-item__title__right">
          <div className="cost">4,600,000 vnđ</div>
          <div className="work-hour">24 giờ</div>
        </div>
      </div>
      <div className="work-history-item__content">
        <p>
          John did an excellent job reviewing my business contract. He was thorough and professional
          whilst answering all my questions and adhering to deadlines. I&apos;d highly recommend him
          to anyone and will gladly be using his services in the future again. Thanks John!
        </p>
      </div>
      <Divider />
    </div>
  )
}

export default WorkHistoryItem
