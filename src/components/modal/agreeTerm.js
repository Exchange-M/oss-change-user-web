// 이용약관 동의
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

const AgreeTermModal = props => {
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
        <div className="modal-header" style={{ margin: "10px 0" }}>
          <h5 className="modal-title">이용약관 동의</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" onClick={() => props.onClose(false)}>×</span>
          </button>
        </div>

        <div className="terms-wrap-content dotum" style={{ padding: "0px 20px" }}>
          {/* <h1 className="title1">이용약관 동의</h1> */}

          <h3 className="title2">제1조 (목적)</h3>
          <div style={{ padding: "0px 10px" }}>

          </div>

          <h3 className="title2">제 2조 (정의)</h3>
          <div>

          </div>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 3조 (약관의 게시와 개정)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 4조 (약관의 해석)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 5조 (이용계약 체결)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
         </li>
            <li>
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
            <li>
         </li>
            <li>
         </li>
          </ol>

          <h3 className="title2">제 6조 (회원 정보의 변경)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 7조 (회원 정보의 관리)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 8조 (개인정보의 보호)</h3>
          <div style={{ padding: "0px 10px" }}>
        </div>

          <h3 className="title2">제 9조 (회사의 의무)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 10조 (회원의 의무)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
              회원은 아래의 행위를 하여서는 안 됩니다.
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 11조 (게시물의 저작권)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 12조 (게시물의 이용권)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 13조 (게시물의 관리)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 14조 (권리의 귀속)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 15조 (서비스의 제공 등)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 16조 (서비스의 변경)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 17조 (서비스의 이용)</h3>
          <ol style={{ padding: "0px 30px" }}>
            
            <li>
          </li>
            
            <li>
          </li>
            <li>
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
            <li>
          </li>
            <li>
          </li>
            
          </ol>

          <h3 className="title2">제 18조 (서비스 이용 관련 유의사항)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
           
            <li>
          </li>
           
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 19조 (서비스 수수료)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 20조 (이용제한 등)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
              회사는 다음 각호에 해당하면 회원의 서비스 로그인을 제한할 수 있습니다.
              <div className="ex-box">
              </div>
              <div className="ex-box">
              </div>
              <div className="ex-box">
              </div>
              <div className="ex-box">
              </div>
              <div className="ex-box">
              </div>
              <div className="ex-box">
              </div>
              <div className="ex-box">
              </div>
              <div className="ex-box">
              </div>
            </li>
            <li>
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 21조 (이용계약 해지)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 22조 (회원에 대한 통지)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 23조 (책임 제한)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
            <li>
            <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
              <div className="ex-box">
            </div>
            </li>
          </ol>

          <h3 className="title2">제 24조 (대금결제)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 25조 (청약철회)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
          </li>
            <li>
          </li>
            <li>
          </li>
          </ol>

          <h3 className="title2">제 26조 (청약철회 등의 효과)</h3>
          <div style={{ padding: "0px 10px" }}>
        </div>

          <h3 className="title2">제 27조 (과오납금의 환불)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
            </li>
            <li>
            </li>
            <li>
            </li>
            <li>
            </li>
          </ol>

          <h3 className="title2">제 28조 (유료 콘텐츠의 환불)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>
              <div className="ex-box">
              </div>
              <div className="ex-box">

              </div>
            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
          </ol>

          <h3 className="title2">제 29조 (준거법 및 재판관할)</h3>
          <ol style={{ padding: "0px 30px" }}>
            <li>

            </li>
            <li>

            </li>
          </ol>

          <h1 className="title2" style={{ marginTop: "20px" }}>부칙</h1>
          <h6>이 약관은 20xx년 xx월 xx일부터 적용됩니다.</h6>
        </div>
      </Modal>
    </div>
  )
}

export default AgreeTermModal