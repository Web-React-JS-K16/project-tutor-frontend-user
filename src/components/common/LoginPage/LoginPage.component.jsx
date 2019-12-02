/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import './LoginPage.style.scss'
import AuthenWithFacebookContainer from '../AuthenWithFacebook/AuthenWithFacebook.container'
import AuthenWithGoogleContainer from '../AuthenWithGoogle/AuthenWithGoogle.container'
import { STUDENT, TEACHER } from '../../../utils/constant'

const LoginPage = ({ user, form, login, onClearUserState, typeID, title }) => {
  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const { email, password } = values
        login({ email, password, typeID })
      }
    })
  }

  const { getFieldDecorator } = form

  if (user.currentUser) {
    if (typeID === STUDENT) return <Redirect to="/" />
    if (typeID === TEACHER) return <Redirect to="/teacher/info" />
  }
  return (
    <div className="login-page">
      <h1 className="login-page__title">
        Đăng nhập
        <div>{title}</div>
      </h1>
      <div className="login-page__social">
        <div className="btn-social btn--google">
          <AuthenWithFacebookContainer typeID={typeID} isDisabled="false" />
        </div>
        <div className="btn-social btn--facebook">
          <AuthenWithGoogleContainer typeID={typeID} isDisabled="false" />
        </div>
      </div>
      <div className="text-alternative">hoặc</div>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item hasFeedback>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Vui lòng nhập email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              type="email"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
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
            <Link className="login-form-forgot" to="/foget-password">
              Quên mật khẩu
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button btn-login"
            loading={user.isLoading}
          >
            Đăng nhập
          </Button>
          <div className="register">
            Hoặc {typeID === STUDENT && <Link to="/student/register">Đăng ký</Link>}
            {typeID === TEACHER && <Link to="/teacher/register">Đăng ký</Link>}
          </div>
        </div>
      </Form>
      <div className="message--error">
        {!user.isLoading && user.errorMessage ? user.errorMessage : ''}
      </div>
    </div>
  )
}

LoginPage.propTypes = {}

export default Form.create({ name: 'LoginForm' })(LoginPage)
