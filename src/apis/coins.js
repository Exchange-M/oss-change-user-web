import { URL_BASE } from './'
import axios from "axios";

export const getCoins = async () => {
  let {status, data} = await axios({
    method: "GET",
    url: `${URL_BASE}/coin`,
    headers: {}
  });

  return data;
}