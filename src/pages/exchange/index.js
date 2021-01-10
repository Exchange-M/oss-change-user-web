import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'

import ComplexOrder from '../../components/order/complexOrder'
import NormalOrder from '../../components/order/normalOrder'
import Orderbook from '../../components/orderbook'
import Trade from '../../components/trade'
import Submenu from '../../components/submenu/exchange'
import CoinList from '../../components/coinList'
import CoinDesc from '../../components/coinDesc'
import Chart from '../../components/chart'

import { onSetHeaderTitle } from '../../state/modules/siteInfo'

import './css/exchange.css'

function getQueryString(qs, k) {
  var params = {};
  qs.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params[k];
}

let Exchange = props => {
  let [tab, setTab] = useState(getQueryString(props.location, 'tab'))
  let [isDesktop] = useState(!['order','orderbook','chart','trade'].includes(tab))

  let { selectedMarket="KRW", selectedCoin="BTC", coinInfo } = useSelector(state=> ({
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin,
    coinInfo: state.coins.coinImg
  }))

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(onSetHeaderTitle({
      title: `${coinInfo[selectedCoin]? coinInfo[selectedCoin].name.kr: ''}(${selectedMarket}/${selectedCoin})`
    }))
  }, [coinInfo])

  return (

    <div id="exchange">
      {/* submenu는 모바일일 때 띄워진다. */}
      <Submenu tabClick={setTab} tab={tab}/>

      {/* 모바일 경우 */}
      {tab === 'order'? <ComplexOrder /> : ''}
      {tab === 'orderbook'? <Orderbook />: ''}
      {tab === 'chart'? <Chart height={`${window.innerHeight-218}px`}/>: ''}
      {tab === 'trade'? <Trade />: ''}
      {tab === 'info'? '': ''}

      {/* 데스크탑 */}
      {isDesktop 
        ? (
          <div id="exchange-d-layout">
            <div className="left">
              <CoinList />
            </div>
            <div className="right">
              <div className="">
                <CoinDesc />
              </div>
              <div className="">
                <Chart height={"100%"}/>
              </div>
              <div className="order">
                <Orderbook />
                <NormalOrder />
              </div>
              <div className="ticker">
                <Trade />
              </div>
            </div>
          </div>
        )
        : (<div></div>)
      }
    </div>
  )
}

export default Exchange