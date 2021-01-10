import { getOrderbook } from '../../apis/order'

const initialState = {
  code:"",
  total_ask_size:0.00000000,
  total_bid_size:0.00000000,
  orderbook_units:[
  ]
}

const SET_ORDERBOOK = 'ORDERBOOK/SET_ORDERBOOK'
const UPDATE_ORDERBOOK = 'ORDERBOOK/UPDATE_ORDERBOOK'

export const onSetOrderbook = (code="KRW-BTC") => async dispatch => {
  let ob = await getOrderbook(code)

  dispatch({
    type: SET_ORDERBOOK,
    code: ob.code,
    total_ask_size: ob.total_ask_size,
    total_bid_size: ob.total_bid_size,
    orderbook_units: ob.orderbook_units
  })
}

export const osUpdateOrderbook = (  code, total_ask_size, total_bid_size, orderbook_units) => dispatch => {
  dispatch({
    type: UPDATE_ORDERBOOK,
    code: code,
    total_ask_size: total_ask_size,
    total_bid_size: total_bid_size,
    orderbook_units: orderbook_units
  })
}


export const orderbook = (state=initialState, action) => {
  switch(action.type) {
    case SET_ORDERBOOK:
      return {
        ...state,
        code: action.code,
        total_ask_size: action.total_ask_size,
        total_bid_size: action.total_bid_size,
        orderbook_units: action.orderbook_units
      }
    case UPDATE_ORDERBOOK:
      return {
        ...state,
        code: action.code,
        total_ask_size: action.total_ask_size,
        total_bid_size: action.total_bid_size,
        orderbook_units: action.orderbook_units
      }

    default: return state;
  }
}