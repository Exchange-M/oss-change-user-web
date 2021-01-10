import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

import { onSignin } from '../../state/modules/user'
import { onOpen } from '../../state/modules/modals'
import { signin, getUser } from '../../apis/user'

import { OtpSignin } from '../modal/otp'

import socket from '../../utils/socket'

let Signin = (props) => {
  const [ id, setId ] = useState(localStorage.getItem('savedId'))
  const [ password, setPassword ] = useState(localStorage.getItem('savedPw'))

  const [ idSaved, setIdSaved ] = useState(localStorage.getItem('savedId')? true : false)
  const [ pwSaved, setPwSaved ] = useState(localStorage.getItem('savedPw')? true : false)

  const [ otpCode, setOtpCode ] = useState('')

  const [ isOtpSignin, setIsOtpSignin] = useState(false)

  const dispatch = useDispatch()

  const onSigninEnter = async(e) => {
    console.log(e)
    if (e.key === 'Enter') {
      sign()
    }
  }

  const onSigninBtnClick = async() => {
    sign()
  }

  const sign = async () => {
    let [data, errorMsg] = await signin(id, password)
    
    if (idSaved) {
      localStorage.setItem('savedId', id)
    }
    if (pwSaved) {
      localStorage.setItem('savedPw', password)
    }

    if (errorMsg) {
      dispatch(onOpen({
        title: '인증실패',
        body: errorMsg.MSG,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
    } else {
      if (!data.info.isOTP) {
        let [userInfo, em] = await getUser(data.token)
        if (em) {
          dispatch(onOpen({
            title: '인증실패',
            body: em.MSG,
            okMsg: '확인',
            cancelMsg: '취소'
          }))
        }
          
        delete userInfo.balances
        socket.setTokenEmit(data.token)
        dispatch(onSignin(data.token, data.info.balances, userInfo))
        window.location='/'
        return
      } else { // OTP 로그인 팝업 띄우기
        setIsOtpSignin(true)
      }
    }
  }

  const idCheckHandle = () => {
    localStorage.removeItem('savedId')
    setIdSaved(!idSaved)      
  }
  const pwCheckHandle = () => {
    localStorage.removeItem('savedPw')
    setPwSaved(!pwSaved)    
  }

  return (
    <div id="user-signin" style={{marginTop: "60px"}}>
      <OtpSignin isOpen={isOtpSignin} onClose={setIsOtpSignin} email={id}/>

      <div id="container" className="container mb-3 bigin-m-4">
        <div className="card max-width5 box-shadow">
          <div className="card-header"><h5>Log-in</h5></div>
          <div className="p-3">
            <div className="form-group">
              <input 
                style={{height: "54px"}} 
                type="email" 
                className="form-control" 
                value={id} 
                onChange={(e) => setId(e.target.value)}  
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="아이디" 
              />
            </div>
            <div className="form-group">
              <input 
                style={{height: "54px"}} 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                id="exampleInputPassword1" 
                placeholder="비밀번호" 
                onKeyPress={onSigninEnter}
              />
            </div>
            <div className="mb-3 font13">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={idSaved} onChange={idCheckHandle} />
                <label className="form-check-label" htmlFor="inlineCheckbox1">아이디저장</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" defaultChecked={pwSaved} onChange={pwCheckHandle} />
                <label className="form-check-label" htmlFor="inlineCheckbox2">비밀번호저장</label>
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={onSigninBtnClick} >로그인 </button>
          </div>
          <div className="text-right p-2">
            <button type="button" className="btn btn-link btn-sm"><Link to="/user/signup">회원가입</Link></button>
            <button type="button" className="btn btn-link btn-sm"><Link to="/user/signrequestpwd">비밀번호 찾기</Link></button>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Signin