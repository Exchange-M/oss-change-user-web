import { combineReducers } from 'redux'

import { user } from "./modules/user";
import { coins } from "./modules/coins";
import { tickers } from "./modules/tickers";
import { modals } from "./modules/modals";
import { orderbook } from "./modules/orderbook";
import { order } from "./modules/order";
import { history } from "./modules/history";
import { siteInfo } from "./modules/siteInfo"
import { trade } from "./modules/trade"
import { toast } from "./modules/toast"

export default combineReducers({
  user,
  coins,
  tickers,
  modals,
  orderbook,
  order,
  history,
  siteInfo,
  trade, 
  toast
});
