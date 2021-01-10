import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import { NumberText } from '../../atomic/input'
import { getClassByState } from '../../../utils/compare'
import './css/exchange.css'

const TabItem = props => (
  <li>
    <Link 
      to={`/exchange?tab=${props.tab}`} 
      onClick={() => props.tabClick(props.tab)} 
      className={props.tab === props.currentTab ? 'active': ''}
    >{props.convert[props.tab]}</Link>
  </li>
)

let ExchangeSubmenu = (props) => {
  
  let { coinInfo={}, tickers={}, selectedMarket="KRW", selectedCoin="BTC" } = useSelector(state => ({
    coinInfo: state.coins.coinImg,
    tickers: state.tickers.tickers,
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin,
  }) )

  let tabs = [
    "order",
    "orderbook",
    "chart",
    "trade",
    // "info",
  ]
  let convert = {
    order: "주문",
    orderbook: "호가",
    chart: "차트",
    trade: "시세",
    // info: "정보",
  }
  if(!tickers[`${selectedMarket}-${selectedCoin}`]) {
    return (<></>)
  }
  return (
    <div id="exchange-submenu" className="bg-white">
      <span className="down coinInfo">
        <div className="priceInfo">
          <div className="price text-status-rise">
            <strong>
              <NumberText value={tickers[`${selectedMarket}-${selectedCoin}`]? tickers[`${selectedMarket}-${selectedCoin}`].trade_price: 0} />
            </strong>
          </div>
          <div className="netChange">
            <span className="text">전일대비</span>
            <span className={getClassByState(tickers[`${selectedMarket}-${selectedCoin}`].change_state || tickers[`${selectedMarket}-${selectedCoin}`].change)}> <NumberText value={tickers[`${selectedMarket}-${selectedCoin}`].change_rate} />%</span>
            <span className={getClassByState(tickers[`${selectedMarket}-${selectedCoin}`].change_state || tickers[`${selectedMarket}-${selectedCoin}`].change)}> <NumberText value={tickers[`${selectedMarket}-${selectedCoin}`].change_price} /></span>
          </div>
        </div>
        <div className="graph">
        </div>
      </span>
      <span className="lnb">
        <ul>
          {
            tabs.map((tab, tabIdx) => (
              <TabItem 
                key={tab}
                tabClick={props.tabClick} 
                tab={tab} 
                currentTab={props.tab}
                convert={convert}
              />
            ))
          }
        </ul>
      </span>
    </div>
  )
}

export default ExchangeSubmenu
