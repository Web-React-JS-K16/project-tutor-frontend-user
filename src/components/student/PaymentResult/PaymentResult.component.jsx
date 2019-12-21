import React, { Component } from 'react'
import './PaymentResult.style.scss'
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements'
// import ContractService from './service/contract.service.js';
import ContractService from '../../../services/contract.service'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit() {
    // User clicked submit
    const { stripe } = this.props
    const { token } = await stripe.createToken({ name: 'Name' })
    console.log('token: ', token)
    if (token) {
      const result = await ContractService.onPayment({
        amount: 933000,
        stripeToken: token.id,
        token: 'todo',
      })
      console.log('rs: ', result)

      // let response = await fetch("http://localhost:4500/charge", {
      //     method: "POST",
      //     headers: { "Content-Type": "text/plain" },
      //     body: JSON.stringify({ stripeToken: token.id, amount: 253000})
      //     // body: token.id
      // });

      // if (response.ok) console.log("Purchase Complete!")
      // else {
      //     alert("err")
      // }
    }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="button" onClick={this.submit}>
          Purchase
        </button>
      </div>
    )
  }
}

const CheckOutFormComponent = injectStripe(CheckoutForm)

const PaymentResultComponent = () => {
  return (
    <StripeProvider apiKey="pk_test_zXSU4yRnrOlP3SfCWYgBVUWK00HXrURDga">
      <div className="example">
        <h1>React Stripe Elements Example</h1>
        <Elements>
          <CheckOutFormComponent />
        </Elements>
      </div>
    </StripeProvider>
  )
}

export default PaymentResultComponent
