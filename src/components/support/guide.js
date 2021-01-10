import React from "react";
import { connect } from "react-redux"

import './css/guide.css'

let SupportGuide = props => {
  return (
    <div id="guide" className="container submenu-container mb-4 max-1000">
      <div className="col mb-3 pb-3">
        <div className="card shadow-sm bg-white rounded h-100">
          <div className="card-header">
            <h5 className="pt-2 pb-1">거래 이용안내</h5>
          </div>

          <div className="pl-4 pr-4 mb-3 mt-3">

            <h3 className="title2">1. 마켓 구분</h3>
            <ul>
              <li>
                KRW 마켓 : KRW(원화)로 디지털 자산을 사고 팔 수 있습니다.
              </li>
              <li>
                KRW 마켓 : KRW(원화)로 디지털 자산을 사고 팔 수 있습니다.
                <div className="ex-box">
                  - 매매대상이 되는 디지털 자산 가격은 BTC로 결정되며, KRW 환산가격(BTC 기준 가격 x BTC/KRW 현재가)이 참고용으로 함께 표시됩니다.
                </div>
              </li>
            </ul>

            <h3 className="title2">2. 일별 거래 데이터 기준</h3>
            <div>
              UTC(협정세계시)를 기준으로 일별 데이터를 계산합니다. 대다수의 글로벌 거래소들이 UTC 기준 시간을 사용하고 있어 해외 시세 비교에 용이한 장점이 있습니다. UTC는 한국시간(KST)보다 9시간이 느립니다.
            </div>
            <ul>
              <li>
                전일대비 등락률 : UTC 기준 0시(=한국시간 오전 9시) 종가 대비 당일 종가(혹은 현재가) 등락률
              </li>
              <li>
                거래대금 : 최근 24시간 동안의 누적 거래대금
              </li>
              <li>
                캔들차트 일봉 : UTC 기준 0시부터 24시간(혹은 현재시점) 동안의 시가/고가/저가/종가
              </li>
            </ul>


            <h3 className="title2">3. 거래수수료</h3>
            <table className="table">
              <tbody className="tbody" style={{ textAlign: "center" }}>
                <tr>
                  <td rowSpan={2}></td>
                  <td colSpan={2}>일반주문</td>
                  <td rowSpan={2}>예약주문</td>
                </tr>
                <tr>
                  <td>Maker</td>
                  <td>Taker</td>
                </tr>
                <tr>
                  <td>KRW 마켓</td>
                  <td colSpan={2}>0.10%</td>
                  <td>0.10%</td>
                </tr>
                <tr>
                  <td>BTD 마켓</td>
                  <td colSpan={2}>0.10%</td>
                  <td>0.2%</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>
                거래수수료에는 부가세가 포함되어 있습니다.
              </li>
              <li>
                거래수수료 계산방식: 체결금액(주문수량 x 주문가격) x 거래수수료율(%)
                <div className="ex-box">
                  - KRW 마켓 거래수수료는 소수점 둘째 자리까지 표시됩니다.
                </div>
              </li>
              <li>
                거래수수료 정산방식:
                <div className="ex-box">
                  - 매수 주문 시 정산금액 = 체결금액(주문수량 x 주문가격) + 거래수수료
                </div>
                <div className="ex-box">
                  - 예시) 1BTC를 3,000,000원에 매수(거래수수료 0.15%) 시 내 계좌에 1BTC 입금, 3,004,500원 차감
                </div>
                <div className="ex-box">
                  - 매도 주문 시 정산금액 = 체결금액(주문수량 x 주문가격) – 거래수수료
                </div>
                <div className="ex-box">
                  - 예시) 1BTC를 3,000,000원에 매도(거래수수료 0.15%) 시 내 계좌에 2,995,500원 입금, 1 BTC 차감
                </div>
              </li>
              <li>
                거래수수료는 이벤트에 따라 달라질 수 있습니다.
              </li>
              <li>
                Maker/Taker 란?
                <div className="ex-box">
                  - Maker: 오더북 내의 즉시 체결되지 않는 조건의 매수/매도 잔량을 추가해주는 주문을 말합니다.
                </div>
                <div className="ex-box">
                  - Taker: 오더북 내의 매수/매도 잔량을 즉시 체결 시키는 주문을 말합니다.
                </div>
              </li>
            </ul>


            <h3 className="title2">4. 최소 주문가능 금액</h3>
            <table className="table">
              <thead>
                <th>KRW 마켓</th>
              </thead>
              <tbody>
                <tr>
                  <td>500 KRW</td>
                  {/* <td>0.0005 BTC</td> */}
                </tr>
              </tbody>
            </table>

            <h3 className="title2">5. 주문 유형</h3>
            <ul>
              <li>
                지정가 주문 : 가격을 정해서 주문을 내면 지정한 매수가격 보다 높은 가격에 체결되지 않고, 지정한 매도가격 보다 낮은 가격에 체결되지 않습니다. 매매체결 여부보다 가격을 우선으로 생각할 때 사용합니다.
              </li>
              <li>
                시장가 주문 : 매수 시 주문 금액/매도 시 주문 수량만 설정하면, 시장가격으로 즉시 체결시키는 주문입니다. 빠르게 매매를 체결하고 싶을 때 사용합니다.
                <div className="ex-box">
                  - 시장가 주문은 일부 마켓에서만 지원됩니다.
                </div>
              </li>
              <li>
                예약 주문 : 설정한 감시 가격에 도달하면, 설정된 주문을 자동으로 실행시키는 주문입니다. 주로 손실 제한/이익 실현 목적으로 사용합니다.
                <div className="ex-box">
                  - 예약 주문은 일부 마켓에서만 지원됩니다.
                </div>
              </li>
            </ul>

            <h3 className="title2">6. 호가 표시 단위</h3>
            <div>
              <h6 style={{ marginTop: 25 }}>KRW 마켓(코인 가격에 따라 구분)</h6>
              <table className="table">
                <thead>
                  <tr>
                    <td>코인 1개 가격</td>
                    <td>호가단위</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2,000,000원 이상</td>
                    <td>1,000원</td>
                  </tr>
                  <tr>
                    <td>1,000,000원 이상~2,000,000원 미만</td>
                    <td>500원</td>
                  </tr><tr>
                    <td>500,000원 이상~1,000,000원 미만</td>
                    <td>100원</td>
                  </tr>
                  <tr>
                    <td>100,000원 이상~500,000원 미만</td>
                    <td>50원</td>
                  </tr>
                  <tr>
                    <td>10,000원 이상~100,000원 미만</td>
                    <td>10원</td>
                  </tr>
                  <tr>
                    <td>1,000원 이상~10,000원 미만</td>
                    <td>5원</td>
                  </tr>
                  <tr>
                    <td>1,000원 미만</td>
                    <td>1원</td>
                  </tr><tr>
                    <td>100원 미만</td>
                    <td>0.1원</td>
                  </tr>
                  <tr>
                    <td>10원 미만</td>
                    <td>0.01원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h6 style={{ marginTop: 25 }}>BTC 마켓(코인 가격과 무관하게 동일)</h6>
              <table className="table">
                <tboyd>
                  <tr>
                    <td>마켓</td>
                    <td>호가단위</td>
                  </tr>
                  <tr>
                    <td>BTC 마켓</td>
                    <td>0.00000001 BTC</td>
                  </tr>
                </tboyd>
              </table>
            </div>
          </div>

          <div className="card-header">
            <h5 className="pt-2 pb-1">입출금 이용안내</h5>
          </div>

          <div className="pl-4 pr-4 mb-3 mt-3">

            <h3 className="title2">1. 입출금 지원 자산</h3>
            <div>현재 4가지 자산의 입출금을 지원합니다.</div>
            <ul>
              <li>
                KRW, BTC, ETH
              </li>
            </ul>

            <h3 className="title2" id="withdraw-max">2. 보안등급별 1일 입출금한도</h3>
            <table className="table">
              <thead style={{ textAlign: "center", border: "1px" }}>
                <th colSpan={3}>구분</th>
                <th>레벨1</th>
                <th>레벨2</th>
                <th>레벨3</th>
                <th>레벨4</th>
              </thead>

              <tbody style={{ textAlign: "center", border: "1px" }}>
                <tr>
                  <td colSpan={3}>인증방법</td>
                  <td>이메일인증</td>
                  <td>OTP인증</td>
                  <td>입출금계좌인증</td>
                  <td>KYC인증</td>
                </tr>

                <tr>
                  <td rowSpan={2} style={{verticalAlign: 'middle'}}>입금한도</td>
                  <td colSpan={2}>KRW</td>
                  <td>0원</td>
                  <td>0원</td>
                  <td colSpan={2}>무제한</td>
                </tr>
                <tr>
                  <td colSpan={2}>디지털자산</td>
                  <td>0원</td>
                  <td colSpan={3}>무제한</td>
                </tr>

                <tr>
                  <td rowSpan={3} style={{verticalAlign: 'middle'}}>출금한도</td>
                  <td rowSpan={2} style={{verticalAlign: 'middle'}}>KRW</td>
                  <td>1회</td>
                  <td>0원</td>
                  <td>0원</td>
                  <td>20,000,000원</td>
                  <td>50,000,000원</td>
                </tr >
                <tr>
                  <td>1일</td>
                  <td>0원</td>
                  <td>0원</td>
                  <td>50,000,000원</td>
                  <td>200,000,000원</td>
                </tr>
                <tr>
                  <td colSpan={2}>디지털자산</td>
                  <td>0원</td>
                  <td>2,000,000원</td>
                  <td>100,000,000원</td>
                  <td>1,000,000,000원</td>
                </tr >
              </tbody >
            </table >
            <ul>
              <li>
                1일 출금한도는 매일 오전 6시 30분에 초기화됩니다.
              </li>
              <li>
                디지털 자산은 출금 시점의 원화 환산금액을 반영해 1일 출금한도가 관리됩니다.
              </li>
              <li>
                부정거래가 의심되는 경우 KRW 및 디지털 자산 입출금이 제한될 수 있습니다.
              </li>
            </ul>

            <h3 className="title2">3. 입출금 수수료(부가세 포함)</h3>
            <div><b>사이트 회원 간 송금시 바로 출금 기능을 이용한 경우 입출금 수수료가 모두 무료입니다.</b></div>
            <table className="table">
              <thead>
                <th>구분</th>
                <th>KRW</th>
                <th>BTC</th>
                <th>ETH</th>
              </thead>

              <tbody>
                <tr>
                  <td>입금수수료</td>
                  <td>무료</td>
                  <td>무료</td>
                  <td>무료</td>
                </tr>
                <tr>
                  <td>출금수수료</td>
                  <td>1,000</td>
                  <td>0.001</td>
                  <td>0.001</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>
                출금수수료는 건당 정액으로 부과되며, 원화 출금수수료는 유관기관 / 디지털 자산 출금수수료는 블록체인 전산망에 납부됩니다.
              </li>
              <li>
                입출금 수수료에는 부가세가 포함되어 있습니다.
              </li>
            </ul>
          </div >
        </div >
      </div >
    </div >
  )
}

const mapStateToProps = state => {
  return {
  };
};

SupportGuide = connect(mapStateToProps, {
})(SupportGuide);

export default SupportGuide
