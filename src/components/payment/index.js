import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { NumberText } from '../atomic/input'

import Asset from './asset'
import DepositReq from './depositReq'
import WithdrawReq from './withdrawReq'
import History from './history'

let Payment = (props) => {
  let [ coin, setCoin ] = useState('KRW')

  const onClickCoin = (c) => {
    setCoin(c)
  }

  return (
    <div id="" style={{ maxWidth: "1200px", margin: "auto" }}>
      <div className="row h-100" id="payment-asset">
        <Asset 
          onClick={onClickCoin}
        />

        <div className="col-md mb-3" style={{ padding: "10px" }}>
          <div className="card shadow-sm mb-3 bg-white rounded h-100">
            <div className="card-header">
              <span className="font-14">{props.coinInfo[coin] && props.coinInfo[coin].name.kr} </span>
              <span className="float-right d-inline">
                <h6>
                  <span className="text-muted font-12 mr-1"> 보유금액</span> <span className="float-right"> <NumberText value={props.balances[coin]&&props.balances[coin].availableBalance} />
							<em className="em-f10">{`  ${coin}`}</em></span>
                </h6>
                <h6 className="d-none">
                  <span className="text-muted font-12 mr-1"> 평가금액</span> <span className="float-right"> 343,3434,333
							<em className="em-f10">BTC</em></span>
                </h6>
              </span>
            </div>
            <div className="p-1">
              <nav style={{ height: "36px" }}>
                <div className="nav nav-pills tab-col3 text-center  border-bottom-1 m-2" id="tab-deposit" role="tablist">
                  <a className="flex-sm-fill text-sm-centernav-item nav-link rounded-0 weight300 active show" style={{padding: "5px 0"}} id="nav-home-tab" data-toggle="tab" href="#nav-deposit" role="tab" aria-controls="nav-home" aria-selected="true">입금요청</a>
                  <a className="flex-sm-fill text-sm-centernav-item nav-link rounded-0 weight300" style={{padding: "5px 0"}} id="nav-profile-tab" data-toggle="tab" href="#nav-withdraw" role="tab" aria-controls="nav-profile" aria-selected="false">출금요청</a>
                  <a className="flex-sm-fill text-sm-centernav-item nav-link rounded-0 weight300" style={{padding: "5px 0"}} id="nav-contact-tab" data-toggle="tab" href="#nav-pending" role="tab" aria-controls="nav-contact" aria-selected="false">대기내역</a>
                </div>
              </nav>
            </div>

            {/* change panel */}
            <div className="tab-content" id="trade">
              <DepositReq coin={coin}/>

              <WithdrawReq coin={coin}/>

              <History coin={coin}/>              
            </div>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default Payment