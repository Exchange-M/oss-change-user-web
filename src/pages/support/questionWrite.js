import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux"

import QuestionWrite from '../../components/support/questionWrite'

import { onSetHeaderTitle } from '../../state/modules/siteInfo'

let SupportQuestionWrite = props => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(onSetHeaderTitle({title: "고객센터"}))
  }, [])

  return (
    <div id="support-question-write">
      <QuestionWrite />
    </div>
  )
}

const mapStateToProps = state => {
  return {
  };
};

SupportQuestionWrite = connect(mapStateToProps, {
})(SupportQuestionWrite);

export default SupportQuestionWrite

