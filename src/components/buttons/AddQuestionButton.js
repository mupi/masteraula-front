import React from 'react';
import { Button } from 'reactstrap';

const AddQuestionButton = ({ customClass, questionId, nameButton, onClick }) => (
  <Button
    value={questionId}
    title="Adicionar questões"
    className={customClass}
    onClick={onClick}
  >
    <i className="fa fa-plus" />
    {' '}
    {nameButton}
  </Button>
);
export default AddQuestionButton;
