import { bindActionCreators } from "redux";
import socket from '../../utils/socket'

const initialState = {
  authentication: {
    token: localStorage.getItem('token'), 
    isLogin: localStorage.getItem('token')? true: false
  },
  info: {},
  balances: {},    // 보유 코인 잔액
  balancesCoin: [] // 보유 코인이름 리스트
}

const SIGNIN = "USER/SIGNIN";
const SIGNOUT = "USER/SIGNOUT"
const SET_ACCOUNT = "USER/SET_ACCOUNT"
const SET_BALANCES = "USER/SET_BALANCES"

export const onSignin = (jwt, balances, info) => dispatch => {
  localStorage.setItem('token', jwt);
  dispatch({
    type: SIGNIN,
    jwt: jwt,
    balances: balances,
    info: info
  });
};

export const onSignout = () => dispatch => {
  socket.signoutEmit(localStorage.getItem('token'))
  localStorage.removeItem('token');
  dispatch({
    type: SIGNOUT
  })
}

export const onSetAccount = (bankCd, bankAccount) => dispatch => {
  dispatch({
    type: SET_ACCOUNT,
    bankCd,
    bankAccount  
  })
}

export const onCreateWallet = (walletInfo) => dispatch => {
  dispatch({
    type: SET_BALANCES,
    publickey: walletInfo.publickey,
    coin: walletInfo.coin
  })
}

export const user = function(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        authentication: {
          token: action.jwt,
          isLogin: true
        },
        balances: action.balances,
        info: action.info
      };
    case SIGNOUT:
      return {
        ...state,
        authentication: {
          token: '',
          isLogin: false
        },
        balances: {},
        info: {},
        balancesCoin: []
      }
    case SET_ACCOUNT:
      let info = {
        ...state.info,
        bankCd: action.bankCd,
        bankAccount: action.bankAccount
      }
      return {
        ...state,
        info
      }
    case SET_BALANCES:
      let b = state.balances
      b[action.coin].publickey = action.publickey
      b[action.coin].availableBalance= "0.00"
      b[action.coin].withdrawWaitBalance= "0.00"
      b[action.coin].depositWaitBalance= "0.00"
      b[action.coin].sellWaitBalance= "0.00"
      b[action.coin].buyWaitBalance= "0.00"
      b[action.coin].totalBalance= "0.00"
      return {
        ...state,
        balances: b
      }
    default:
      return state;
  }
};
