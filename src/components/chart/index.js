import React from 'react'
import './css/chart.css'
let Chart = (props) => {

  return (
    <div id="chart">
      <div className="shadow-sm p-3 mb-4 bg-white rounded min-height300">
        <div className="tradingview-widget-container">
          <div id="tradingview_30702">
            <div id="tradingview_9f480-wrapper" style={{position: "relative", boxSizing: "content-box",width: '100%',height: props.height,margin: '0 auto !important', padding: '0 !important',fontFamily: "Arial,sans-serif"}}>
              <div style={{width: '100%',height: props.height,background: 'transparent',padding: '0 !important'}}>
                <iframe 
                  id="tradingview_9f480" 
                  src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_9f480&amp,symbol=COINBASE%3ABTCUSD&amp,interval=D&amp,symboledit=1&amp,saveimage=1&amp,toolbarbg=f1f3f6&amp,studies=%5B%5D&amp,theme=Light&amp,style=1&amp,timezone=Etc%2FUTC&amp,studies_overrides=%7B%7D&amp,overrides=%7B%7D&amp,enabled_features=%5B%5D&amp,disabled_features=%5B%5D&amp,locale=kr&amp,utm_source=&amp,utm_medium=widget&amp,utm_campaign=chart&amp,utm_term=COINBASE%3ABTCUSD" 
                  style={{width: "100%", height: props.height, margin: "0 !important", padding: "0 !important"}} 
                  frameBorder="0" allowtransparency="true" scrolling="no" allowFullScreen="" title="chart"
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart