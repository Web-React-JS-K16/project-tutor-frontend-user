import React from 'react'
import { Tabs } from 'antd'
import MainLayout from 'components/MainLayout'
import UploadAvatarContainer from 'components/common/UploadAvatar/UploadAvatar.container'
import TeacherUpdateInfoContainer from './components/TeacherUpdateInfo/TeacherUpdateInfo.container'
import './TeacherUpdateInfoPage.style.scss'

const { TabPane } = Tabs
const TeacherUpdateInfoPage = () => {
  return (
    <MainLayout>
      <div className="teacher-update-info-page">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thay đổi ảnh đại diện" key="1">
            <UploadAvatarContainer />
          </TabPane>
          <TabPane tab="Thay đổi thông tin" key="2">
            <TeacherUpdateInfoContainer />
          </TabPane>
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default TeacherUpdateInfoPage
