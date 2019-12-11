/* eslint-disable react/prop-types */

import React from 'react'
import { Button, Input, Modal, message } from 'antd'
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

const ContractToolComponent = ({ content, icon, onClick }) => {
  return (
    <div className="card-info">
      <Button type="default" icon={icon} typeHtml="button" onClick={onClick}>
        {content}
      </Button>
    </div>
  )
}

export { ContractToolComponent, ContractReportModal }
