import { URL_BASE } from './'
import axios from 'axios'
import CODE from './errorCode'

export const getFee = async({feeType}, token) => {
  try {
    let {status, data} = await axios({
      method: "get",
      url: `${URL_BASE}/fee?feeType=${feeType}`,
      headers: {
        token
      }
    });
    
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch(err) { // 401, 403은 catch로 잡힘
    let {status, data} = err.response
    if (status === 403) {
      data.errorCode = "403"
    }
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}