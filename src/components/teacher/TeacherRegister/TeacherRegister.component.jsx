// import React from 'react';
import React from 'react'
import RegisterPageContainer from '../../common/RegisterPage/RegisterPage.container'
import { TEACHER } from '../../../utils/constant'

const TeacherRegisterComponent = () => {
  return (
    <div className="teacher-register">
      <RegisterPageContainer typeID={TEACHER} title="Giáo viên" />
    </div>
  )
}

export default TeacherRegisterComponent
