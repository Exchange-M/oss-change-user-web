import React from 'react'

const ToastOrderMsg = (props) => {
  return (
    <div className="toast-order-msg toast-item">
      <h3>주문완료</h3>
      <h4>코인: {props.code.split('-')[1]} </h4>
      <h4>수량: {props.coinAmount}{props.code.split('-')[1]}, 금액: {props.price}{props.code.split('-')[0]}</h4>
    </div>
  )
}

export default ToastOrderMsg