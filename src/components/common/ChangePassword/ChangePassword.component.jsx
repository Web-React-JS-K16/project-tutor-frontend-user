/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './ChangePassword.style.scss'

const ChangePasswordForm = ({ form }) => {
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // const { oldPassword, password } = values
        // login({ email, password, typeID })
      }
    })
  }

  const [confirmDirty, setConfirmDirty] = useState(0)

  const handleBlurConfirmPassword = e => {
    const { value } = e.target
    setConfirmDirty(confirmDirty || !!value)
  }

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirmedPassword'], { force: true })
    }
    callback()
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không khớp. Vui lòng nhập lại.')
    } else {
      callback()
    }
  }

  const { getFieldDecorator } = form

  return (
    <div className="change-password-component">
      <h1 className="change-password-component__title">Đổi mật khẩu</h1>

      <Form onSubmit={handleSubmit} className="change-password-form">
        <Form.Item hasFeedback>
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu cũ!',
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Nhập mật khẩu cũ"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu mới!',
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
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Mật khẩu mới"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirmedPassword', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu!',
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
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Nhập lại mật khẩu"
              onBlur={handleBlurConfirmPassword}
            />
          )}
        </Form.Item>

        <div className="change-password-form__bottom">
          <Button
            type="primary"
            htmlType="submit"
            className="change-password-form-button btn-login"
            // loading={user.isLoading}
          >
            Đổi mật khẩu
          </Button>
        </div>
      </Form>
    </div>
  )
}

const ChangePasswordComponent = Form.create({ name: 'ChangePasswordComponent' })(ChangePasswordForm)
export default ChangePasswordComponent
