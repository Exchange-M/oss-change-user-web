import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

import { onSignout } from '../../state/modules/user'

let Right = props => {
  const dispatch = useDispatch()
  const { isLogin=false, info={} } = useSelector(state => ({
    isLogin: state.user.authentication.isLogin,
    info: state.user.info
  }))

  let itemClick = (p) => {
    props.closeMenu()
    props.setPath(p)
    // props.history.push(p)
  }

  let logout = () => {
    props.closeMenu()
    dispatch(onSignout())
  }
  return (
    <div id="right" className={`h-100 panel-bg ${props.isOpen ? 'open' : ''}`}>
      <ul className="list-group list-group-flush font-weight-light">
        <li className="list-group-item color64a">
          {
            isLogin
            ? (
              <div style={{display: 'inline'}}>
                <i className="fas fa-user-astronaut align-middle" style={{ "fontSize": "22px" }} onClick={() => props.closeMenu()}></i> {info.name}님
              </div>
            ) : (
                <div style={{display: 'inline'}}></div>
            )
          }
          
          
          <button onClick={() => props.closeMenu()} type="button" className="close text-light" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
        <li className="list-group-item">
          {
            isLogin
            ?  (
              <div className="row">
                {/* <button type="button" className="btn btn-outline-light btn-sm font-12 d-inline btn-round">로그아웃</button> */}
                <button className="btn btn-outline-light btn-sm font-12 w-100 d-inline"><Link className="user" to="/user/signin" onClick={logout}>로그아웃</Link></button>
              </div>
            ): (
              <div className="row">
                <div className="col">
                  <button className="btn btn-outline-light btn-sm font-12 w-100 d-inline" ><Link onClick={props.closeMenu} to="/user/signin" className="user" onClick={() => itemClick('/user/signin')}>로그인</Link></button>
                </div>
                <div className="col">
                  <button className="btn btn-outline-light btn-sm font-12 w-100 d-inline" ><Link onClick={props.closeMenu} to="/user/signup" className="user" onClick={() => itemClick('/user/signup')}>회원가입</Link></button>
                </div>
              </div>
            )
          }


        </li>
        <li className="list-group-item"><Link to="/coinlist" onClick={() => itemClick('/coinlist')} className="trade"> 거래소 </Link></li>
        <li className="list-group-item">
          <Link to="/asset" onClick={() => itemClick('/asset')} className="invest">거래내역 </Link>
          <span className="badge badge-danger badge-pill float-right">
            <i className="far fa-bell align-middle" style={{ "fontSize": "13px" }}></i> 14
			</span>
        </li>
        <li className="list-group-item"><Link to="/payment" onClick={() => itemClick('/payment')} className="cashout">입출금 </Link></li>
        <li className="list-group-item"><Link to="/mypage" onClick={() => itemClick('/mypage')} className="mypage">마이페이지</Link></li>
        <li className="list-group-item"><Link to="/support" onClick={() => itemClick('/support')} className="customer">고객센터 </Link></li>
        {/* <li className="list-group-item">
          <div className="dropdown">
            <a className="btn btn-outline-light dropdown-toggle btn-sm w-100 border-light-blue align-middle" href="#" role="button" id="selectLang" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-globe" style={{ "fontSize": "17px" }}></i>
              KOR
            </a>
            <div className="dropdown-menu w-100" aria-labelledby="selectLang">
              <a className="dropdown-item" href="#">KOR</a>
              <a className="dropdown-item" href="#">ENG</a>
              <a className="dropdown-item" href="#">CHN</a>
            </div>
          </div>
        </li> */}
        <li className="list-group-item">
          <div className="row">
            <div className="col" style={{paddingRight: "10px"}}>
              <button type="button" className="btn btn-primary w-100 panel-sns-link">
                <i className="fab fa-twitter" style={{ "fontSize": "20px" }}></i>
              </button>
            </div>
            <div className="col" style={{paddingLeft: "10px"}}>
              <button type="button" className="btn btn-primary w-100 panel-sns-link">
                <i className="fab fa-facebook-f " style={{ "fontSize": "20px" }}></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Right