import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getRate, getPercent } from '../../utils/compare'
import { NumberText } from '../../components/atomic/input'

import { onSetOrderbook } from '../../state/modules/orderbook'
import { onSetPrice, onSetAmount } from '../../state/modules/order'

import EmptyOrder from './emptyOrder'

import './css/orderbook.css'

const isCheck = (com1, com2) => {
  return com1 == com2? 'check-black': ''
}

const OrderBook = (props) => {

  const { selectedMarket = "KRW", selectedCoin = "BTC", orderbook, tickers, orderCompletes } = useSelector(state => ({
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin,
    orderbook: state.orderbook,
    orderCompletes: state.history.orderCompletes,
    tickers: state.tickers.tickers
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    // set scroll middle focus 
    let ob = document.getElementById('scroll')
    setTimeout(() => {
      ob.scrollTo(0, 300)
    }, 1000)
  }, [])

  useEffect(() => {
    // set scroll middle focus 
    if (selectedMarket && selectedCoin) {
      dispatch(onSetOrderbook(`${selectedMarket}-${selectedCoin}`))
    }
    let ob = document.getElementById('scroll')
    setTimeout(() => {
      ob.scrollTo(0, 300)
    }, 300)
  }, [selectedMarket, selectedCoin])


  return (
    <div id="orderbook" >
      <span className="askpriceC">
        <div className="scrollB" id="scroll" >
          <div className="SellHoga">
            <ul className="askprice Type02">
              <EmptyOrder orderType="sell" />

              {tickers[`${selectedMarket}-${selectedCoin}`] && orderbook && orderbook.orderbook_units.map((order, idx) => (
                // orderbook.orderbook_units[orderbook.orderbook_units.length - idx -1]
                <li className="downB" key={`sell-${idx}`} >
                  <a >
                    <span className="bar" onClick={() => dispatch(onSetAmount(orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_size))}>
                      <div className="tick" style={{ width: `${getPercent(orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_size, orderbook.total_ask_size)}%` }}>
                      </div>
                      <span className="num">
                        <p><NumberText value={orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_size} /></p>
                        
                      </span>
                      <span>
                      </span>
                    </span>
                    <span 
                      className={`order sell-hover ${
                        isCheck(tickers[`${selectedMarket}-${selectedCoin}`]['trade_price'], orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_price)
                      }`} 
                      onClick={() => dispatch(onSetPrice(orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_price))}
                    >
                      <div className="red">
                        <strong className="font-weight-bold" style={{display: "block"}}><NumberText value={orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_price} /> </strong>
                        <i><NumberText value={getRate(tickers[`${selectedMarket}-${selectedCoin}`].prev_closing_price, orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_price)} />%</i>
                      </div>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="Hogaprice">
              <li className="list01">
                <div className="box">
                  <p className="info">
                    <span className="title">거래량</span>
                    <span className="price"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].acc_trade_volume_24h} /> {selectedCoin}</span>
                  </p>
                  <p className="info">
                    <span className="title">거래금</span>
                    <span className="price"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].acc_trade_price_24h} /> 백만원</span>
                  </p>
                  <p className="disc">
                    <span>(최근24시간)</span>
                  </p>
                </div>
              </li>
              <li className="list02">
                <div className="box">
                  <p className="info">
                    <span className="title">52주최고</span>
                    <span className="price up"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].highest_52_week_price} /></span>
                  </p>
                  <p className="disc">
                    <span>({tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].highest_52_week_date})</span>
                  </p>
                  <p className="info">
                    <span className="title">52주최저</span>
                    <span className="price down"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].lowest_52_week_price} /></span>
                  </p>
                  <p className="disc">
                    <span>({tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].highest_52_week_date})</span>
                  </p>
                </div>
              </li>
              <li className="list03">
                <div className="box">
                  <p className="info">
                    <span className="title">전일종가</span>
                    <span className="price"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].prev_closing_price} /></span>
                  </p>
                  <p className="info">
                    <span className="title">당일고가</span>
                    <span className="price up"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].high_price} /></span>
                  </p>
                  <p className="disc">
                    <span className="order up">+<NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && getRate(tickers[`${selectedMarket}-${selectedCoin}`].trade_price, tickers[`${selectedMarket}-${selectedCoin}`].high_price)}/> </span>
                  </p>
                  <p className="info">
                    <span className="title">당일저가</span>
                    <span className="price down"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && tickers[`${selectedMarket}-${selectedCoin}`].low_price} /></span>
                  </p>
                  <p className="disc">
                    <span className="order down">-<NumberText value={tickers[`${selectedMarket}-${selectedCoin}`] && getRate(tickers[`${selectedMarket}-${selectedCoin}`].trade_price, tickers[`${selectedMarket}-${selectedCoin}`].low_price)} /></span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="BuyHoga">
            <ul className="HogaAccept">
              <li className="header">
                <p>
                  <span className="label">체결강도</span>
                  <span className="txt">+64.62%</span>
                </p>
              </li>
              <li className="headerlabel">
                <p>
                  <span className="labelL">체결가</span>
                  <span className="labelR">체결량</span>
                </p>
              </li>
              {orderCompletes.map((trade, idx) => (
                <li className="list" key={idx}>
                    <p>
                      <span className="labelL"><NumberText value={trade.trade_price} /></span>
                      <span className={`labelR ${trade.ask_bid || trade.sellOrBuy}`}><NumberText value={trade.trade_volume} /></span>
                    </p>
                </li>
              ))}
            </ul>
            <ul className="askprice Type01">
              {tickers[`${selectedMarket}-${selectedCoin}`] && orderbook && orderbook.orderbook_units.map((order, idx) => (
                // orderbook.orderbook_units[orderbook.orderbook_units.length - idx -1]
                <li className="upB" key={`buy-${idx}`} onClick={(e) => {console.log(e.target)}}>
                  <a >
                    <span 
                      className={`order buy-hover ${
                        isCheck(tickers[`${selectedMarket}-${selectedCoin}`]['trade_price'],  order.bid_price)
                      }`} 
                      onClick={() => dispatch(onSetPrice(order.bid_price))}
                    >
                      <div className="blue">
                        <strong className="font-weight-bold" style={{display: 'block'}}><NumberText value={order.bid_price} /></strong>
                        <i><NumberText value={getRate(tickers[`${selectedMarket}-${selectedCoin}`].prev_closing_price, order.bid_price)} />%</i>
                      </div>
                    </span>
                    <span className="bar" onClick={() => dispatch(onSetAmount(order.bid_size))}>
                      <div className="tick" style={{ width: `${getPercent(order.bid_size, orderbook.total_bid_size)}%` }}>
                      </div>
                      <span className="num">
                        <p><NumberText value={order.bid_size} /></p>
                      </span>
                      <span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <EmptyOrder orderType="buy" />
            </ul>
          </div>
        </div>
        <table className="total">
          <tbody>
            <tr>
              <td>
                <div className="box side">
                  <p className="rAlign"><NumberText value={orderbook.total_ask_size} /></p>
                </div>
              </td>
              <td>
                <div className="Select">
                  <a className="SelectBt" href="#">수량
                    <em>({selectedCoin})</em>
                  </a>
                </div>
              </td>
              <td>
                <div className="box side">
                  <p className="lAlign"><NumberText value={orderbook.total_bid_size} /></p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </span>
      <div style={{ clear: 'both' }}></div>
    </div>
  )
}

export default OrderBook