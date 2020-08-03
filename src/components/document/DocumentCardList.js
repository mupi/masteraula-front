import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveButton from 'components/buttons/RemoveButton';
import DocumentCard from './DocumentCard';

const DocumentCardList = (props) => {
  const {
    documents, sm, selectedDocumentList,
    addSelectedDocument, removeSelectedDocument, viewOnly = false,
    showDocumentModal,
  } = props;

  const isDocumentAdded = (id) => {
    if (selectedDocumentList) {
      const documentAdded = selectedDocumentList.filter(item => (item.id === id || item.document_ids === id));
      return (documentAdded.length > 0);
    }
    return false;
  };

  const CardButton = document => (
    !isDocumentAdded(document.id) ? (
      <Button className="object-card__btn" onClick={() => addSelectedDocument(document)}>
        <FontAwesomeIcon icon="plus" className="btn__icon" />
        {' '}
        Adicionar
        {' '}
      </Button>
    ) : (
      <RemoveButton id={document.id} removeSelectedItem={removeSelectedDocument} itemName="prova ou lista" />
    )
  );

  const ViewCardButton = document => (
    <Button className="btn-margin-right menu-top__document-button" onClick={() => showDocumentModal(document.id)}>
      <FontAwesomeIcon icon="eye" className="btn__icon" />
      Ver prova
    </Button>
  );
  return (
    <Row>
      {documents && documents.map(document => (
        <Col sm={sm} lg="3" xs="12" key={document.id} className="object-card">
          <DocumentCard
            document={document}
            button={!viewOnly ? CardButton(document) : ViewCardButton(document)}
            {...props}
          />
        </Col>
      ))}
    </Row>
  );
};

DocumentCardList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({})),
  sm: PropTypes.string,
};

DocumentCardList.defaultProps = {
  documents: [],
  sm: '4',
};

export default DocumentCardList;
