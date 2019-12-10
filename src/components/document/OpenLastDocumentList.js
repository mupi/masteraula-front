import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OpenLastDocumentList = ({
  myLastDocumentsList, showlast5DocumentsModal, styleCustomize = '',
}) => {
  const handleOpenLastDocumentList = () => {
    // open modal
    showlast5DocumentsModal(myLastDocumentsList);
  };

  return (
    <DropdownItem className={styleCustomize} onClick={handleOpenLastDocumentList}>
      <FontAwesomeIcon icon="sync-alt" />
      {' '}
      Trocar prova
    </DropdownItem>
  );
};
export default OpenLastDocumentList;
