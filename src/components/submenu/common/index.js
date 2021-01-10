import React from "react";

import Desktop from './desktop'
import Mobile from './mobile'

import './css/common.css'

let SubMenu = props => {
  return (
    <div id="nav-sub" className="bg-white box-shadow asset">
      <Desktop match={props.match} title={props.title} tabs={props.tabs} tabKrConvert={props.tabKrConvert}/>
      <Mobile match={props.match}  title={props.title} tabs={props.tabs} tabKrConvert={props.tabKrConvert}/>
    </div>
  )
}

export default SubMenu