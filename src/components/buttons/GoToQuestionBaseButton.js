import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const GoToQuestionBaseButton = ({ customClass, nameButton}) => (
  <Link to="/question-base/1">
    <Button
      title="Adicionar questões"
      className={customClass}
    >
      <i className="fa fa-plus" />
      {' '}
      {nameButton}
    </Button>
  </Link>


);
export default GoToQuestionBaseButton;
