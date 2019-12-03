/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, DatePicker, Alert, Row, Col } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import './RegisterPage.style.scss'
import LoadingIcon from '../LoadingIcon/LoadingIcon.component'
import NumericInput from '../NumericInput/NumericInput.component'
import AuthenWithFacebookContainer from '../AuthenWithFacebook/AuthenWithFacebook.container'
import AuthenWithGoogleContainer from '../AuthenWithGoogle/AuthenWithGoogle.container'
import { STUDENT, TEACHER } from '../../../utils/constant'

const RegisterPage = ({ user, form, register, onClearUserState, typeID, title }) => {
  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  const [confirmDirty, setConfirmDirty] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState(0)

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const { email, displayName, phone, birthdate, password } = values
        register(email, displayName, phone, birthdate, password, typeID)
      }
    })
  }

  const handleBlurConfirmPassword = e => {
    const { value } = e.target
    setConfirmDirty(confirmDirty || !!value)
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không khớp. Vui lòng nhập lại.')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirmedPassword'], { force: true })
    }
    callback()
  }

  const onChangePhoneNumber = value => {
    setPhoneNumber(value)
  }

  const { getFieldDecorator } = form

  if (user.registerUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="register-page">
      <div className="register-page__card">
        <h1 className="register-page__card__title">
          Đăng kí <div>{title}</div>
          {user.isLoading && <LoadingIcon />}
        </h1>
        <div className="register-page__card__social">
          <div className="btn-social btn--google">
            <AuthenWithFacebookContainer typeID={typeID} />
          </div>
          <div className="btn-social btn--facebook">
            <AuthenWithGoogleContainer typeID={typeID} />
          </div>
        </div>
        <div className="text-alternative">hoặc</div>
        {user.errorMessage ? <Alert message={user.errorMessage} type="error" showIcon /> : null}
        <Form onSubmit={handleSubmit} className="register-page__card__body">
          <Form.Item hasFeedback>
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
          <Form.Item hasFeedback>
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
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item hasFeedback>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Vui lòng nhập số điện thoại.' }],
                })(
                  <NumericInput
                    iconType="phone"
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item hasFeedback>
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
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu.',
                    },
                    {
                      validator: validateToNextPassword,
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
            </Col>
            <Col span={12}>
              <Form.Item hasFeedback>
                {getFieldDecorator('confirmedPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu.',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    onBlur={handleBlurConfirmPassword}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" className="register-form-button">
            Đăng ký
          </Button>
          <div className="login">
            Đã có tài khoản? {typeID === STUDENT && <Link to="/student/login">Đăng nhập</Link>}
            {typeID === TEACHER && <Link to="/teacher/login">Đăng nhập</Link>}
          </div>
        </Form>
      </div>
    </div>
  )
}

RegisterPage.propTypes = {}

export default Form.create({ name: 'RegisterForm' })(RegisterPage)
