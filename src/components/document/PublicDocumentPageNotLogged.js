import React from 'react';
import {
  Button, Row, Col,
} from 'reactstrap';

import DocumentQuestions from 'components/document/DocumentQuestions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Document's item options available for Public Document
const options = {
  showViewButton: true,
  removeOption: false,
  showTags: false,
  showLoginModal: true,
  optionalMessage: 'Você precisa estar logado no sistema',
};

const PublicDocumentPageNotLogged = (props) => {
  const {
    activePublicDocument, hideModal, showModal, match,
  } = props;
  const name = activePublicDocument ? activePublicDocument.name : '';

  const closeModal = () => {
    hideModal();
  };

  const handleOpenLoginModal = () => {
    const { optionalMessage } = options;
    // open modal
    showModal({
      open: true,
      closeModal,
      optionalMessage,
      redirect: match.url,
    }, 'login2');
  };

  return (
    <div className="c-document">
      <Row className="c-public-document__section c-document__main-buttons align-items-center">
        <Col sm="8" className="c-public-document__name-col">
          <h6>Você está visualizando a lista pública:</h6>
          <h4 className="c-public-document__name">{name}</h4>
        </Col>
        <Col sm="4" className="c-public-document__name-col text-right">
          <Button className="btn-success btn btn-secondary" onClick={handleOpenLoginModal} size="lg">
            <FontAwesomeIcon icon="copy" className="btn__icon" />
             Copiar lista
          </Button>
        </Col>
      </Row>

      <DocumentQuestions
        activeDocument={activePublicDocument}
        {...props}
        options={options}
        redirect={match.url}
      />
    </div>
  );
};


export default PublicDocumentPageNotLogged;