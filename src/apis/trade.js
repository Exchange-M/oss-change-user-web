import { URL_BASE } from './'
import axios from 'axios'

// 최신 매칭 데이터(Ticker) 조회
export const getTradesByMarket = async (market = "KRW", timestampSymbol) => {
  let {status, data} = await axios({
    method: "GET",
    url: `${URL_BASE}/trade/ticker?market=${market}`,
    headers: {}
  });

  return data;
};

// 일일 매칭 데이터내용
export const getTradesByMarketAndDaily = async (market="KRW", coin="BTC", limit=20, timestamp='') => {
  let {status, data} = await axios({
    method: "GET",
    url: `${URL_BASE}/trade/1D?fsym=${coin}&tsym=${market}&limit=${limit}&toTs=`,
    headers: {}
  });

  return data;
}