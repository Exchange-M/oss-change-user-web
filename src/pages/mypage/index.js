import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux"

import VerificationCenter from '../../components/mypage/verificationcenter'
import Signedit from '../../components/mypage/signedit'
import Connectioninfo from '../../components/mypage/connectioninfo'
import Otp from '../../components/mypage/otp'
import Kyc from '../../components/mypage/kyc'
import SubMenu from '../../components/submenu/common'

import { onSetHeaderTitle } from '../../state/modules/siteInfo'

import './css/mypage.css'

let MypageContainer = ({history}) => {
  const { isLogin=false } = useSelector(state => ({
    isLogin: state.user.authentication.isLogin
  }))

  let title='마이페이지'
  let tabs = ["verificationcenter", "signedit", "connectioninfo", "otp", "kyc"]
  let tabKrConvert = {
    verificationcenter: {kr: "인증센터", selected: "true"},
    signedit: {kr: "회원정보 변경", selected: "false"},
    otp: {kr: "otp", selected: "false"},
    kyc: {kr: "본인인증", selected: "false"},
    connectioninfo: {kr: "접속정보", selected:"false"},
  }

  let dispatch = useDispatch()

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    dispatch(onSetHeaderTitle({title: "마이페이지"}))
  }, [])

  useEffect(() => {
    if(!isLogin) history.push('/user/signin');
  }, [isLogin])

  if (!localStorage.getItem('token')) {
    history.push('/user/signin');
  }

  if (!isLogin && !localStorage.getItem('token')) {
    history.push('/user/signin');
  }

  return (
    <div id="mypage">
      <SubMenu title={title} tabs={tabs} tabKrConvert={tabKrConvert} /> 

      <div className="tab-content" style={{backgroundColor: '#FFFFFF', maxWidth: "1200px"}}>
        <div className="tab-pane fade show active" id="verificationcenter" role="tabpanel" aria-labelledby="faq-tab">
          <VerificationCenter />
        </div>
        <div className="tab-pane fade" id="signedit" role="tabpanel" aria-labelledby="guide-tab">
          <Signedit />
        </div>
        <div className="tab-pane fade" id="connectioninfo" role="tabpanel" aria-labelledby="notice-tab">
          <Connectioninfo />
        </div>
        <div className="tab-pane fade" id="otp" role="tabpanel" aria-labelledby="question-tab">
          <Otp />
        </div>
        <div className="tab-pane fade" id="kyc" role="tabpanel" aria-labelledby="question-tab">
          <Kyc history={history}/>
        </div>
      </div>
    </div>
  )
}

export default MypageContainer
