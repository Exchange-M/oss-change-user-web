import React from 'react'
import {useSelector} from 'react-redux'

import './css/coinDesc.css'

import { NumberText } from '../atomic/input'

let CoinDesc = (props) => {
  const { coinInfo={}, tickers, selectedMarket="KRW", selectedCoin="BTC"} = useSelector(state => ({
    coinInfo: state.coins.coinImg,
    tickers: state.tickers.tickers,
    selectedMarket: state.coins.selectedMarket,
    selectedCoin: state.coins.selectedCoin
  }))
  if (!tickers[`${selectedMarket}-${selectedCoin}`]) return (
    <div id="coindesc">
      <div className="shadow-sm p-3 mb-4 bg-white rounded">

      <div>{`${selectedMarket}-${selectedCoin}은 등록되지 않았습니다.`}</div>
      </div>
    </div>
  )
  return (
    <div id="coindesc">
      {
        Object.keys(coinInfo).length && (
          <div className="shadow-sm p-3 mb-4 bg-white rounded">
            
            <h5 className="d-inline">
              <span className="float-left mr-2"><img src={coinInfo[selectedCoin].icon} alt="coin" width="20" height="20" /></span>
              <a className="dropdown-toggle text-dark nounderline" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{coinInfo[selectedCoin].name.kr} ({coinInfo[selectedCoin].name.en})</a>
              <div id="ctype-drop" className="dropdown-menu font-12 shadow">
                <a className="dropdown-item">비트코인캐시 (BTCC) </a>
                <a className="dropdown-item">에테리움 (ETH)</a>
                <a className="dropdown-item">이오스 (EOS)</a>
                <a className="dropdown-item">비트코인캐시 (BTCC) </a>
                <a className="dropdown-item">에테리움 (ETH)</a>
                <a className="dropdown-item">이오스 (EOS)</a>
                <a className="dropdown-item">비트코인캐시 (BTCC) </a>
                <a className="dropdown-item">에테리움 (ETH)</a>
                <a className="dropdown-item">이오스 (EOS)</a>
                <a className="dropdown-item">비트코인캐시 (BTCC) </a>
                <a className="dropdown-item">에테리움 (ETH)</a>
                <a className="dropdown-item">이오스 (EOS)</a>
              </div>
              <span className="text-primary pl-2"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`]? tickers[`${selectedMarket}-${selectedCoin}`].trade_price: 0} /> </span>
              <small className="text-muted">{selectedMarket} </small>
            </h5>
            <h6 className="d-inline pl-4 text-danger up"> <NumberText value={tickers[`${selectedMarket}-${selectedCoin}`]? tickers[`${selectedMarket}-${selectedCoin}`].high_price : 0} /> <small className="text-muted">고가 </small> </h6>
            <h6 className="d-inline pl-4 text-primary down"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`]? tickers[`${selectedMarket}-${selectedCoin}`].low_price : 0} /> <small className="text-muted">저가 </small> </h6>
            <h6 className="d-inline pl-4 text-danger"><i className="fas fa-sort-up"></i> <NumberText value={tickers[`${selectedMarket}-${selectedCoin}`].change_price} /> <small className="text-muted"><NumberText value={tickers[`${selectedMarket}-${selectedCoin}`].change_rate}/>% </small> </h6>
          </div>
        )
      }

    </div>
  )
}

export default CoinDesc