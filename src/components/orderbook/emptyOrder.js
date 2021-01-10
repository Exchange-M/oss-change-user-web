import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const MAX_SIZE = 15

const EmptyOrder = (props) => {
  const [empty_orders, set_empty_orders] = useState([
    [],
    [0],
    [0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])

  const { orderbook } = useSelector(state => ({
    orderbook: state.orderbook,
  }))

  if (!empty_orders || !orderbook) return (<div>로딩중</div>)

  if (props.orderType === 'ask' || props.orderType === 'sell') return (
    <div>
      {empty_orders[MAX_SIZE - orderbook.orderbook_units.length] && empty_orders[MAX_SIZE - orderbook.orderbook_units.length].map((item, idx) => (
        <li className="downB" key={idx}>
          <a>
            <span className="bar">
              <div className="tick" style={{ width: '0%' }}>
              </div>
              <span className="num">
                <p></p>
              </span>
              <span>
              </span>
            </span>
            <span className="order">
              <div>
                <strong></strong>
                <i></i>
              </div>
            </span>
          </a>
        </li>
      ))}
    </div>
  )
  else return (
    <div >{
      empty_orders[MAX_SIZE - orderbook.orderbook_units.length] && empty_orders[MAX_SIZE - orderbook.orderbook_units.length].map((item, idx) => (
        <li className="upB" key={idx} style={!idx? {borderTop: "1px solid white"}: {}}>
          <a>
            <span className="order">
              <div>
                <strong></strong>
                <i></i>
              </div>
            </span>
            <span className="bar">
              <div className="tick" style={{ width: '0%' }}>
              </div>
              <span className="num">
                <p></p>
              </span>
              <span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </div>
  )
}

export default EmptyOrder