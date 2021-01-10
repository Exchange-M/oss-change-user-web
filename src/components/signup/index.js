import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

import { signup } from '../../apis/user'
import { onOpen } from '../../state/modules/modals'

import AgreeTermModal from '../modal/agreeTerm'
import AgreePrivacyModal from '../modal/agreePrivacy'

let Signup = () => {

  let [ email, setEmail ] = useState('')
  let [ pass1, setPass1 ] = useState('')
  let [ pass2, setPass2 ] = useState('')
  let [ secondName, setSecondName ] = useState('')
  let [ firstName, setFirstName ] = useState('')

  let [ check1, setCheck1 ] = useState(false) // 이용약관 동의
  let [ check2, setCheck2 ] = useState(false) // 개인정보 동의

  let [ isOpenAgreeTermModal, setIsOpenAgreeTermModal] = useState(false)
  let [ isOpenPrivacyTermModal, setIsOpenPrivacyTermModal] = useState(false)

  let dispatch = useDispatch()

  let onClickBtn = async () => {
    console.log(email, pass1, pass2, secondName, firstName, check1, check2)
    if (!email || !pass1 || !pass2 || !secondName || !firstName) {
      alert('빈 항목이 존재합니다')
      return
    }
    if (pass1 != pass2) {
      alert('입력한 비밀번호가 일치하지 않습니다.')
      return
    }
    if (!check1 || !check2) {
      alert('이용약관 동의 및 개인정보를 동의해야 합니다.')
      return
    }

    let [ data, errorMsg ] = await signup({
      email, password: pass1, name: secondName+firstName, 
    })
    console.log(data, errorMsg)
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

    dispatch(onOpen({
      title: '회원가입 성공',
      body: `${email}로 인증메일 발송했습니다. 인증 후 로그인해주세요.`,
      errorCode: false,
      okMsg: '확인',
      cancelMsg: '취소'
    }))
    // window.location='/user/signin'
  }

  return (
    <div style={{ marginTop: "40px", minHeight: `${window.innerHeight-305}px`}}>
      <div id="container" className="container mb-3 bigin-m-4">
        <div className="card max-width5 Regular shadow">
          <div className="card-header"><h5>회원가입</h5></div>
          <div className="p-3">
            <div className="form-group">
              <input style={{height: "44px"}} type="email" className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              이메일은 필수입력입니다.
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="false">×</span>
              </button>
            </div>

            <div className="form-group">
              <input style={{height: "44px"}} type="password" className="form-control form-control-sm" id="Password" placeholder="비밀번호" value={pass1} onChange={e => setPass1(e.target.value)} />
            </div>
            <div className="form-group">
              <input style={{height: "44px"}} type="password" className="form-control form-control-sm" id="confimPassword" placeholder="비밀번호 확인" value={pass2} onChange={e => setPass2(e.target.value)} />
            </div>
            <div className="form-group">
              <div className="col" style={{display: "flex", justifyContent: "space-between"}}>
                <input style={{height: "44px", width: "49%"}} type="text" className="form-control form-control-sm" placeholder="성" value={secondName} onChange={e => setSecondName(e.target.value)}/>
                <input style={{height: "44px", width: "49%"}} type="text" className="form-control form-control-sm" placeholder="이름" value={firstName} onChange={e => setFirstName(e.target.value)}/>
              </div>
              {/* <div className="col">
              </div> */}
            </div>
            
            <div className="form-group text-center"> CAPTCHA</div>

            <div className="col-auto my-1" style={{padding: "0 16px"}}>
              <div className="form-group  ml-2">
                <input type="checkbox" className="custom-control-input" id="policy" checked={check1} onChange={e=>setCheck1(e.target.value)} />
                <label className="custom-control-label" htmlFor="policy">이용약관 동의</label>
                {/* <Link to="/agree/terms"> */}
                  <button 
                    type="button" 
                    className="btn btn-light btn-sm" 
                    data-toggle="modal" 
                    data-target="#policy_content" 
                    style={{marginLeft: "15px"}}
                    onClick={() => setIsOpenAgreeTermModal(true)}
                  >
                    약관내용 보기 <i className="fas fas fa-external-link-alt"> </i>
                  </button>
                {/* </Link> */}

              </div>
              <div className="form-group ml-2">
                <input type="checkbox" className="custom-control-input" id="policy2" checked={check2} onChange={e=> setCheck2(e.target.value)} />
                <label className="custom-control-label" htmlFor="policy2">개인정보처리방침 동의</label>
                {/* <Link to="/agree/privacy"> */}
                  <button 
                    type="button" 
                    className="btn btn-light btn-sm" 
                    data-toggle="modal" 
                    data-target="#policy_content2" 
                    style={{marginLeft: "15px"}}
                    onClick={() => setIsOpenPrivacyTermModal(true)}
                  >
                    약관내용 보기 <i className="fas fas fa-external-link-alt"> </i>
                  </button>
                {/* </Link> */}
              </div>
            </div>
            <button type="submit" className="btn btn-dark btn-block mt-3" onClick={onClickBtn}>회원가입</button>
          </div>
        </div>
      </div>

      <AgreeTermModal isOpen={isOpenAgreeTermModal} onClose={setIsOpenAgreeTermModal}/>
      <AgreePrivacyModal isOpen={isOpenPrivacyTermModal} onClose={setIsOpenPrivacyTermModal}/>
    </div>
  )
}

export default Signup