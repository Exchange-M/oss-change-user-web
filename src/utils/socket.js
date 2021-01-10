import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'

import { SOCKET } from '../config'
import { osUpdateOrderbook } from '../state/modules/orderbook'
import { onUpdateTicker } from '../state/modules/tickers'
import { onUpdateTrade } from '../state/modules/trade'
import { onSetOrdercomplete } from '../state/modules/history'
import { addToastMsg } from '../state/modules/toast'

const URL = `http://${SOCKET.IP}:${SOCKET.PORT}?data=KRW-BTC`

const socket = io(URL)


// 마켓이 변경될 때
// 코인이 변경될 때
// 토큰이 변경될 때

const Orderbook = (props) => {
  // let dispatch = useDispatch()

  // return (orderbook) => {
  //   dispatch(onSetOrderbook(orderbook))
  // }
}

let GlobalStore = null

class Socket {
  constructor () {
    this.URL = `http://${SOCKET.IP}:${SOCKET.PORT}?data=KRW-BTC`
    this.socket = io(this.URL)
    
    console.log("[SOCKET] CONNECTED: ", this.URL, )
  }

  setStore (store) {
    GlobalStore=store
    // console.log(GlobalStore)
    this.orderbookOn()
    this.tradeOn()
    this.tickerOn()
    this.toastOn()
  }

  orderbookUpddate (orderbook)  {
    // console.log('[CALLED] orderbookUpddate')
    // console.log(orderbook)
    if (GlobalStore) {
      GlobalStore.dispatch(osUpdateOrderbook(
        orderbook.code, 
        orderbook.total_ask_size, 
        orderbook.total_bid_size, 
        orderbook.orderbook_units
      ))
    }
  }

  tradeUpdate (trade) {
    // console.log('[CALLED] tradeUpdate')
    // console.log(trade)

    if (GlobalStore) {
      GlobalStore.dispatch(onSetOrdercomplete([trade].concat( GlobalStore.getState().history.orderCompletes|| [])))
      GlobalStore.dispatch(onUpdateTrade(trade))
    }
  }
  
  tickerUpdate (ticker) {
    // console.log('[CALLED] tickerUpdate')
    // console.log(ticker)
    if (GlobalStore) {
      GlobalStore.dispatch(onUpdateTicker(ticker))
    }
  }

  toastUpdate (msg) {
    GlobalStore.dispatch(addToastMsg(msg))
  }

  // 코인 리스트에서 코인선택
  onCahngeMarketAndCoin (code) {
    this.socket.off('/orderbook', this.orderbookUpddate)
    this.socket.emit('/marketCoinTicker/change', {
      marketCoinTicker: code
    })
    this.socket.on('/orderbook', this.orderbookUpddate)
  }

  // 코인 리스트에서 마켓 선택
  onChangeMarket (market) {
    this.socket.off('/ticker', this.tickerUpdate)
    this.socket.emit('/market/change', {
      marketCoinTicker: market
    })
    this.socket.on('/ticker', this.tickerUpdate)
  }

  orderbookOn () {
    console.log("[SOCKET] Event On: orderbook")
    this.socket.on('/orderbook', this.orderbookUpddate)
  }

  tradeOn () {
    console.log("[SOCKET] Event On: tradeOn")
    this.socket.on('/trade', this.tradeUpdate)
  }

  tickerOn () {
    console.log("[SOCKET] Event On: tickerOn")
    this.socket.on('/ticker', this.tickerUpdate)
  }

  toastOn() {
    console.log("[SOCKET] Event On: toastOn")
    this.socket.on('/toast', this.toastUpdate)
  }

  setTokenEmit(token) {
    this.socket.emit('/set/token', {token})
  }

  signoutEmit (token) {
    this.socket.emit('/signout', {token})
  }
}

const s = new Socket()

export default s