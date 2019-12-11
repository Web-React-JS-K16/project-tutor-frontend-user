/* eslint-disable react/prop-types */
import React from 'react'
import { Tabs } from 'antd'
import MainLayout from 'components/MainLayout'
import UploadAvatarContainer from '../../common/UploadAvatar/UploadAvatar.container'
import StudentUpdateInfoContainer from './component/UpdateInfo/StudentUpdateInfo.container'
import './StudentUpdateInfoPage.style.scss'

const { TabPane } = Tabs
const StudentUpdateInfoPageComponent = () => {
  return (
    <MainLayout>
      <div className="student-update-info-page">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thay đổi ảnh đại diện" key="1">
            <UploadAvatarContainer />
          </TabPane>
          <TabPane tab="Thay đổi thông tin" key="2">
            <StudentUpdateInfoContainer />
          </TabPane>
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default StudentUpdateInfoPageComponent
