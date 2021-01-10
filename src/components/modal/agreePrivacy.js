// 개인정보동의
import React from 'react'

import Modal from 'react-modal';

let BASE_WIDTH = 700
let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    maxHeight: "80%",
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: `${BASE_WIDTH}px`,
    width: "100%",
    borderRadius: "5px",
    overflowY: "scroll"
  }
};

const AgreePrivacyModal = props => {
  const afterOpenModal = () => {
    customStyles.content.maxWidth = window.innerWidth < BASE_WIDTH ? `${window.innerWidth - 25}px` : customStyles.content.maxWidth
  }

  return (
    <div id="agree" className="form-group">
      <Modal
        isOpen={props.isOpen}
        visible={props.isOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        ariaHideApp={false}
        maskClosable={true}
        closable={true}
      >

        <div className="modal-header" style={{margin: "10px 0"}}>
          <h5 className="modal-title">개인정보 수집 및 이용 동의</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" onClick={() => props.onClose(false)}>×</span>
          </button>
        </div>
        
        <div className="terms-wrap peivacy-wrap" style={{padding: "0px 20px"}}>
          <div className="terms-wrap-content peivacy-content dotum">
            {/* <h4 className="title1">개인정보 수집 및 이용 동의</h4> */}
            <div>
              서비스와 관련하여 아래의 목적으로 개인정보를 수집 및 이용하며, 회원의 개인정보를 안전하게 취급하는 데 최선을 다합니다.
            </div>
            <br></br>

            <h3 className="title2">1. 수집항목</h3>
            <div>
              회원가입 및 서비스 이용을 위해 필요한 최소한의 개인정보만을 수집합니다.
            </div>
            <div>
              <ol style={{ padding: "0px 20px" }}>
                <li>
                  회원가입 시점에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
              <div className="ex-box">
                    - 이메일주소, 비밀번호, 닉네임, 이벤트 정보 수신 여부(선택)
              </div>
                </li>
                <li>
                  서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
              <div className="ex-box">
                    - 보안등급 상향을 위한 추가인증, 개별 서비스 이용, 이벤트 응모 및 경품 신청, 민원 처리 과정에서 해당 서비스의 이용자만 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관 기간’에 대해 안내해 드리고 동의를 받습니다.
              </div>
                </li>
                <li>
                  서비스 이용과정에서 아래와 같은 정보들이 생성되어 수집·이용될 수 있습니다.
              <div className="ex-box">
                    - 단말기 정보(OS, 화면 크기, 디바이스 아이디, MAC 주소, UUID), IP주소, 서비스 이용기록, 이용자 상태정보, 쿠키
              </div>
                </li>
              </ol>
            </div>

            <h3 className="title2">2. 수집목적</h3>
            <div>
              이용자의 개인정보를 다음과 같은 목적으로만 이용합니다.
        </div>
            <div>
              <ol style={{ padding: "0px 20px" }}>
                <li>
                  이용자 정보 관리1) 이용자 정보 관리
              <div className="ex-box">
                    - 이용자 식별, 이용자 정보 관리, 각종 고지사항 전달
              </div>
                  <div className="ex-box">
                    - 이용자 상담 및 민원처리, 고객 피해보상
              </div>
                  <div className="ex-box">
                    - 비대면 본인 인증을 통한 탈퇴 처리, 휴대폰 번호 및 출금계좌 초기화 등
              </div>
                </li>
                <li>
                  서비스 제공
              <div className="ex-box">
                    - 본인 확인 및 디지털 자산 거래 관계 확인
              </div>
                  <div className="ex-box">
                    - 디지털 자산 거래 관계의 설정·유지·해지 등 서비스 관리 전반에 관한 사항 등
              </div>
                </li>
                <li>
                  이벤트 정보 안내
              <div className="ex-box">
                    - 각종 이벤트 및 광고성 정보 제공
              </div>
                  <div className="ex-box">
                    - 신규 서비스 및 맞춤형 서비스 제공 등
              </div>
                </li>

              </ol>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AgreePrivacyModal