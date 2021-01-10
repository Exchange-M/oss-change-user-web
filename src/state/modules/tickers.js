import { getTradesByMarket } from '../../apis/trade'

const initialState = {
  tickers: {}
}

const SET_TICKERS = "TICKER/SET_TICKERS"
const UPDATE_TICKER = "TICKER/UPDATE_TICKER"

export const onSetTickers = (market="KRW") => async dispatch => {
  let tickers = await getTradesByMarket(market)
  dispatch({
    type: SET_TICKERS,
    tickers: tickers
  });
};

export const onUpdateTicker = (ticker) => dispatch => {
  dispatch({
    type: UPDATE_TICKER,
    ticker: ticker
  })
}

export const tickers = (state = initialState, action) => {
  switch (action.type) {
    case SET_TICKERS:
      return {
        ...state,
        tickers: action.tickers
      };
    case UPDATE_TICKER:
 
        let tickers = {...state.tickers}
        tickers[action.ticker.code] = action.ticker
      return {
        ...state,
        tickers: tickers
      };
    
    default:
      return state;
  }
};
