import React from 'react'
import { Tabs } from 'antd'
import UploadAvatarContainer from 'components/common/UploadAvatar/UploadAvatar.container'
import TeacherUpdateInfoContainer from './components/TeacherUpdateInfo/TeacherUpdateInfo.container'
import './TeacherUpdateInfoPage.style.scss'

const { TabPane } = Tabs
const TeacherUpdateInfoPage = () => {
  return (
    <div className="teacher-update-info-page">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thay đổi thông tin" key="1">
          <TeacherUpdateInfoContainer />
        </TabPane>
        <TabPane tab="Thay đổi ảnh đại diện" key="2">
          <UploadAvatarContainer />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TeacherUpdateInfoPage
