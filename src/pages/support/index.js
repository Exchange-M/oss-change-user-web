import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux"

import Faq from '../../components/support/faq'
import Guide from '../../components/support/guide'
import Notice from '../../components/support/notice'
import Question from '../../components/support/question'

import SubMenu from '../../components/submenu/common'

import { onSetHeaderTitle } from '../../state/modules/siteInfo'

import './css/support.css'

let Support = props => {
  let title='고객센터'
  let tabs = ["notice", "question", "guide", "faq"]
  let tabKrConvert = {
    notice: {kr: "공지사항", selected: "false"},
    question: {kr: "1:1문의", selected: "false"},
    guide: {kr: "이용안내", selected:"false"},
    faq: {kr: "FAQ", selected: "true"},
  }

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(onSetHeaderTitle({title: "고객센터"}))
  }, [])


  return (
    <div id="support">
      <SubMenu title={title} tabs={tabs} tabKrConvert={tabKrConvert} /> 
      
      <div className="tab-content">
        <div className="tab-pane fade" id="notice" role="tabpanel" aria-labelledby="notice-tab">
          <Notice />
        </div>
        <div className="tab-pane fade" id="question" role="tabpanel" aria-labelledby="question-tab">
          <Question />
        </div>
        <div className="tab-pane fade" id="guide" role="tabpanel" aria-labelledby="guide-tab">
          <Guide />
        </div>
        <div className="tab-pane fade show active" id="faq" role="tabpanel" aria-labelledby="faq-tab">
          <Faq />
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  };
};

Support = connect(mapStateToProps, {
})(Support);

export default Support
