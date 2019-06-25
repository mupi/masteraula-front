import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

const RemoveObjectFromQuestionButton = ({
  objectId, removeSelectedObjectToQuestion,
}) => (
  <Button
    value={objectId}
    title="Remover questão"
    className="object-card__btn object-card__btn--red"
    onClick={() => removeSelectedObjectToQuestion(objectId)}
  >
    <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
    {' '}
    Remover
  </Button>
);

RemoveObjectFromQuestionButton.propTypes = {
  objectId: PropTypes.number,
  removeSelectedObjectToQuestion: PropTypes.func,
};

RemoveObjectFromQuestionButton.defaultProps = {
  objectId: 0,
  removeSelectedObjectToQuestion: f => f,
};
export default RemoveObjectFromQuestionButton;
