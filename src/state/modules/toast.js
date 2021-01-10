/*
{
  'price': str_from_decimal(trade_order['trade_price']), 
  'coinAmount': str_from_decimal(trade_order['trade_qty']),
  'orderType': trade_order_type,
  'userId': trade_order['user_id'],
  'code': code,
  'type': 'match'
}
{
  'price': str_from_decimal(trade_order['trade_price']), 
  'coinAmount': str_from_decimal(trade_order['trade_qty']),
  'orderType': trade_order_type,
  'userId': trade_order['user_id'],
  'code': code,
  'type': 'order'
}
*/
const initialState = {
  // msgs: [{
  //   price: 150,
  //   coinAmount: 2,
  //   orderType: 'sell',
  //   userId: 1,
  //   code: "KRW-BTC",
  //   type: 'order'
  // }, {
  //   price: 100,
  //   coinAmount: 1.23,
  //   orderType: 'sell',
  //   userId: 1,
  //   code: "KRW-BTC",
  //   type: 'match'
  // }, {
  //   price: 200,
  //   coinAmount: 0.192,
  //   orderType: 'buy',
  //   userId: 1,
  //   code: "KRW-BTC",
  //   type: 'match'
  // }]
  msgs: []
}

const ADD_MSG = "TOAST/ADD_MSG"
const REMOVE_MSG = "TOAST/REMOVE_MSG"

export const addToastMsg = (msg) => dispatch => {
  dispatch({
    type: ADD_MSG,
    msg
  })
}

export const removeToastMsg = () => dispatch => {
  dispatch({
    type: REMOVE_MSG
  })
}

export const toast = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MSG:
      return {
        ...state,
        msgs: [action.msg].concat(state.msgs)
      };
    case REMOVE_MSG:
      return {
        ...state,
        msgs: state.msgs.slice(0, state.msgs.length -1)
      };
      
    default:
      return state;
  }
}