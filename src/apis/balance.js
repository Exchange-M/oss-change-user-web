import { URL_BASE } from './'
import axios from 'axios'
import CODE from './errorCode'

export const createWallet = async (coinTicker, token) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/balance`,
      data: {
        coinTicker
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