import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RemoveDocumentFromComponentButton from 'components/buttons/RemoveDocumentFromComponentButton';
import DocumentCard from './DocumentCard';

const DocumentCardListClassPlan = (props) => {
  const {
    documents, sm, removeSelectedDocument,
  } = props;

  const CardButton = document => (
    <RemoveDocumentFromComponentButton documentId={document.id} removeSelectedDocument={removeSelectedDocument} />
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
