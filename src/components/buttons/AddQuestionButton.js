import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddQuestionButton = ({
  customClass, questionId, nameButton, setQuestionIdToNewDocument, activeDocument, addSelectedQuestion, hideModal, showModal,
}) => {
  const closeModal = () => {
    hideModal();
  };

  const handleAddQuestionButton = (e) => {
    e.preventDefault();
    if (activeDocument) {
      addSelectedQuestion(activeDocument.id, questionId, 0);
    } else {
      setQuestionIdToNewDocument(questionId);
      showModal({
        open: true,
        closeModal,
        title:'Adicionar questão a prova',
      }, 'createDocument');
    }
  };

  return (
    <Button
      value={questionId}
      title="Adicionar questões"
      className={customClass}
      onClick={e => handleAddQuestionButton(e)}
    >
      <FontAwesomeIcon
        icon="plus"
      />
      {' '}
      {nameButton}
    </Button>
  );
};

AddQuestionButton.propTypes = {
  customClass: PropTypes.string.isRequired,
  questionId: PropTypes.number,
  nameButton: PropTypes.string,
  activeDocument: PropTypes.shape({}),
  addSelectedQuestion: PropTypes.func,
};

export default AddQuestionButton;
