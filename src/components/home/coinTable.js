import React from 'react'
import { useSelector } from 'react-redux';

import { getClassByState } from '../../utils/compare'

import { NumberText } from '../../components/atomic/input'
import { onOpen } from '../../state/modules/modals'

const CoinTable = (props) => {
  const { selectedMarket } = useSelector(state => ({
    selectedMarket: state.coins.selectedMarket,
  }))
  
  // const dispatch = useDispatch()

  return (
    <div className="pc-main-wrap">
      <div className="pc-main-ctype-list">
        <table id="current-coin-price">
          <thead>
            <tr>
              <th style={{textAlign: 'left'}}>코인</th>
              <th>실시간 시세 </th>
              <th>전일대비</th>
              <th>당일고가</th>
              <th>당일저가</th>
              <th>24h 거래량</th>
            </tr>
          </thead>
          <tbody>
            {props.coinsByMarket[props.selectedMarket].map(coin => (
              //상장 되었지만 거래가 없으면 tickers에는 데이터가 없을 수 있음.
              props.tickers[`${selectedMarket}-${coin.coinTicker}`] &&(  
                <tr key={`${selectedMarket}-${coin.coinTicker}`}>
                  <td id="coin-type-krw_btc">{props.coinInfo[coin.coinTicker].name.kr}</td>
                  <td className={getClassByState(props.tickers[`${selectedMarket}-${coin.coinTicker}`].change_state)} id="total-price-krw_btc"><NumberText value={props.tickers[`${selectedMarket}-${coin.coinTicker}`].trade_price} /></td>
                  <td className={getClassByState(props.tickers[`${selectedMarket}-${coin.coinTicker}`].change_state)} id="last-krw_btc"><NumberText value={props.tickers[`${selectedMarket}-${coin.coinTicker}`].signed_change_rate} />%</td>
                  <td className="up" id="percentChange-krw_btc"><NumberText value={props.tickers[`${selectedMarket}-${coin.coinTicker}`].high_price} /></td>
                  <td className="down" id="bid-krw_btc"><NumberText value={props.tickers[`${selectedMarket}-${coin.coinTicker}`].low_price} /></td>
                  <td id="volume24h-krw_btc"><NumberText value={props.tickers[`${selectedMarket}-${coin.coinTicker}`].acc_trade_volume_24h} /></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CoinTable