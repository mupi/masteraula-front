import React from 'react';
import { Button } from 'reactstrap';

const handleAddQuestionButton = (e,questionId) => {
  console.log("hola");
  console.log(questionId);
//  addQuestion(id);
};



const AddQuestionButton = ({ customClass, questionId, nameButton }) => (
  <Button
    value={questionId}
    title="Adicionar questões"
    className={customClass}
    onClick={e => handleAddQuestionButton(e, questionId)}
  >
    <i className="fa fa-plus" />
    {' '}
    {nameButton}
  </Button>
);
export default AddQuestionButton;
