import { useState, useEffect} from 'react'
import { getFee } from '../apis/fee'

export let useTradeFee = (value) => {
  let [ fee, setFee ] = useState(value || {})

  useEffect(() => {
    (async () => {
      let token = localStorage.getItem('token')
      if (token) {
        let [result, errorMsg] = await getFee({feeType: 'trade'}, localStorage.getItem('token'))
        setFee(result.fee)
      }
    })()
  }, [])

  return [fee, setFee]
}

export let useWithdrawFee = (value) => {
  console.log('[CALLED] useWithdrawFee')
  let [ fee, setFee ] = useState(value || {})

  useEffect(() => {
    (async () => {
      let token = localStorage.getItem('token')
      if (token) {
        let [result, errorMsg] = await getFee({feeType: 'withdraw'}, localStorage.getItem('token'))
        setFee(result.fee)
      }
    })()
  }, [])

  return [fee, setFee]
}