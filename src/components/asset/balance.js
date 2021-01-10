import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { onOpen } from '../../state/modules/modals'

import { getAssets } from '../../apis/asset'
import { NumberText } from '../../components/atomic/input'
import './css/asset.css'

let TotalAssetItem = React.memo((props) => {
  return (
    <div className="box-wrap">
      <div className="col-5">
        <strong>{props.title}</strong>
      </div>
      <div className="col-7 text-right">
        <strong className="mb_krw_total_asset_held font-15">
          <NumberText value={props.bodyMain} />
        </strong>
        <span className="color-grey">{props.bodySub}</span>
      </div>
    </div>
  )
})

let TotalAsset = (props) => {
  let { selectedMarket } = useSelector(state => ({
    selectedMarket: state.coins.selectedMarket
  }))

  if (!props.totalAsset || props.coinAsset) return null

  return (
    <div className="status">
      <div className="m">
        <div className="round-div">
          <div className="round-content-wrap">
            <h4>보유자산</h4>
            <TotalAssetItem title={"총 보유자산"} bodyMain={props.totalAsset.asset} bodySub={selectedMarket} />
            <TotalAssetItem title={`보유 ${selectedMarket}`} bodyMain={props.totalAsset.krw} bodySub={selectedMarket} />
            <TotalAssetItem title={`총 매수`} bodyMain={props.totalAsset.buyPri} bodySub={selectedMarket} />
            <TotalAssetItem title={`총 평가손익`} bodyMain={props.totalAsset.evalIncome} bodySub={selectedMarket} />
            <TotalAssetItem title={`총 평가금액`} bodyMain={props.totalAsset.evalPri} bodySub={selectedMarket} />
            <TotalAssetItem title={`총 평가수익률`} bodyMain={props.totalAsset.evalPer} bodySub={`%`} />
          </div>
        </div>
      </div>

      <div className="d">
        <div className="col  mb-3 pb-3">

          <div className="card shadow-sm bg-white rounded h-100">
            <div className="card-header">
              <h5 className="pt-2 pb-1 mb-0 d-inline">보유코인</h5>
            </div>
            <div className="pc-myasset">
              <div className="my-asset-status">
                <div>
                  <ul style={{ background: "none" }}>
                    <li><em> 총 매수금액</em> <strong><span> {selectedMarket}</span></strong><strong className="mb_krw_total_buy_price"><NumberText value={props.totalAsset.buyPri} /></strong> </li>
                    <li><em> 총 평가금액</em> <strong><span> {selectedMarket}</span></strong><strong className="mb_krw_total_evaluation_price"><NumberText value={props.totalAsset.evalPri} /></strong> </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li><em> 총 평가손익</em> <strong><span> {selectedMarket}</span></strong><strong className="mb_krw_total_profit"><NumberText value={props.totalAsset.evalIncome} /></strong> </li>
                    <li><em> 총 평가수익률</em> <strong><span> %</span></strong><strong className="mb_krw_total_profit_rate"><NumberText value={props.totalAsset.evalPer} /></strong> </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li><em> 보유 {selectedMarket}</em> <strong><span> {selectedMarket}</span></strong><strong className="mb_krw_total"><NumberText value={props.totalAsset.krw} /></strong> </li>
                    <li><em> 총 보유자산</em> <strong><span> {selectedMarket}</span></strong><strong className="mb_krw_total_asset_held"><NumberText value={props.totalAsset.asset} /></strong> </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

let Content = (props) => {
  let { selectedMarket="KRW" } = useSelector(state => ({
    selectedMarket: state.coins.selectedMarket
  }))


  return (
    <div className="content">
      <div className="m">
        {
          props.coinsAsset? Object.keys(props.coinsAsset).map((coin, idx) => (
            <div className="round-div" key={idx}>
              <div className="round-content-wrap">
                <h4>
                  <span className="ico-coin ico-btc"></span>
                  <em>{props.coinInfo[coin].name.kr} </em>
                  <strong> {coin}/{selectedMarket} </strong>
                </h4>
                <div className="box-wrap">
                  <div className="col-5">
                    <strong>보유수량</strong>
                  </div>
                  <div className="col-7 text-right">
                    <strong className="mb_btc_total"><NumberText value={props.coinsAsset[coin].amt} /></strong>
                    <span> {coin}</span>
                  </div>
                </div>
                <div className="box-wrap">
                  <div className="col-5">
                    <strong>매수평균가</strong>
                  </div>
                  <div className="col-7 text-right red">
                    <strong className="mb_btc_profit_rate_calc"><NumberText value={props.coinsAsset[coin].buyAvg} /></strong>
                    <span className="color-grey"> {selectedMarket}</span>
                  </div>
                </div>
                <div className="box-wrap">
                  <div className="col-5">
                    <strong>매수금액</strong>
                  </div>
                  <div className="col-7 text-right">
                    <strong className="mb_btc_average_buy_price"><NumberText value={props.coinsAsset[coin].evalPri} /></strong>
                    <span className="color-grey"> {selectedMarket}</span>
                  </div>
                </div>
                <div className="box-wrap">
                  <div className="col-5">
                    <strong>평가금액</strong>
                  </div>
                  <div className="col-7 text-right">
                    <strong className="mb_btc_evaluation_price"><NumberText value={props.coinsAsset[coin].evalPer} /></strong>
                    <span className="color-grey"> %</span>
                  </div>
                </div>
                <div className="box-wrap">
                  <div className="col-5">
                    <strong>평가손익</strong>
                  </div>
                  <div className="col-7 text-right">
                    <strong className="mb_btc_profit_rate red"><NumberText value={props.coinsAsset[coin].evalPer} /></strong>
                    <span className="color-grey"> %</span>
                  </div>
                </div>
              </div>
            </div>)
          ) : (<div></div>)
        }
      </div>

      <div className="d">
        <table className="my-asset">
          <thead>
            <tr>
              <th>보유코인</th>
              <th>보유수량</th>
              <th>매수평균가</th>
              <th>매수금액</th>
              <th>평가금액</th>
              <th>평가손익</th>
              {/* <th>주문</th> */}
            </tr>
          </thead>
          <tbody>
            {
              props.coinsAsset? Object.keys(props.coinsAsset).map((coin, idx) => (
                <tr key={idx}>
                  <td><em>{props.coinInfo[coin].name.kr}</em> <span>({coin})</span></td>
                  <td>
                    <strong><span><NumberText value={props.coinsAsset[coin].amt} /></span></strong>
                    <span className="color-grey"> {coin}</span>
                  </td>
                  <td>
                    <strong><span><NumberText value={props.coinsAsset[coin].buyAvg} /></span></strong>
                    <span className="color-grey"> {selectedMarket}</span>
                  </td>
                  <td>
                    <strong><span><NumberText value={props.coinsAsset[coin].buyPri} /></span> </strong>
                    <span className="color-grey"> {selectedMarket}</span>
                  </td>
                  <td>
                    <strong><span><NumberText value={props.coinsAsset[coin].evalPri} /></span> </strong>
                    <span className="color-grey"> {selectedMarket}</span>
                  </td>
                  <td className="text-primary">
                    <strong> <span className="text-primary"><NumberText value={props.coinsAsset[coin].evalPer} /></span> </strong>
                    <span className="color-grey"> %</span> <br />
                  </td>
                  
                  {/* <td><button className="order">주문</button> </td> */}
                </tr>
              )) : (
                <tr></tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

// 보유코인
let Balance = (props) => {

  let [totalAsset, setTotalAsset] = useState(null)
  let [coinsAsset, setCoinsAsset] = useState(null)
  let { isLogin, coinInfo={} } = useSelector(state => ({
    isLogin: state.user.authentication.isLogin,
    coinInfo: state.coins.coinImg,
  }))
  let dispatch = useDispatch()

  useEffect(() => {
    if (!isLogin) return
      ; (async () => {
        let [data, errorMsg] = await getAssets(localStorage.getItem('token'))
        if (errorMsg) {
          dispatch(onOpen({
            title: '네트워크 장애',
            body: errorMsg.MSG,
            errorCode: errorMsg.CODE,
            okMsg: '확인',
            cancelMsg: '취소'
          }))
          return 
        }
        setTotalAsset(data.total)

        delete data.total
        setCoinsAsset(data)
      })()
  }, [isLogin]) 

  if (!totalAsset || !coinsAsset || !Object.keys(coinInfo).length) return (
    <div>loading...</div>
  )

  return (
    <div id="asset-balance" className="container submenu-container mt-3 mb-3 pb-5">
      <TotalAsset totalAsset={totalAsset} />
      <Content 
        coinsAsset={coinsAsset} 
        coinInfo={coinInfo} 
      />
    </div>
  )
}

export default Balance