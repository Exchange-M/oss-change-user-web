import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ToastOrderMsg from './orderMsg'
import ToastBuyMsg from './tradeBuyMsg'
import ToastSellMsg from './tradeSellMsg'

import { removeToastMsg } from '../../state/modules/toast'

import './css/toast.css'
/*
toast 메시지
{
  'price': str_from_decimal(trade_order['trade_price']), 
  'coinAmount': str_from_decimal(trade_order['trade_qty']),
  'orderType': trade_order_type,
  'userId': trade_order['user_id'],
  'code': code,
  'type': 'match'
}
{
  'price': str_from_decimal(trade_order['trade_price']), 
  'coinAmount': str_from_decimal(trade_order['trade_qty']),
  'orderType': trade_order_type,
  'userId': trade_order['user_id'],
  'code': code,
  'type': 'order'
}
*/

const Toast = (props) => {

  let { msgs=[] } = useSelector(s => ({
    msgs: s.toast.msgs
  }))

  let dispatch = useDispatch()
  


  useEffect(() => {
    let tId = setInterval(() => {
      dispatch(removeToastMsg())
    }, 3000)

    return () => clearInterval(tId)
  }, [])

  return (
    <div id="toast-messages">
      {
        msgs.map((msg, idx) => (
          <div>
          {
            msg['type'] === 'order' ? (<ToastOrderMsg price={msg.price} coinAmount={msg.coinAmount} code={msg.code}/>) :
            msg['type'] === 'match' && (msg['orderType'] === 'buy' || msg['orderType'] === 'BUY') ? (<ToastBuyMsg price={msg.price} coinAmount={msg.coinAmount} code={msg.code}/>) :
            (<ToastSellMsg price={msg.price} coinAmount={msg.coinAmount} code={msg.code}/>) 
          }
          </div>
        ))
      }
      
    </div>
  )
}

export default Toast