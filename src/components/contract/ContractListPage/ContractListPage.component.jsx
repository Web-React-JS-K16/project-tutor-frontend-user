/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Pagination, Spin, Icon } from 'antd'
import './ContractListPage.style.scss'
import UserService from 'services/user.service'
import { ITEMS_PER_PAGE } from 'utils/constant'
import ContractItem from './components/ContractItem/ContractItem.component'

const ContractListPage = ({
  match,
  currentUser,
  getListObj,
  onClearContractState,
  getContractList,
}) => {
  // const query = TeacherService.useQuery()
  // const page = query.get('page') || 1
  // const limit = query.get('limit') || ITEMS_PER_PAGE
  const page = 1
  const limit = ITEMS_PER_PAGE

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    onClearContractState()
    const {
      params: { userId },
    } = match
    if (userId && page && limit) {
      setCurrentPage(page)
      getContractList({ userId, currentPage: page, currentLimit: limit })
    }
  }, [match, page, limit, onClearContractState, getContractList])

  const executeFilter = filterConditions => {
    UserService.setPreferences('project-tutor-contract-list', JSON.stringify(filterConditions))
    getContractList(filterConditions)
  }

  const handleChangePage = pageNumber => {
    console.log('handleChangePage = ', pageNumber)
    setCurrentPage(pageNumber)
    const filterConditions = {
      currentPage: pageNumber,
      currentLimit: limit,
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
      {!getListObj.isLoading && getListObj.isSuccess === true && (
        <div className="contract-list-page__wrapper">
          <Row>
            <Col span={24}>
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
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

ContractListPage.propTypes = {}

export default ContractListPage
