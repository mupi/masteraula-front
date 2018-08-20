import React from 'react'

const AlertModal = ({ closeModal, title, message }) => {
  return (
    <div className="modal__content">
      <div className="modal__header">
        <h5
          className="modal-title"
        >{title}</h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal__footer">
        <button type="button" className="btn btn-secondary" onClick={closeModal}><i className="fa fa-sign-out-alt btn__icon" />
        Fechar</button>

      </div>
    </div>
  )
}

export default AlertModal
