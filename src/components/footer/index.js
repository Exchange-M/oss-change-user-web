import React from "react";
import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";

let Footer = props => {
  let { footer } = useSelector(state => ({
    footer: state.siteInfo.footer
  }))

  return (
    <div id="footer" >
      <div className="footer-wrap">
        <div className="footer-left">
          {/* <img src='/static/images/common/logo_inline.png' alt="logo" style={{width: "180px"}}/> */}
          <em>{footer.copyRight}</em>
				      {footer.address}<br />
              {footer.owner}<br />
              {footer.officeNum}<br />
              {footer.homePage}
			  </div>
        <div className="footer-right">
          <ul>
            <li>
              <h5>고객센터 </h5>
                {footer.phoneNumber}<br />
                운영시간 평일 09:00~18:00<br />
                <Link to="/support/question">온라인 1:1 고객문의</Link><br />
                {/* <a href={`http://${footer.homePage}`}>{footer.homePage}</a> */}
            </li>
            <li >
              <h5>QUICK LINKS </h5>
              <Link to="/support/notice">공지사항</Link><br />
              <Link to="/support/terms">이용약관</Link><br />
              <Link to="/support/faq"> 자주묻는질문</Link><br />
              <Link to="/support/guide"> 개인정보취급방침</Link>
            </li>
            <li> 
              <a href="https://www.facebook.com/profile.php?id=100003874674961"><span className="ico-fb"> </span></a>
              <a href="https://blog.naver.com/pjt3591oo/" ><span className="ico-naver"> </span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer