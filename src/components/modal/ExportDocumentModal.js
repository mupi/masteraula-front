import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const ConfirmExportModal = ({
    closeModal, downloadDocument, title, message,
  }) => (
   <div className="modal__content modal-content">
     <div className="modal__header modal-header">
       <h5
         className="modal-title"
       >{title}</h5>
       <button type="button" className="close" aria-label="Close" onClick={closeModal}>
         <span aria-hidden="true">&times;</span>
       </button>
     </div>
     <div className="modal-body">
       <p>{message}</p>
       <div className="modal__footer modal-footer">
       <button type="button" className="btn btn-secondary" onClick={() => downloadDocument(documentId, true)}><i className="fa fa-sign-out btn__icon" />
       Sim</button>
       <button type="button" className="btn btn-secondary" onClick={() => downloadDocument(documentId, false)><i className="fa fa-sign-out btn__icon" />
       </button>
       <button color="primary" className="btn--confirm btn btn-secondary" onClick={confirmAction}>
         <i className="fa fa-check-circle btn__icon" />
         Não
       </button>
     </div>
     </div>
     
   </div>
  );
  
    ConfirmExportModal.propTypes = {
    toggleModal: PropTypes.func,
    confirmAction: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    modal: PropTypes.bool,
  };
  
    ConfirmExportModal.defaultProps = {
    toggleModal: f => f,
    confirmAction: f => f,
    title: '',
    message: '',
    modal: false,
  };
  
  export default ConfirmExportModal;