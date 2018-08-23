import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const handleAddQuestionButton = (e, questionId, activeDocument, addSelectedQuestion) => {
  e.preventDefault();
  if (activeDocument) {
    addSelectedQuestion(activeDocument.id, questionId, 0);
  }
};

const AddQuestionButton = ({
  customClass, questionId, nameButton, toggleModal, modal, activeDocument, addSelectedQuestion,
}) => (
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

AddQuestionButton.propTypes = {
  customClass: PropTypes.string.isRequired,
  questionId: PropTypes.number,
  toggleModal: PropTypes.func,
  nameButton: PropTypes.string,
  modal: PropTypes.bool,
  activeDocument: PropTypes.shape({}),
  addSelectedQuestion: PropTypes.func,
};

export default AddQuestionButton;
