import React from 'react'
import { useDispatch } from 'react-redux'
import queryString from 'query-string';

import { onOpen } from '../../state/modules/modals'

import { emailVerify } from '../../apis/auth'
import './css/emailCertification.css'

let EmailCertification = (props) => {
  let dispatch = useDispatch()

  let confirm = async ()=> {
    let token = queryString.parse(props.history.location.search).token
    let [ data, errorMsg ] = await emailVerify(token)
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
    window.location = '/user/signin'
  }

  return (
    <div id="emailCertification" style={{minHeight: `${window.innerHeight-325}px`}}>
      <div className="jb-wrap" >
        <div className="jb-image">
          <img src="https://w.namu.la/s/b3d6f67b0a94e19b2ea20fd853bddbe13c294107acef8deff91d1b91ff99398ac488f17fcb0f4e3a8a3c75766034912f1367d291e6143f388cc81e9c724a07438d06211307a92b616cf34fb191e8db1f7f7e9f75a894f3eb2c6a872ebbf00e00" alt="" />
        </div>

        <div className="jb-text">
          <div className="jb-text-table">
            <div className="jb-text-table-row">
              <div className="jb-text-table-cell" style={{height: "36px"}}>
                <p>
                  <button onClick={confirm}>메일인증 완료</button>
                </p>
              </div>
            </div>
          </div>
        </div>

		  </div>
    </div>
  )
}

export default EmailCertification