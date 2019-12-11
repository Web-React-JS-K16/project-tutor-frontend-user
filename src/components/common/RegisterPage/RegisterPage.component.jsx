/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, DatePicker, Alert, Row, Col } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import './RegisterPage.style.scss'
import AuthenWithFacebookContainer from '../AuthenWithFacebook/AuthenWithFacebook.container'
import AuthenWithGoogleContainer from '../AuthenWithGoogle/AuthenWithGoogle.container'
import { STUDENT, TEACHER } from '../../../utils/constant'

const RegisterPage = ({ user, form, register, onClearUserState, typeID, title }) => {
  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  const [confirmDirty, setConfirmDirty] = useState(0)

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

  const validateBirthdate = (rule, value, callback) => {
    if (value) {
      const birthdate = new Date(value)
      const now = new Date(Date.now())
      birthdate.setHours(0)
      birthdate.setMinutes(0)
      birthdate.setSeconds(0)
      birthdate.setMilliseconds(0)
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0)
      now.setMilliseconds(0)

      if (birthdate >= now) {
        callback('Ngày sinh không hợp lệ.')
      }
    }
    callback()
  }

  const validatePhoneNumber = (rule, value, callback) => {
    if (value) {
      const phoneRegex = /((09|03|07|08|05)+([0-9]{8,9})\b)/g
      if (!value.match(phoneRegex)) {
        callback('Số điện thoại không hợp lệ.')
      }
    }
    callback()
  }

  const { getFieldDecorator } = form

  if (user.currentUser) {
    if (typeID === STUDENT) return <Redirect to="/" />
    if (typeID === TEACHER) return <Redirect to={`/teacher/info?id=${user.currentUser._id}`} />
  }
  if (user.registerUser) {
    if (typeID === STUDENT) return <Redirect to="/student/login" />
    if (typeID === TEACHER) return <Redirect to="/teacher/login" />
  }

  return (
    <div className="register-page">
      <div className="register-page__card">
        <h1 className="register-page__card__title">
          Đăng kí <div>{title}</div>
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
          <Row>
            <Col span={12}>
              <Form.Item hasFeedback>
                {getFieldDecorator('phone', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập số điện thoại.' },
                    {
                      validator: validatePhoneNumber,
                    },
                  ],
                })(
                  <Input
                    type="number"
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Số điện thoại"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item hasFeedback>
                {getFieldDecorator('birthdate', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập ngày sinh.' },
                    { validator: validateBirthdate },
                  ],
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
          <Row>
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
                    {
                      min: 3,
                      message: 'Vui lòng nhập ít nhất 3 kí tự.',
                    },
                    {
                      max: 10,
                      message: 'Vui lòng không nhập quá 10 kí tự',
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
                    {
                      min: 3,
                      message: 'Vui lòng nhập ít nhất 3 kí tự.',
                    },
                    {
                      max: 10,
                      message: 'Vui lòng không nhập quá 10 kí tự',
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

          <Button
            type="primary"
            htmlType="submit"
            loading={user.isLoading}
            className="register-form-button"
          >
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
