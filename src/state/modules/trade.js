const initialState = {
  trade: {
    type: 'trade',
    code: 'KRW-BTC',
    timestamp: 1589519304523,
    trade_date: '2020-05-15',
    trade_time: '05:08:24',
    trade_timestamp: 1589519304000,
    trade_price: 11411000,
    trade_volume: 0.0000886,
    ask_bid: 'ASK',
    prev_closing_price: 11776000,
    change: 'FALL',
    change_price: 365000,
    sequential_id: 1589519304000000,
    stream_type: 'SNAPSHOT'
  }
}

const SET_TRADE = "TICKER/SET_TRADE"
const UPDATE_TRADE = "TICKER/UPDATE_TRADE"

export const onSetTrade = (trade) => async dispatch => {
  // let tickers = await getTickersByMarket(market)
  dispatch({
    type: SET_TRADE,
    trade
  });
};


export const onUpdateTrade = (trade) => dispatch => {
  dispatch({
    type: UPDATE_TRADE,
    trade
  })
}

export const trade = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRADE:
      return {
        ...state,
        trade: action.trade
      };
    case UPDATE_TRADE:
      return {
        ...state,
        trade: action.trade
      };

    default:
      return state;
  }
};
