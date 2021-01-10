import { URL_BASE } from './'
import axios from "axios";
import CODE from './errorCode'

// 보유자산
export const getAssets = async token => {
  /*
    {
      "total": {
          "buyPri": "4578271790.0829",       // 총매수금액
          "evalPri": "100133195.2123",       // 총평가금액
          "evalIncome": "-4478138594.8706",  // 총평가손익
          "evalPer": "-97.81",               // 총평가수익률
          "krw": "140109716.00000000",       // 보유
          "asset": "240242911.2123"          // 총보유자산
      },
      "BTC": {
          "amt": "981697.99227723",         // 보유수량
          "buyAvg": "4663.6255",            // 매수평균가
          "buyPri": "4578271790.0829",      // 매수금액
          "evalPri": "100133195.2123",      // 평가금액
          "evalPer": "-97.81"               // 평가손익
      }
    }
  */
  try{
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/asset`,
      headers: {
        token
      }
    });
  
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }catch(err) { // 401은 catch로 잡힘
    let {status, data} = err.response
    if (status === 403) {
      data.errorCode = "403"
    }
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }

}

// 채결완료
export const getOrderCompletes =async (token, market="KRW", coin="BTC", page=1) => {
  
  try{

    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/asset/orderComplete`,
      headers: {
        token
      },
      data: {
        marketTicker: market,
        coinTicker: coin,
        page: page
      }
    });
  
      return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }catch(err) { // 401은 catch로 잡힘
    let {status, data} = err.response
    if (status === 403) {
      data.errorCode = "403"
    }
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}

// 미채결
export const getOrders =async (token, market="KRW", coin="BTC", page=1) => {
  try{
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/asset/orderBook`,
          headers: {
        token
      },
      data: {
        marketTicker: market,
        coinTicker: coin,
        page: page
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