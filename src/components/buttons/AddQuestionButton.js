import React from 'react';
import { Button } from 'reactstrap';

const handleAddQuestionButton = (e, questionId, activeDocument) => {
  e.preventDefault();
  if (false /*activeDocument != null*/) {
    // addQuestion(id);
  } else {
    console.log(questionId);
  }
};


const AddQuestionButton = ({ customClass, questionId, nameButton, toggleModal, modal, activeDocument = null }) => (
  <Button
    value={questionId}
    title="Adicionar questões"
    className={customClass}
    onClick={ (activeDocument===null ) ? (() => toggleModal(modal)) : (e => handleAddQuestionButton(e, questionId))}
  >
    <i className="fa fa-plus" />
    {' '}
    {nameButton}
  </Button>
);
export default AddQuestionButton;
