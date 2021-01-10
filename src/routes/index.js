import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Footer from '../components/footer'
import Header from '../components/header'

import Home from '../pages/home'
import Exchange from '../pages/exchange'
import UserSignin from '../pages/user/signin'
import UserSignRequest from '../pages/user/signrequest'
import UserSignRequestPwd from '../pages/user/signrequestpwd'
import UserSignup from '../pages/user/signup'
import EmailCertification from '../pages/user/emailCertification'
import Support from '../pages/support'
import SupportQuestionWrite from '../pages/support/questionWrite'
import SupportNoticeView from '../pages/support/noticeView'
import Mypage from '../pages/mypage'
import AssetContainer from '../pages/asset'
import Payment from '../pages/payment'
import CoinList from '../pages/coinList'

import Privacy from '../pages/agreement/privacy'
import Terms from '../pages/agreement/terms'

import Modal from '../components/modal'
import ToastMessage from '../components/toast'

import { onOpen } from '../state/modules/modals'
import { onSetTickers } from '../state/modules/tickers'
import { onSetCoins } from '../state/modules/coins'
import { onSignin, onSignout } from '../state/modules/user'

import { getUser } from '../apis/user'

import socket from '../utils/socket'

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGVybWlzc2lvbiI6MCwidHlwZSI6ImFjY2VzcyIsImV4cGlyZWQiOjE1OTEyNDI1NTkuMjg4LCJpYXQiOjE1OTExNTYxNTl9.66vo03mU22LCWL9rZXbTNLHr_kddk9AZGjE743EdLOc

let Routes = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      dispatch(onSetTickers('KRW'))
      dispatch(onSetCoins())

      let token = localStorage.getItem('token');

      if (!token || token === 'undefined') return
      let [user, errorMsg] = await getUser(token)
      
      if (user.statusCode === 401 && window.location.pathname !== '/user/signin'){
        window.location = '/user/signin'
      }

      if (errorMsg) {
        // 토큰만료 됬거나 했을 때
        if (
          errorMsg.CODE == "1010" 
          &&(
            window.location.pathname === '/payment'
            || window.location.pathname === '/mypage'
            || window.location.pathname === '/asset'
          )
        ) {
          dispatch(onOpen({
            title: '네트워크 장애',
            body: errorMsg.MSG,
            errorCode: errorMsg.CODE,
            okMsg: '확인',
            cancelMsg: '취소'
          }))
        }
      } else {
        let balances = user.balances
        delete user.balances
        console.log('[login] receive data')
        console.log(balances)
        socket.setTokenEmit(token)
        dispatch(onSignin(token, balances, user))
      }
    })()
  }, [])

  return (
    <div id="exchange" >
      <Modal />

      <div id="layout-header">
        <Header />
      </div>

      <div >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/exchange" component={Exchange} />
          <Route exact path="/user/signin" component={UserSignin} />
          <Route exact path="/user/signup" component={UserSignup} />
          <Route exact path="/user/signrequest" component={UserSignRequest} />
          <Route exact path="/user/signrequestpwd" component={UserSignRequestPwd} />
          <Route exact path="/asset" component={AssetContainer} />
          <Route exact path="/asset/:tab" component={AssetContainer} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/coinlist" component={CoinList} />
          <Route exact path="/support/question/write" component={SupportQuestionWrite} />
          <Route exact path="/support/notice/view/:id" component={SupportNoticeView} />
          <Route exact path="/support/:tab" component={Support} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/EmailCertification" component={EmailCertification} />
          
          <Route exact path="/agree/terms" component={Terms} />
          <Route exact path="/agree/privacy" component={Privacy} />
          {/* </div> */}
        </Switch>
      </div>

      <ToastMessage />
      
      <div style={{ display: "block" }}></div>

      <div id="layout-footer" >
        <Footer />
      </div>


    </div>
  )
}

export default Routes