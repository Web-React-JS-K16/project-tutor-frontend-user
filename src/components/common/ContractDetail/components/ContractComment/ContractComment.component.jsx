import React, { useState } from 'react'
import { Button, Input, Rate, Tag } from 'antd'
import { TEACHER, CONTRACT_TYPES } from 'utils/constant'
import * as moment from 'moment'

import './ContractComment.style.scss'

const ContractCommentComponnet = ({
  student: { avatar, displayName, typeID },
  contract: { comment, status },
  onHandleComment,
  loading,
}) => {
  const [ratingValue, setRatingValue] = useState(5)

  const handleSubmit = () => {
    // eslint-disable-next-line no-undef
    const commentValue = document.getElementById('contract-comment').value
    // console.log('value: ', comment)
    // console.log('rate: ', rating)
    onHandleComment({ comment: commentValue, rating: ratingValue })
  }
  return (
    <div className="contract-comment">
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
            {comment && comment.date ? (
              moment(comment.date).format('DD/MM/YYYY HH:mm')
            ) : (
              <i>(Trống)</i>
            )}
          </div>
        </div>
      </div>
      <div className="contract-comment__rating">
        <Rate
          allowHalf
          defaultValue={(comment && comment.ratings) || 0}
          onChange={value => setRatingValue(value)}
        />
      </div>
      <Input.TextArea
        id="contract-comment"
        disabled={typeID === TEACHER}
        rows={4}
        defaultValue={
          status === CONTRACT_TYPES.IS_VALID
            ? 'Bạn sẽ được đánh giá khi kết thúc hợp đồng'
            : (comment && comment.content) || ''
        }
      />
      <div className="contract-comment__btn">
        <Button
          htmlType="button"
          disabled={typeID === TEACHER || status === CONTRACT_TYPES.IS_VALID}
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
