import React from 'react'

import Modal from 'react-modal';

let BASE_WIDTH = 700
let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: `${BASE_WIDTH}px`,
    width: "100%",
    borderRadius: "5px"
  }
};


const LevelLimitModal = (props) => {
  const afterOpenModal = () => {
    customStyles.content.maxWidth = window.innerWidth < BASE_WIDTH ? `${window.innerWidth - 25}px` : customStyles.content.maxWidth
  }

  return (
    <div id="modal-level-limit">
      <Modal
        isOpen={props.isOpen}
        visible={props.isOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        ariaHideApp={false}
        maskClosable={true}
        closable={true}
      >
        <div className="modal-header">
            <h5 className="modal-title">보안등급별 1일 입출금한도</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={() => props.setIsOpenLevelLimitModal(false)}>×</span>
            </button>
          </div>

        <table className="table" >
          <thead style={{ textAlign: "center", border: "1px" }}>
            <tr>
              <th colSpan={3}>구분</th>
              <th>레벨1</th>
              <th>레벨2</th>
              <th>레벨3</th>
              <th>레벨4</th>
            </tr>
          </thead>

          <tbody style={{ textAlign: "center", border: "1px" }}>
            <tr>
              <td colSpan={3}>인증방법</td>
              <td>이메일인증</td>
              <td>OTP인증</td>
              <td>입출금계좌인증</td>
              <td>KYC인증</td>
            </tr>

            <tr>
              <td rowSpan={2} style={{ verticalAlign: 'middle' }}>입금한도</td>
              <td colSpan={2}>KRW</td>
              <td>0원</td>
              <td>0원</td>
              <td colSpan={2}>무제한</td>
            </tr>
            <tr>
              <td colSpan={2}>디지털자산</td>
              <td>0원</td>
              <td colSpan={3}>무제한</td>
            </tr>

            <tr>
              <td rowSpan={3} style={{ verticalAlign: 'middle' }}>출금한도</td>
              <td rowSpan={2} style={{ verticalAlign: 'middle' }}>KRW</td>
              <td>1회</td>
              <td>0원</td>
              <td>0원</td>
              <td>20,000,000원</td>
              <td>50,000,000원</td>
            </tr >
            <tr>
              <td>1일</td>
              <td>0원</td>
              <td>0원</td>
              <td>50,000,000원</td>
              <td>200,000,000원</td>
            </tr>
            <tr>
              <td colSpan={2}>디지털자산</td>
              <td>0원</td>
              <td>2,000,000원</td>
              <td>100,000,000원</td>
              <td>1,000,000,000원</td>
            </tr >
          </tbody >
        </table >
      </Modal>
    </div>
  )
}

export default LevelLimitModal