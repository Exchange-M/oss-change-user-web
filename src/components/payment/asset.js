import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { NumberText } from '../atomic/input'
import { getPercent } from '../../utils/compare'

const Asset = props => {
  let { balances= {}, tickers={}, selectedMarket="KRW", coinInfo={}} = useSelector(s => ({
    balances: s.user.balances,
    selectedMarket: s.coins.selectedMarket,
    tickers: s.tickers.tickers,
    coinInfo: s.coins.coinImg,
  }))

  let [ total, setTotal ] = useState(0)

  useEffect(() => {
    let t = 0
    Object.keys(balances).map((balance) => {
      t += getPriceBySelectedMarket(balance)
    })
    setTotal(t)
  }, [balances, tickers])

  const getPriceBySelectedMarket = (balance) => {
    let b = 0
    if (balance == selectedMarket) {
      b = parseFloat(balances[balance].availableBalance)
    } else {
      b = parseFloat(balances[balance].availableBalance) * parseFloat(tickers[`${selectedMarket}-${balance}`] ? tickers[`${selectedMarket}-${balance}`].trade_price : 0 )
    }
    return b
  }

  if (!Object.keys(coinInfo).length) {
    return (<div>data loading...</div>)
  }

  return (
    <div className="row h-100" id="payment-asset" style={{marginRight: "0px"}}>
      <div className="col-md mb-3" style={{padding: "10px"}}>
        <div className="card shadow-sm  mb-3 bg-white rounded h-100">
          <div className="card-header">
            <span className="font-14">보유자산 </span>
            <span className="float-right">
              <h6><NumberText value={total} /> <em className="em-f10">{selectedMarket}</em></h6>
            </span>
          </div>
          <div className="p-2">
            <table className="table balance-table mb-0">
              <thead>
                <tr>
                  <th scope="col" className="border-top-0">보유코인</th>
                  <th scope="col" className="border-top-0">비중</th>
                  <th className="text-center border-top-0" scope="col">코인수량</th>
                  <th className="text-center border-top-0" scope="col">변환</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(balances).map((balance, idx) => (
                  <tr key={idx} onClick={()=> props.onClick(balance)}>
                    <td>
                      <img src={coinInfo[balance].icon} width="20" height="20" />
                      <p className="d-inline-block align-middle m-0" style={{paddingLeft: "10px"}}> {coinInfo[balance].name.kr} <br /><em> {balance}</em> </p>
                    </td>
                    <td><p className="balance-bar m-0" style={{width: `${getPercent(getPriceBySelectedMarket(balance), total)}%`}}><span className="balance-bar-data"> <NumberText value={getPercent(getPriceBySelectedMarket(balance), total)} />%</span> </p>  </td>
                    <td className="text-right"><h6 className="d-inline-block"> <NumberText value={balances[balance].availableBalance} /></h6> <em>{balance}</em> </td>
                    <td className="text-right"><h6 className="d-inline-block"> <NumberText value={getPriceBySelectedMarket(balance)} /></h6> <em>{selectedMarket}</em> </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Asset