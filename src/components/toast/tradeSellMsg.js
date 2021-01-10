import React from 'react'


const ToastSellMsg = (props) => {
  return (
    <div className="toast-trade-sell-msg toast-item">
      <h3>채결완료</h3>
      <h4>코인: {props.code.split('-')[1]} </h4>
      <h4>수량: {props.coinAmount}{props.code.split('-')[1]}, 금액: {props.price}{props.code.split('-')[0]}</h4>
    </div>
  )
}

export default ToastSellMsg