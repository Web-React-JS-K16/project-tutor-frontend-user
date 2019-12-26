/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, Form, Input, InputNumber, Select } from 'antd'

const { TextArea } = Input
const { Option } = Select

const ModalFormComponent = ({ visible, onCancel, onCreate, form, teacher }) => {
  const { getFieldDecorator } = form

  // const validateDate = (rule, value, callback) => {
  //   if (value) {
  //     const startDate = new Date(value[0])
  //     const now = new Date(Date.now())
  //     startDate.setHours(0)
  //     startDate.setMinutes(0)
  //     startDate.setSeconds(0)
  //     startDate.setMilliseconds(0)
  //     now.setHours(0)
  //     now.setMinutes(0)
  //     now.setSeconds(0)
  //     now.setMilliseconds(0)

  //     if (startDate <= now) {
  //       callback('Ngày bắt đầu không hợp lệ.')
  //     }
  //   }
  //   callback()
  // }

  return (
    <Modal
      visible={visible}
      title="Hợp đồng đăng kí học"
      okText="Tạo"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item hasFeedback label="Tên hợp đồng">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Vui lòng nhập tên hợp đồng!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item hasFeedback label="Nội dung hợp đồng">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Vui lòng nhập nội dung!' }],
          })(<TextArea autoSize={{ minRows: 8, maxRows: 12 }} />)}
        </Form.Item>
        <Form.Item hasFeedback label="Kĩ năng">
          {getFieldDecorator('tags', {
            initialValue: teacher.tags.slice(0, 1).map(tag => tag._id),
            rules: [{ required: true, message: 'Vui lòng chọn kĩ năng!' }],
          })(
            <Select mode="multiple" style={{ width: '100%' }} placeholder="Chọn kĩ năng">
              {teacher.tags.map(tag => {
                return (
                  <Option value={tag._id} key={tag._id}>
                    {tag.name}
                  </Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item hasFeedback label="Tổng số giờ">
          {getFieldDecorator('workingHour', {
            initialValue: 24,
            rules: [{ required: true, message: 'Vui lòng nhập tổng số giờ!' }],
          })(<InputNumber min={1} />)}
        </Form.Item>
        {/* <Form.Item label="Thời gian hợp đồng có hiệu lực">
          {getFieldDecorator('date', {
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Vui lòng chọn thời gian!',
              },
              {
                validator: validateDate,
              },
            ],
          })(<RangePicker format="DD/MM/YYYY" />)}
        </Form.Item> */}
        <div>
          Giá trên giờ&ensp;
          <span style={{ fontWeight: 'bold' }}>{teacher.salary} vnđ</span>
        </div>
      </Form>
    </Modal>
  )
}

const ModalForm = Form.create({ name: 'modal_form' })(ModalFormComponent)

export default ModalForm
