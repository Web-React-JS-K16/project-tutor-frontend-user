/* eslint-disable react/prop-types */

import React from 'react'
import './ContractDetail.style.scss'
import MainLayout from 'components/MainLayout'
import ContractService from 'services/contract.service'
import * as moment from 'moment'
import { Tag, message, Spin, Icon } from 'antd'
import { CONTRACT_TYPE } from 'utils/constant'
import CardInfoComponent from './components/CardInfo/CardInfo.component'
import ContractCommentComponnet from './components/ContractComment/ContractComment.component'
import {
  ContractToolComponent,
  ContractReportModal,
} from './components/ContractTool/ContractTool.component'

const ContractInfoItem = ({ label, content }) => {
  return (
    <div className="contract-info-item">
      <span className="contract-info-item__label">{label}:</span>
      <span className="contract-info-item__content">{content}</span>
    </div>
  )
}

class ContractDetailComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contractId: null,
      student: null,
      teacher: null,
      contract: null,
      isLoading: true, // load data for page
      reportContract: {
        isLoading: false,
        visibleModal: false,
      },
    }
  }

  async componentDidMount() {
    const {
      currentUser: { token },
      match: {
        params: { contractId },
      },
    } = this.props
    try {
      // check idUser, only user in contract can se contract detail in backend
      const result = await ContractService.getContract({
        id: contractId,
        token,
      })
      const { studentId, teacherId, ...contract } = result
      this.setState(
        {
          student: studentId,
          teacher: teacherId,
          contract,
          contractId,
        },
        () => {
          this.setState({ isLoading: false })
        }
      )
    } catch (err) {
      message.error(err.message)
      const { history } = this.props
      history.push({
        pathname: '/error-page',
        // search: '?query=abc',
        state: { message: err.message },
      })
    }
  }

  onOpenReportModal = () => {
    const { reportContract } = this.state
    this.setState({ reportContract: { ...reportContract, visibleModal: true } })
  }

  onCloseReportModal = () => {
    const { reportContract } = this.state
    this.setState({
      reportContract: { ...reportContract, visibleModal: false },
    })
  }

  onReportContract = async value => {
    console.log('value detail: ', value)
    const {
      currentUser: { token },
    } = this.props
    const { contractId } = this.state

    try {
      const result = await ContractService.reportContract({
        contractId,
        content: value,
        token,
      })
      console.log(result)
      if (result.isSuccess) {
        message.success(result.message)
        this.onCloseReportModal()
      } else {
        message.error(result.message)
      }
    } catch (err) {
      message.error(err.message)
    }
  }

  onCancelContract = () => {}

  onApproveContract = () => {}

  render() {
    const { isLoading, student, teacher, contract, reportContract } = this.state

    return (
      <MainLayout>
        {isLoading && (
          <div className="contract-detail-component__loading">
            <Spin indicator={<Icon type="loading" spin />} />
          </div>
        )}
        {!isLoading && (
          <div className="contract-detail-component">
            <div className="contract-detail-component__top">
              <div className="contract-detail-component__top--title">Chi tiết hợp đồng</div>
              <div className="contract-detail-component__top--time">
                Ngày bắt đầu: {moment(contract.startDate).format('L')}
              </div>
              <div className="contract-detail-component__top--tools">
                <ContractToolComponent
                  content="Tố cáo"
                  icon="waring"
                  onClick={() => this.onOpenReportModal()}
                />
                <ContractToolComponent
                  content="Hủy hợp đồng"
                  icon="waring"
                  onClick={this.onCancelContract}
                />
                <ContractToolComponent
                  content="Chấp nhận"
                  icon="waring"
                  onClick={this.onApproveContract}
                />
              </div>
            </div>
            <div className="contract-detail-component__info">
              <div className="contract-detail-component__info--block">
                <CardInfoComponent user={teacher} />
              </div>
              <div className="contract-detail-component__info--block" />
              <CardInfoComponent user={student} isStudent />
            </div>
            <div className="contract-detail-component__detail">
              <div className="contract-detail-component__detail--title">Chi tiết:</div>
              <div className="detail-content">
                <ContractInfoItem
                  label="Tình trạng"
                  content={
                    <Tag color={CONTRACT_TYPE[contract.status].color}>
                      {CONTRACT_TYPE[contract.status].text}
                    </Tag>
                  }
                />
                <ContractInfoItem label="Nội dung" content={contract.content || <i>(Trống)</i>} />
                <ContractInfoItem
                  label="Ngày bắt đầu"
                  content={moment(contract.startDate).format('L')}
                />
                <ContractInfoItem
                  label="Ngày kết thúc"
                  content={moment(contract.endDate).format('L') || <i>(Trống)</i>}
                />
                <ContractInfoItem
                  label="Giá"
                  content={`${contract.costPerHour.$numberDecimal * 1000} đ/giờ`}
                />
                <ContractInfoItem label="Tổng số giờ" content={`${contract.workingHour} giờ`} />
              </div>
            </div>

            <div className="contract-detail-component__comment">
              <ContractCommentComponnet />
            </div>
          </div>
        )}
        {/* modal */}
        <ContractReportModal
          visible={reportContract.visibleModal}
          onClose={this.onCloseReportModal}
          onSubmit={this.onReportContract}
          loading={reportContract.loading}
        />
      </MainLayout>
    )
  }
}

export default ContractDetailComponent
