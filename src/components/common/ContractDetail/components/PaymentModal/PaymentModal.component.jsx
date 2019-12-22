import React, { Component } from 'react'
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements'
import { Button, Modal, message } from 'antd'
import ContractService from '../../../../../services/contract.service'
import './PaymentModal.style.scss'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      isLoading: false,
    }
  }

  submit() {
    // User clicked submit
    this.setState({ isLoading: true }, async () => {
      try {
        const { stripe, contractId, token, cost, onSuccess } = this.props
        // console.log("cost : ", cost);

        const amount = +cost.split(',').join('') // convert to number
        // console.log("amount : ", amount);
        //     console.log('on click payment ')

        const stripeToken = await stripe.createToken({ name: 'Name' })
        if (token) {
          await ContractService.onPayment({
            contractId,
            amount,
            stripeToken: stripeToken.token.id,
            token,
          })
          message.success('Thanh toán thành công')
          onSuccess()
          this.setState({ isLoading: false })
        }
      } catch (error) {
        message.error(error.message)
        this.setState({ isLoading: false })
      }
    })
  }

  render() {
    const { isLoading } = this.state
    return (
      <div className="payment-content__checkout">
        <p className="payment-content__checkout--instruction">Mời bạn điền thông tin thanh toán</p>
        <CardElement />
        <Button typeHtml="button" type="primary" loading={isLoading} onClick={this.submit}>
          Thanh toán
        </Button>
      </div>
    )
  }
}
const CheckOutFormComponent = injectStripe(CheckoutForm)

const PaymentModal = ({ visible, onClose, token, contract: { _id, name, cost }, onSuccess }) => {
  return (
    <div className="payment-modal">
      <Modal
        visible={visible}
        title="Thanh toán hợp đồng"
        onCancel={onClose}
        footer={[
          <div className="payment-modal__footer">
            Sau khi thanh toán, thông báo sẽ được gửi đến giáo viên.
            <br />
            Sau khi giáo viên chấp nhận, hợp đồng sẽ có hiệu lực
          </div>,
        ]}
      >
        <StripeProvider apiKey="pk_test_zXSU4yRnrOlP3SfCWYgBVUWK00HXrURDga">
          <div className="payment-content">
            <div className="payment-content__icon">
              <i className="fas fa-money-check-alt" />
              <i className="fab fa-cc-stripe" />
            </div>
            <div className="payment-content__title">{name}</div>
            <div className="payment-content__sum">
              Tổng tiền: <span>{cost}</span> đ
            </div>
            <Elements>
              <CheckOutFormComponent
                contractId={_id}
                token={token}
                onSuccess={onSuccess}
                cost={cost}
              />
            </Elements>
          </div>
        </StripeProvider>
      </Modal>
    </div>
  )
}

export default PaymentModal
