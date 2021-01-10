import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"

import Payment from '../../components/payment'

import { onSetHeaderTitle } from '../../state/modules/siteInfo'

import './css/payment.css'

let PaymentContainer = ({history}) => {
  const { isLogin=false, balances= {}, coinInfo={} } = useSelector(state => ({
    isLogin: state.user.authentication.isLogin,
    balances: state.user.balances,
    coinInfo: state.coins.coinImg,
  }))
  
  const [ isRender, setIsRender ] = useState(false)

  let dispatch = useDispatch()

  useEffect(() => {
    if(!isLogin) history.push('/user/signin');
  }, [isLogin])

  useEffect(() => {
    if(isLogin && balances && coinInfo) {
      dispatch(onSetHeaderTitle({title: "입/출금"}))
      setIsRender(true)
    }
  }, [isLogin, balances, coinInfo])
  
  // useEffect(() => {
  //   if(!isLogin) history.push('/user/signin');
  // }, [isLogin])
  
  if (!localStorage.getItem('token')) {
    history.push('/user/signin');
  }

  if (!isLogin && !localStorage.getItem('token')) {
    history.push('/user/signin');
  }
  
  if (!isRender) {
    return (
      <div id="payment" style={{padding: "20px"}}>
      
      </div>
    )
  }

  return (
    <div id="payment" style={{padding: "20px"}}>
      <Payment 
        balances={balances}
        coinInfo={coinInfo}
      />
    </div>
  )
}


export default PaymentContainer
