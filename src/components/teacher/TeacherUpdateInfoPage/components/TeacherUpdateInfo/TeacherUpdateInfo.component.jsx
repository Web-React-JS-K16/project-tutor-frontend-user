/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react'
import './TeacherUpdateInfo.style.scss'
import UpdateInfoUserComponent from 'components/common/UpdateInfoUser/UpdateInfoUser.component'

const TeacherUpdateInfoComponent = props => {
  console.log('reacher props: ', props)
  return <UpdateInfoUserComponent {...props} isTeacher />
}

export default TeacherUpdateInfoComponent
