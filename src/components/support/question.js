import React from "react";
import { Link } from 'react-router-dom'

import { connect } from "react-redux"

let SupportQuestion = props => {
  return (
    <div id="question" className="container submenu-container mb-4 max-1000 ">
      <div className="col mb-3 pb-3">
        <div className="card shadow-sm bg-white rounded h-100">
          <div className="card-header position-relative">
            <h5 className="pt-2 pb-1 mb-0">1:1문의</h5>
            <Link className="btn btn-darkblue position-absolute btn-position btn-sm weight300" to="/support/question/write" role="button">
              <i className="far fa-question-circle" style={{"fontSize": "14px"}}></i> 문의하기
				    </Link>
          </div>
          <div className="pl-4 pr-4 mb-3 ">
            <table className="table qa-board">

              <thead>
                <tr>
                  <th scope="col" className="">순번</th>
                  <th scope="col">문의유형</th>
                  <th scope="col">문의일</th>
                  <th scope="col">문의상태</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted"> 1</td>
                  <td><a href="">일반질문</a></td>
                  <td className="text-muted">2018-05-31 16:19:46</td>
                  <td className="text-danger">접수</td>
                </tr>
                <tr>
                  <td className="text-muted"> 1</td>
                  <td><a href="">일반질문</a></td>
                  <td className="text-muted">2018-05-31 16:19:46</td>
                  <td className="text-primary">답변완료</td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1">이전</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">다음</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  };
};

SupportQuestion = connect(mapStateToProps, {
})(SupportQuestion);

export default SupportQuestion
