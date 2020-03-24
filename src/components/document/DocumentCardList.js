import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveDocumentFromComponentButton from 'components/buttons/RemoveDocumentFromComponentButton';
import DocumentCard from './DocumentCard';

const DocumentCardList = (props) => {
  const {
    documents, sm, selectedDocumentList,
    addSelectedDocument, removeSelectedDocument,
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
      <RemoveDocumentFromComponentButton documentId={document.id} removeSelectedDocument={removeSelectedDocument} />
    )
  );
  return (
    <Row>
      {documents && documents.map(document => (
        <Col sm={sm} lg="3" xs="12" key={document.id} className="object-card">
          <DocumentCard
            document={document}
            button={CardButton(document)}
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
