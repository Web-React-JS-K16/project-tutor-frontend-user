/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Pagination, Spin, Icon, Select } from 'antd'
import './ContractListPage.style.scss'
import UserService from 'services/user.service'
import {
  TEACHER,
  STUDENT,
  ITEMS_PER_PAGE,
  CONTRACT_TYPES,
  CUSTOM_CONTRACT_TYPES,
} from 'utils/constant'
import ContractItem from './components/ContractItem/ContractItem.component'

const { Option } = Select

const ContractListPage = ({ currentUser, getListObj, onClearContractState, getContractList }) => {
  // const query = TeacherService.useQuery()
  // const page = query.get('page') || 1
  // const limit = query.get('limit') || ITEMS_PER_PAGE
  const page = 1
  const limit = ITEMS_PER_PAGE
  const defaultContractType = { value: -1, text: 'Tất cả' }

  const [currentPage, setCurrentPage] = useState(1)
  const [currentStatus, setCurrentStatus] = useState({})

  useEffect(() => {
    onClearContractState()
    if (currentUser && page && limit) {
      const userId = currentUser._id
      setCurrentPage(page)
      getContractList({ userId, currentPage: page, currentLimit: limit })
    }
  }, [currentUser, page, limit, onClearContractState, getContractList])

  const executeFilter = filterConditions => {
    UserService.setPreferences('project-tutor-contract-list', JSON.stringify(filterConditions))
    getContractList(filterConditions)
  }

  const handleChangePage = pageNumber => {
    console.log('handleChangePage = ', pageNumber)
    setCurrentPage(pageNumber)
    const filterConditions = {
      userId: currentUser._id,
      currentPage: pageNumber,
      currentLimit: limit,
      currentStatus,
    }
    executeFilter(filterConditions)
  }

  const handleChangeStatus = status => {
    console.log('handleChangeStatus = ', status)
    setCurrentStatus(status.toString())
    const filterConditions = {
      userId: currentUser._id,
      currentPage,
      currentLimit: limit,
      currentStatus: status.toString(),
    }
    executeFilter(filterConditions)
  }

  if (!getListObj.isLoading && getListObj.isSuccess === false) {
    return (
      <Redirect
        to={{
          pathname: '/error-page',
          state: { message: `${getListObj.message}` },
        }}
      />
    )
  }

  return (
    <div className="contract-list-page">
      {(getListObj.isLoading || !currentUser) && (
        <div className="contract-list-page__loading">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      )}

      <div className="contract-list-page__wrapper">
        <Row>
          <div className="filter-select">
            <Select
              defaultValue={defaultContractType.value}
              style={{ width: 180 }}
              onChange={handleChangeStatus}
            >
              {currentUser.typeID === TEACHER &&
                Object.values(CONTRACT_TYPES)
                  .filter(status => status !== CONTRACT_TYPES.WAIT_FOR_PAYMENT)
                  .map(status => {
                    return (
                      <Option value={status}>{CUSTOM_CONTRACT_TYPES[status].textForTeacher}</Option>
                    )
                  })}
              {currentUser.typeID === STUDENT &&
                Object.values(CONTRACT_TYPES).map(status => {
                  return (
                    <Option value={status}>{CUSTOM_CONTRACT_TYPES[status].textForStudent}</Option>
                  )
                })}
              <Option value={defaultContractType.value}>{defaultContractType.text}</Option>
            </Select>
          </div>
        </Row>
        {!getListObj.isLoading && getListObj.isSuccess === true && (
          <>
            <Row gutter={16}>
              {getListObj.contractList.map(contract => {
                return (
                  <Col key={contract._id} span={12}>
                    <ContractItem contract={contract} currentUser={currentUser} />
                  </Col>
                )
              })}
            </Row>

            <Row>
              <Pagination
                simple
                defaultCurrent={parseInt(currentPage)}
                defaultPageSize={parseInt(limit)}
                total={getListObj.numberOfContracts}
                onChange={handleChangePage}
              />
            </Row>
          </>
        )}
      </div>
    </div>
  )
}

ContractListPage.propTypes = {}

export default ContractListPage
