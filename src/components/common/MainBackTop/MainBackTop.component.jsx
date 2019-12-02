/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { BackTop, Icon } from 'antd'
import './MainBackTop.style.scss'

const MainBackTop = () => {
  return (
    <BackTop>
      <div className="ant-back-top-inner">
        <Icon type="up" />
      </div>
    </BackTop>
  )
}

export default MainBackTop
