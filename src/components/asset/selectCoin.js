import React, { useState, useEffect } from 'react'
import { UseSelector } from 'react-redux'

export const SelectCoins = (props) => {
  return (
    <select className="custom-select w-25 float-right" onChange={e=>props.onChange(e.target.value)}>
      <option selected={true} value="BTC">BTC</option>
      <option value="ETH">ETH</option>
      <option value="RVN">RVN</option>
    </select>
  )
}