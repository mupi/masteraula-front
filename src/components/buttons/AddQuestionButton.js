import React from 'react';
import { Button } from 'reactstrap';

const handleAddQuestionButton = (e, questionId, activeDocument) => {
  e.preventDefault();
  if (false /*activeDocument != null*/) {
    // addQuestion(id);
    console.log(questionId);
  } else {
    console.log(questionId);
  }
};


const AddQuestionButton = ({ customClass, questionId, nameButton, toggleModal, modal, activeDocument}) => (
  <Button
    value={questionId}
    title="Adicionar questões"
    className={customClass}
    onClick={(activeDocument === null ) ? ( ( ) => toggleModal(modal)) : (e => handleAddQuestionButton(e, questionId, activeDocument))}
  >
    <i className="fa fa-plus" />
    {' '}
    {nameButton}
  </Button>
);
export default AddQuestionButton;
