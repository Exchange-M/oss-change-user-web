import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"

import Balance from '../../components/asset/balance'
import OrderComplete from '../../components/asset/orderComplete'
import OrderBook from '../../components/asset/orderbook'
import SubMenu from '../../components/submenu/common'

import { onSetHeaderTitle } from '../../state/modules/siteInfo'

import './css/asset.css'

let AssetContainer = ({history}) => {
  const { isLogin=false } = useSelector(state => ({
    isLogin: state.user.authentication.isLogin
  }))
  let title='거래내역'
  let tabs = ["assetBalance", "assetOrdercomplete", "assetOrderbook"]
  let tabKrConvert = {
    assetBalance: {kr: "보유자산", selected: "true"},
    assetOrdercomplete: {kr: "채결완료", selected:"false"},
    assetOrderbook: {kr: "미채결", selected: "false"},
  }

  let dispatch = useDispatch()

  useEffect(()=> {
    dispatch(onSetHeaderTitle({title: "거래내역"}))
  }, [])

  useEffect(() => {
    if(!isLogin) history.push('/user/signin');
  }, [])

  // useEffect(() => {
  //   if(!isLogin) history.push('/user/signin');
  // }, [isLogin])

  if (!localStorage.getItem('token')) {
    console.log('not token')
    history.push('/user/signin');
  }


  if (!isLogin && !localStorage.getItem('token')) {
    history.push('/user/signin');
  }

  return (
    <div id="asset">
      <SubMenu title={title} tabs={tabs} tabKrConvert={tabKrConvert}></SubMenu>
      
      <div className="tab-content" id="trade">
        <div className="tab-pane fade show active" id="assetBalance" role="tabpanel" aria-labelledby="balance-tab">
          <Balance />
        </div>
        <div className="tab-pane fade" id="assetOrdercomplete" role="tabpanel" aria-labelledby="ordercomplete-tab">
          <OrderComplete />
        </div>
        <div className="tab-pane fade" id="assetOrderbook" role="tabpanel" aria-labelledby="orderbook-tab">
          <OrderBook />
        </div>
      </div>
    </div>
  )
}

export default AssetContainer
