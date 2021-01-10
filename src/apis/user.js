import { URL_BASE } from './'
import axios from 'axios'
import CODE from './errorCode'

export const signin = async (email, password) => {
  let {status, data} = await axios({
    method: "POST",
    url: `${URL_BASE}/auth/signin`,
    data: {
      email, password
    }
  });
  
  return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
}

export const signup = async ({email, password, name, service_term, privacy_policy}) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/auth/signup`,
      data: {
        email,
        password,
        name,
        service_term: 1,
        privacy_policy: 1,
      }
    });
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch(err) { // 401은 catch로 잡힘
    let {status, data} = err.response
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}

export const getUser = async (token) => {
  try {
    let {status, data} = await axios({
      method: "GET",
      url: `${URL_BASE}/user/info`,
      headers: {
        token
      }
    });
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch(err) { // 401은 catch로 잡힘
    let {status, data} = err.response
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}

// 입/출금 계좌등록
export const registerBank = async (bankCd, bankAccount, token) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/user/account`,
      data: {
        bankCd, 
        bankAccount, 
      },
      headers: {
        token
      }
    });
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch (err) {
    let {status, data} = err.response
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}

// 비밀번호 변경
export const changePassword = async (email, password, newPw, checkPw, token) => {
  try {
    let {status, data} = await axios({
      method: "PUT",
      url: `${URL_BASE}/user/password`,
      data: {
        email, password, newPw, checkPw
      },
      headers: {
        token
      }
    });
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch (err) {
    let {status, data} = err.response
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}

// 임시 비밀번호 발급
export const tempPasswordCreate = async (email, name) => {
  try {
    let {status, data} = await axios({
      method: "PUT",
      url: `${URL_BASE}/user/temppw`,
      data: {
        email, name
      }
    });
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch (err) {
    let {status, data} = err.response
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}

// 가입 인증메일 재요청
export const replyEmail = async (email) => {
  try {
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/auth/mail/reply`,
      data: {
        email
      }
    });
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  } catch (err) {
    let {status, data} = err.response
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}