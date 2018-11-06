import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OpenLastDocumentList = ({
  myLastDocumentsList, hideModal, showModal, switchActiveDocument,
}) => {

  const closeModal = () => {
    hideModal();
  };

  const handleOpenLastDocumentList = () => {
    // open modal
    showModal({
      open: true,
      closeModal,
      title: 'Trocar prova',
      message: 'Selecione a prova a ser editada',
      myLastDocumentsList,
      switchActiveDocument,
    }, 'last5Documents');
  };

  return (
    <div
      onClick={handleOpenLastDocumentList} 
      className="menu-top__document-button"
    >
      <FontAwesomeIcon icon="sync-alt" />
      {' '}
      Trocar prova
    </div>
  );
};
export default OpenLastDocumentList;
