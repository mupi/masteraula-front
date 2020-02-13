import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const RemoveDocumentFromComponentButton = ({
  documentId, removeSelectedDocument,
}) => (
  <Button
    value={documentId}
    title="Remover prova ou lista"
    className="object-card__btn object-card__btn--red"
    onClick={() => removeSelectedDocument(documentId)}
  >
    <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
    {' '}
    Remover
  </Button>
);

RemoveDocumentFromComponentButton.propTypes = {
  documentId: PropTypes.number,
  removeSelectedDocument: PropTypes.func,
};

RemoveDocumentFromComponentButton.defaultProps = {
  documentId: 0,
  removeSelectedDocument: f => f,
};
export default RemoveDocumentFromComponentButton;
