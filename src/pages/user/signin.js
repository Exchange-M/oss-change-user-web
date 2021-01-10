import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux"

import Signin from '../../components/signin'

import { onSignin } from '../../state/modules/user'
import { onSetHeaderTitle } from '../../state/modules/siteInfo'

let UserSignin = props => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(onSetHeaderTitle({title: ""}))
  }, [])

  return (
    <div id="usersignin" style={{minHeight: `${window.innerHeight-325}px`}}>
      <Signin />
    </div>
  )
}

const mapStateToProps = state => {
  return {
  };
};

UserSignin = connect(mapStateToProps, {
  onSignin
})(UserSignin);

export default UserSignin
