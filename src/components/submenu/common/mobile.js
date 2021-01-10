import React, { useState } from "react";
import { Link } from "react-router-dom";

let Mobile = props => {
  let [tab, setTab] = useState({tab: props.tabs[0], toggle: false})

  return (
    <nav id="nav-sub-m" className="bigin-m">
      <div className="row m-cate-nav">
        <div className="col-5 pr-0 m-cate text-center">{props.title}</div>
        <div className="m-sub-nav select">
          <div className="dropdown show">
            <a className="btn btn-secondary dropdown-toggle btn-block" id="dropdownMenuLink" onClick={() => setTab({tab: tab.tab, selected: !tab.selected})}>
              {props.tabKrConvert[tab.tab].kr}
            </a>

            <div className="dropdown-menu show" style={{ "display": tab.selected ? "block" : "none", "position": "absolute", "willChange": "transform", "top": "10px", "left": "0px", "transform": "translate3d(0px, 31px, 0px)" }}>
              <nav id="" className="nav nav-underline">
                {(props.tabs.map((item, idx) => <a onClick={() => setTab({tab: item, selected: !tab.selected})} className={`nav-item nav-link dropdown-item`} key={item + idx} id={`${item}-tab`} data-toggle="tab" href={`#${item}`} role="tab" aria-controls={`${item}`} aria-selected={props.tabKrConvert[item].selected}>{props.tabKrConvert[item].kr}</a>))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Mobile