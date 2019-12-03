/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import { Layout } from 'antd'
import MainHeader from './common/MainHeader/MainHeader.container'
import MainFooter from './common/MainFooter/MainFooter.container'
import MainBackTop from './common/MainBackTop/MainBackTop.component'

const { Content } = Layout

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <MainBackTop />
      <MainHeader />
      <Content style={{ marginTop: 64 }}>{children}</Content>
      <MainFooter />
    </Layout>
  )
}

export default MainLayout
