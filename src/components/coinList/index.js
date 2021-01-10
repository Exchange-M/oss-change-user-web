import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { NumberText } from '../../components/atomic/input'

import { onSelectedMarket, onSelectedCoin } from '../../state/modules/coins'
import { onSetTickers } from '../../state/modules/tickers'

import { getClassByState, getCheckBoxByState } from '../../utils/compare'

import { onSetOrderbook } from '../../state/modules/orderbook'

import socket from '../../utils/socket'

import './css/coinList.css'

const DesktopRow = props => {
  let [checkbox, setCheckbox] = useState('')
  let [paddingSize, setPaddingSize] = useState(10)
  
  useEffect(() => {
    let intervalId = setInterval(() => {
      console.log('[remove] check', props.code)
      setCheckbox('')
      setPaddingSize(10)
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    console.log('[useEffect] Desktop Row', checkbox)
    if (checkbox) {
      let timeOupId = setTimeout(() => {
        setCheckbox('')
        setPaddingSize(10)
      }, 300)
      return () => clearTimeout(timeOupId)
    }
  }, [checkbox])

  useEffect(() => {
    setCheckbox(getCheckBoxByState(props.tickers[props.code].change_state || props.tickers[props.code].change))
    setPaddingSize(8)
  }, [props.tickers[props.code]])

  return (
    <tr key={`${props.code}`}>
      <td>
        <p style={{ cursor: 'pointer' }}>
          <span className="coin-item" onClick={props.coinClick} data-code={props.code}>
            {props.coinInfo[props.code.split('-')[1]].name.kr}
            <br />
          </span>
          <span >
            <em className="d-block">
              {props.coinInfo[props.code.split('-')[1]].name.en}/{props.selectedMarket}
            </em>
          </span>
        </p>
      </td>
      <td className={`align-middle ${getClassByState(props.tickers[props.code].change_state || props.tickers[props.code].change)}`}>
        <div className={checkbox} style={{ padding: `${paddingSize}px`, "boxSizing": "border-box" }}>
          <NumberText value={props.tickers[props.code].trade_price} />
        </div>
      </td>
      <td className={`align-middle ${getClassByState(props.tickers[props.code].change_state || props.tickers[props.code].change)}`}>
        <NumberText value={props.tickers[props.code].signed_change_rate} />%
      </td>
    </tr>
  )
}

const MobileRow = props => {
  let [checkbox, setCheckbox] = useState('')
  let [paddingSize, setPaddingSize] = useState(10)
  
  useEffect(() => {
    let intervalId = setInterval(() => {
      console.log('[remove] check', props.code)
      setCheckbox('')
      setPaddingSize(10)
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    console.log('[useEffect] Mobile Row: ', props.code, checkbox )
    if (checkbox) {
      let timeOupId = setTimeout(() => {
        setCheckbox('')
        setPaddingSize(10)
      }, 300)

      return () => clearTimeout(timeOupId)
    }
  }, [checkbox])

  useEffect(() => {
    setCheckbox(getCheckBoxByState(props.tickers[props.code].change_state || props.tickers[props.code].change))
    setPaddingSize(8)
  }, [props.tickers[props.code]])

  return (
    <tr key={`${props.code}`} >
      <td>
        <Link to="/exchange?code=KRW-BTC&tab=orderbook">
          <p style={{ cursor: 'pointer' }}>
            <span className="coin-item" onClick={props.coinClick} data-code={props.code}>
              {props.coinInfo[props.code.split('-')[1]].name.kr}
              <br />
            </span>
            <span >
              <em className="d-block">
                {props.coinInfo[props.code.split('-')[1]].name.en}/{props.selectedMarket}
              </em>
            </span>
          </p>
        </Link>
      </td>
      <td className={`align-middle`}>
        <Link className={`${checkbox} ${getClassByState(props.tickers[props.code].change_state || props.tickers[props.code].change)}`} to="/exchange?code=KRW-BTC&tab=orderbook" style={{ padding: `${paddingSize}px`, "boxSizing": "border-box" }}>
          <NumberText value={props.tickers[props.code].trade_price}></NumberText>
        </Link>
      </td>
      <td>
        <Link to="/exchange?code=KRW-BTC&tab=orderbook" className={`align-middle ${getClassByState(props.tickers[props.code].change_state || props.tickers[props.code].change)}`}>
          <NumberText value={props.tickers[props.code].signed_change_rate} />%
        </Link>
      </td>
    </tr>
  )
}


let CoinList = props => {
  const dispatch = useDispatch()
  const { coinInfo, tickers, selectedMarket = "KRW", selectedCoin = "BTC" } = useSelector(state => ({
    coinInfo: state.coins.coinImg,
    tickers: state.tickers.tickers,
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin
  }))

  let [markets, setMarkets] = useState([
    { kr: '원화거래', en: 'KRW', selected: true },
    { kr: 'BTC', en: 'BTC' },
    { kr: 'ETH', en: 'ETH' },
    { kr: 'USDT', en: 'USDT' }
  ])

  let [ coins, setCoins ] = useState([])

  let [ isDesktop, setIsDesktop ] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    window.innerWidth >= 992 ? setIsDesktop(true) : setIsDesktop(false)
  }, [])

  useEffect(() => {
    setCoins(Object.keys(tickers).map(code => code))
  }, [Object.keys(tickers).length])

  const marketClick = e => {
    let m = markets.map(market => {
      market.selected = false
      return market
    })

    m[parseInt(e.target.getAttribute('data-idx'))].selected = true
    let selectedMarket = e.target.getAttribute('data-market')
    dispatch(onSelectedMarket(selectedMarket))
    dispatch(onSetTickers(selectedMarket))
    setMarkets(m)
    socket.onChangeMarket(selectedMarket)
  }

  const coinClick = e => {
    let code = e.target.getAttribute('data-code')
    dispatch(onSelectedCoin(code.split('-')[1]))
    dispatch(onSetOrderbook(code))
    socket.onCahngeMarketAndCoin(code)
  }
  if (!Object.keys(coinInfo).length || !Object.keys(tickers).length) {
    return (<div>data loading</div>)
  }

  //상장 되었지만 거래가 없으면 tickers에는 데이터가 없을 수 있음.
  return (
    <div id="coinList">
      <div className="component">
        <div className="shadow-sm p-3 mb-4 bg-white rounded text-truncate">
          <div className="input-group search-icon mb-3">
            <input type="text" className="form-control" placeholder="코인명 / 심볼검색" aria-label="Username" aria-describedby="basic-addon1" />
            <span className="fa fa-search form-control-feedback"> </span>
          </div>

          <div className="col p-0">

            <nav>
              <div className="nav nav-tabs tab-col5" id="ctype-trade-tab" onClick={marketClick}>
                {markets.map((market, idx) => <a className={`nav-item nav-link ${market.selected ? "active" : ''}`} data-market={market.en} data-idx={idx} key={market.en} id="nav-home-tab" style={{ cursor: 'pointer' }}>{market.kr}</a>)}
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="trade-won" role="tabpanel" aria-labelledby="nav-home-tab">
                <table className="table ctype-table-title mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="text-lefr">코인명</th>
                      <th scope="col" className="text-center">현재가</th>
                      <th scope="col" className="text-center">전일대비</th>
                    </tr>
                  </thead>
                </table>

                <div className="slimScrollDiv" style={{ position: "relative", overflow: "hidden", width: "auto", height: "1255px" }}>
                  <div className="ctype-maxheight" style={{ overflow: "hidden", width: "auto", height: "1255px" }}>
                    <table className="table table-hover ctype-table coins">
                      { isDesktop ? (
                        <tbody className="desktop">
                          {coins.map(code => (
                            <DesktopRow
                              key={code}
                              code={code}
                              coinInfo={coinInfo}
                              tickers={tickers}
                              coinClick={coinClick}
                            />
                          ))}
                        </tbody>
                      ) : (
                        <tbody className="mobile">
                          {coins.map(code => (
                            <MobileRow
                              key={code}
                              code={code}
                              coinInfo={coinInfo}
                              tickers={tickers}
                              coinClick={coinClick}
                            />
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinList
