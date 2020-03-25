import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import RemoveButton from 'components/buttons/RemoveButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentCard from './DocumentCard';

const DocumentCardListClassPlan = (props) => {
  const {
    documents, sm, removeSelectedDocument, options, showDocumentModal,
  } = props;

  const CardButton = document => (
    <>
      { options && options.removeButton && (
      <RemoveButton id={document.id} removeSelectedItem={removeSelectedDocument} itemName="prova ou lista" />)
    }

      { options && options.showViewButton && (
        <Button className="btn-margin-right menu-top__document-button" onClick={() => showDocumentModal(document.id)}>
          <FontAwesomeIcon icon="eye" className="btn__icon" />
          Ver
        </Button>
      ) }

    </>

  );


  return (
    <Row>
      {documents && documents.map(document => (
        <Col sm={sm} lg="3" xs="12" key={document.id} className="object-card">
          <DocumentCard document={document} button={CardButton(document)} filterTags {...props} />
        </Col>
      ))}
    </Row>
  );
};

DocumentCardListClassPlan.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({})),
  sm: PropTypes.string,
};

DocumentCardListClassPlan.defaultProps = {
  documents: [],
  sm: '4',
};

export default DocumentCardListClassPlan;
