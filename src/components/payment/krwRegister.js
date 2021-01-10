import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { registerBank } from '../../apis/user'

import { onSetAccount } from '../../state/modules/user'

const KrwRegister = (props) => {
  let [ bankCd, setBankCd ] = useState('') // 은행명
  let [ bankAccount, setBankAccount ] = useState('') // 계좌번호
  let [ name, setName ] = useState('') // 예금주
  
  let dispatch = useDispatch()

  const click = async () => {
    console.log('은행명: ', bankCd)
    console.log('계좌번호: ', bankAccount)
    console.log('예금주: ', name)
    
    let data = await registerBank(bankCd, bankAccount, localStorage.getItem('token'))
    console.log(data)
    dispatch(onSetAccount(bankCd, bankAccount))
  }

  return (
    <div>
      <div className="p-3 d-block">

        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">은행명</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="은행명을 입력해주세요" onChange={e => setBankCd(e.target.value)}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label" >계좌번호</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="계좌번호를 입력해주세요." onChange={e => setBankAccount(e.target.value)}v />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label" >예금주</label>
          <div className="col-sm-10">
            <input className="form-control" placeholder="홍길동" onChange={e => setName(e.target.value)}/>
          </div>
        </div>
        <button style={{ height: "36px" }} className="btn btn-secondary d-block w-100 btn-sm" onClick={click}>입/출금 계좌등록</button>

      </div>
    </div>
  )
}

export default KrwRegister