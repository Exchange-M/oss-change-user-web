import { onSelectedCoin } from "./coins"

const initialState = {
  orderType: 'buy',
  fee: 0.0,    // percent
  // sell: {
  //   price: 0.0,
  //   amount: 0.0,
  //   total: 0.0
  // },
  // buy: {
  //   price: 0.0,
  //   amount: 0.0,
  //   total: 0.0
  // }
  price: 0.0,
  amount: 0.0
}

const SET_ORDERTYPE = "ORDER/SET_ORDERTYPE"
const SET_FEE = "ORDER/SET_FEE"
const SET_PRICE = "ORDER/SET_PRICE"
const SET_PRICE_INCREASE = "ORDER/SET_PRICE_INCREASE"
const SET_AMOUNT = "ORDER/SET_AMOUNT"

export const onSetOrdertype = orderType => dispatch => {
  dispatch({
    type: SET_ORDERTYPE,
    orderType
  })
}

export const onSetFee = fee => dispatch => {
  dispatch({
    type: SET_FEE,
    fee
  })
}

export const onSetPrice = price => dispatch => {
  dispatch({
    type: SET_PRICE,
    price
  })
}
export const onSetAmount = amount => dispatch => {
  dispatch({
    type: SET_AMOUNT,
    amount
  })
}


export const order = (state=initialState, action) => {
  switch(action.type) {
    case SET_ORDERTYPE:
      return {
        ...state,
        orderType: action.orderType
      }
    case SET_FEE: 
      return {

      }
    case SET_PRICE:
      return {
        ...state,
        price: action.price
      } 
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.amount
      } 
    default: return state;
  }
}