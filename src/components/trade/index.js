import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onSetOrdercomplete, onSetOrdercompleteByTimesym } from '../../state/modules/history'

import { NumberText } from '../../components/atomic/input'

import { getOrderCompletes } from '../../apis/order'
import { getTradesByMarketAndDaily } from '../../apis/trade'

import { getClassByState, getRate } from '../../utils/compare'

import './css/trade.css'

const Trade = (props) => {
  let dispatch = useDispatch()

  let { selectedMarket="KRW", selectedCoin="BTC", orderCompletes, orderCompletesByTimesym} = useSelector(state=> ({
    selectedMarket: state.coins.selectedmarket,
    selectedCoin: state.coins.selectedCoin,
    orderCompletes: state.history.orderCompletes,
    orderCompletesByTimesym: state.history.orderCompletesByTimesym
  }))


  useEffect(() => {
    (async () => {
      let code=`${selectedMarket}-${selectedCoin}`
      let orderCompletes = await getOrderCompletes(code)
        
      dispatch(onSetOrdercomplete(orderCompletes))
    })()
  }, [selectedMarket, selectedCoin])

  // 채결내역
  const onClickOrderCompletes = async () => {
    let code = `${selectedMarket}-${selectedCoin}`
    let orderCompletes = await getOrderCompletes(code)

    dispatch(onSetOrdercomplete(orderCompletes))
  }

  // 일별 채결내역
  const onClickOrderCompletesByDaily = async () => {
    let code = `${selectedMarket}-${selectedCoin}`
    let orderCompletes = await getTradesByMarketAndDaily(code)

    dispatch(onSetOrdercompleteByTimesym(orderCompletes))
  }

  return (
    <div id="trade">
      <div className="col-sm-12">
        <div className="shadow-sm p-3 bg-white rounded">
          <nav>
            <div className="nav nav-tabs tab-col2" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active show" onClick={onClickOrderCompletes} id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">체결내역</a>
              <a className="nav-item nav-link" onClick={onClickOrderCompletesByDaily} id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">일별</a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent" style={{ height: `${window.innerWidth >= 992 ? "auto" : `${window.innerHeight - 203}px`}`}}>
            
            <div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th style={{width: "25%"}}>체결시간</th>
                    <th style={{width: "25%"}}>체결가격({selectedMarket})</th>
                    <th style={{width: "25%"}}>체결량({selectedCoin})</th>
                    <th style={{width: "25%"}}>체결금액</th>
                  </tr>
                </thead>
              </table>

              <div className="slimScrollDiv" style={{ height: `${window.innerWidth >= 992 ? "215px" : `${window.innerHeight - 237}px`}`}}>
                <div className="recent-trade" style={{ height: `${window.innerWidth >= 992 ? "215px" : `${window.innerHeight - 237}px`}`}}>
                  <table className="table mb-0 table-borderless table-striped table-hover">
                    <tbody>
                      {orderCompletes.map((order, idx) => (
                        <tr key={idx}>
                          <td style={{width: "25%"}} scope="row">{order.trade_time}</td>
                          <td style={{width: "25%"}} className={getClassByState(order.change)}><NumberText value={order.trade_price}	/></td>
                          <td style={{width: "25%"}} className={getClassByState(order.change)}><NumberText value={order.trade_volume}	/></td>
                          <td style={{width: "25%"}} ><NumberText value={order.trade_price * order.trade_volume} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="tab-pane fade" id="nav-profile" style={{ height: `${window.innerWidth >= 992 ? "auto" : `${window.innerHeight - 203}px`}`}}>
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th style={{width: "25%"}}>일자</th>
                    <th style={{width: "25%"}}>종가({selectedMarket})</th>
                    <th style={{width: "25%"}}>전일대비</th>
                    <th style={{width: "25%"}}>거래량({selectedCoin})</th>
                  </tr>
                </thead>
              </table>
              <div className="slimScrollDiv" style={{ position: "relative", overflow: "hidden", width: "auto", height: `${window.innerWidth >= 992 ? "215px" :  `${window.innerHeight - 237}px`}` }}>
                <div className="recent-trade" style={{ overflow: "hidden", width: "auto", height: `${window.innerWidth >= 992 ? "215px" : `${window.innerHeight - 237}px`}` }}>
                  <table className="table table-borderless table-striped table-hover">
                    <tbody>
                      {/* <tr>
                        <td colSpan="4" className="text-center"> 미체결 주문내역이 없습니다.</td>
                      </tr> */}
                      {orderCompletesByTimesym.map((trade, idx) => (
                        <tr key={idx}>
                          <td style={{width: "25%"}} scope="row">{trade.trade_date}</td>
                          <td style={{width: "25%"}} className={getClassByState(trade.change)}><NumberText value={trade.trade_price}	/></td>
                          <td style={{width: "25%"}} className={getClassByState(trade.change)}><NumberText value={getRate(trade.prev_trade_price, trade.trade_price)}	/></td>
                          <td style={{width: "25%"}}><NumberText value={trade.trade_price * trade.trade_volume} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trade