import React, { useState } from "react";

import Top from './top'
import Right from './right'
import MobileHeader from './mobile'
import './css/header.css'


let Header = props => {
  
  const [path, setPath] = useState(window.location.pathname);
  let [rightMenu, setRightMenu] = useState(false)
  
  const openMenu = () => {
    setRightMenu(true)
  }

  const closeMenu = () => {
    setRightMenu(false)
  }
  
  return (
    <div id="header">
      {/* {path.includes('/exchange') || path.includes('/coinlist')
        ? <Exchange openMenu={openMenu}/>
      } */}
      {/* <Exchange openMenu={openMenu}/> */}
      <div>
        <MobileHeader closeMenu={closeMenu} openMenu={openMenu}/>
        <Top path={path} openMenu={openMenu} setPath={setPath}/>
      </div>

      <Right isOpen={rightMenu} closeMenu={closeMenu} setPath={setPath} />
    </div>
  )
}



export default Header