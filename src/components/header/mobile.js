import React from "react";
import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";

let MobileHeader = props => {
  let { headerInfo } = useSelector(state => ({
    headerInfo: state.siteInfo.header
  }))

  return (
    <div id="exchange-header">
      <div >
        <a className="navTrigger" onClick={() => props.openMenu()}><i></i><i></i><i></i></a>
        <header>
          <Link className="btnHome" to="/coinlist" onClick={() => props.closeMenu()}>홈으로</Link>
          <h2>{headerInfo.title}</h2>
        </header>
      </div>
    </div>
  )
}

export default MobileHeader