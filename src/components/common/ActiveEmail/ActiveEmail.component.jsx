/* eslint-disable react/forbid-prop-types */
/* eslint react/prop-types: 0 */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const ActiveEmailComponent = ({ match, activeEmail }) => {
  useEffect(() => {
    console.log('match: ', match)
    const {
      params: { token },
    } = match
    activeEmail(token)
  }, [match, activeEmail])

  return <div className="" />
}

AuthenWithGoogleComponent.propTypes = {
  match: PropTypes.object,
  activeEmail: PropTypes.func,
}

export default ActiveEmailComponent
