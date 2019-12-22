/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Tag, Button } from 'antd'
import * as moment from 'moment'
import { CUSTOM_CONTRACT_TYPES, TEACHER } from 'utils/constant'
import './ContractItem.style.scss'

const ContractItem = ({ contract, currentUser }) => {
  return (
    <div className="contract-item">
      <div className="contract-item__basic-info">
        <div className="contract-item__basic-info__top">
          <Link to={`/contract-detail/${contract._id}`}>
            <div className="name">{contract.name}</div>
          </Link>
          <div className="status">
            <Tag color={CUSTOM_CONTRACT_TYPES[contract.status].color}>
              {currentUser.typeID === TEACHER
                ? CUSTOM_CONTRACT_TYPES[contract.status].textForTeacher
                : CUSTOM_CONTRACT_TYPES[contract.status].textForStudent}
            </Tag>
          </div>
        </div>

        <div className="contract-item__basic-info__date">
          {contract.startDate ? (
            moment(contract.startDate).format('DD/MM/YYYY')
          ) : (
            <i>(Chưa cập nhật)</i>
          )}
          &nbsp;-&nbsp;
          {contract.endDate ? (
            moment(contract.endDate).format('DD/MM/YYYY')
          ) : (
            <i>(Chưa cập nhật)</i>
          )}
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
