/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react'
import { Form, Icon, Input, Button, Alert, Radio, DatePicker, Select, message } from 'antd'
import moment from 'moment'
import TagService from 'services/tag.service'
import DistrictService from 'services/district.service'
import CityService from 'services/city.service'

import LoadingIcon from '../LoadingIcon/LoadingIcon.component'
import './UpdateInfoUser.style.scss'

class UpdateInfoUserComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tagList: null,
      cityList: null,
      districtList: null,
      isFetching: true,
    }
  }

  componentDidMount = async () => {
    const {
      currentUser: { _id },
      getInfoInitial,
      // onUpdateInfoClear,
    } = this.props

    // onUpdateInfoClear()

    getInfoInitial(_id)
    await this.fetchData()
  }

  fetchData = async () => {
    const { isTeacher } = this.props
    console.log('props: ', this.props)
    // this.props.history.push('/')

    try {
      if (isTeacher) {
        const tagList = await TagService.getAllTag()
        this.setState({ tagList })
      }
      const cityList = await CityService.getAll()
      const districtList = await DistrictService.getAll()
      this.setState(
        {
          cityList,
          districtList,
        },
        () => {
          this.setState({ isFetching: false })
        }
      )
    } catch (err) {
      console.log('err: ', err.message)
      // this.props.history.push('/')
    }
  }

  handleSubmit = e => {
    const { form } = this.props
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // console.log()
        const {
          currentUser: { token },
          onUpdateInfo,
        } = this.props

        onUpdateInfo({ info: values, token })
      }
    })
  }

  validateBirthdate = (rule, value, callback) => {
    if (value) {
      const birthdateValue = new Date(value)
      const now = new Date(Date.now())
      birthdateValue.setHours(0)
      birthdateValue.setMinutes(0)
      birthdateValue.setSeconds(0)
      birthdateValue.setMilliseconds(0)
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0)
      now.setMilliseconds(0)

      if (birthdateValue >= now) {
        callback('Ngày sinh không hợp lệ.')
      }
    }
    callback()
  }

  validatePhoneNumber = (rule, value, callback) => {
    if (value) {
      const phoneRegex = /((09|03|07|08|05)+([0-9]{8,9})\b)/g
      if (!value.match(phoneRegex)) {
        callback('Số điện thoại không hợp lệ.')
      }
    }
    callback()
  }

  getMessage = content => {
    const { onUpdateInfoClear, updateInfo } = this.props
    if (updateInfo.isSuccess) {
      message.success(content || 'Thành công')
      onUpdateInfoClear()
    } else {
      message.error(updateInfo.message)
      onUpdateInfoClear()
    }
  }

  render() {
    const {
      isTeacher,
      currentUserUpdate,
      form: { getFieldDecorator },
      updateInfo: { isLoading, isSuccess },
      getInfo,
    } = this.props
    // const { isFetching, tagList, cityList, districtList } = this.state
    const { isFetching, tagList } = this.state
    if (isFetching) {
      return (
        <div className="user-update-info-loading">
          <LoadingIcon />
        </div>
      )
    }
    if (getInfo.isSuccess === false) {
      return (
        <div className="user-update-info">
          <Alert type="error" message={getInfo.message} />
        </div>
      )
    }

    if (currentUserUpdate) {
      const {
        displayName,
        phone,
        birthdate,
        gender,
        city,
        district,
        about,
        tags,
      } = currentUserUpdate
      const initalValueTag = tags ? tags.map(item => item._id._id) : []

      // eslint-disable-next-line no-underscore-dangle
      return (
        <div className="user-update-info">
          <Form onSubmit={this.handleSubmit} className="user-update-info-form">
            <div className="content-form">
              <div className="content-form__info">
                <div className="content-form__info--block">
                  <div className="content-form__info--block--title teacher-update-form__title">
                    Thông tin:
                  </div>

                  <Form.Item hasFeedback label="Tên hiển thị">
                    {getFieldDecorator('displayName', {
                      initialValue: displayName || '',
                      rules: [
                        { required: true, message: 'Vui lòng nhập tên' },
                        { min: 2, message: 'Tên phải từ 2 ký tự trở lên' },
                        { max: 20, message: 'Tên không được quá 20 ký tự' },
                      ],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Tên hiển thị"
                      />
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback label="Số điện thoại">
                    {getFieldDecorator('phone', {
                      initialValue: phone || '',
                      rules: [
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        {
                          validator: this.validatePhoneNumber,
                        },
                      ],
                    })(
                      <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Số điện thoại"
                      />
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback label="Ngày sinh">
                    {getFieldDecorator('birthdate', {
                      initialValue: moment(new Date(birthdate), 'DD/MM/YYYY') || '',
                      rules: [
                        { required: true, message: 'Vui lòng nhập ngày sinh' },
                        { validator: this.validateBirthdate },
                      ],
                    })(
                      <DatePicker
                        // value= '2019-12-02T10:24:52.738+00:00'
                        style={{ width: '100%' }}
                        placeholder="Chọn ngày sinh"
                        format="DD/MM/YYYY"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Giới tính">
                    {getFieldDecorator('gender', {
                      initialValue: gender || 'male',
                      rules: [{ required: true, message: 'Vui lòng chọn giới tính' }],
                    })(
                      <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </div>
                <div className="content-form__info--block">
                  <div className="content-form__info--block--title teacher-update-form__title">
                    Địa chỉ:
                  </div>
                  <Form.Item hasFeedback label="Thành phố/ tỉnh">
                    {getFieldDecorator('city', {
                      initialValue: city || '',
                    })(
                      <Input
                        prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Thành phố/ tỉnh"
                      />
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback label="Quận">
                    {getFieldDecorator('district', {
                      initialValue: district || '',
                    })(
                      <Input
                        // defaultValue={initalValueTag}
                        prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Quận"
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              {isTeacher && (
                <>
                  <div className="content-form__tag">
                    <div className="user-update-form__title">Kỹ năng: </div>
                    {tagList !== null ? (
                      <Form.Item hasFeedback>
                        {getFieldDecorator('tags', {
                          initialValue: initalValueTag,
                        })(
                          <Select mode="multiple" style={{ width: '100%' }}>
                            {tagList.map(item => (
                              <Select.Option value={item._id}>{item.name}</Select.Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    ) : (
                      <LoadingIcon />
                    )}
                  </div>

                  <div className="content-form__about">
                    <div className="user-update-form__title">Giới thiệu: </div>
                    <Form.Item>
                      {getFieldDecorator('about', {
                        initialValue: about || '',
                        rules: [
                          { min: 10, message: 'Tên phải từ 10 ký tự trở lên' },
                          { max: 300, message: 'Tối đa 300 ký tự' },
                        ],
                      })(
                        <Input.TextArea
                          className="about-input"
                          placeholder="Giới thiệu về bản thân"
                        />
                      )}
                    </Form.Item>
                  </div>
                </>
              )}
            </div>
            <div className="user-update-info-form__bottom">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-teacher-update-info"
                loading={isLoading}
              >
                Cập nhật thông tin
              </Button>
            </div>
          </Form>
          {!isLoading && isSuccess === false ? this.getMessage() : null}
          {!isLoading && isSuccess === true
            ? this.getMessage('Cập nhật thông tin thành công')
            : null}
        </div>
      )
    }
    return <div>...</div>
  }
}
export default Form.create({ name: 'UpdateInfoUserComponent' })(UpdateInfoUserComponent)

// const UpdateInfoUserComponent = ({
//   isTeacher,
//   currentUserUpdate, // current student or current teacher
//   currentUser,
//   form,
//   updateInfo: { isLoading, isSuccess },
//   updateInfo, // in order to get updateInfo.message, cannot using destructor because of component message of antd
//   getInfo,
//   onUpdateInfo,
//   onUpdateInfoClear,
//   getInfoInitial
// }) => {
//   const [tagList, setTagList] = useState(null)
//   const [cityList, setCityList] = useState(null)
//   const [districtList, setDistrictList] = useState(null)

//   useEffect(() => {
//     const { _id } = currentUser
//     getInfoInitial(_id)
//   }, [getInfoInitial, currentUser])

//   useEffect(() => {
//     onUpdateInfoClear()
//   }, [onUpdateInfoClear])

//   useEffect(() => {
//     async function fetchData() {
//       if (isTeacher) {
//         const allTag = await TagService.getAllTag()
//         const

//           // console.log("result: ", result);
//           setTagList(allTag)
//       }
//     }
//     fetchData()
//   }, [])

//   const handleSubmit = e => {
//     e.preventDefault()
//     form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values)
//         // console.log()
//         const { token } = currentUser;

//         onUpdateInfo({ info: values, token })
//       }
//     })
//   }

//   const validateBirthdate = (rule, value, callback) => {
//     if (value) {
//       const birthdateValue = new Date(value)
//       const now = new Date(Date.now())
//       birthdateValue.setHours(0)
//       birthdateValue.setMinutes(0)
//       birthdateValue.setSeconds(0)
//       birthdateValue.setMilliseconds(0)
//       now.setHours(0)
//       now.setMinutes(0)
//       now.setSeconds(0)
//       now.setMilliseconds(0)

//       if (birthdateValue >= now) {
//         callback('Ngày sinh không hợp lệ.')
//       }
//     }
//     callback()
//   }

//   const validatePhoneNumber = (rule, value, callback) => {
//     if (value) {
//       const phoneRegex = /((09|03|07|08|05)+([0-9]{8,9})\b)/g
//       if (!value.match(phoneRegex)) {
//         callback('Số điện thoại không hợp lệ.')
//       }
//     }
//     callback()
//   }

//   const getMessage = content => {
//     if (isSuccess) {
//       message.success(content || 'Thành công')
//       onUpdateInfoClear()
//     } else {
//       message.error(updateInfo.message)
//       onUpdateInfoClear()
//     }
//   }

//   const { getFieldDecorator } = form
//   if (getInfo.isLoading) {
//     return (
//       <div className="user-update-info-loading">
//         <LoadingIcon />
//       </div>
//     )
//   }
//   if (getInfo.isSuccess === false) {
//     return (
//       <div className="user-update-info">
//         <Alert type="error" message={getInfo.message} />
//       </div>
//     )
//   }

//   if (currentUserUpdate) {
//     const { displayName, phone, birthdate, gender, city, district, about, tags } = currentUserUpdate
//     const initalValueTag = tags ? tags.map(item => item._id._id) : []

//     // eslint-disable-next-line no-underscore-dangle
//     return (
//       <div className="user-update-info">
//         <Form onSubmit={handleSubmit} className="user-update-info-form">
//           <div className="content-form">
//             <div className="content-form__info">
//               <div className="content-form__info--block">
//                 <div className="content-form__info--block--title teacher-update-form__title">
//                   Thông tin:
//                 </div>

//                 <Form.Item hasFeedback label="Tên hiển thị">
//                   {getFieldDecorator('displayName', {
//                     initialValue: displayName || '',
//                     rules: [
//                       { required: true, message: 'Vui lòng nhập tên' },
//                       { min: 2, message: 'Tên phải từ 2 ký tự trở lên' },
//                       { max: 20, message: 'Tên không được quá 20 ký tự' },
//                     ],
//                   })(
//                     <Input
//                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                       placeholder="Tên hiển thị"
//                     />
//                   )}
//                 </Form.Item>
//                 <Form.Item hasFeedback label="Số điện thoại">
//                   {getFieldDecorator('phone', {
//                     initialValue: phone || '',
//                     rules: [
//                       { required: true, message: 'Vui lòng nhập số điện thoại' },
//                       {
//                         validator: validatePhoneNumber,
//                       },
//                     ],
//                   })(
//                     <Input
//                       prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                       placeholder="Số điện thoại"
//                     />
//                   )}
//                 </Form.Item>
//                 <Form.Item hasFeedback label="Ngày sinh">
//                   {getFieldDecorator('birthdate', {
//                     initialValue: moment(new Date(birthdate), 'DD/MM/YYYY') || '',
//                     rules: [
//                       { required: true, message: 'Vui lòng nhập ngày sinh' },
//                       { validator: validateBirthdate },
//                     ],
//                   })(
//                     <DatePicker
//                       // value= '2019-12-02T10:24:52.738+00:00'
//                       style={{ width: '100%' }}
//                       placeholder="Chọn ngày sinh"
//                       format="DD/MM/YYYY"
//                     />
//                   )}
//                 </Form.Item>
//                 <Form.Item label="Giới tính">
//                   {getFieldDecorator('gender', {
//                     initialValue: gender || 'male',
//                     rules: [{ required: true, message: 'Vui lòng chọn giới tính' }],
//                   })(
//                     <Radio.Group>
//                       <Radio value="male">Nam</Radio>
//                       <Radio value="female">Nữ</Radio>
//                     </Radio.Group>
//                   )}
//                 </Form.Item>
//               </div>
//               <div className="content-form__info--block">
//                 <div className="content-form__info--block--title teacher-update-form__title">
//                   Địa chỉ:
//                 </div>
//                 <Form.Item hasFeedback label="Thành phố/ tỉnh">
//                   {getFieldDecorator('city', {
//                     initialValue: city || '',
//                   })(
//                     <Input
//                       prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                       placeholder="Thành phố/ tỉnh"
//                     />
//                   )}
//                 </Form.Item>
//                 <Form.Item hasFeedback label="Quận">
//                   {getFieldDecorator('district', {
//                     initialValue: district || '',
//                   })(
//                     <Input
//                       // defaultValue={initalValueTag}
//                       prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                       placeholder="Quận"
//                     />
//                   )}
//                 </Form.Item>
//               </div>
//             </div>
//             {
//               isTeacher && (
//                 <>
//                   <div className="content-form__tag">
//                     <div className="user-update-form__title">Kỹ năng: </div>
//                     {tagList !== null ? (
//                       <Form.Item hasFeedback>
//                         {getFieldDecorator('tags', {
//                           initialValue: initalValueTag,
//                         })(
//                           <Select mode="multiple" style={{ width: '100%' }}>
//                             {tagList.map(item => (
//                               <Select.Option value={item._id}>{item.name}</Select.Option>
//                             ))}
//                           </Select>
//                         )}
//                       </Form.Item>
//                     ) : (
//                         <LoadingIcon />
//                       )}
//                   </div>

//                   <div className="content-form__about">
//                     <div className="user-update-form__title">Giới thiệu: </div>
//                     <Form.Item>
//                       {getFieldDecorator('about', {
//                         initialValue: about || '',
//                         rules: [
//                           { min: 10, message: 'Tên phải từ 10 ký tự trở lên' },
//                           { max: 300, message: 'Tối đa 300 ký tự' },
//                         ],
//                       })(<Input.TextArea className="about-input" placeholder="Giới thiệu về bản thân" />)}
//                     </Form.Item>
//                   </div>
//                 </>
//               )
//             }

//           </div>
//           <div className="user-update-info-form__bottom">
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="btn-teacher-update-info"
//               loading={isLoading}
//             >
//               Cập nhật thông tin
//             </Button>
//           </div>
//         </Form>
//         {!isLoading && isSuccess === false ? getMessage() : null}
//         {!isLoading && isSuccess === true ? getMessage('Cập nhật thông tin thành công') : null}
//       </div>
//     )
//   }
//   return <div>...</div>
// }

// export default Form.create({ name: 'UpdateInfoUserComponent' })(UpdateInfoUserComponent)
