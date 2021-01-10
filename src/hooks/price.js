import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useDeltaPrice = () => {
  let {tickers={}, selectedMarket='KRW', selectedCoin="BTC"} = useSelector(state => ({
    tickers: state.tickers.tickers,
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin,
  }))

  let [ deltaPrice, setDeltaPrice ] = useState(1)

  // useEffect(() => {
  //   let c = tickers[`${selectedMarket}-${selectedCoin}`]
  //   console.log(123)
  //   if(!c) {
  //     return
  //   }
  //   let tradePrice = parseInt(c.tradePrice || c.trade_price)
  //   setDeltaPrice(getPrice(tradePrice))
  // }, [])

  useEffect(() => {
    let c = tickers[`${selectedMarket}-${selectedCoin}`]

    if(!c) {
      return
    }
    let tradePrice = parseInt(c.tradePrice || c.trade_price)
    setDeltaPrice(getPrice(tradePrice))
  }, [selectedMarket, selectedCoin, tickers])

  const getPrice = tradePrice => {
    let p = 0

    if (tradePrice > 2000000) {
      p = 1000
    } else if (tradePrice > 1000000) {
      p = 500
    } else if (tradePrice > 500000) {
      p = 100
    } else if (tradePrice > 100000) {
      p = 50
    } else if (tradePrice > 10000) {
      p = 10
    } else if (tradePrice > 1000) {
      p = 5
    } else if (tradePrice > 100) {
      p = 1
    } else if (tradePrice > 10) {
      p = 0.1
    } else {
      p = 0.01
    }
    return p
  }

  return [ deltaPrice ]
}

export default useDeltaPrice