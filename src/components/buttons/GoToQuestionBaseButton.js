import React from 'react';
import { Button } from 'reactstrap';


const GoToQuestionBaseButton = ({ customClass, nameButton}) => (
  <Button
    title="Adicionar questões"
    className={customClass}
  >
    <i className="fa fa-plus" />
    {' '}
    {nameButton}
  </Button>
);
export default GoToQuestionBaseButton;
