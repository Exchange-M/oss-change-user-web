import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { onOpen } from '../../state/modules/modals'

import { NumberText } from '../../components/atomic/input'

import KrwRegister from './krwRegister'
import CoinRegister from './coinRegister'

import { useWithdrawFee } from '../../hooks/fee'

import { krwWithdrawReq, coinWithdrawReq } from '../../apis/withdraw'

import { amountCommas } from '../../utils/regExp'

const Krw = (props) => {
  let { bankCd = "", bankAccount = "", userName, balances={}, coinInfo={} } = useSelector(s => ({
    bankCd: s.user.info.bankCd,
    bankAccount: s.user.info.bankAccount,
    userName: s.user.info.name,
    balances: s.user.balances,
    coinInfo: s.coins.coinImg,
  }))

  let [amount, setAmount] = useState(0)
  let [minAmount, setMinAmount] = useState(10000)

  let [feeInfo, setFeeInfo] = useWithdrawFee()
  let [fee, setFee] = useState(1000)
  
  let dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(feeInfo).length !== 0) {
      setFee(parseFloat(feeInfo['KRW']['user']))
    }
  }, [feeInfo, props.coin])

  let click = async () => {
    let calc = amount - fee
    if (calc < 0) {
      console.log('계산된 금액이 0보다 작습니다')
      return
    }

    // amount에 수수료 포함 
    // 실제 출금 금액은 amount - fee
    if (parseFloat(amount) > parseFloat(balances['KRW'].availableBalance)) {
      dispatch(onOpen({
        title: '입/출금 경고',
        body: `출금 가능한 원화 보유자산이 부족합니다.`,
        errorCode: null,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }

    let [data, errorMsg] = await krwWithdrawReq(amount, localStorage.getItem('token'))

    if (errorMsg) {
      dispatch(onOpen({
        title: '입/출금 장애',
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }
    setAmount(0)
    dispatch(onOpen({
      title: '입/출금 완료',
      body: "원화출금 신청이 완료되었습니다.",
      okMsg: '확인',
      cancelMsg: '취소'
    }))
    
    console.log('원화 출금 처리가 완료되었습니다.')
  }

  const amountChange = e => {
    let amount = e.target.value || 0
    if (!isFinite(amount)) return
    amount = amount.toString()

    if (amount !== '0' &&  !amount.includes('.')) {
      amount = amount.replace(/^0+/,'')
    }

    setAmount(amount)
  }

  if (!bankCd) {
    return (
      <KrwRegister />
    )
  }

  return (
    <div>
      <div className="p-3 d-block">
        <div className="d-flex mb-2 bd-highlight">
          <div className="flex-fill">출금가능금액</div>
          <div className="flex-fill"><h6 className="float-right"><NumberText value={balances['KRW'].availableBalance} /> <span className="text-muted font-11">KRW</span></h6></div>
        </div>
        {/* <div className="d-flex mb-2 bd-highlight">
          <div className="flex-fill">일일최대 출금 금액</div>
          <div className="flex-fill"><h6 className="float-right">10,000,000 <span className="text-muted font-11">KRW</span></h6></div>
        </div> */}
        <hr className="pb-2" />
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">은행명</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="은행명을 입력해주세요" value={bankCd} disabled={true} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">계좌번호</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="계좌번호를 입력해주세요." value={bankAccount} disabled={true} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">예금주</label>
          <div className="col-sm-10">
            <input className="form-control" value={userName} disabled={true} />
          </div>
        </div>

        <hr></hr>

        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">출금신청금액</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="신청금액을 입력하세요." value={amount} onChange={amountChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">수수료</label>
          <div className="col-sm-10">
            <input className="form-control" disabled={true} value={amountCommas(fee)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">실제출금금액</label>
          <div className="col-sm-10">
            <input className="form-control" disabled={true} value={amount > 0 ? amount - fee : 0} placeholder="신청금액+수수료"/>
          </div>
        </div>
        <button style={{ height: "36px" }} onClick={click} className="btn btn-secondary d-block w-100 btn-sm">출금요청</button>
        <div className="border-top text-muted dotum pt-3 pl-3">
          <b> KRW 출금 전 알아두세요.  </b><br />
          최소출금 금액: {minAmount} KRW<br />
          충전된 KRW포인트를 회원님의 은행계좌에 환급 받을 수 있습니다.<br />
          출금은 본인 명의 계좌로만 가능합니다.
        </div>
      </div>
    </div>
  )
}

const Coin = (props) => {
  let [coinOutAdd, setCoinOutAdd] = useState('')
  let [amount, setAmount] = useState(0)
  let { balances = {}, coinInfo={} } = useSelector(s => ({
    balances: s.user.balances,
    coinInfo: s.coins.coinImg,
  }))

  let [feeInfo, setFeeInfo] = useWithdrawFee()
  let [fee, setFee] = useState(1000)
  let [minAmount, setMinAmount] = useState(coinInfo[props.coin].minWithdraw)

  let dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(feeInfo).length !== 0) {
      setFee(parseFloat(feeInfo[props.coin]['user']))
    }
  }, [feeInfo, props.coin])

  let withdrawReq = async () => {
    if (!amount || !coinOutAdd) {
      dispatch(onOpen({
        title: '입/출금 경고',
        body: '출금주소 or 출금신청금액이 비었습니다.',
        errorCode: null,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return
    }
    
    // 신청금액 만큼 코인을 받는 사람이 받도록 하기 위해
    // 신청금액 + 수수료만큼 코인이 차감된다.
    if ((parseFloat(amount) + parseFloat(fee)) < parseFloat(balances[props.coin].availableBalance)) {
      dispatch(onOpen({
        title: '입/출금 경고',
        body: `출금 가능한 ${props.coin} 보유자산이 부족합니다.`,
        errorCode: null,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }

    if (parseFloat(amount) < parseFloat(minAmount)) {
      dispatch(onOpen({
        title: '입/출금 경고',
        body: '출금신청 금액이 최소 금액보다 작습니다.',
        errorCode: null,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }
    
    let [data, errorMsg] = await coinWithdrawReq(coinOutAdd, amount, props.coin, coinInfo[props.coin].networkPlatform, '', localStorage.getItem('token'))
    setCoinOutAdd('')
    setAmount(0)
    if (errorMsg) {
      dispatch(onOpen({
        title: '입/출금 장애',
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }
    dispatch(onOpen({
      title: '입/출금 완료',
      body: '출금 신청이 완료되었습니다.',
      okMsg: '확인',
      cancelMsg: '취소'
    }))
    console.log(data)
  }

  const amountChange = e => {
    let amount = e.target.value || 0
    if (!isFinite(amount)) return
    amount = amount.toString()

    if (amount !== '0' &&  !amount.includes('.')) {
      amount = amount.replace(/^0+/,'')
    }

    setAmount(amount)
  }

  if (!balances[props.coin].publickey) {
    return (
      <CoinRegister coin={props.coin} />
    )
  }

  return (
    <div className="p-3">
      <div>
        <div className="d-flex mb-2 bd-highlight">
          <div className="flex-fill">출금가능금액</div>
          <div className="flex-fill"><h6 className="float-right"><NumberText value={balances[props.coin].availableBalance} /> <span className="text-muted font-11">{props.coin}</span></h6></div>
        </div>
        {/* <div className="d-flex mb-2 bd-highlight">
          <div className="flex-fill">일일최대 출금 금액</div>
          <div className="flex-fill"><h6 className="float-right">10,000,000 <span className="text-muted font-11">KRW</span></h6></div>
        </div> */}
        <hr className="pb-2" />
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">출금주소</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="출금주소를 입력해주세요" value={coinOutAdd} onChange={e => setCoinOutAdd(e.target.value)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">출금신청금액</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="신청금액을 입력하세요." value={amount} onChange={amountChange} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">수수료</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" placeholder="" value={amountCommas(fee)} disabled={true} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">실제출금금액</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="" value={amount > 0 ? amount + fee : 0}  disabled={true} placeholder="신청금액+수수료"/>
            {/* <NumberText  value={amount > 0 ? amount + fee : 0} /> */}
          </div>
        </div>

        <button style={{ height: "36px" }} onClick={withdrawReq} className="btn btn-secondary d-block w-100 btn-sm">출금요청</button>
        <div className="border-top text-muted dotum pt-3 pl-3">
          <b> {props.coin} 출금 전 알아두세요.  </b><br />
          최소출금 금액: {minAmount} {props.coin}<br />
          정확한 출금 주소를 입력해주세요.<br />
          잘못된 주소로 출금된 경우 책임지지 않습니다.
        </div>
      </div>

    </div>
  )
}

const WithdrawReq = (props) => {
  return (
    <div className="tab-pane fade" id="nav-withdraw" role="tabpanel" aria-labelledby="nav-buy-tab">
      {props.coin == "KRW" ? <Krw /> : <Coin coin={props.coin} />}
    </div>
  )
}

export default WithdrawReq