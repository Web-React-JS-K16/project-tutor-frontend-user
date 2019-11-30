import React from 'react'
import LoginPageContainer from '../../common/LoginPage/LoginPage.container'
import { TEACHER } from '../../../utils/constant'

const TeacherLoginComponent = () => {
  return (
    <div className="teacher-login">
      <LoginPageContainer typeID={TEACHER} title="Giáo viên" />
    </div>
  )
}

export default TeacherLoginComponent
