import React, { useCallback } from 'react'
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux'

import { onOpen, onClose } from '../../state/modules/modals'
import { onSignout } from '../../state/modules/user'

import './css/modal.css'

let BASE_WIDTH = 500
let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: `${BASE_WIDTH}px`,
    width: "100%"
  }
};

const _Modal = (props) => {
  const { modal } = useSelector(state => ({
    modal: state.modals
  }))

  const dispatch = useDispatch()

  const afterOpenModal = () => {
    customStyles.content.maxWidth = window.innerWidth < BASE_WIDTH ? `${window.innerWidth - 25}px` : customStyles.content.maxWidth
  }

  const modalClose = () => {
    dispatch(onClose({}))

    if (modal.errorCode === "1010" || modal.errorCode === "403"){
      dispatch(onSignout())
      window.location="/user/signin"
    } 
  }

  return (
    <div id="modal">
      <Modal
        isOpen={modal.isOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modal.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={modalClose}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {modal.body}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={modalClose} data-dismiss="modal">{modal.cancelMsg}</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={modalClose}>{modal.okMsg}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default React.memo(_Modal)
