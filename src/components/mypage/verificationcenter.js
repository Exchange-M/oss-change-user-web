import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import LevelLimitModal from '../modal/levelLimit'
import { NumberText } from '../../components/atomic/input'

import './css/verificationcenter.css'

let VerificationCenter = (props) => {
  let [ isOpenLevelLimitModal, setIsOpenLevelLimitModal ] = useState(false)
  let { userInfo={} } = useSelector(s => ({
    userInfo: s.user.info
  }))
  const getLevel = () => userInfo.isEmail + userInfo.isOTP + (userInfo.bankCd && 1) +( userInfo.isKYC > 0  && 1)
  
  let [ limitPrice, setLimitPrice ] = useState(getLevel() === 1 ? 0 : getLevel() === 2 ? 2000000 : getLevel() === 3? 10000000: getLevel() === 4? 100000000: 0)

  return (
    <div id="mypage-verification-center" className="row" style={{marginRight: "0px"}}>
      <div className="col verification-bg rounded-left position-relative">
        <div >
          <div className="w-100 mt-3 mb-4">
            <span className="verification-lv mb-1"> 
              {/* {userInfo.level} */}
              {getLevel()}
              <em>LV </em></span>
            <span className="text-center d-block">
              <h6>Test 님은<br/> 현재 <b>{getLevel()}레벨 </b> 입니다 </h6>   입금한도 : 무제한
						</span>
          </div>
          <div className="col">
            <table className="table w-75 mx-auto mt-5 table-borderless ">
              <tbody style={{textAlign: "center"}}>
                <tr>
                  <th colSpan="2" className="text-center" style={{borderBottom: "1px solid #4eb0e0", borderTop: "1px solid #4eb0e0"}}>출금한도</th>
                </tr>
                <tr>
                  <td>원화</td>
                  <td>
                    <NumberText value={limitPrice} /> KRW 
                  </td>
                </tr>
                <tr>
                  <td>비트코인</td>
                  <td>
                    <NumberText value={limitPrice} /> KRW 
                  </td>
                </tr>
                <tr>
                  <td>이더리움</td>
                  <td>
                    <NumberText value={limitPrice} /> KRW 
                  </td>
                </tr>
              </tbody></table>
            <button type="button" className="mx-auto btn btn-outline-light btn-round d-block" data-toggle="modal" data-target="#lvInfo" onClick={() => setIsOpenLevelLimitModal(true)}>  등급별한도 보기</button>
          </div>
        </div>
        <div className="layer-login-deco"></div>
      </div>
      <div className="col">
        <div className="pt-5 pl-4 pr-5 mb-2 verification-form">
          <ul>
            <li className={`step1 ${userInfo.email? 'active': ''}`}>
              <span className="step1"> <i> </i></span>
              <em>레벨1 </em> <h6 className="d-inline explain">이메일인증</h6>
              <button type="button" className={`btn ${userInfo.email? 'btn-outline-primary': 'btn-outline-dark'} btn-sm float-right align-middle`} disabled="">{userInfo.email}</button>
            </li>
            {/* <li className={`step2 ${userInfo.isPhone? 'active': ''}`}>
              <span className="step2"> <i> </i></span>
              <em>레벨2-1 </em><h6 className="d-inline explain">휴대폰 본인인증 </h6>
              <button type="button" className={`btn ${userInfo.isPhone? 'btn-outline-primary': 'btn-outline-dark'} btn-sm float-right align-middle`}>
              {userInfo.isPhone == 2 ? "인증완료": "인증하기"}
              </button>
            </li> */}
            <li className={`step5 ${userInfo.isOTP? 'active': ''}`}>
              <span className="step5"> <i> </i></span>
              <em>레벨2 </em><h6 className="d-inline explain">OTP 설정 </h6>
              <button type="button" className={`btn ${userInfo.isOTP? 'btn-outline-primary': 'btn-outline-dark'} btn-sm float-right align-middle`} onClick={()=> document.getElementById('otp-tab').click()}>보안설정</button>
            </li>
            <li className={`step4 ${userInfo.bankCd? 'active': ''}`}>
              <span className="step4"> <i> </i></span>
              <em>레벨3 </em><h6 className="d-inline explain">계좌인증 </h6>
              <Link to="/payment"><button type="button" className={`btn ${userInfo.bankCd? 'btn-outline-primary': 'btn-outline-dark'} btn-sm float-right align-middle`} >계좌관리</button></Link>
            </li>
            <li className={`step3 ${userInfo.isKYC == 2? 'active': ''}`}>
              <span className="step3"> <i> </i></span>
              <em>레벨4 </em><h6 className="d-inline explain">본인인증 </h6>
              <button type="button" className={`btn ${userInfo.isKYC == 2 ? 'btn-outline-primary': 'btn-outline-dark'} btn-sm float-right align-middle`} disabled="" onClick={()=> {if (!userInfo.isKYC ) return document.getElementById('kyc-tab').click()}}>
                {userInfo.isKYC == 2 ? "인증완료": userInfo.isKYC == 1? "인증대기": "인증하기"}
              </button>
            </li>
          
          </ul>
        </div>
        {/* <div className="alert alert-secondary w-75 mx-auto mt-5" role="alert">본인인증 후 회원 2등급으로 전환되며, 이후 거래소를 이용하실 수 있습니다. 본인인증 완료 후 입금/출금이 가능합니다. </div> */}
      </div>

      <LevelLimitModal 
        isOpen={isOpenLevelLimitModal} 
        setIsOpenLevelLimitModal={setIsOpenLevelLimitModal}
      />
    </div>
  )
}

export default VerificationCenter