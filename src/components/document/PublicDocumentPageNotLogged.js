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
  const { activePublicDocument, showLoginModal, match } = props;
  const name = activePublicDocument ? activePublicDocument.name : '';

  const handleOpenLoginModal = () => {
    showLoginModal(match.url);
  };

  return (
    <div className="c-document">
      <Row className="c-public-document__section c-document__main-buttons align-items-center">
        <Col sm="8" className="c-public-document__name-col">
          <h3 className="c-public-document__name">{`Prova: ${name}`}</h3>
        </Col>
        <Col sm="4" className="c-public-document__name-col text-right">
          <Button className="btn-success btn btn-secondary" onClick={handleOpenLoginModal} size="lg">
            <FontAwesomeIcon icon="copy" className="btn__icon" />
             Copiar prova
          </Button>
        </Col>
      </Row>

      <DocumentQuestions
        activeDocument={activePublicDocument}
        {...props}
        options={options}
      />
    </div>
  );
};


export default PublicDocumentPageNotLogged;
