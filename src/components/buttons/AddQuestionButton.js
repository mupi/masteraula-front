import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const AddQuestionButton = ({
  customClass, questionId, nameButton, toggleModal, modal, activeDocument, addSelectedQuestion,
}) => {

  function handleAddQuestionButton(e, questionId, activeDocument){
    e.preventDefault();
    if (activeDocument) {
      addSelectedQuestion(activeDocument.id, questionId, 0);
    } else {
      toggleModal(modal, questionId);
    }
  };

  return(
    <Button
      value={questionId}
      title="Adicionar questões"
      className={customClass}
      onClick={(e) => handleAddQuestionButton(e, questionId, activeDocument)}
    >
      <i className="fa fa-plus" />
      {' '}
      {nameButton}
    </Button>
  );
}

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
