import React, { useEffect } from "react";
import { useDispatch } from "react-redux"

import CoinList from "../../components/coinList"

import { onSetHeaderTitle } from '../../state/modules/siteInfo'

import './css/coinList.css'

// 우측 메뉴 거래소 클릭시 해당 페이지 띄움
let Coins = props => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(onSetHeaderTitle({title: ""}))
  }, [])

  return (
    <div id="coins">
      <CoinList />
    </div>
  )
}

export default Coins
