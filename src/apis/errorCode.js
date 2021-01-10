const CODE = {
  "0000": {
    "MSG": "성공",
    "TYPE": "SUCCESS",
    "CODE": "0000"
  },
  "1001": {
    "TITLE": "인증장애",
    "MSG": "등록되지 않은 이메일입니다.",
    "TYPE": "USER",
    "CODE": "1001"
  },
  "1002": {
    "TITLE": "인증장애",
    "MSG": "이미 등록된 이메일입니다.",
    "TYPE": "USER",
    "CODE": "1002"
  },
  "1010": {
    "TITLE": "인증장애",
    "MSG": "토큰만료",
    "TYPE": "AUTH",
    "CODE": "1010"
  },
  "1017": {
    "TITLE": "인증장애",
    "MSG": "파일크기가 너무 큽니다.",
    "TYPE": "AUTH",
    "CODE": "1017"
  },
  "1018": {
    "TITLE": "업로드실패",
    "MSG": "유효하지 않은 파일 갯수. 신분증과 여권을 정확히 입력했는지 확인해주세요",
    "TYPE": "AUTH",
    "CODE": "1018"
  },
  "1019": {
    "TITLE": "업로드실패",
    "MSG": "유효하지 않은 파일타입니다. 유효한 파일은 png, bmp, jpeg 입니다",
    "TYPE": "AUTH",
    "CODE": "1019"
  },
  "2008": {
    "TITLE": "업로드대기",
    "MSG": "인증대기중입니다. 관리자가 승인할 때까지 기다려주세요.",
    "TYPE": "AUTH",
    "CODE": "2008"
  },

  "1004": {
    "TITLE": "인증장애",
    "MSG": "해당 유저를 찾을 수 없습니다.",
    "TYPE": "AUTH",
    "CODE": "1004"
  },
  "2001": {
    "TITLE": "인증장애",
    "MSG": "비밀번호 인증실패. 입력된 비밀번호 확인바랍니다.",
    "TYPE": "USER",
    "CODE": "2001"
  },
  "2006": {
    "TITLE": "인증장애",
    "MSG": "이미 인증된 메일입니다.",
    "TYPE": "USER",
    "CODE": "2001"
  },
  "2007": {
    "TITLE": "인증장애",
    "MSG": "이메일 인증이 필요합니다. 인증 메일을 확인해주세요",
    "TYPE": "USER",
    "CODE": "2001"
  },
  "4001": { // 입/출금 신청시 잔액부족
    "TITLE": "주문실패",
    "MSG": "수량부족",
    "TYPE": "PAYMENT",
    "CODE": "4001"
  },
  "4002": { // 0원이하 입금시도
    "TITLE": "잘못된 입력",
    "MSG": "입력된 금액이 잘못되었습니다.",
    "TYPE": "DEPOSIT",
    "CODE": "4002"
  },
  "3005": {
    "TITLE": "잘못된 입력",
    "MSG": "출금주소가 유효하지 않습니다.",
    "TYPE": "WITHDRAW",
    "CODE": "3005"
  },
  "2004": {
    "TITLE": "인증장에",
    "MSG": "OTP 인증실패.",
    "TYPE": "AUTH",
    "CODE": "2004"
  },

  "4013": {
    "TITLE": "지갑생성 실패",
    "MSG": "해당 코인은 입금제한 상태입니다.",
    "TYPE": "BALANCE",
    "CODE": "4013"
  },
  "4015": {
    "TITLE": "주문실패",
    "MSG": "주문 최소수량이 부족합니다",
    "TYPE": "ORDER",
    "CODE": "4015"
  },

  "403": {
    "TITLE": "주문실패",
    "TYPE": "ORDER",
    "MSG": "로그인이 필요합니다.",
    "CODE": "403"
  },
}
export default CODE