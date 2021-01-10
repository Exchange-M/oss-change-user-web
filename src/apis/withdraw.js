import { URL_BASE } from './'
import axios from 'axios'
import CODE from './errorCode'

// 출금내역 요청
export const getWithdraw  = async (coinTicker, status, page, cntOfPage, token) => {
  let url = ""
  if (coinTicker == "KRW") {
    url= `${URL_BASE}/krw/withdraw?krwOutStatus=${status}&cntOfPage=${cntOfPage}&page=${page}`
  } else {
    url = `${URL_BASE}/coin/withdraw?coinOutStatus=${status}&coinTicker=${coinTicker}&cntOfPage=${cntOfPage}&page=${page}`
  }
  try {
    let {status, data} = await axios({
      method: "GET",
      url,
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

// 원화출금 요청
export const krwWithdrawReq = async (amount, token) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/krw/withdraw`,
      data: {
        amount
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

// 코인출금 요청
export const coinWithdrawReq = async (coinOutAdd, coinOutAmt, coinTicker, coinOutSubAdd, note, token) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/coin/withdraw`,
      data: {
        coinOutAdd, coinOutAmt, coinTicker, coinOutSubAdd, note
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
