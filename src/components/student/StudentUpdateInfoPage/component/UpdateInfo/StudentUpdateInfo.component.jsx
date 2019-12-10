/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Form, Icon, Input, Button, Alert, Radio, DatePicker } from 'antd'
import moment from 'moment'
import LoadingIcon from '../../../../common/LoadingIcon/LoadingIcon.component'
import './StudentUpdateInfo.style.scss'

const StudentUpdateInfoComponent = ({
  currentStudent,
  currentUser: { token },
  form,
  updateInfo: { isLoading, isSuccess, message },
  getInfo,
  updateInfoAction,
  clearUpdateInfo,
  studentGetInfo,
}) => {
  useEffect(() => {
    console.log('get info')
    studentGetInfo(token)
    console.log('get info after')
  }, [studentGetInfo, token])

  useEffect(() => {
    clearUpdateInfo()
  }, [clearUpdateInfo])

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // TODO: avatar
        updateInfoAction({ info: values, token })
      }
    })
  }

  const validateBirthdate = (rule, value, callback) => {
    if (value) {
      const birthdateValue = new Date(value)
      const now = new Date(Date.now())
      birthdateValue.setHours(0)
      birthdateValue.setMinutes(0)
      birthdateValue.setSeconds(0)
      birthdateValue.setMilliseconds(0)
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0)
      now.setMilliseconds(0)

      if (birthdateValue >= now) {
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
  console.log('getInfo: ', getInfo)
  if (getInfo.isLoading) {
    return (
      <div className="student-update-info-loading">
        <LoadingIcon />
      </div>
    )
  }
  if (getInfo.isSuccess === false) {
    return (
      <div className="student-update-info">
        <Alert type="error" message={getInfo.message} />
      </div>
    )
  }

  if (currentStudent) {
    const { displayName, phone, birthdate, gender, city, district } = currentStudent
    return (
      <div className="student-update-info">
        {!isLoading && isSuccess === false ? (
          <Alert message={message} type="error" showIcon />
        ) : null}
        {!isLoading && isSuccess === true ? (
          <Alert message="Cập nhật thông tin thành công" type="success" showIcon />
        ) : null}

        <Form onSubmit={handleSubmit} className="student-update-info-form">
          <div className="content-form">
            <div className="student-update-info-form__block">
              <div className="student-update-info-form__block--title">Thông tin:</div>

              <Form.Item hasFeedback label="Tên hiển thị">
                {getFieldDecorator('displayName', {
                  initialValue: displayName || '',
                  rules: [
                    { required: true, message: 'Vui lòng nhập tên' },
                    { min: 2, message: 'Tên phải từ 2 ký tự trở lên' },
                    { max: 20, message: 'Tên không được quá 20 ký tự' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Tên hiển thị"
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback label="Số điện thoại">
                {getFieldDecorator('phone', {
                  initialValue: phone || '',
                  rules: [
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    {
                      validator: validatePhoneNumber,
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Số điện thoại"
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback label="Ngày sinh">
                {getFieldDecorator('birthdate', {
                  initialValue: moment(new Date(birthdate), 'DD/MM/YYYY') || '',
                  rules: [
                    { required: true, message: 'Vui lòng nhập ngày sinh' },
                    { validator: validateBirthdate },
                  ],
                })(
                  <DatePicker
                    // value= '2019-12-02T10:24:52.738+00:00'
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày sinh"
                    format="DD/MM/YYYY"
                  />
                )}
              </Form.Item>
              <Form.Item label="Giới tính">
                {getFieldDecorator('gender', {
                  initialValue: gender || 'male',
                  rules: [{ required: true, message: 'Vui lòng chọn giới tính' }],
                })(
                  <Radio.Group>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </div>
            <div className="student-update-info-form__block">
              <div className="student-update-info-form__block--title">Địa chỉ:</div>
              <Form.Item hasFeedback label="Thành phố/ tỉnh">
                {getFieldDecorator('city', {
                  initialValue: city || '',
                })(
                  <Input
                    prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Thành phố/ tỉnh"
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback label="Quận">
                {getFieldDecorator('district', {
                  initialValue: district || '',
                })(
                  <Input
                    prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Quận"
                  />
                )}
              </Form.Item>
            </div>
          </div>
          <div className="student-update-info-form__bottom">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-student-update-info"
              loading={isLoading}
            >
              Cập nhật thông tin
            </Button>
          </div>
        </Form>
      </div>
    )
  }
  return <div>...</div>
}

export default Form.create({ name: 'StudentUpdateInfoComponent' })(StudentUpdateInfoComponent)
