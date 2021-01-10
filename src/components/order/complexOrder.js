import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { onSetOrderbook } from '../../state/modules/orderbook'
import { onSetAmount, onSetPrice, onSetOrdertype } from '../../state/modules/order'
import { onOpen } from '../../state/modules/modals'

import { orderBuyReg, orderSellReg} from '../../apis/order'

import useDeltaPrice from '../../hooks/price'

import { amountCommas } from '../../utils/regExp'
import { NumberText } from '../atomic/input'

import './css/order.css'

const MAX_SIZE = 15

const EmptyOrder = props => {
  const [empty_orders, set_empty_orders] = useState([
    [],
    [0],
    [0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])

  const { orderbook, selectedMarket="KRW", selectedCoin="BTC" } = useSelector(state => ({
    orderbook: state.orderbook,
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin,
    
  }))

  if (props.orderType === 'sell' || props.orderType === 'ask') return (
    <tbody>
      {empty_orders[MAX_SIZE - orderbook.orderbook_units.length] && empty_orders[MAX_SIZE - orderbook.orderbook_units.length].map((item, idx) => (
        <tr key={`sell-${idx}`}>
          <td className="quotes-blue" style={{fontSize: "11px"}}> 0 </td>
          <td className="quotes-blue-center" style={{fontSize: "14px"}}> 0 </td>
        </tr>
      ))}
    </tbody>
  )
  else if (props.orderType === 'buy' || props.orderType === 'bid') return (
    <tbody>
      {empty_orders[MAX_SIZE - orderbook.orderbook_units.length] && empty_orders[MAX_SIZE - orderbook.orderbook_units.length].map((item, idx) => (
        <tr key={`buy-${idx}`}>
          <td className="quotes-red" style={{fontSize: "11px"}}> 0</td>
          <td className="quotes-red-center" style={{fontSize: "14px"}}>  0</td>
        </tr>
      ))}
    </tbody>
  )
}

const ComplexOrder = (props) => {
  let dispatch = useDispatch()
  let scrollTableDom = useRef()
  let [ scrollHeight, setScrollHeight ] = useState(window.innerHeight)

  let { orderbook, balances={}, selectedMarket="KRW", selectedCoin="BTC", orderPrice, orderAmount, orderType } = useSelector(state => ({
    orderbook: state.orderbook,
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin,
    orderType: state.order.type,
    orderPrice: state.order.price,
    orderAmount: state.order.amount,
    balances: state.user.balances
  }))
  let [ deltaPrice ] = useDeltaPrice()

  useEffect(() => {
    if (window.innerHeight && orderbook.orderbook_units.length && scrollTableDom) {
      setScrollHeight(window.innerHeight - 153)
      scrollTableDom.current.scrollTop = scrollTableDom.current.offsetHeight - 170
      
    }
  }, [scrollHeight, orderbook, scrollTableDom])

  useEffect(() => {
    if (selectedMarket && selectedCoin) {
      dispatch(onSetOrderbook(`${selectedMarket}-${selectedCoin}`))
    }
  }, [selectedMarket, selectedCoin])

  const priceChange = e => {
    let price = e.target.value || 0
    if (!isFinite(price)) return
    price = price.toString()
    
    if (price !== '0' && !price.includes('.')) {
      price = price.replace(/^0+/,'')
    }
    
    dispatch(onSetPrice(price))
  }
  
  const amountChange = e => {
    let amount = e.target.value || 0
    if (!isFinite(amount)) return
    amount = amount.toString()

    if (amount !== '0' &&  !amount.includes('.')) {
      amount = amount.replace(/^0+/,'')
    }

    dispatch(onSetAmount(amount))
  }

  const tabChange = orderType => {
    dispatch(onSetOrdertype(orderType))
  }
  const buyBtnClick = async () => {
    let [data, errorMsg] = await orderBuyReg({
      market: selectedMarket, 
      coinTicker: selectedCoin, 
      price: parseFloat(orderPrice), 
      coinAmount: parseFloat(orderAmount)
    }, localStorage.getItem('token'))

    if (errorMsg) {
      dispatch(onOpen({
        title: errorMsg.TITLE,
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }

    dispatch(onOpen({
      title: '주문완료',
      body: '구매(매수) 주문이 정상적으로 등록됬습니다',
      errorCode: false,
      okMsg: '확인',
      cancelMsg: '취소'
    }))
  }
  
  const sellBtnClick = async () => {
    let [data, errorMsg] = await orderSellReg({
      market: selectedMarket, 
      coinTicker: selectedCoin, 
      price: parseFloat(orderPrice), 
      coinAmount: parseFloat(orderAmount)
    }, localStorage.getItem('token'))

    if (errorMsg) {
      dispatch(onOpen({
        title: errorMsg.TITLE,
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }

    dispatch(onOpen({
      title: '주문완료',
      body: '판매(매도) 주문이 정상적으로 등록됬습니다',
      errorCode: false,
      okMsg: '확인',
      cancelMsg: '취소'
    }))
  }

  const priceInCreaseHandle = () => {
    let a = orderPrice + deltaPrice
    dispatch(onSetPrice(parseFloat(a.toFixed(8))))
  }
  const priceDeCreaseHandle = () => {
    let a = orderPrice - deltaPrice
    dispatch(onSetPrice(parseFloat(a.toFixed(8))))
  }

  return (
    <div id="complex-order" >
      <div className="d-flex m-0">
        <div className="flex-fill p-0 position-relative scroll" ref={scrollTableDom} style={{ overflowX: 'hidden', overflowY: 'scroll',  height: `${scrollHeight}px`}}>
          <div className="order-quotes-wrap" >
            <table className="quotes-table" cellSpacing="0" cellPadding="0" >
              <EmptyOrder orderType="sell"/>

              <tbody className="askprice">
                {orderbook.orderbook_units.map((order, idx) => (
                  <tr key={`sell-${idx}`}>
                    <td className="quotes-blue" style={{fontSize: "11px"}} onClick={() => dispatch(onSetAmount(orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_size))}> <NumberText value={orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_size} /> </td>
                    <td className="quotes-blue-center" style={{fontSize: "14px"}} onClick={() => dispatch(onSetPrice(orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_price))}> <NumberText value={orderbook.orderbook_units[orderbook.orderbook_units.length - idx - 1].ask_price} /> </td>
                  </tr>
                ))}

                {orderbook.orderbook_units.map((order, idx) => (
                  <tr key={`buy-${idx}`}>
                    <td className="quotes-red" style={{fontSize: "11px"}} onClick={() => dispatch(onSetAmount(order.bid_size))}> <NumberText value={order.bid_size} /></td>
                    <td className="quotes-red-center" style={{fontSize: "14px"}} onClick={() => dispatch(onSetPrice(order.bid_price))}> <NumberText value={order.bid_price} /> </td>
                  </tr>
                ))}
              </tbody>

              <EmptyOrder orderType="buy"/>
            </table>

          </div>
        </div>
        
        <div className="flex-fill p-0">
          <nav>
            <div className="nav nav-tabs tab-col2" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active cart-buy" onClick={() => dispatch(onSetOrdertype('buy'))} data-toggle="tab" href="#order-buy" role="tab" aria-controls="home" aria-selected="true">매수</a>
              <a className="nav-item nav-link cart-sell" onClick={() => dispatch(onSetOrdertype('sell'))} id="nav-profile-tab" data-toggle="tab" href="#order-sell" role="tab" aria-controls="nav-profile" aria-selected="false">매도</a>
            </div>
          </nav>

          <div className="tab-content" id="myTabContent">
            
            <div className="tab-pane show active pl-2 pr-2 h-100 font10" id="order-buy" role="tabpanel" aria-labelledby="nav-buy-tab">
              <label className="mt-1 mb-0 text-muted">사용가능 금액</label>
              <p className="m-0 p-0 font13">
                <NumberText value={balances[selectedMarket] && balances[selectedMarket].availableBalance || 0.0} />  {selectedMarket} 
              </p>
              <label className="mt-1 mb-0 text-muted" htmlFor="basic-url">구매량</label>
              <div className="input-group input-group-sm">
                <input type="text" className="form-control" value={orderAmount} onChange={amountChange} placeholder="0.0" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">최대</button>
                </div>
              </div>
              <label className="mt-1 mb-0 text-muted" htmlFor="basic-url">구매가({selectedMarket})</label>
              <div className="input-group input-group-sm ">
                <input type="text" className="form-control" value={orderPrice} onChange={priceChange} placeholder="0.0" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={priceDeCreaseHandle}>-</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={priceInCreaseHandle}>+</button>
                </div>
              </div>
              <label className="mt-1 mb-0 text-muted" htmlFor="basic-url">총 구매가격</label>
              <div className="input-group input-group-sm">
                <input type="text" className="form-control" value={amountCommas(orderPrice * orderAmount)} placeholder="0.0" disabled="true" />
                <div className="input-group-append">
                  <span className="input-group-text">원</span>
                </div>
              </div>
              <label className="text-muted">수수료 : 대기주문(0.08%),즉시체결(0.2%)</label>
              <br></br>
              <label>주문총액</label>
              <div className="alert bg-light p-2 m-0" role="alert">
                <strong className="text-danger  display1"> <NumberText value={orderAmount} /> <span className="text-muted font10">{selectedCoin}</span></strong>
              </div>
              <button type="submit" className="btn btn-danger btn-block btn-sm mt-3" onClick={buyBtnClick}>매수</button>
            </div>
            
            <div className="tab-pane fade  pl-2 pr-2 h-100 font10" id="order-sell" role="tabpanel">
              <label className="mt-1 mb-0 text-muted">사용가능 코인</label>
              <p className="m-0 p-0 font13">
                <NumberText value={balances[selectedCoin] && balances[selectedCoin].availableBalance || 0.0} /> {selectedCoin} 
              </p>
              <label className="mt-1 mb-0 text-muted" htmlFor="basic-url">판매량</label>
              <div className="input-group input-group-sm ">
                <input type="text" className="form-control" value={orderAmount} onChange={amountChange} placeholder="0.0" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">최대</button>
                </div>
              </div>
              <label className="mt-1 mb-0 text-muted" htmlFor="basic-url">판매가({selectedMarket})</label>
              <div className="input-group input-group-sm ">
                <input type="text" className="form-control" value={orderPrice} onChange={priceChange} placeholder="0.0" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">-</button>
                  <button className="btn btn-outline-secondary" type="button">+</button>
                </div>
              </div>
              <label className="mt-1 mb-0 text-muted" htmlFor="basic-url">총 판매가격</label>
              <div className="input-group input-group-sm">
                <input type="text" className="form-control" value={amountCommas(orderAmount * orderPrice)} placeholder="0.0" disabled="true" disabled={true}/>
                <div className="input-group-append">
                  <span className="input-group-text">원</span>
                </div>
              </div>
              <label className="text-muted">수수료 : 대기주문(0.08%),즉시체결(0.2%)</label>
              <br></br>
              <label>주문총액</label>
              <div className="alert bg-light p-2 m-0" role="alert">
                <strong className="text-primary  display1"> <NumberText value={orderAmount} />  <span className="text-muted font10">{selectedCoin}</span></strong>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-sm mt-3" onClick={sellBtnClick}>매도</button>
            </div>
            
            {/* <div className="tab-pane fade" id="history-ing" role="tabpanel">
              <div style={{ overflowX: "scroll", overfloY: "scroll", maxHeight: '70%', maxWidth: "55%" }} className="position-fixed table-responsive">
                <table id="trade-history" className="table table-striped   mb-3 text-center text-nowrap dotum  ">
                  <thead>
                    <tr>
                      <th scope="col" className="border-top-0">주문</th>
                      <th scope="col" className="border-top-0">주문시간</th>
                      <th scope="col" className="border-top-0">주문가</th>
                      <th scope="col" className="border-top-0">주문량</th>
                      <th scope="col" className="border-top-0">체결시간</th>
                      <th scope="col" className="border-top-0">수수료</th>
                      <th scope="col" className="border-top-0">체결량</th>
                      <th scope="col" className="border-top-0">체결가(평균)</th>
                      <th scope="col" className="border-top-0">체결총액(평균)</th>
                      <th scope="col" className="border-top-0">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="10" className="text-center"> 미체결 주문 내역이 없습니다.</td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="sell_11">
                      <td><b>매도</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                    <tr id="buy_11">
                      <td><b>매수</b> </td>
                      <td className="text-muted">2018-06-25 <em>13:31:30 </em></td>
                      <td>6,981,000 </td>
                      <td>0.00320000</td>
                      <td> </td>
                      <td>45</td>
                      <td> 0.00320000</td>
                      <td>6,981,000 </td>
                      <td>22,339	</td>
                      <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
         
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplexOrder