/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { Button, Input, Modal, message, Rate } from 'antd'
import './ContractTool.style.scss'

const ContractReportModal = ({ visible, onClose, onSubmit, loading }) => {
  const onHandleSubmit = () => {
    // eslint-disable-next-line no-undef
    const { value } = document.getElementById('report-contract-content')
    if (!value) {
      message.warning('Mời bạn nhập nội dung tố cáo')
    } else {
      onSubmit(value)
      // onClose()
    }
  }
  return (
    <Modal
      visible={visible}
      title="Tố cáo hợp đồng"
      onOk={onHandleSubmit}
      onCancel={onClose}
      footer={[
        <Button key="submit" type="primary" loading={loading} onClick={onHandleSubmit}>
          Gửi tố cáo
        </Button>,
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
      ]}
    >
      <Input.TextArea id="report-contract-content" placeholder="Nhập nội dung tố cáo" />
    </Modal>
  )
}

const ContractRatingModal = ({ visible, onClose, onSubmit, loading }) => {
  const [ratings, setRating] = useState(0)

  const onHandleSubmit = () => {
    // eslint-disable-next-line no-undef
    const { value } = document.getElementById('rating-contract-modal__content')
    // console.log("commnet value; ", value, " - ", ratings)
    onSubmit({ content: value, ratings })
  }

  return (
    <Modal
      visible={visible}
      title="Đánh giá hợp đồng"
      // onOk={onHandleSubmit}
      // onCancel={onClose}
      footer={[
        <Button key="submit" type="primary" loading={loading} onClick={onHandleSubmit}>
          Kết thúc hợp đồng
        </Button>,
        <Button key="back" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      <div className="rating-contract-modal">
        <Rate
          className="rating-contract-modal__star"
          allowHalf
          defaultValue={0}
          onChange={value => setRating(value)}
        />
        <Input.TextArea id="rating-contract-modal__content" placeholder="Nhập nội dung đánh giá" />
      </div>
    </Modal>
  )
}

const ContractToolComponent = ({ content, icon, onClick }) => {
  return (
    <div className="card-info">
      <Button type="primary" icon={icon} typeHtml="button" onClick={onClick}>
        {content}
      </Button>
    </div>
  )
}

export { ContractToolComponent, ContractReportModal, ContractRatingModal }
