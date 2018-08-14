import React from 'react';
import { Button } from 'reactstrap';

const handleRemoveQuestionButton = (e, questionId, activeDocument, removeSelectedQuestion) => {
  e.preventDefault();
  if (activeDocument) {
    console.log("remove question:" + questionId);
    removeSelectedQuestion(activeDocument.id, questionId, 0);
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
