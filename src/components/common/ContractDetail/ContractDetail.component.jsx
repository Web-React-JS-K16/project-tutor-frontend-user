/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React from 'react'
import './ContractDetail.style.scss'
import MainLayout from 'components/MainLayout'
import ContractService from 'services/contract.service'
import * as moment from 'moment'
import { Tag, message, Modal } from 'antd'
import { CUSTOM_CONTRACT_TYPES, CONTRACT_TYPES, STUDENT, TEACHER } from 'utils/constant'
import CardInfoComponent from './components/CardInfo/CardInfo.component'
import PaymentModal from './components/PaymentModal/PaymentModal.component'
import ContractCommentComponnet from './components/ContractComment/ContractComment.component'
import {
  ContractToolComponent,
  ContractReportModal,
  ContractRatingModal,
} from './components/ContractTool/ContractTool.component'
import LoadingComponent from '../LoadingComponent/Loading.component'

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
      payment: {
        visibleModal: false,
        // isLoading: false
      },
      finishContract: {
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

  // payment
  onOpenPaymentModal = () => {
    const { payment } = this.state
    this.setState({ payment: { ...payment, visibleModal: true } })
  }

  onClosePaymentModal = () => {
    const { payment } = this.state
    this.setState({
      payment: { ...payment, visibleModal: false },
    })
  }

  onPaymentSuccess = () => {
    this.onClosePaymentModal()
    const { contract } = this.state
    this.setState({
      contract: { ...contract, status: CONTRACT_TYPES.WAIT_FOR_ACCEPTANCE },
    })
  }

  // report
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

  /**
   * Finish contract
   * Student rating contract when finish
   */
  onOpenRatingContractModal = () => {
    this.setState({ finishContract: { visibleModal: true } })
  }

  onCloseRatingContractModal = () => {
    console.log('on close rating modal')
    this.setState({ finishContract: { visibleModal: false, isLoading: false } })
  }

  onFinishContract = async ({ content, ratings }) => {
    this.setState({ finishContract: { isLoading: true } }, async () => {
      // TODO
      const { contract } = this.state
      const {
        currentUser: { token },
      } = this.props
      try {
        const result = await ContractService.finishContract({
          contractId: contract._id,
          token,
          comment: { content, ratings },
        })
        this.setState(
          {
            contract: {
              ...contract,
              status: CONTRACT_TYPES.IS_COMPLETED_BY_STUDENT,
              comment: { content, ratings },
            },
          },
          () => {
            console.log('after change contract')

            message.success(result.message)
            this.setState({ finishContract: { isLoading: false } })
            this.onCloseRatingContractModal()
          }
        )
      } catch (err) {
        message.error(err.message)
        this.setState({ finishContract: { isLoading: false } })
      }
    })
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
      const result = await ContractService.approveContract({
        contractId: contract._id,
        token,
      })
      this.setState({ contract: { ...contract, status: CONTRACT_TYPES.IS_VALID } }, () => {
        message.success(result.message)
      })
    } catch (err) {
      message.error(err.message)
    }
  }

  // // cancel contract
  // confirmCancelContract = () => {
  //   const callback = this.onCancelContract
  //   const {
  //     currentUser: { typeID },
  //   } = this.props
  //   Modal.confirm({
  //     title: 'Bạn muốn hủy hợp đồng này?',
  //     content: `${
  //       typeID === TEACHER ? 'Học sinh' : 'Giáo viên'
  //     } sẽ nhận được thông báo khi bạn hủy hợp đồng.`,
  //     okText: 'Đồng ý hủy',
  //     okType: 'danger',
  //     cancelText: 'Đóng',
  //     async onOk() {
  //       console.log('OK')
  //       await callback()
  //     },
  //     onCancel() {
  //       console.log('Cancel')
  //     },
  //   })
  // }

  // onCancelContract = async () => {
  //   // TODO
  //   const { contract } = this.state
  //   const {
  //     currentUser: { token },
  //   } = this.props
  //   try {
  //     const result = await ContractService.cancelContract({
  //       contractId: contract._id,
  //       token,
  //     })
  //     this.setState({ contract: { ...contract, status: CONTRACT_TYPES.IS_CANCELLED } }, () => {
  //       message.success(result.message)
  //     })
  //   } catch (err) {
  //     message.error(err.message)
  //   }
  // }

  // commnet
  onHandleCommentContract = async ({ content, ratings }) => {
    const { currentUser } = this.props
    const { contract, commentContract } = this.state
    this.setState({ commentContract: { ...commentContract, isLoading: true } }, async () => {
      try {
        const result = await ContractService.updateRatingContract({
          content,
          ratings,
          id: contract._id,
          token: currentUser.token,
        })
        message.success(result.message)
        this.setState({ contract: { ...contract, comment: result.comment } })
      } catch (err) {
        message.error(err.message)
      }
      this.setState({
        commentContract: { ...commentContract, isLoading: false },
      })
    })
  }

  render() {
    const {
      isLoading,
      student,
      teacher,
      contract,
      reportContract,
      commentContract,
      payment,
      finishContract,
    } = this.state

    const { currentUser, history } = this.props

    return (
      <MainLayout history={history}>
        {isLoading && (
          <div className="contract-detail-component__loading">
            <LoadingComponent />
          </div>
        )}
        {!isLoading && (
          <div className="contract-detail-component">
            <div className="contract-detail-component__top">
              <div className="contract-detail-component__top--title">{contract.name}</div>
              <div className="contract-detail-component__top--tools">
                {contract.status === CONTRACT_TYPES.WAIT_FOR_PAYMENT &&
                  currentUser.typeID === STUDENT && (
                    <>
                      <ContractToolComponent
                        content="Thanh toán"
                        icon="dollar"
                        onClick={() => this.onOpenPaymentModal()}
                      />
                      <PaymentModal
                        token={currentUser.token}
                        visible={payment.visibleModal}
                        contract={contract}
                        onClose={this.onClosePaymentModal}
                        onSuccess={this.onPaymentSuccess}
                      />
                    </>
                  )}
                {currentUser.typeID === STUDENT && contract.status === CONTRACT_TYPES.IS_VALID && (
                  <div>
                    <ContractToolComponent
                      content="Tố cáo/ Hủy hợp đồng"
                      icon="waring"
                      onClick={() => this.onOpenReportModal()}
                    />
                    {/* modal */}
                    <ContractReportModal
                      visible={reportContract.visibleModal}
                      onClose={this.onCloseReportModal}
                      onSubmit={this.onReportContract}
                      loading={reportContract.loading}
                    />

                    <ContractToolComponent
                      content="Kết thúc hợp đồng"
                      icon="waring"
                      onClick={() => this.onOpenRatingContractModal()}
                    />
                    {/* modal */}
                    <ContractRatingModal
                      visible={finishContract.visibleModal}
                      onClose={this.onCloseRatingContractModal}
                      onSubmit={this.onFinishContract}
                      loading={finishContract.isLoading}
                    />
                  </div>
                )}
                {currentUser.typeID === TEACHER &&
                  contract.status === CONTRACT_TYPES.WAIT_FOR_ACCEPTANCE && (
                    <ContractToolComponent
                      content="Chấp nhận"
                      icon="waring"
                      onClick={() => this.confirmAprroveContract()}
                    />
                  )}
                {/* {contract.status === CONTRACT_TYPES.IS_VALID && (
                  <ContractToolComponent
                    content="Hủy hợp đồng"
                    icon="waring"
                    onClick={() => this.confirmCancelContract()}
                  />
                )} */}
              </div>

              <div className="contract-detail-component__top--time">
                <span className="contract-detail__lable">Thời gian: </span>
                {contract.startDate
                  ? moment(contract.startDate).format('DD/MM/YYYY')
                  : 'Chưa cập nhật'}
                &ensp;-&ensp;
                {contract.endDate ? moment(contract.endDate).format('DD/MM/YYYY') : 'Chưa cập nhật'}
              </div>
              <div className="contract-detail-component__top--detail">
                <ContractInfoItem
                  label="Tình trạng"
                  content={
                    <Tag color={CUSTOM_CONTRACT_TYPES[contract.status].color}>
                      {currentUser.typeID === TEACHER
                        ? CUSTOM_CONTRACT_TYPES[contract.status].textForTeacher
                        : CUSTOM_CONTRACT_TYPES[contract.status].textForStudent}
                    </Tag>
                  }
                />
                <ContractInfoItem label="Nội dung" content={contract.content || <i>(Trống)</i>} />
                <ContractInfoItem label="Giá" content={`${contract.costPerHour} vnđ/giờ`} />
                <ContractInfoItem label="Tổng số giờ" content={`${contract.workingHour} giờ`} />
              </div>
            </div>
            <div className="contract-detail-component__info">
              <div className="contract-detail-component__info--block">
                <CardInfoComponent user={teacher} />
              </div>
              <div className="contract-detail-component__info--block" />
              <CardInfoComponent user={student} isStudent />
            </div>

            <div className="contract-detail-component__comment">
              <ContractCommentComponnet
                typeID={currentUser.typeID}
                student={student}
                contract={contract}
                loading={commentContract.isLoading}
                onHandleComment={this.onHandleCommentContract}
              />
            </div>
          </div>
        )}
      </MainLayout>
    )
  }
}

export default ContractDetailComponent
