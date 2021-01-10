

const initialState = {
  orderCompletes: [],         // 채결내역
  orderCompletesByTimesym: [] // 일일 채결내용
}

const SET_ORDERCOMPLETE = "ORDERCOMPLETE/SET_ORDERCOMPLETE"
const SET_ORDERCOMPLETESBYTIMESYM = "ORDERCOMPLETE/ORDERCOMPLETESBYTIMESYM"

export const onSetOrdercomplete = orderCompletes => dispatch => {
  dispatch({
    type: SET_ORDERCOMPLETE,
    orderCompletes
  })
}

export const onSetOrdercompleteByTimesym = orderCompletesByTimesym => dispatch => {
  dispatch({
    type: orderCompletesByTimesym,
    orderCompletesByTimesym
  })
}

export const history = (state=initialState, action) => {
  switch(action.type) {
    case SET_ORDERCOMPLETE:
      return {
        ...state,
        orderCompletes: action.orderCompletes
      }
    
    case SET_ORDERCOMPLETESBYTIMESYM:
      return {
        ...state,
        orderCompletesByTimesym: action.orderCompletesByTimesym
      }
    default: return state;
  }
}