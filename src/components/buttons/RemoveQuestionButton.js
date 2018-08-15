import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

const handleRemoveQuestionButton = (e, questionId, activeDocumentId, removeSelectedQuestion) => {
  e.preventDefault();
  if (activeDocumentId !== 0) {
    console.log("remove question:" + questionId);
    removeSelectedQuestion(activeDocumentId, questionId);
  }
};

const RemoveQuestionButton = ({ questionId, activeDocumentId, removeSelectedQuestion }) => (
  <div className="l-btn-remove-question">
    <Button
      value={questionId}
      title="Remover questão"
      className="c-document__btn-remove-question"
      onClick={(e => handleRemoveQuestionButton(e, questionId, activeDocumentId, removeSelectedQuestion))}
    >
      <i className="fa fa-trash" />
    </Button>
  </div>
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
