import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveDocumentFromComponentButton from 'components/buttons/RemoveDocumentFromComponentButton';
import DocumentCard from './DocumentCard';

const DocumentCardList = (props) => {
  const {
    documents, count, sm, textResult = 'Provas encontradas', showLink = false, selectedDocumentList,
    addSelectedDocument, removeSelectedDocument,
  } = props;

  const isDocumentAdded = (id) => {
    if (selectedDocumentList) {
      const documentAdded = selectedDocumentList.filter(item => item.id === id);
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
      <Col sm="12" className="c-object-base__total-results">
        {`${textResult}: ${count}`}
        {' '}
        {showLink ? (
          <a
            className="c-object-base__link-askquestion"
            target="_blank"
            rel="noopener noreferrer"
            href="https://goo.gl/forms/bG2mMbMNNrNiOjqt2"
          >
            Não encontrou o que queria? Clique aqui
          </a>
        ) : ''}
      </Col>
      {documents && documents.map(document => (
        <Col sm={sm} lg="3" xs="12" key={document.id} className="object-card">
          <DocumentCard document={document} button={CardButton(document)} filterTags {...props} />
        </Col>
      ))}
    </Row>
  );
};

DocumentCardList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.string,
};

DocumentCardList.defaultProps = {
  documents: [],
  count: 0,
  sm: '4',
};

export default DocumentCardList;
