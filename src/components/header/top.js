import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import { Link } from "react-router-dom";
import { onSignout } from '../../state/modules/user'

let Top = props => {
  const dispatch = useDispatch()
  const { isLogin=false, info={} } = useSelector(state => ({
    isLogin: state.user.authentication.isLogin,
    info: state.user.info
  }))
  
  return (
    <div id="top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-blue">
        <div className="container">
            
          <Link className="navbar-brand" to="/" ><img src="/static/images/common/logo.png" alt="logo"/></Link>
          
          <button onClick={() => props.openMenu()} className="navbar-toggler collapsed" type="button" data-toggle="offcanvas" data-target="#gnb" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse offcanvas-collapse" id="gnb">
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item ${props.path.includes('/exchange')? "active" : ""}`} onClick={() => props.setPath('/exchange')}>
                <Link className="nav-link" style={{color: "#abd2ee"}}to="/exchange">거래소 <span className="sr-only">(current)</span></Link>
              </li>
              <li className={`nav-item ${props.path.includes('/asset')? "active" : ""}`} onClick={() => props.setPath('/asset')}>
                <Link className="nav-link" style={{color: "#abd2ee"}}to="/asset">거래내역</Link>
              </li>
              <li className={`nav-item ${props.path.includes('/payment')? "active" : ""}`} onClick={() => props.setPath('/payment')}>
                <Link className="nav-link" style={{color: "#abd2ee"}}to="/payment">입출금</Link>
              </li>
              <li className={`nav-item ${props.path.includes('/mypage')? "active" : ""}`} onClick={() => props.setPath('/mypage')}>
                <Link className="nav-link" style={{color: "#abd2ee"}}to="/mypage">마이페이지</Link>
              </li>
              <li className={`nav-item ${props.path.includes('/support')? "active" : ""}`} onClick={() => props.setPath('/support')}>
                <Link className="nav-link" style={{color: "#abd2ee"}}to="/support">고객센터</Link>
              </li>
            </ul>
            
            {isLogin
              ? (
              <div className="nav-bar-logininfo">
                <i className="fas fa-user-circle fa-2x align-middle"></i> {info.name}님
              </div>
              ) 
              : (
              <div className="nav-bar-logininfo"></div>
              )
            }
            {isLogin
              ? (<button className="btn btn-outline-light btn-round"><Link className="user" to="/user/signin" onClick={() => dispatch(onSignout())}>로그아웃</Link></button>)
              : (
                <div>
                  <button className="btn btn-outline-light btn-round"><Link className="user" to="/user/signin" >로그인</Link></button>
                  <button className="btn btn-outline-light btn-round" style={{marginLeft: "5px"}}><Link className="user" to="/user/signup" >회원가입</Link></button>
                </div>
              )
            }
            
            {/* <div className="lang">
              <Link to="/" className="ko"><i className="fas fa-globe" style={{"fontSize": "14px"}}></i> </Link>
              <ul>
                <li className="ko"><a><span>KOR</span></a></li>
                <li className="en"><a><span>ENG</span></a></li>				
                <li className="zh"><a><span>CHN</span></a></li>			
              </ul>		
            </div> */}

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Top