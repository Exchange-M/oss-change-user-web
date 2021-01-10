import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

import { tempPasswordCreate, replyEmail } from '../../apis/user'

import { onOpen } from '../../state/modules/modals'

// 가입 이메일로 임시 비밀번호 발급
let SignRequestPwd = (props) => {
  let [ email, setEmail ] = useState('')
  let [ name, setName ] = useState('')

  let dispatch = useDispatch()

  let isValid = () => email && name

  const btnClickTempPw = async () => {
    if (!isValid()) {
      alert('빈 항목이 있습니다')
      return 
    }

    let [ data, errorMsg ] = await tempPasswordCreate(email, name)
    console.log(data, errorMsg)
    if (errorMsg) {
      dispatch(onOpen({
        title: '인증장애',
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return
    }

    // window.props.location="/user/signin"
    dispatch(onOpen({
      title: '처리완료',
      body: '임시비밀번호 발급을 완료했습니다. 메일을 확인해 주세요.',
      errorCode: '',
      okMsg: '확인',
      cancelMsg: '취소'
    }))
  }
  
  let btnClickReplyEmail = async () => {
    if (!isValid()) {
      alert('빈 항목이 있습니다')
      return 
    }

    let [ data, errorMsg ] = await replyEmail(email)
    console.log(data, errorMsg)
    if (errorMsg) {
      dispatch(onOpen({
        title: '인증장애',
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return
    }

    dispatch(onOpen({
      title: '처리완료',
      body: '인증메일 전송을 완료했습니다. 메일을 확인해 주세요.',
      errorCode: '',
      okMsg: '확인',
      cancelMsg: '취소'
    }))

  }

  return (
    <div id="" style={{ marginTop: "40px", minHeight: `${window.innerHeight-375}px`}}>
      <div id="container" className="container mt11 mb-4">
        <div className="card max-width5 box-shadow">
          <div className="card-header"><h5>임시비밀번호 발급 및 인증메일 재요청</h5></div>
          <div className="p-3">
            <div className="form-group">
              <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={e=> setEmail(e.target.value)} placeholder="이메일" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="exampleInputEmail1" value={name} onChange={e=> setName(e.target.value)} placeholder="이름" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" onClick={btnClickTempPw}>임시 비밀번호 발급 </button>
            </div>
            <div className="form-group">
            {/* <Link to="/user/signrequest"><button type="submit" className="btn btn-light btn-block" onClick={btnClickReplyEmail}>가입 인증 이메일 재요청 </button></Link> */}
            <button type="submit" className="btn btn-light btn-block" onClick={btnClickReplyEmail}>가입 인증 이메일 재요청 </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignRequestPwd