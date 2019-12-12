/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import UpdateInfoUserComponent from 'components/common/UpdateInfoUser/UpdateInfoUser.component'
import './StudentUpdateInfo.style.scss'

const StudentUpdateInfoComponent = ({ currentUser, getInfoInitial, ...props }) => {
  useEffect(() => {
    getInfoInitial(currentUser.token)
  }, [getInfoInitial, currentUser])

  return <UpdateInfoUserComponent currentUser={currentUser} {...props} />
}

export default StudentUpdateInfoComponent
