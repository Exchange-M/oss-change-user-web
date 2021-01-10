const initialState = {
  title: "입금계좌등록~",
  body: "등록된 계좌번호가 없습니다. 등록하시겠습니까?\n\n계좌번호 실명인증이 되어야만 원화 입출금이 가능합니다.",
  okMsg: "계좌인증",
  cancelMsg: "아니오",
  errorCode: "",
  isOpen: false
}

let MODAL_OPEN = "MODAL/OPEN"
let MODAL_CLOSE = "MODAL/CLOSE"

export const onOpen = ({title, body, okMsg='', cancelMsg='', errorCode='', isOpen=true}) => dispatch => {
  return dispatch({
    type: MODAL_OPEN,
    title, body,
    okMsg: okMsg,
    errorCode: errorCode,
    cancelMsg: cancelMsg,
    isOpen
  }
)}

export const onClose = ({isOpen=false, title='', body=''}) => dispatch => {
  return dispatch({
    type: MODAL_CLOSE,
    title, body, isOpen
  })
}

export const modals = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        title: action.title,
        body: action.body,
        okMsg: action.okMsg,
        cancelMsg: action.cancelMsg,
        errorCode: action.errorCode,
        isOpen: action.isOpen,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        title: action.title,
        body: action.body,
        isOpen: action.isOpen,
        errorCode: '',
        okMsg: '',
        cancelMsg: ''
      };
    default:
      return state;
  }
}