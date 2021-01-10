import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import QRImage from 'react-qr-image'

import { createOtp, confirmOtp, deleteOtp } from '../../apis/auth'

import { onOpen } from '../../state/modules/modals'
import { onSignout } from '../../state/modules/user'

let Otp = (props) => {
  // let [ password, setPassword ] = useState('')
  let [otpToken, setOtpToken] = useState('')
  let [otpSecret, setOtpSecret] = useState('')
  let [otpUrl, setOtpUrl] = useState('')

  let dispatch = useDispatch()

  let { userInfo = {} } = useSelector(s => ({
    userInfo: s.user.info
  }))

  useEffect(() => {
    if (!userInfo.isOTP) {
      (async () => {
        let [data, errorMsg] = await createOtp(userInfo.email, localStorage.getItem('token'))
        console.log(data)
        console.log(errorMsg)
        setOtpSecret(data.otpSecret)
        setOtpUrl(data.url)
      })()
    }
  }, [userInfo])


  // OTP 활성화
  let activeBtnClick = async () => {
    console.log(otpSecret, otpToken)
    let [data, errorMsg] = await confirmOtp(otpSecret, otpToken, localStorage.getItem('token'))
    console.log(data, errorMsg)
    if (errorMsg) {
      dispatch(onOpen({
        title: '인증실패',
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))

      return
    }
    dispatch(onOpen({
      title: 'OTP 활성화 완료',
      body: 'OTP 활성화가 완료되었습니다. 다시 로그인 해주세요.',
      errorCode: false,
      okMsg: '확인',
      cancelMsg: '취소'
    }))
    dispatch(onSignout())
  }

  // OTP 비활성화
  let unactiveBtnClick = async () => {
    let [data, errorMsg] = await deleteOtp(otpToken, localStorage.getItem('token'))
    console.log(data, errorMsg)
    if (errorMsg) {
      dispatch(onOpen({
        title: '인증실패',
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))

      return
    }
    dispatch(onOpen({
      title: 'OTP 비 활성화 완료',
      body: 'OTP 비 활성화가 완료되었습니다. 다시 로그인 해주세요.',
      errorCode: false,
      okMsg: '확인',
      cancelMsg: '취소'
    }))
    dispatch(onSignout())

  }

  return (
    <div>
      <div className="col mb-3 pb-3">
        <div className="card shadow-sm bg-white rounded h-100">
          <div className="card-header"><h5 className="pt-2 pb-1 mb-0">OTP 설정</h5></div>
          <div className="pl-4 pr-4 mb-3 ">
            <div className=" p-3">
              <div className="card-body">

                <div className="custom-control custom-checkbox text-center">
                  {/* <input type="checkbox" className="custom-control-input" id="customCheck1" /> */}
                  {/* <label className="custom-control-label" htmlFor="customCheck1">확인하였습니다</label> */}
                </div>
              </div>
              <div className="alert alert-warning" role="alert">
                ①휴대폰에 구글OTP앱을 다운받아 설치한다. ②구글OTP를 실행하고 QR코드를 스캔한다. ③OTP6자리 코드를 입력한다.
					    </div>
              <button className="btn btn-secondary d-block w-100 btn-sm mx-auto mb-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=ko"
                  style={{ color: 'white' }}
                  target="_blank"
                >
                  Google OTP 설치
                </a>
              </button>
              <hr style={{ margin: "40px 0" }}></hr>

              <div className="form-group row">
                <div className="" style={{textAlign: 'center', margin: "auto"}}>
                  <h5 className="card-title text-center ">{otpSecret}</h5>
                  <p className="text-center">
                    <QRImage text={otpUrl} width="160" height="160" />
                  </p>
                  <p className="text-center text-muted">
                    - 본코드는 OTP를 활성화시킬 때마다 변경<br />
                    - 비활성화시키면 본 코드는 사용 불가
                  </p>
                </div>
              </div >
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">이메일</label>
                <div className="col-sm-10">
                  <input type="" className="form-control" id="" placeholder="E-mail" disabled={true} value={userInfo.email} />
                </div>
              </div>
              {/* <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">비밀번호</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" placeholder="비밀번호" value={password} onChange={e=> setPassword(e.target.value)} />
                </div>
              </div> */}
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">OTP코드</label>
                <div className="col-sm-10">
                  <input type="" className="form-control" id="inputPassword" placeholder="OTP코드" value={otpToken} onChange={e => setOtpToken(e.target.value)} />
                </div>
              </div>

              {userInfo.isOTP
                ? (
                  <button className="btn btn-secondary d-block w-100 btn-sm mx-auto" onClick={unactiveBtnClick}>
                    OTP 비활성화
                  </button>
                ) : (
                  <button className="btn btn-primary d-block w-100 btn-sm mx-auto" onClick={activeBtnClick}>
                    OTP 활성화
                  </button>
                )
              }

              <div className="alert alert-warning mt-3" role="alert">
                <b>안내</b><br />
                OTP 활성화/비활성화 완료시 로그아웃 됩니다.<br />
                OTP 활성화/비활성화 완료시 재로그인을 해주셍요.<br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp