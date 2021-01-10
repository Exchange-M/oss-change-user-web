import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import QRImage from 'react-qr-image'
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { onOpen } from '../../state/modules/modals'

import KrwRegister from './krwRegister'
import CoinRegister from './coinRegister'

import { krwDepositReq } from '../../apis/deposit'

const Krw = (props) => {
  let { bankCd= "", bankAccount="", userName} = useSelector(s => ({
    bankCd: s.user.info.bankCd,
    bankAccount: s.user.info.bankAccount,
    userName: s.user.info.name
  }))

  let dispatch = useDispatch()

  let [ amount, setAmount ] = useState(0)
  let [ note, setNote ] = useState('')

  let click = async () => {
    let [data, errorMsg] = await krwDepositReq(amount, note, localStorage.getItem('token'))
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
      body: "입금 신청이 완료되었습니다.\n\n입금 시 다음 핀번호를 메모란에 입력해주세요.\n\n핀번호:"+data.pinNum.toString(),
      okMsg: '확인',
      cancelMsg: '취소'
    }))
    
    console.log('화면에 뜬 핀번호를 입금시 메모란에 정확히 입력해야 입금처리가 정상적으로 됩니다.')
  }

  const priceChange = e => {
    let price = e.target.value || 0
    if (!isFinite(price)) return
    price = price.toString()
    
    if (price !== '0' && !price.includes('.')) {
      price = price.replace(/^0+/,'')
    }
    
    setAmount(price)
  }

  if (!bankCd) {
    return (
      <KrwRegister />
    )
  }

  return (
    <div>
      <div className=" p-3">
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">입금자명</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="회원이름" disabled={true} value={userName}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">입금금액</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="금액을 입력해주세요." value={amount} onChange={priceChange} />
          </div>
        </div>
        <button style={{height: "36px"}} onClick={click} className="btn btn-secondary d-block w-100 btn-sm mb-2">원화 입금요청</button>
      </div>
      <div className="border-top text-muted dotum pt-3 pl-3">
        <b> 입금할 계좌번호  </b><br />
        은행명 : XX 은행<br />
        예금주 :  멍개<br />
        계좌번호 : XXX-XXXX-XXXXX <br /><br />
        <b>입금 안내사항 </b><br />
        이전에 입금 이력이 있더라도, 매번 동일한 입금절차를 거치셔야 합니다.<br />
        원화(KRW)를 처음 입금하시는 경우, 72시간 동안 암호화폐 출금이 전면 제한됩니다.<br />
        입금 예약은 최대 25회까지 가능하며, 추가 입금 예약을 접수하기 위해서는<br /> 대기 중인 입금예약건이 입금완료 되어야 합니다.
      </div>
    </div>
  )
}
const Coin = (props) => {
  let { balances= {}} = useSelector(s => ({
    balances: s.user.balances,
  }))
  let dispatch = useDispatch()

  let handleByCopyButtonClick = (copiedCoin) => {
    dispatch(onOpen({
      title: '복사완료',
      body: `${copiedCoin} 복사완료`,
      okMsg: '확인',
      cancelMsg: '취소'
    }))
  }

  if (!balances[props.coin].publickey) {
    return (
      <CoinRegister coin={props.coin}/>
    )
  }

  return (
    <div className=" p-3">
      <p className="text-center">
        <QRImage text={balances[props.coin].publickey} width="160" height="160"/>
      </p>
      <div className="input-group mb-3" style={{ marginTop: "20px" }}>
        <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2" value={balances[props.coin].publickey ? balances[props.coin].publickey: ''} disabled={true} />
        <div className="input-group-append">
        <CopyToClipboard 
          text={balances[props.coin].publickey}
          onCopy={() => handleByCopyButtonClick(balances[props.coin].publickey)}
        >
          <button className="btn btn-outline-secondary btn-sm" type="button">복사</button>
        </CopyToClipboard>
        </div>
      </div>
      <div className="alert alert-warning" role="alert">
        위 전자지갑 주소로 코인을 입금해주세요.<br />
        네트워크에서 입금거래가 1 confirmation이 발생한 이후 자동 반영됩니다.<br />
        반영 시점 : 코인 입금 거래 후, 10~30분 이후 자동으로 반영됩니다.
      </div>

      <div className="border-top text-muted dotum pt-3 pl-3">
        <b>입금 안내사항 </b><br />
        이전에 입금 이력이 있더라도, 매번 동일한 입금절차를 거치셔야 합니다.<br />
        {props.coin} 네트워크 환경에 따라 입금이 지연될 수 있습니다.
      </div>
    </div>
  )
}

const DepositReq = (props) => {

  return (
    <div className="tab-pane fade active show" id="nav-deposit" role="tabpanel" aria-labelledby="nav-buy-tab">
      {
        props.coin == "KRW"? <Krw />: <Coin coin={props.coin}/>
      }
    </div>
  )
}

export default DepositReq