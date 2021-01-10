import { getCoins } from '../../apis/coins'

const initialState = {
  selectedMarket: "KRW",
  selectedCoin: "BTC",
  coinImg: {},
  coins: {},
  markets: [],
}

const SET_SELECTED_MARKET = "COIN/SET_SELECTED_MARKET";
const SET_SELECTED_COIN = "COIN/SET_SELECTED_COIN";
const SET_COINS = "COIN/SET_COINS";

export const onSetCoins = () => async dispatch => {
  let coins = await getCoins()
  console.log('onSetCoins', coins)
  dispatch({
    type: SET_COINS,
    ...coins
  });
};

export const onSelectedMarket = market => dispatch => {
  dispatch({
    type: SET_SELECTED_MARKET,
    selectedMarket: market
  })
}

export const onSelectedCoin = coin => dispatch => {
  dispatch({
    type: SET_SELECTED_COIN,
    selectedCoin: coin
  })
}

export const coins = function(state = initialState, action) {
  switch (action.type) {
    case SET_COINS:
      return {
        ...state,
        coinImg: action.coinImg,
        coins: action.coins,
        markets: action.markets,
      };
    case SET_SELECTED_MARKET:
      return {
        ...state,
        selectedMarket: action.selectedMarket
      };
    case SET_SELECTED_COIN:
      return {
        ...state,
        selectedCoin: action.selectedCoin
      };
    
    default:
      return state;
  }
};
