const initialState = {
  footer: {
    copyRight: "Copyright 2021ⓒMung. All rights reserved.",
    address: "서울특별시",
    owner: "오픈소스 컨트리뷰터 : 박정태",
    officeNum: "https://pjt3591oo.github.io/",
    homePage: "홈페이지: https://blog.naver.com/pjt3591oo/",
    phoneNumber: "pjt3591oo@gmail.com",
  },
  header: {
    title: ''
  }
}

const SET_FOOTER = "SITEINFO/FOOTER";
const SET_HEADER_TITLE = "SITEINFO/HEADER_TITLE"

export const onSetFooter = footer => dispatch => {
  dispatch({
    type: SET_FOOTER,
    footer
  });
};

export const onSetHeaderTitle = header => dispatch => {
  dispatch({
    type: SET_HEADER_TITLE,
    header
  })
}


export const siteInfo = function(state = initialState, action) {
  switch (action.type) {
    case SET_FOOTER:
      return {
        ...state,
        footer: action.footer
      };
    
    case SET_HEADER_TITLE:
      return {
        ...state,
        header: action.header
      }
    default:
      return state;
  }
};
