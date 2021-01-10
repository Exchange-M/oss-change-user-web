import React, { useState, useEffect } from 'react'

export const Pagination = props => {
  let [pageItems, setPageItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  // let [maxPage, setMaxPage] = useState(Math.ceil(props.totalCount / props.cntOfPage))
  let maxPage = () => Math.ceil(props.totalCount / props.cntOfPage)
  useEffect(() => {
    let pss = []
    let underflow = 0
    let maxPage = Math.ceil(props.totalCount / props.cntOfPage)
    
    for (let i = props.currentPage - 5; i < props.currentPage + 5 + underflow; ++i) {
      let p = i + 1
      
      if (p>maxPage) break
      if (p > 0) {
        pss.push(i + 1)
      } else {
        underflow += 1
      }
    }
    setPageItems(pss)
  }, [props.currentPage, props.totalCount])

  const nextPage = () => {
    if (isEnd()) {
      return
    }
    props.setCurrentPage(props.currentPage +1)
  }

  const prevPage = () => {
    if (isStart()) {
      return
    }
    props.setCurrentPage(props.currentPage -1)
  }

  const isStart = () => {
    return props.currentPage <= 1 ? true : false
  }
  const isEnd = () => {
    return props.currentPage>= Math.ceil(props.totalCount / props.cntOfPage) ? true : false
  }

  return (
    <div>
      <nav aria-label="Page navigation" >
        <ul className="pagination justify-content-center bottom-pagination">
          <li className={`page-item ${isStart()? "disabled": ''}`} onClick={prevPage}><span className="page-link" >
            <i className="fas fa-angle-left text-muted" style={{ fontSize: "15px" }}></i></span>
          </li>

          {pageItems.map(pageNum => (
            <li key={pageNum} onClick={() => props.setCurrentPage(pageNum)} className={`page-item ${pageNum == props.currentPage ? "active" : ''}`}><span className="page-link" >{pageNum}</span></li>
          ))}

          <li className={`page-item ${isEnd()? "disabled": ''}`} onClick={nextPage}><span className="page-link" href="#">
            <i className="fas fa-angle-right text-muted" style={{ fontSize: "15px" }}></i></span>
          </li>
        </ul>
      </nav>

      <div className="px-4 py-3 more">
        <button className="btn btn-outline-info" style={{ width: "45%" }} onClick={prevPage}> <i className="fas fa-angle-left"></i> 이전</button>
          <div style={{ width: "9.99999%", display: "inline-block", textAlign: "center" }}>{props.currentPage} OF {Math.ceil(props.totalCount / props.cntOfPage)}</div>
        <button className="btn btn-outline-info" style={{ width: "45%" }} onClick={nextPage}>다음 <i className="fas fa-angle-right"></i></button>
      </div>
    </div>
  )
}