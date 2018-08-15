import React from 'react';
import { Button } from 'reactstrap';

const handleRemoveQuestionButton = (e, questionId, activeDocument, removeSelectedQuestion) => {
  e.preventDefault();
  if (activeDocument) {
    removeSelectedQuestion(activeDocument.id, questionId, 0);
    console.log('Throws add '+ questionId);
  } else {
    console.log(questionId);
  }
};

const RemoveQuestionButton = ({ customClass, questionId, activeDocument, removeSelectedQuestion }) => (
  <div className="l-btn-remove-question">
    <Button
      value={questionId}
      title="Remover questão"
      className="c-document__btn-remove-question"
      onClick={(e => handleRemoveQuestionButton(e, questionId, activeDocument, removeSelectedQuestion))}
    >
      <i className="fa fa-trash" />
    </Button>
  </div>
);
export default RemoveQuestionButton;
