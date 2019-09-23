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
};


const PublicDocumentPagetLogged = (props) => {
  const { activePublicDocument } = props;
  const name = activePublicDocument ? activePublicDocument.name : '';
  return (
    <div className="c-document">
      <Row className="c-document__main-buttons align-items-center">
        <Col sm="8" className="c-public-document__name-col">
          <h4 className="c-public-document__name">{name}</h4>
        </Col>
        <Col sm="4" className="c-public-document__name-col text-right">
          <Button className="btn-success btn btn-secondary" onClick={() => {}} size="lg">
            <FontAwesomeIcon icon="copy" className="btn__icon" />
             Copiar lista
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


export default PublicDocumentPagetLogged;
