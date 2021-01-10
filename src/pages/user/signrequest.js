import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux"

import SignRequest from '../../components/signin/signrequest'

import { onSignin } from '../../state/modules/user'
import { onSetHeaderTitle } from '../../state/modules/siteInfo'

let UserSignRequest = props => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(onSetHeaderTitle({title: ""}))
  }, [])

  return (
    <div id="user-sign-request">
      <SignRequest />
    </div>
  )
}

export default UserSignRequest
