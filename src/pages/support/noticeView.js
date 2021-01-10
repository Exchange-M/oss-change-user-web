import React, { useState, useEffect } from 'react'
import { getPost } from '../../apis/support'

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";

import './css/noticeView.css'

const SupportNoticeView = (props) => {
  let [ body, setBody ] = useState('')
  let [ title, setTitle ] = useState('')
  let [ createAt, setCreateAt ] = useState('')
  let [ viewCount, setViewCount ] = useState('')
  
  useEffect(() => {
  
    (async () => {
      console.log(props.match.params.id)
      let post = await getPost(props.match.params.id)
      console.log(post.data)
      setBody(post.data.body)
      setTitle(post.data.title)
      setCreateAt(post.data.createAt)
      setViewCount(post.data.view_count)
    })()
  }, [])

  const parseHtml = htmlParser({
    isValidNode: node => node.type !== "script",
    processingInstructions: [
      /* ... */
    ]
  });

  const listBtnClick = () => {
    props.history.goBack()
  }

  return (
    <div id="support-notice-view">
      <div className="detail_view">
        <div className="view_title">{title}</div>
        <div className="view_date">등록일 {createAt} | 조회수 {viewCount}</div>

        <div className="markdown-body view_body">
          <ReactMarkdown source={body} escapeHtml={true} astPlugins={[parseHtml]} />
        </div>
        <hr style={{marginTop: "50px"}}/>
        <div className="bottom" >
          {/* <div className=""> */}

            <button type="button" className="support-move" onClick={listBtnClick} >목록</button>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default SupportNoticeView