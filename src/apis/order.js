import { URL_BASE } from './'
import axios from 'axios'
import CODE from './errorCode'

// 최신 시세(Ticker) 조회
export const getOrderbook = async (code = "KRW-BTC") => {
  let {status, data} = await axios({
    method: "GET",
    url: `${URL_BASE}/order/quote?code=${code}`,
    headers: {}
  });

  return data;
};

// 최근 채결내역(complete) 조회
export const getOrderCompletes = async(code="KRW-BTC") => {
  let {status, data} = await axios({
    method: 'GET',
    url: `${URL_BASE}/order/complete?code=${code}`,
    headers: {}
  })
  
  return data.data
}

// 구매주문(매수)
export const orderBuyReg = async({market, coinTicker, price, coinAmount}, token) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/order/buy`,
      data: {
        market, coinTicker, price, coinAmount
      },
      headers: {
        token
      }
    });
    
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch(err) { // 401은 catch로 잡힘
    let {status, data} = err.response
    if (status === 403) {
      data.errorCode = "403"
    }
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}

// 판매주문(매도)
export const orderSellReg = async({market, coinTicker, price, coinAmount}, token) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/order/sell`,
      data: {
        market, coinTicker, price, coinAmount
      },
      headers: {
        token
      }
    });
    
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch(err) { // 401은 catch로 잡힘
    let {status, data} = err.response
    if (status === 403) {
      data.errorCode = "403"
    }
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}