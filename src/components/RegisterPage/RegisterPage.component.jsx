/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
// import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, DatePicker, Alert } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import './RegisterPage.style.scss'
import LoadingIcon from '../LoadingIcon/LoadingIcon.component'

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, register } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const { email, displayName, phone, birthdate, password } = values
        register(email, displayName, phone, birthdate, password)
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    const { confirmDirty } = this.state
    this.setState({ confirmDirty: confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không khớp. Vui lòng nhập lại.')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['confirmedPassword'], { force: true })
    }
    callback()
  }

  render() {
    const { form, user } = this.props
    const { getFieldDecorator } = form

    if (user.registerUser) {
      return <Redirect to="/" />
    }

    return (
      <div className="register-page">
        <div className="register-page__card">
          <h1 className="register-page__card__title">
            Đăng kí {user.isLoading && <LoadingIcon />}
          </h1>
          {user.errorMessage ? <Alert message={user.errorMessage} type="error" showIcon /> : null}
          <Form onSubmit={this.handleSubmit} className="register-page__card__body">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Email không hợp lệ. Vui lòng nhập lại.',
                  },
                  { required: true, message: 'Vui lòng nhập email.' },
                ],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                  type="email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('displayName', {
                rules: [{ required: true, message: 'Vui lòng nhập họ tên.' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Nguyễn Văn A"
                  type="text"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Vui lòng nhập số điện thoại.' }],
              })(
                <Input
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="097xxxxxxx"
                  type="text"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('birthdate', {
                rules: [{ required: true, message: 'Vui lòng nhập ngày sinh.' }],
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày sinh"
                  format="DD/MM/YYYY"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu.',
                  },
                  {
                    validator: this.validateToNextPassword,
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
            <Form.Item hasFeedback>
              {getFieldDecorator('confirmedPassword', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu.',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button btn-register">
              Đăng ký
            </Button>
            <div className="login">
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

RegisterPage.propTypes = {}

export default Form.create({ name: 'RegisterForm' })(RegisterPage)