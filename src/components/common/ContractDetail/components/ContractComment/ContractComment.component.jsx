import React, { useState } from 'react'
import { Button, Input, Rate } from 'antd'
import { TEACHER } from 'utils/constant'
import './ContractComment.style.scss'

const ContractCommentComponnet = ({
  student: { avatar, displayName, typeID },
  contract: { comment, rating },
  onHandleComment,
  loading,
}) => {
  const [ratingValue, setRatingValue] = useState(5)

  const handleSubmit = () => {
    // eslint-disable-next-line no-undef
    const commentValue = document.getElementById('contract-comment').value
    console.log('value: ', comment)
    console.log('rate: ', rating)
    onHandleComment({ comment: commentValue, rating: ratingValue })
  }

  return (
    <div className="contract-comment">
      <div className="contract-comment__avatar">
        <div className="img">
          <img src={avatar} alt={displayName} />
        </div>
        <div className="name">{displayName}</div>
      </div>
      <Rate allowHalf defaultValue={rating || 5} onChange={value => setRatingValue(value)} />
      <Input.TextArea
        id="contract-comment"
        disabled={typeID === TEACHER}
        rows={4}
        defaultValue={comment || ''}
      />
      <Button
        htmlType="button"
        disabled={typeID === TEACHER}
        loading={loading}
        onClick={handleSubmit}
        type="primary"
      >
        Đánh giá
      </Button>
    </div>
    // <Comment
    //   avatar={

    //   }
    //   content={
    //     <div>

    //     </div>
    //   }
    // />
  )
}

export default ContractCommentComponnet
