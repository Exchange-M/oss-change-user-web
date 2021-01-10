import React from 'react'
import { useDispatch } from 'react-redux'

import { createWallet } from '../../apis/balance'
import { onOpen } from '../../state/modules/modals'
import { onCreateWallet } from '../../state/modules/user'

const CoinRegister = (props) => {
  const dispatch = useDispatch()
  let createAddr = async () => {

    let [ result, errorMsg ] = await createWallet(props.coin, localStorage.getItem('token'))

    if(errorMsg) {
      dispatch(onOpen({
        title: errorMsg['TITLE'],
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }
    dispatch(onCreateWallet({
      publickey: result.publickey,
      coin: props.coin
    }))
    // TODO: balance dispatch 필요
    dispatch(onOpen({
      title: '지갑생성 완료',
      body: `${props.coin} 지갑생성을 완료했습니다.`,
      errorCode: null,
      okMsg: '확인',
      cancelMsg: '취소'
    }))

    return
  }

  return (
    <div className="p-3">
      <div>
        <button style={{height: "36px"}} onClick={createAddr} className="btn btn-secondary d-block w-100 btn-sm">주소생성</button> 
        <div className="border-top text-muted dotum pt-3 pl-3">
          <b> {props.coin} 입/출금 주소가 없습니다.  </b><br />
          {props.coin} 입/출금 하기 위해 입/출금 주소를 생성해주세요.<br />
        </div>
      </div>
    </div>
  )
}

export default CoinRegister