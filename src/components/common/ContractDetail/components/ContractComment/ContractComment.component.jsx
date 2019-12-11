import React, { useState } from 'react'
import { Comment, Avatar, Form, Button, Input } from 'antd'

const ContractCommentComponnet = () => {
  const [value, setValue] = useState(null)
  const handleSubmit = () => {
    // TODO:
    // if (!value) {
    // }
  }
  const handleChange = e => {
    setValue(e.value)
  }

  return (
    <Comment
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <div>
          <Form.Item>
            <Input.TextArea rows={4} onChange={handleChange} value={value} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={false} onClick={handleSubmit} type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </div>
      }
    />
  )
}

export default ContractCommentComponnet
