import { URL_BASE } from './'
import axios from 'axios'
import CODE from './errorCode'

// OTP 생성
export const createOtp = async (email, token) => {
  try{
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/auth/otp`,
      data: {
        email
      },
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


// OTP 컨펌
export const confirmOtp = async (secret, otpToken, token) => {
  try{
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/auth/otp/confirm`,
      data: {
        secret, otpToken
      },
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

// OTP 삭제
export const deleteOtp = async (otpToken, token) => {
  try{
    let {status, data} = await axios({
      method: "DELETE",
      url: `${URL_BASE}/auth/otp`,
      data: {
        otpToken
      },
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

// OTP 로그인
export const signinByOtp = async (email, otpToken) => {
  try{
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/auth/otp/signin`,
      data: {
        email, otpToken
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

// 메일인증 확인
export const emailVerify = async (token) => {
  try{
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/auth/verify`,
      data: {
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

// 본인인증(KYC) 여권, 신분증 업로드
export const postKyc = async (payload, token) => {
  try{
    let {status, data} = await axios({
      method: "POST",
      url: `${URL_BASE}/auth/kyc`,
      data: payload,
      headers: {
        token,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }catch(err) { // 401은 catch로 잡힘
    let {status, data} = err.response
    return [data, data.errorCode? CODE[parseInt(data.errorCode)]: false]
  }
}
