import React, { useState, useEffect } from 'react'
import { Button, Input, Rate, Tag } from 'antd'
import { TEACHER, CONTRACT_TYPES } from 'utils/constant'
import * as moment from 'moment'

import './ContractComment.style.scss'

// update rating for contract
const ContractCommentComponnet = ({
  student: { avatar, displayName },
  contract,
  onHandleComment,
  loading,
  typeID,
}) => {
  const { comment, status } = contract
  const [ratingValue, setRatingValue] = useState(comment && comment.ratings ? comment.ratings : 0)
  const [content, setContent] = useState(
    comment && comment.content ? comment.content : 'Chưa có đánh giá'
  )

  useEffect(() => {
    // const { comment } = contract
    if (comment && comment.ratings) {
      // console.log('1.1 on change rating incommnet')

      setRatingValue(comment.ratings)
    }

    if (comment && comment.content) {
      setContent(comment.content)
    }
  }, [contract, comment])

  const handleSubmit = () => {
    // eslint-disable-next-line no-undef
    onHandleComment({ content, ratings: ratingValue })
  }
  return (
    <div className="contract-comment">
      <div className="contract-comment__title">Đánh giá của học sinh: </div>

      <div className="contract-comment__avatar">
        <div className="img">
          <img src={avatar} alt={displayName} />
        </div>
        <div className="name-time">
          <div className="name">
            <span>{displayName}</span>
            <Tag color="green">Học sinh</Tag>
          </div>
          <div className="time">
            {comment && comment.date && moment(comment.date).format('DD/MM/YYYY HH:mm')}
          </div>
        </div>
      </div>
      <div className="contract-comment__rating">
        <Rate allowHalf value={ratingValue} onChange={value => setRatingValue(value)} />
      </div>
      <Input.TextArea
        id="contract-comment"
        disabled={typeID === TEACHER}
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="contract-comment__btn">
        <Button
          htmlType="button"
          disabled={
            typeID === TEACHER ||
            status === CONTRACT_TYPES.IS_VALID ||
            status === CONTRACT_TYPES.WAIT_FOR_ACCEPTANCE ||
            status === CONTRACT_TYPES.WAIT_FOR_PAYMENT
          }
          loading={loading}
          onClick={handleSubmit}
          type="primary"
        >
          Đánh giá
        </Button>
      </div>
    </div>
  )
}

export default ContractCommentComponnet
