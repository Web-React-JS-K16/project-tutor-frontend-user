/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import './TeacherUpdateInfo.style.scss'
import UpdateInfoUserComponent from 'components/common/UpdateInfoUser/UpdateInfoUser.component'

const TeacherUpdateInfoComponent = ({ currentUser, getInfoInitial, ...props }) => {
  useEffect(() => {
    getInfoInitial(currentUser._id)
  }, [getInfoInitial, currentUser])
  // console.log('teacher props: ', props)
  return <UpdateInfoUserComponent currentUser={currentUser} {...props} isTeacher />
}

export default TeacherUpdateInfoComponent
