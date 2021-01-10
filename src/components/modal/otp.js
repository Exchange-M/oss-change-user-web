import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Modal from 'react-modal';

import { signinByOtp } from '../../apis/auth'
import { getUser } from '../../apis/user'
import { onSignin } from '../../state/modules/user'

import { onOpen } from '../../state/modules/modals'
import socket from '../../utils/socket'


let BASE_WIDTH = 500
let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: `${BASE_WIDTH}px`,
    width: "100%"
  }
};

export const OtpSignin = props => {
  // let [ isOpen, setIsOpen ] = useState(props.isOpen)
  let [ otpCode, setOtpCode ] = useState('')
  let [ errorMsg, setErrorMsg ] = useState('')
  let dispatch = useDispatch()

  const afterOpenModal = () => {
    customStyles.content.maxWidth = window.innerWidth < BASE_WIDTH ? `${window.innerWidth - 25}px` : customStyles.content.maxWidth
  }

  const onSigninEnter = async(e) => {
    console.log(e)
    if (e.key === 'Enter') {
      signinBtnClick()
    }
  }

  const signinBtnClick = async () => {
    let [data, errorMsg] = await signinByOtp(props.email, otpCode)
    console.log(data, errorMsg)
    if (errorMsg) {
      setErrorMsg(errorMsg.MSG)
      let SETTIMEOUT_NAME = setTimeout(() => {
        setErrorMsg('')
        return clearTimeout(SETTIMEOUT_NAME)
      }, 1000);

      return
    }

    let [userInfo, em] = await getUser(data.token)
    console.log(userInfo, em)
    if (em) {
      dispatch(onOpen({
        title: '인증실패',
        body: em.MSG,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return 
    }
    let balances = {...userInfo.balances}
    delete userInfo.balances
    socket.setTokenEmit(data.token)
    dispatch(onSignin(data.token, balances, userInfo))
    window.location='/'
  }

  return (
    <div id="modal-otp">
      <Modal
        isOpen={props.isOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="OTP Signin"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">OTP 인증</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={() => props.onClose(false)}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <input 
              type="text" 
              className="form-control" 
              value={otpCode} 
              onChange={e=> setOtpCode(e.target.value)} 
              placeholder="OTP 6자리 번호" 
              onKeyPress={onSigninEnter}
            />
            
            <div style={{marginTop: 10, color: "red"}}>
              <p>{errorMsg}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => props.onClose(false)} data-dismiss="modal">취소</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={signinBtnClick}>확인</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}