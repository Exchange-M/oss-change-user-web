import config from './config.json'

let { REACT_APP_PRODUCTION_MODE="develop" } = process.env
let MODE = REACT_APP_PRODUCTION_MODE
console.log(MODE)

export let API = config[MODE]['API']
export let SOCKET = config[MODE]['SOCKET']