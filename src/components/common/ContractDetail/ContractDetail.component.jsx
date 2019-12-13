/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React from 'react'
import './ContractDetail.style.scss'
import MainLayout from 'components/MainLayout'
import ContractService from 'services/contract.service'
import * as moment from 'moment'
import { Tag, message, Modal } from 'antd'
import { CONTRACT_TYPE, STUDENT, TEACHER, NOT_START, VALID, CANCEL } from 'utils/constant'
import LoadingIcon from '../LoadingIcon/LoadingIcon.component'
import CardInfoComponent from './components/CardInfo/CardInfo.component'
import ContractCommentComponnet from './components/ContractComment/ContractComment.component'
import {
  ContractToolComponent,
  ContractReportModal,
} from './components/ContractTool/ContractTool.component'

const { confirm } = Modal

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
      commentContract: {
        isFetching: false,
        isLoading: false,
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
      const result = await ContractService.getContract({ id: contractId, token })
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
    this.setState({ reportContract: { ...reportContract, visibleModal: false } })
  }

  onReportContract = async value => {
    console.log('value detail: ', value)
    const {
      currentUser: { token },
    } = this.props
    const { contractId } = this.state

    try {
      const result = await ContractService.reportContract({ contractId, content: value, token })
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

  // aprrove contract
  confirmAprroveContract = () => {
    const callback = this.onApproveContract
    confirm({
      title: 'Bạn muốn chấp nhận hợp đồng này?',
      content: 'Học sinh sẽ nhận được thông báo khi bạn chấp nhận hợp đồng.',
      okText: 'Đồng ý',
      okType: 'primary',
      cancelText: 'Hủy',
      async onOk() {
        console.log('OK')
        await callback()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  onApproveContract = async () => {
    const { contract } = this.state
    const {
      currentUser: { token },
    } = this.props
    try {
      const result = await ContractService.approveContract({ contractId: contract._id, token })
      this.setState({ contract: { ...contract, status: VALID } }, () => {
        message.success(result.message)
      })
    } catch (err) {
      message.error(err.message)
    }
  }

  // cancel contract
  confirmCancelContract = () => {
    const callback = this.onCancelContract
    const {
      currentUser: { typeID },
    } = this.props
    Modal.confirm({
      title: 'Bạn muốn hủy hợp đồng này?',
      content: `${
        typeID === TEACHER ? 'Học sinh' : 'Giáo viên'
      } sẽ nhận được thông báo khi bạn hủy hợp đồng.`,
      okText: 'Đồng ý hủy',
      okType: 'danger',
      cancelText: 'Đóng',
      async onOk() {
        console.log('OK')
        await callback()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  onCancelContract = async () => {
    // TODO
    const { contract } = this.state
    const {
      currentUser: { token },
    } = this.props
    try {
      const result = await ContractService.cancelContract({ contractId: contract._id, token })
      this.setState({ contract: { ...contract, status: CANCEL } }, () => {
        message.success(result.message)
      })
    } catch (err) {
      message.error(err.message)
    }
  }

  // commnet
  onHandleCommentContract = async ({ comment, rating }) => {
    const { currentUser } = this.props
    const { contract, commentContract } = this.state
    this.setState({ commentContract: { ...commentContract, isLoading: true } }, async () => {
      try {
        const result = await ContractService.ratingContract({
          comment,
          rating,
          id: contract._id,
          token: currentUser.token,
        })
        message.success(result.message)
      } catch (err) {
        message.error(err.message)
      }
      this.setState({ commentContract: { ...commentContract, isLoading: false } })
    })
  }

  render() {
    const { isLoading, student, teacher, contract, reportContract, commentContract } = this.state
    const { currentUser } = this.props

    return (
      <MainLayout>
        {isLoading && (
          <div className="contract-detail-component__loading">
            <LoadingIcon />
          </div>
        )}
        {!isLoading && (
          <div className="contract-detail-component">
            <div className="contract-detail-component__top">
              <div className="contract-detail-component__top--title">Chi tiết hợp đồng</div>
              <div className="contract-detail-component__top--time">
                Ngày bắt đầu: {moment(contract.startDate).format('L')}
              </div>
              <Tag color={CONTRACT_TYPE[contract.status].color}>
                {CONTRACT_TYPE[contract.status].text}
              </Tag>

              <div className="contract-detail-component__top--tools">
                {currentUser.typeID === STUDENT && contract.status !== NOT_START && (
                  <ContractToolComponent
                    content="Tố cáo"
                    icon="waring"
                    onClick={() => this.onOpenReportModal()}
                  />
                )}
                {currentUser.typeID === TEACHER && contract.status === NOT_START && (
                  <ContractToolComponent
                    content="Chấp nhận"
                    icon="waring"
                    onClick={() => this.confirmAprroveContract()}
                  />
                )}
                {/* {
                  currentUser.typeID === STUDENT && contract.status === CANCEL &&
                  <ContractToolComponent
                    content="Khôi phục hợp đồng"
                    icon="waring"
                    onClick={}
                  />
                } */}
                {contract.status === VALID && (
                  <ContractToolComponent
                    content="Hủy hợp đồng"
                    icon="waring"
                    onClick={() => this.confirmCancelContract()}
                  />
                )}
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
                  content={moment(contract.startDate).format('L') || <i>(Trống)</i>}
                />
                <ContractInfoItem
                  label="Ngày kết thúc"
                  content={contract.endDate ? moment(contract.endDate).format('L') : <i>(Trống)</i>}
                />
                <ContractInfoItem
                  label="Giá"
                  content={`${contract.costPerHour.$numberDecimal * 1000} đ/giờ`}
                />
                <ContractInfoItem label="Tổng số giờ" content={`${contract.workingHour} giờ`} />
              </div>
            </div>

            <div className="contract-detail-component__comment">
              <ContractCommentComponnet
                student={currentUser}
                contract={contract}
                loading={commentContract.isLoading}
                onHandleComment={this.onHandleCommentContract}
              />
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
