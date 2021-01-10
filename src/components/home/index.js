import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import CoinTable from './coinTable'


import './css/home.css'

let Home = props => {
  const [isGetCoin, setIsGetCoin] = useState(false)
  const [isGetTicker, setIsGetTicker] = useState(false)
  const [isMount, setIsMount] = useState(false)

  const { isLogin = false, coinsByMarket, coinInfo, tickers, selectedMarket } = useSelector(state => ({
    isLogin: state.user.authentication.isLogin,
    coinsByMarket: state.coins.coins,
    coinInfo: state.coins.coinImg,
    selectedMarket: state.coins.selectedMarket,
    tickers: state.tickers.tickers
  }))

  useEffect(() => {
    Object.keys(coinInfo).length && setIsGetCoin(true)
    Object.keys(tickers).length && setIsGetTicker(true)
  }, [coinInfo, tickers])

  useEffect(() => {
    if (isGetCoin && isGetTicker) setIsMount(true)
  }, [isGetCoin, isGetTicker])

  return (
    <div>
      <div className="m-main-wrap" style={{ backgroundImage: "linear-gradient(to right, #263245 0%, #093687 100%)", padding: "40px" }}>

        <div className="mobile-main-slide-wrap">
          <h2 className="pc-main-title">
            새로운 알트코인으로 누구보다 먼저! 
            
            <em style={{marginTop: 5}}>믿고 안전하게 거래할 수 있는 보안체계  </em>
          </h2>
          <div className="swiper-wrapper">
            <div id="pc-slider">
              <div className="pc-slider-content swiper-slide">
                <ul>
                  <li className="ico-bitcoin-pc">
                    새로운 알트코인으로<br />누구보다 먼저!
								    <em> 믿고 안전하게 거래할 수 있는 보안체계</em>
                  </li>
                  <li className="ico-blockchain-pc">
                    대한민국 최다<br />암호화폐 거래소
								    <em> 신규알트코인의 첫번째 거래소</em>
                  </li>
                  <li className="ico-wallet-pc">
                    빠르고 쉬운<br />구매시스템
							    	<em>간단하고 즉각적이고 안전합니다.</em>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div id="mobile" className="swiper-container swiper-container-horizontal">
            <div className="swiper-wrapper" style={{ transitionDuration: "300ms" }}>
              <div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="2">
                <div className="mobile-main-slide-content ico-wallet-mobile  ">
                  빠르고 쉬운<br />구매시스템
  							  <em>간단하고 즉각적이고 안전합니다.</em>
                </div>
              </div>
              <div className="swiper-slide" data-swiper-slide-index="0">
                <div className="mobile-main-slide-content ico-bitcoin-mobile mt-4">
                  새로운 알트코인으로<br />누구보다 먼저!
						    	<em> 믿고 안전하게 거래할 수 있는 보안체계</em>
                </div>
              </div>
              <div className="swiper-slide" data-swiper-slide-index="1">
                <div className="mobile-main-slide-content ico-blockchain-mobile mt-4">
                  대한민국 최다<br />암호화폐 거래소
				    			<em> 신규알트코인의 첫번째 거래소</em>
                </div>
              </div>

              <div className="swiper-slide" data-swiper-slide-index="2">
                <div className="mobile-main-slide-content ico-wallet-mobile mt-4">
                  빠르고 쉬운<br />구매시스템
		    					<em>간단하고 즉각적이고 안전합니다.</em>
                </div>
              </div>

              <div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="0">
                <div className="mobile-main-slide-content ico-bitcoin-mobile mt-4">
                  새로운 알트코인으로<br />누구보다 먼저!
    							<em> 믿고 안전하게 거래할 수 있는 보안체계</em>
                </div>
              </div></div>
            <div className="slide-dot">
              <div className="swiper-pagination swiper-pagination-bullets"></div>
            </div>
          </div>
        </div>

        {
          isLogin
            ? (
              <div className="btn-mobile-join-wrap">
                <Link to="/coinList" className="btn-mobile-join">거래소 바로가기</Link><br />
              </div>
            ) : (
              <div className="btn-mobile-join-wrap">
                <Link to="/user/signup" className="btn-mobile-join">회원가입</Link><br />
                <em> 이미 팝콘 계정을 가지고 계신가요? </em>

                <Link to="/user/signin" className="btn-mobile-login btn-round">로그인</Link><br />
              </div>
            )
        }

        {
          isMount &&
          <CoinTable
            tickers={tickers}
            coinsByMarket={coinsByMarket}
            coinInfo={coinInfo}
            selectedMarket={selectedMarket}
          />
        }

      </div>
    </div>
  )
}

export default Home