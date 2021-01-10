import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";

import { getPosts } from '../../apis/support'

import { Pagination } from '../atomic/pagination'

let SupportNotice = props => {
  let [ notices, setNotices ] = useState([])
  let [ totalCount, setTotalCount ] = useState(0)
  let [ currentPage, setCurrentPage ] = useState(1)

  useEffect(() => {
    (async () => {
      let data = await getPosts(currentPage, "notice")
      setNotices(data.data)
      setTotalCount(data.totalCount)
    })()
  }, [currentPage])

  return (
    <div id="notice" className="container submenu-container mb-4 max-1000">
      <div className="col mb-3 pb-3">
        <div className="card shadow-sm bg-white rounded h-100">
          <div className="card-header">  <h5 className="pt-2 pb-1 mb-0">공지사항</h5></div>
          <div className="pl-4 pr-4 mb-3 ">
            <table className="table table-striped table-hover mb-3 text-center text-nowrap dotum" style={{ "wordBreak": "keep-all" }}>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">조회수</th>
                  <th scope="col">날짜</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice, idx) => (
                  <tr key={idx}>
                      
                      <td className="text-muted"> 
                        <Link to={`/support/notice/view/${notice.id}`} >{notice.id}</Link>
                      </td>
                      <td>
                        <Link to={`/support/notice/view/${notice.id}`} >{notice.title}</Link>
                      </td>
                      <td className="text-muted">{notice.view_count}</td>
                      <td className="text-muted">{notice.createAt}</td>
                      
                  </tr>
                ))}
      
              </tbody>
            </table>
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalCount={totalCount}
              cntOfPage={15}
            />
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

SupportNotice = connect(mapStateToProps, {
})(SupportNotice);

export default SupportNotice
