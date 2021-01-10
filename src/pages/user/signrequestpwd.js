import React, { useEffect } from "react";
import { useDispatch } from "react-redux"

import SignRequestPwd from '../../components/signin/signrequestpwd'

import { onSignin } from '../../state/modules/user'
import { onSetHeaderTitle } from '../../state/modules/siteInfo'

let UserSignRequestPwd = props => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(onSetHeaderTitle({title: ""}))
  }, [])

  return (
    <div id="user-sign-request">
      <SignRequestPwd />
    </div>
  )
}

export default UserSignRequestPwd
