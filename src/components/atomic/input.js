import React from 'react'
import NumberFormat from "react-number-format";

export const NumberText = (props) => {
  return (
    <NumberFormat
      displayType={"text"}
      thousandSeparator={true} 
      value={parseFloat(props.value)}
      fixedDecimalScale={true}
      decimalScale={2}
      maxLength="20"
    />
  )
}