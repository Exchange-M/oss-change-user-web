import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postKyc } from '../../apis/auth'

import { onOpen } from '../../state/modules/modals'

let Kyc = (props) => {
  let [ idCard, setIdCard ] = useState(null)     // 신분증 사본
  let [ passport, setPassport ] = useState(null) // 여권

  let dispatch = useDispatch()

  const onChangePassportHandle = (e) => {
    console.log(e.target.files[0])
    setPassport(e.target.files[0])
  }
  const onChangeIdCarddHandle = (e) => {
    console.log(e.target.files[0])
    setIdCard(e.target.files[0])
  }

  const onSaveHandle = async () => {
    const formData = new FormData();
    formData.append('idCard', idCard);
    formData.append('passport', passport);

    let [ result, errorMsg ] = await postKyc(formData, localStorage.getItem('token'))

    if (errorMsg) {
      dispatch(onOpen({
        title: errorMsg.TITLE,
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return
    }
    dispatch(onOpen({
      title: '업로드 완료',
      body: '신분증/여권 업로드를 완료했습니다. 관리자가 승인할 때까지 기다려주세요.',
      errorCode: null,
      okMsg: '확인',
      cancelMsg: '취소',
      modePath: 'mypage'
    }))
  }

  return (
    <div>
      <div id="container" className="container submenu-container mb-3 bigin-m-4">
        <div className="row">
          <div className="col mb-3 pb-3">
            <div className="card shadow-sm bg-white rounded h-100">
              <div className="card-header"><h5 className="pt-2 pb-1 mb-0">본인 인증</h5></div>
              <div className="pl-4 pr-4 mb-3">
                <div className="card-deck text-center ">
                  <div className="card  mt-3 mb-4 box-shadow text-left h-100 mb-3 d-block">
                    <div className="card-header mb-2 bg-transparent"><h6> 본인 신분증 사본 </h6></div>
                    <img src="/static/images/sample-passport.png" className="img-fluid p-2" />
                    <p className="p-3 text-muted">   다음과 같이 메모를 기재하여 주세요. <br />
                      1.인증목적: 레벨인증 혹은 출금차단해제<br />
                      2.이메일: 회원가입시 입력한 이메일주소<br />
                      3.요청일자: 메모작성일 (예:2018년 4월 1일)<br /><br />

                      메모지를 부착한 신분증 또는 여권을 사진촬영이나 스캔합니다.<br />
                      메모가 없는 사본은 인정되지 않습니다.<br />
                      * 받은 사진은 실명확인 용도로만 사용됩니다.<br />
                      * 신분증에 부착된 메모는 반드시"자필:로 기재해야 합니다  <br />
                    </p>
                    <div className="input-group mb-3 p-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text font-12">신분증사본</span>
                      </div>
                      <div className="custom-file" >
                        <input type="file" className="custom-file-input" id="inputGroupFile01" style={{zIndex: 0}} onChange={onChangeIdCarddHandle}/>
                        <label className="custom-file-label" htmlFor="inputGroupFile01" style={{zIndex: 0}}>{idCard? idCard.name : '파일선택하기'}</label>
                      </div>
                    </div>
                  </div>
                  <div className="card  mt-3 mb-4 box-shadow text-left h-100 mb-3 d-block " style={{ minHeight: "552px" }}>
                    <div className="card-header mb-2 bg-transparent"><h6> 거주지 증명 서류 </h6></div>
                    <img src="/static/images/sample-residency.png" className="img-fluid p-2" />
                    <p className="p-3 text-muted" style={{ lineHeight: "160%" }}>
                      인증을 위해 3개월 이내의 본인 이름과 주소가 명시된 청구서를 제출하여 주십시오. <br />
                      1. 수도세, 전기세, 휴대폰 청구서 등 <br />
                      2. 전자 청구서 및 스크린샷은 불가<br />
                      3. 선명한 사진 또는 스캔본<br />
                      4. 고화질 파일 (컬러, 300dpi 이상)<br />
                      5. JPG、JPEG、PNG  5MB이하<br /><br />
                      * 받은 사진은 실명확인 용도로만 사용됩니다.<br />
                    </p>
                    <div className="input-group mb-3 p-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text font-12">거주지증명서류</span>
                      </div>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile02" style={{zIndex: 0}} onChange={onChangePassportHandle}/>
                        <label className="custom-file-label" htmlFor="inputGroupFile02" style={{zIndex: 0}}>{passport? passport.name : '파일선택하기'}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p-2">
                  <button className="btn btn-dark p-2 btn-sm btn-block mx-auto" onClick={onSaveHandle}>인증 요청</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kyc