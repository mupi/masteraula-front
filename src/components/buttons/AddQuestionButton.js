import React from 'react';
import { Button } from 'reactstrap';

const handleAddQuestionButton = (e, questionId, activeDocument, addSelectedQuestion) => {
  e.preventDefault();
  if (activeDocument) {
    addSelectedQuestion(activeDocument.id, questionId, 0);
    console.log('Throws add '+ questionId);
  } else {
    console.log(questionId);
  }
};


const AddQuestionButton = ({ customClass, questionId, nameButton, toggleModal, modal, addQuestion, activeDocument, addSelectedQuestion}) => (
  <Button
    value={questionId}
    title="Adicionar questões"
    className={customClass}
    onClick={(!activeDocument) ? (() => toggleModal(modal)) : (e => handleAddQuestionButton(e, questionId, activeDocument, addSelectedQuestion))}
  >
    <i className="fa fa-plus" />
    {' '}
    {nameButton}
  </Button>
);
export default AddQuestionButton;
