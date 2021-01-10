import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { onSetAmount, onSetPrice, onSetOrdertype } from '../../state/modules/order'
import { onOpen } from '../../state/modules/modals'
import { orderBuyReg, orderSellReg} from '../../apis/order'

import useDeltaPrice from '../../hooks/price'

import { amountCommas } from '../../utils/regExp'

import { NumberText } from '../atomic/input'

import './css/order.css'

let NormalOrder = (props) => {
  let {orderType='buy', balances={}, orderPrice, orderAmount, selectedMarket='KRW', selectedCoin="BTC"} = useSelector(state => ({
    orderType: state.order.type,
    orderPrice: state.order.price,
    orderAmount: state.order.amount,
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin,
    balances: state.user.balances
  }))
  let [ deltaPrice ] = useDeltaPrice()

  let dispatch = useDispatch()

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

  // 매수
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
  
  // 매도
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
    <div id="normal-order" >
      <div className="p-3 bg-white rounded shadow-sm container">
        {/* tab-bar */}
        <nav>
          <div className="nav nav-tabs tab-col2" id="nav-tab" role="tablist">
            <a onClick={() => tabChange('buy')} className="nav-item nav-link active cart-buy" id="nav-buy-tab" data-toggle="tab" href="#nav-buy" role="tab" aria-controls="nav-home" aria-selected="true">매수</a>
            <a onClick={() => tabChange('sell')} className="nav-item nav-link cart-sell" id="nav-profile-tab" data-toggle="tab" href="#nav-sell" role="tab" aria-controls="nav-profile" aria-selected="false">매도</a>
          </div>
        </nav>

        <div className="tab-content" id="trade">
          <div className="tab-pane fade show active" id="nav-buy" role="tabpanel" aria-labelledby="nav-buy-tab">
            <label className="mt-2" htmlFor="basic-url">구매량</label>
            <div className="input-group input-group-sm mb-3">
              <input type="number" className="form-control" value={orderAmount} onChange={amountChange} placeholder="0.0" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <select className="custom-select" selected="0">
                  <option value="0">입력</option>
                  {/* <option value="1">50%</option>
                  <option value="2">25%</option>
                  <option value="3">10%</option>
                  <option value="4">5%</option> */}
                </select>
              </div>
            </div>
            <label htmlFor="basic-url">구매가({selectedMarket})</label>
            <div className="input-group input-group-sm mb-3">
              <input type="number" className="form-control" value={orderPrice} onChange={priceChange} placeholder="0.0" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={priceDeCreaseHandle}>-</button>
                <button className="btn btn-outline-secondary" type="button" onClick={priceInCreaseHandle}>+</button>
              </div>
            </div>
            <label htmlFor="basic-url">총 구매가격</label>
            <div className="input-group input-group-sm mb-3">
              <input type="text" className="form-control" value={amountCommas(orderPrice * orderAmount)} placeholder="0.0" aria-describedby="basic-addon2" disabled/>
              <div className="input-group-append">
                <span className="input-group-text">원</span>
              </div>
            </div>
            <label style={{marginTop: "10px"}}>주문총액</label>
            <div className="alert bg-light " role="alert">
              <h5 className="text-danger text-right"> <NumberText value={orderAmount} />  <span className="text-muted font10">{selectedCoin}</span></h5>
              <hr />
              <p className="mb-0 text-right">
                <span className="text-muted mr-2">사용가능 금액</span>  
                <NumberText value={balances[selectedMarket] && balances[selectedMarket].availableBalance} /> {selectedMarket}
              </p>
            </div>
            <label>수수료 : 대기주문(0.08%),즉시체결(0.2%)</label>
            <button type="submit" className="btn btn-danger btn-block btn-sm" onClick={buyBtnClick}>매수</button>
          </div>

          <div className="tab-pane fade" id="nav-sell" role="tabpanel" aria-labelledby="nav-profile-tab">
            <label className="mt-2" htmlFor="basic-url">매도수량</label>
            <div className="input-group input-group-sm mb-3">
              <input type="number" className="form-control" value={orderAmount} onChange={amountChange} placeholder="0.0" aria-describedby="basic-addon2" />
              <div className="input-group-append">
              <select className="custom-select" selected="0">
                  <option value="0">입력</option>
                  {/* <option value="1">50%</option>
                  <option value="2">25%</option>
                  <option value="3">10%</option>
                  <option value="4">5%</option> */}
                </select>
              </div>
            </div>
            <label htmlFor="basic-url">판매가격({selectedMarket})</label>
            <div className="input-group input-group-sm mb-3">
              <input type="number" className="form-control" value={orderPrice} onChange={priceChange} placeholder="0.0" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">-</button>
                <button className="btn btn-outline-secondary" type="button">+</button>
              </div>
            </div>
            <label htmlFor="basic-url">총 판매가격</label>
            <div className="input-group input-group-sm mb-3">
              <input type="text" className="form-control" value={amountCommas(orderPrice * orderAmount)} aria-describedby="basic-addon2" disabled={true}/>
              <div className="input-group-append">
                <span className="input-group-text">원</span>
              </div>
            </div>
            <label>주문총액</label>
            <div className="alert bg-light " role="alert">
              <h5 className="text-primary text-right"> <NumberText value={orderAmount} />  <span className="text-muted font10">{selectedCoin}</span></h5>
              <hr />
              <p className="mb-0 text-right">
                <span className="text-muted mr-2">사용가능 금액</span>  
                <NumberText value={balances[selectedCoin] && balances[selectedCoin].availableBalance} /> {selectedCoin}
              </p>
            </div>
            <label>최소주문금액: 1000 KRW수수료(부가세 포함): 0.05%</label>
            <button type="submit" className="btn btn-primary btn-block btn-sm" onClick={sellBtnClick}>매도</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NormalOrder