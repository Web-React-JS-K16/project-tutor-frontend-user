/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
// import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'
import './LoginPage.style.scss'
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook.component'
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle.component'

const LoginPage = ({ form }) => {
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  const { getFieldDecorator } = form

  return (
    <div className="login-page">
      <h1 className="login-page__title">Đăng nhập</h1>
      <div className="login-page__social">
        <div className="btn-social btn--google">
          <LoginWithGoogle />
        </div>
        hoặc
        <div className="btn-social btn--facebook">
          <LoginWithFacebook />
        </div>
      </div>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Vui lòng nhập email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              type="mail"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Mật khẩu"
            />
          )}
        </Form.Item>
        <div className="login-form__bottom">
          <div>
            <a className="login-form-forgot" href="">
              Quên mật khẩu
            </a>
          </div>
          <Button type="primary" htmlType="submit" className="login-form-button btn-login">
            Đăng nhập
          </Button>
          <div className="register">
            Hoặc <a href="">Đăng ký</a>
          </div>
        </div>
      </Form>
    </div>
  )
}

LoginPage.propTypes = {}

export default Form.create({ name: 'LoginForm' })(LoginPage)
