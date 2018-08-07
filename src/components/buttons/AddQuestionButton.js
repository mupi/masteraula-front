import React from 'react';
import { Button } from 'reactstrap';

const AddQuestionButton = ({ customClass, questionId, nameButton }) => (
  <Button value={questionId} title="Adicionar questões" className={customClass}>
    <i className="fa fa-plus" />
    {' '}
    {nameButton}
  </Button>
);
export default AddQuestionButton;
