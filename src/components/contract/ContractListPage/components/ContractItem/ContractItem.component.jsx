/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Tag, Button } from 'antd'
import * as moment from 'moment'
import { CONTRACT_TYPE } from 'utils/constant'
import './ContractItem.style.scss'

const ContractItem = ({ contract }) => {
  return (
    <div className="contract-item">
      <div className="contract-item__basic-info">
        <div className="contract-item__basic-info__top">
          <Link to={`/contract-detail/${contract._id}`}>
            <div className="name">{contract.name}</div>
          </Link>
          <div className="status">
            <Tag color={CONTRACT_TYPE[contract.status].color}>
              {CONTRACT_TYPE[contract.status].text}
            </Tag>
          </div>
        </div>

        <div className="contract-item__basic-info__date">
          {moment(contract.startDate).format('DD/MM/YYYY')}&nbsp;-&nbsp;
          {moment(contract.endDate).format('DD/MM/YYYY')}
        </div>
      </div>
      <Divider />
      <Link to={`/contract-detail/${contract._id}`}>
        <Button type="primary">Xem chi tiết</Button>
      </Link>
    </div>
  )
}

export default ContractItem
