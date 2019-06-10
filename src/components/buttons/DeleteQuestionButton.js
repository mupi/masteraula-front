import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

const handleDeleteQuestionButton = (e, questionId, deleteQuestion) => {
  e.preventDefault();
  if (questionId) {
    deleteQuestion(questionId);
  }
};

const DeleteQuestionButton = ({
  questionId, label, customClass, deleteQuestion,
}) => (
  <Button
    value={questionId}
    title="Apagar questão"
    className={customClass}
    onClick={(e => handleDeleteQuestionButton(e, questionId, deleteQuestion))}
  >
    {label}
  </Button>
);

DeleteQuestionButton.propTypes = {
  questionId: PropTypes.number,
};

DeleteQuestionButton.defaultProps = {
  questionId: 0,
};
export default DeleteQuestionButton;
