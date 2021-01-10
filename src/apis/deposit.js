import { URL_BASE } from './'
import axios from 'axios'
import CODE from './errorCode'

// 
export const getDeposit = async (coinTicker, status, page, cntOfPage, token) => {
  let url = ""
  if (coinTicker == "KRW") {
    url= `${URL_BASE}/krw/deposit?krwOutStatus=${status}&cntOfPage=${cntOfPage}&page=${page}`
  } else {
    url = `${URL_BASE}/coin/deposit?coinOutStatus=${status}&coinTicker=${coinTicker}&cntOfPage=${cntOfPage}&page=${page}`
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

// 원화입금 요청
export const krwDepositReq = async (amount, note='', token) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/krw/deposit`,
      data: {
        amount, note
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