import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { SelectCoins } from './selectCoin'
import { NumberText } from '../atomic/input'
import { Pagination } from '../atomic/pagination'

import { onOpen } from '../../state/modules/modals'

import { getOrderCompletes } from '../../apis/asset'

let Table = (props) => {
  let { coinInfo={} } = useSelector(state => ({
    coinInfo: state.coins.coinImg,
  }))

  let dispatch = useDispatch()

  let [ token, setToken ] = useState(props.token)
  let [ market, setMarket ] = useState('ALL')
  let [ coin, setCoin ] = useState('BTC')
  let [ orders, setOrders ] = useState([])
  let [ totalCount, setTotalCount ] = useState(0)
  let [ currentPage, setCurrentPage ] = useState(1)

  useEffect(() => {
    (async () => {
      if (currentPage < 1) {
        setCurrentPage(1)
        return;
      }
      let [data, errorMsg] = await getOrderCompletes(token, market, coin, currentPage)
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
      setOrders(data.lists)
      setTotalCount(data.totalCount[0].CNT)
      
    })()
  }, [currentPage, coin])

  return (
    <div className="col  mb-3 pb-3">
      <div className="card shadow-sm bg-white rounded h-100">

        <div className="card-header">
          <h5 className="pt-2 pb-1 mb-0 d-inline">{coinInfo[coin] && coinInfo[coin].name.kr}({totalCount})</h5>
          <SelectCoins onChange={setCoin} />
        </div>

        <div className="pl-4 pr-4 mb-3 pc-spacing table-responsive">
          <table id="trade-history" className="table table-striped table-hover mb-3 text-center text-nowrap dotum">
            <thead>
              <tr>
                <th scope="col" className="border-top-0">주문</th>
                <th scope="col" className="border-top-0">주문시간</th>
                <th scope="col" className="border-top-0">주문수량</th>
                <th scope="col" className="border-top-0">거래단가</th>
                <th scope="col" className="border-top-0">거래금액</th>
                <th scope="col" className="border-top-0">수수료</th>
                <th scope="col" className="border-top-0">정산금액</th>
                {/* <th scope="col" className="border-top-0">상세보기</th> */}
              </tr>
            </thead>
            <tbody>
              {
                orders.length ? orders.map((order, idx) => (
                  <tr id="buy_11" key={idx}>
                    <td><b>{order.orderType}</b> </td>
                    <td className="text-muted">{order['orderDt'].split(' ')[0]} <em>{order['orderDt'].split(' ')[1]} </em></td>
                    <td><NumberText value={order.orderAmt}  /></td>
                    <td><NumberText value={order.orderTicker} /></td>
                    <td><NumberText value={order.orderPri} /></td>
                    <td><NumberText value={order.fee} /></td>
                    <td><NumberText value={order.settlePri} /></td>
                    {/* <td><button type="button" className="btn btn-light btn-sm"><i className="fas fa-plus-circle" style={{ fontSize: "15px" }}></i></button></td> */}
                  </tr>
                )) : (
                    <tr>
                      <td colSpan="10" className="text-center"> 체결 내역이 없습니다.</td>
                    </tr>
                  )
              }
            </tbody>
          </table>
          <Pagination 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalCount={totalCount}
            cntOfPage={20}
          />
        </div>

      </div>
    </div>
  )
}

// 채결완료
let OrderComplete = (props) => {

  let { token = '' } = useSelector(state => ({
    token: state.user.authentication.token
  }))

  if (!token) return null

  return (
    <div id="asset-ordercomplete" className="container submenu-container mb-4">
      <Table token={token} />
    </div>
  )
}

export default OrderComplete