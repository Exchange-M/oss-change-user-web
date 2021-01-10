import React from "react";
import { Link } from "react-router-dom";

let Desktop = props => {
  return (
    <nav id="nav-sub-wrap" className="nav nav-underline">
      <div className="spacing"></div>
      {(props.tabs.map((item, idx) => <a className={`nav-item nav-link cart-buy ${props.tabKrConvert[item].selected === 'true'? 'active': ''}`} key={item+idx} id={`${item}-tab`} data-toggle="tab" href={`#${item}`} role="tab" aria-controls={`${item}`} aria-selected={props.tabKrConvert[item].selected}>{props.tabKrConvert[item].kr}</a>))}
    </nav>
  )
}

            
export default Desktop