/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Row, Col, Pagination, Spin, Icon } from 'antd'
import './ContractListPage.style.scss'
import TeacherService from 'services/teacher.service'
import UserService from 'services/user.service'
import { itemPerPage } from 'utils/constant'
import ContractItem from './components/ContractItem/ContractItem.component'

const ContractListPage = ({
  match,
  numberOfContracts,
  contractList,
  getContractList,
  countContracts,
}) => {
  const query = TeacherService.useQuery()
  const page = query.get('page') || 1
  const limit = query.get('limit') || itemPerPage

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const {
      params: { userId },
    } = match
    if (userId && page && limit) {
      setCurrentPage(page)
      getContractList({ userId, currentPage: page, currentLimit: limit })
      countContracts(userId)
    }
  }, [match, page, limit, getContractList, countContracts])

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

  return (
    <div className="contract-list-page">
      {contractList ? (
        <div className="contract-list-page__wrapper">
          <Row>
            <Col span={24}>
              <Row gutter={16}>
                {contractList.map(contract => {
                  return (
                    <Col key={contract._id} span={12}>
                      <ContractItem contract={contract} />
                    </Col>
                  )
                })}
              </Row>
              <Row>
                <Pagination
                  simple
                  defaultCurrent={parseInt(currentPage)}
                  defaultPageSize={parseInt(limit)}
                  total={numberOfContracts}
                  onChange={handleChangePage}
                />
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="contract-list-page__loading">
          <Spin indicator={<Icon type="loading" spin />} />
        </div>
      )}
    </div>
  )
}

ContractListPage.propTypes = {}

export default ContractListPage
