// /* eslint-disable react/prop-types */

// import React, { useState, useEffect } from 'react'
// import { Form, Icon, Input, Button, Alert } from 'antd'
// import './ChangePassword.style.scss'

// const ContractDetailComponent = ({
//   currentUser: { token },
//   form,
//   changePassword: { isLoading, isSuccess, message },
//   onChangePassword,
//   clearChangePassword,
// }) => {
//   useEffect(() => {
//     clearChangePassword()
//   }, [clearChangePassword])

//   const handleSubmit = e => {
//     e.preventDefault()
//     form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values)
//         const { oldPassword, password } = values
//         onChangePassword({ oldPassword, password, token })
//         form.resetFields()
//       }
//     })
//   }

//   const [confirmDirty, setConfirmDirty] = useState(0)

//   const handleBlurConfirmPassword = e => {
//     const { value } = e.target
//     setConfirmDirty(confirmDirty || !!value)
//   }

//   const validateToNextPassword = (rule, value, callback) => {
//     if (value && confirmDirty) {
//       form.validateFields(['confirmedPassword'], { force: true })
//     }
//     callback()
//   }

//   const compareToFirstPassword = (rule, value, callback) => {
//     if (value && value !== form.getFieldValue('password')) {
//       callback('Mật khẩu không khớp. Vui lòng nhập lại.')
//     } else {
//       callback()
//     }
//   }

//   const { getFieldDecorator } = form

//   return (
//     <div className="change-password-component">

//     </div>
//   )
// }

// export default ContractDetailComponent
