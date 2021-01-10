import React from 'react'

let QuestionWrite = (props) => {
  return (
    <div>
      <div id="container" className="container submenu-container my-3 max-1000">
        <div className="col mb-3 pb-3">
          <div className="card shadow-sm bg-white rounded h-100">
            <div className="card-header position-relative">
              <h5 className="pt-2 pb-1 mb-0">1:1문의하기</h5>
            </div>
            <div className="pl-3 pr-3 mb-3 ">
              <form className="mt-3">
                <div className="form-group">
                  <label>문의사항을 선택하세요.</label>
                  <select className="form-control form-control-sm">
                    <option>일반질문</option>
                    <option>비트코인</option>
                    <option>비트코인 구매/판매</option>
                  </select>
                </div>
                <div className="form-group">
                  <input className="form-control" type="text" placeholder="홍길동" readonly="" />
                </div>
                <div className="form-group">
                  <textarea className="form-control" placeholder="문의 내용을 입력해 주세요." id="" rows="3"></textarea>
                </div>
                <div className="mx-auto text-center">
                  <button type="submit" className="btn btn-dark btn-sm btn-block">문의하기</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionWrite