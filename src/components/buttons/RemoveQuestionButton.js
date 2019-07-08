import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

const handleRemoveQuestionButton = (e, questionId, activeDocumentId, removeSelectedQuestion) => {
  e.preventDefault();
  if (activeDocumentId !== 0) {
    removeSelectedQuestion(activeDocumentId, questionId);
  }
};

const RemoveQuestionButton = ({
  questionId, activeDocumentId, removeSelectedQuestion, label, customClass,
}) => (
  <Button
    value={questionId}
    title="Remover questão"
    className={customClass}
    onClick={(e => handleRemoveQuestionButton(e, questionId, activeDocumentId, removeSelectedQuestion))}
  >
    {label}
  </Button>
);

RemoveQuestionButton.propTypes = {
  questionId: PropTypes.number,
  activeDocumentId: PropTypes.number,
  removeSelectedQuestion: PropTypes.func,
};

RemoveQuestionButton.defaultProps = {
  activeDocumentId: 0,
  questionId: 0,
  removeSelectedQuestion: f => f,
};
export default RemoveQuestionButton;
