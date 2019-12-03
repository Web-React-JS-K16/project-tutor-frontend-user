// import React from 'react';
import React from 'react'
import LoginPageContainer from '../../common/LoginPage/LoginPage.container'
import { STUDENT } from '../../../utils/constant'

const StudentLoginComponent = () => {
  return (
    <div className="student-login">
      <LoginPageContainer typeID={STUDENT} title="Học sinh" />
    </div>
  )
}

export default StudentLoginComponent
