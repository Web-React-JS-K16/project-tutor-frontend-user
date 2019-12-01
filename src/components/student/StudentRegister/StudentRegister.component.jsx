// import React from 'react';
import React from 'react'
import RegisterPageContainer from '../../common/RegisterPage/RegisterPage.container'
import { STUDENT } from '../../../utils/constant'

const StudentRegisterComponent = () => {
  return (
    <div className="student-register">
      <RegisterPageContainer typeID={STUDENT} title="Học sinh" />
    </div>
  )
}

export default StudentRegisterComponent
