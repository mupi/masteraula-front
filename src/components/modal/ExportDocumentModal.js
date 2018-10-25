import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const ConfirmExportModal = ({
    closeModal, documentId, documentName,downloadDocument, title, message,
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
       <button color="primary" className="btn--confirm btn btn-secondary" onClick={() => {downloadDocument(documentId, documentName, true); closeModal()}}>
       Sim</button>
       <button type="button" className="btn btn-secondary" onClick={() => {downloadDocument(documentId, documentName, false); closeModal()}}>
       Não</button>
     </div>
     </div>
     
   </div>
  );
  
    ConfirmExportModal.propTypes = {
    closeModal: PropTypes.func,
    toggleModal: PropTypes.func,
    downloadDocument: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    modal: PropTypes.bool,
  };
  
    ConfirmExportModal.defaultProps = {
    closeModal: f => f,
    toggleModal: f => f,
    downloadDocument: f => f,
    title: '',
    message: '',
    modal: false,
  };
  
  export default ConfirmExportModal;