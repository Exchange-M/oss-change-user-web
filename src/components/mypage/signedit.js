import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changePassword } from '../../apis/user'

import { onOpen } from '../../state/modules/modals'
import { onSignout } from '../../state/modules/user'

let Signedit = (props) => {
  
  let [ currentPassword, setCurrentPassword ] = useState('')

  let [ newPassword1, setNewPassword1 ] = useState('')
  let [ newPassword2, setNewPassword2 ] = useState('')

  let { userInfo={} } = useSelector(s => ({
    userInfo: s.user.info
  }))

  let dispatch = useDispatch()

  let onSubmitClick= async () => {
    if (!currentPassword || !newPassword1 || !newPassword2 ) {
      dispatch(onOpen({
        title: '비밀번호 변경실패',
        body: '항목이 비었습니다.',
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return
    } else if (newPassword1 !== newPassword2) {
      dispatch(onOpen({
        title: '비밀번호 변경실패',
        body: '새로운 비밀번호가 일치하지 않습니다.',
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return
    }

    if (currentPassword == newPassword1 == newPassword2) {
      dispatch(onOpen({
        title: '비밀번호 변경실패',
        body: '변경할 비밀번호가 현재 비밀번호와 같습니다.',
        okMsg: '확인',
        cancelMsg: '취소'
      }))
      return
    }

    let [data, errorMsg] = await changePassword(userInfo.email, currentPassword, newPassword1, newPassword2, localStorage.getItem('token'))
    console.log(data)
    console.log(errorMsg)
    if (errorMsg){
      dispatch(onOpen({
        title: '비밀번호 변경실패',
        body: errorMsg.MSG,
        errorCode: errorMsg.CODE,
        okMsg: '확인',
        cancelMsg: '취소'
      }))
    }
    
    // 변경 성공시 로그아웃 처리
    dispatch(onSignout())
    window.location = '/'
  }

  return (
    <div>
      <div className="col mb-3 pb-3">
        <div className="card shadow-sm bg-white rounded h-100">
          <div className="card-header"><h5 className="pt-2 pb-1 mb-0">회원정보 변경</h5></div>
          <div className="pl-4 pr-4 mb-3 ">
            <div className=" p-3">
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">이메일</label>
                <div className="col-sm-10">
                  <input className="form-control" placeholder="E-mail" value={userInfo.email} disabled={true} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="id" className="col-sm-2 col-form-label">이름</label>
                <div className="col-sm-10">
                  <input className="form-control" id="id" placeholder="guest" value={userInfo.name} disabled={true} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">현재 비밀번호</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" placeholder="비밀번호를 입력해주세요" value={currentPassword} onChange={e=> setCurrentPassword(e.target.value)} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="newpassword" className="col-sm-2 col-form-label">새 비밀번호</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="newpassword" placeholder="새로운 비밀번호를 입력해주세요" value={newPassword1} onChange={e=> setNewPassword1(e.target.value)}/>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="passwordConfirm" className="col-sm-2 col-form-label">새 비밀번호 확인</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="passwordConfirm" placeholder="새로운 비밀번호를 다시한번 입력해주세요" value={newPassword2} onChange={e=> setNewPassword2(e.target.value)}/>
                </div>
              </div>
              <button className="btn btn-secondary d-block w-50 btn-sm mx-auto" onClick={onSubmitClick}>회원정보 변경</button>
            </div>
          
            <div className="alert alert-warning" role="alert" style={{marginTop: "20px"}}>
              <b>주의사항</b><hr></hr>
              기존에 사용한 비밀번호는 앞으로 1년간 사용할 수 없습니다.<br />
              현재 비밀번호 5회 오류시 해당 계정은 잠김상태가 됩니다.<br />
              새로 바꿀 비밀번호는 외부로 유출되는 사고 방지하셍요.<br /><br />
              <b>성공적으로 비밀번호가 변경되면, 로그아웃 처리됩니다.</b>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signedit