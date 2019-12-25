import React from 'react'
import { Spin, Icon } from 'antd'
import './Loading.style.scss'

const LoadingComponent = () => {
  return (
    <div className="loading">
      <Spin indicator={<Icon type="loading" spin />} />
    </div>
  )
}

export default LoadingComponent
