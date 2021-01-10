import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { Pagination } from '../atomic/pagination'
import { getWithdraw } from '../../apis/withdraw'
import { getDeposit } from '../../apis/deposit'

import { onOpen } from '../../state/modules/modals'
/*
  {
    status: '상태'
    reqDate: '요청날짜'
    amount: '요청금액'
    fee: '수수료'
    txId: '원장 ID'
  }
*/
let statusMap = {
  P: "대기중",
  A: "승인완료",
  C: "취소",
  F: "완료",
}
const Withdraw = (props) => {
  let [ withdraws, setWithdraws ] = useState([])
  let dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      let [data, errorMsg] = await getWithdraw(props.coin, '',props.currentPage, 10, localStorage.getItem('token'))

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

      if (props.coin === "KRW"){
        data.withdraws = data.withdraws.map(d => ({
          status: statusMap[d.krwOutStatus],
          reqDate: d.krwOutRegDt,
          amount: d.krwOutAmt,
          fee: d.krwOutFee,
          txId: ''
        }))
      } else {
        data.withdraws = data.withdraws.map(d => ({
          status: statusMap[d.coinOutStatus],
          reqDate: d.coinOutRegDt,
          amount: d.coinOutAmt,
          fee: d.coinOutFeeAmt,
          txId: d.txId
        }))
      }

      setWithdraws(data.withdraws)
      props.setTotalCount(data.totalCount)
    })()
  }, [props.currentPage, props.coin])

  return (
    <table className="table table-striped dotum font-weight-light">
      <thead>
        <tr>
          <th scope="col">상태 </th>
          <th scope="col">출금신청일자</th>
          <th scope="col">출금요청금액</th>
          <th scope="col">출금수수료</th>
          <th scope="col">거래원장</th>
        </tr>
      </thead>
      <tbody>
        {
          withdraws.length? withdraws.map((withdraw, idx) => (
            <tr key={idx}>
              <td>{withdraw.status} </td>
              <td>{withdraw.reqDate} </td>
              <td>{withdraw.amount} </td>
              <td>{withdraw.fee} </td>
              <td>{withdraw.txId} </td>
            </tr>
          )): (
            <tr>
              <td colSpan="7" className="text-center"> <strong> 출금요청 내역이 없습니다.</strong></td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

const Deposit = (props) => {
  let [ deposits, setDeposits ] = useState([])
  let dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      let [data, errorMsg] = await getDeposit(props.coin, '',props.currentPage, 10, localStorage.getItem('token'))
      console.log(data)
      console.log(errorMsg)
      if (errorMsg) {
        dispatch(onOpen({
          title: '네트워크 장애',
          body: errorMsg.MSG,
          errorCode: errorMsg.CODE,
          okMsg: '확인',
          cancelMsg: '취소'
        }))
      }

      if (props.coin === "KRW"){
        data.deposits = data.deposits.map(d => ({
          status: statusMap[d.krwInStatus],
          reqDate: d.krwInRegDt,
          amount: d.krwInAmt,
          fee: d.krwInFee,
        }))
      } else {
        data.deposits = data.deposits.map(d => ({
          status: statusMap[d.coinInStatus],
          reqDate: d.coinInDt,
          amount: d.coinInAmt,
        }))
      }

      setDeposits(data.deposits)
      props.setTotalCount(data.totalCount)
    })()
  }, [props.currentPage, props.coin])

  return (
    <table className="table table-striped dotum font-weight-light">
      <thead>
        <tr>
          <th scope="col">상태 </th>
          <th scope="col">입금신청일자</th>
          <th scope="col">입금요청금액</th>
        </tr>
      </thead>
      <tbody>
      {
          deposits.length? deposits.map((deposit, idx) => (
            <tr key={idx}>
              <td>{deposit.status} </td>
              <td>{deposit.reqDate} </td>
              <td>{deposit.amount} </td>
            </tr>
          )): (
            <tr>
              <td colSpan="7" className="text-center"> <strong> 입금내역이 없습니다.</strong></td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

const WithdrawPending = (props) => {
  return (
    <table className="table table-striped dotum font-weight-light">
      <thead>
        <tr>
          <th scope="col">등록일</th>
          <th scope="col">수량</th>
          <th scope="col">수수료</th>
          <th scope="col">컨펌</th>
          <th scope="col">txid</th>
          <th scope="col">거래원장</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="6" className="text-center"> <strong> 출금대기 내역이 없습니다.</strong></td>
        </tr>
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
      </tbody>
    </table>
  )
}

const DepositPending = (props) => {

  return (
    <table className="table table-striped dotum font-weight-light">
      <thead>
        <tr>
          <th scope="col">등록일</th>
          <th scope="col">수량</th>
          <th scope="col">수수료</th>
          <th scope="col">컨펌</th>
          <th scope="col">txid</th>
          <th scope="col">거래원장</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="6" className="text-center"> <strong> 입금대기 내역이 없습니다.</strong></td>
        </tr>
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
      </tbody>
    </table>
  )
}

const History = (props) => {
  let [ totalCount, setTotalCount ] = useState(0)
  let [ currentPage, setCurrentPage ] = useState(1)
  
  let [tab, setTab] = useState("1")
  let tabTitle = {
    "1": "출금내역",
    "2": "입금내역",
    "3": "출금대기내역",
    "4": "입금대기내역",
  }

  return (
    <div className="tab-pane fade p-2" id="nav-pending" role="tabpanel" aria-labelledby="nav-buy-tab">

      <div id="deposit-holding" className="d-block">

        <div className="d-flex mb-2 bd-highlight">
          <div className="flex-fill"><h6 className="mt-2 ml-2">{tabTitle[tab] ? tabTitle[tab] : "출금내역"}</h6></div>
          <div className="flex-fill">
            <select className="custom-select w-50 float-right" defaultValue="1" onChange={e => setTab(e.target.value)}>
              <option value="1">출금내역</option>
              <option value="2">입금내역</option>
              <option value="3">출금대기내역</option>
              <option value="4">입금대기내역</option>
            </select>
          </div>
        </div>
        {
          tab == "1"? <Withdraw coin={props.coin} setTotalCount={setTotalCount} currentPage={currentPage}/> : 
          tab == "2"? <Deposit coin={props.coin} setTotalCount={setTotalCount} currentPage={currentPage}/>: 
          tab == "3"? <WithdrawPending coin={props.coin} setTotalCount={setTotalCount} currentPage={currentPage}/> : 
          tab == "4"? <DepositPending coin={props.coin} setTotalCount={setTotalCount} currentPage={currentPage}/> 
          : ""
        }
      </div>

      <Pagination 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalCount={totalCount}
        cntOfPage={10}
      />
    </div>
  )
}

export default History