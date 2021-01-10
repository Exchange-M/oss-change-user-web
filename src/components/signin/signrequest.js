import React from 'react'
import { Link } from "react-router-dom";

// 가입인증 이메일 재요청
let SignRequest = (props) => {
  return (
    <div id="" style={{ marginTop: "20px" }}>
      <div id="container" className="container mt11 mb-4">
        <div className="card max-width5 box-shadow">
          <div className="card-header"><h5>가입 인증 이메일 재요청</h5></div>
          <form className="p-3">
            <div className="form-group">
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="이메일" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">가입 인증 이메일 재요청 </button>
            </div>
            <div className="form-group">
              <Link to="/user/signrequestpwd"><button type="submit" className="btn btn-light btn-block">비밀번호 복구 요청 </button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignRequest