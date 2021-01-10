import React, { useEffect } from "react";
import { useDispatch } from "react-redux"

import Signup from '../../components/signup'
import { onSetHeaderTitle } from '../../state/modules/siteInfo'

let UserSignup = props => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(onSetHeaderTitle({title: ""}))
  }, [])

  return (
    <div id="usersignup">
      <Signup />
    </div>
  )
}

export default UserSignup